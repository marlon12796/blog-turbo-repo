import { Injectable } from '@nestjs/common';
import { DBSetup, PostsTable } from '@/db/types/db.types';
import { and, eq, inArray, isNull, notInArray, SQL, sql } from 'drizzle-orm';
import { postsTable, tagsTable, postTagsTable } from '@/db/schema/db.schema';

@Injectable()
export class TransactionRepository {
  async associateTagsWithPost(tx: DBSetup, postId: number, tags: string[]) {
    await tx.insert(postTagsTable).select(
      tx
        .select({ postId: sql`${postId}` as any, tagId: tagsTable.id })
        .from(tagsTable)
        .leftJoin(postTagsTable, and(eq(postTagsTable.tagId, tagsTable.id), eq(postTagsTable.postId, postId)))
        .where(and(inArray(tagsTable.name, tags), isNull(postTagsTable.tagId)))
    );
  }
  async deleteUnusedTags(tx: DBSetup, postId: number, tags: string[]) {
    const tagsToDelete = tx.$with('tags_to_delete').as(
      tx
        .select({ id: postTagsTable.tagId })
        .from(postTagsTable)
        .innerJoin(tagsTable, eq(postTagsTable.tagId, tagsTable.id))
        .where(and(eq(postTagsTable.postId, postId), notInArray(tagsTable.name, tags)))
    );

    await tx
      .with(tagsToDelete)
      .delete(postTagsTable)
      .where(inArray(postTagsTable.tagId, tx.select({ tagId: tagsToDelete.id }).from(tagsToDelete)));
  }
  async insertTagsIfNotExists(tx: DBSetup, tags: string[]) {
    const tagInserts: SQL[] = tags.map((tag: string) => sql`SELECT ${tag} AS name`);
    const subquery = sql.join(tagInserts, sql.raw(' UNION ALL '));

    await tx.insert(tagsTable).select(
      sql`SELECT NULL, new_tags.name FROM (${subquery}) AS new_tags
      LEFT JOIN ${tagsTable} ON ${tagsTable.name} = new_tags.name WHERE ${tagsTable.name} IS NULL`
    );
  }
  async updatePost(tx: DBSetup, postId: number, data: Partial<PostsTable>) {
    await tx.update(postsTable).set(data).where(eq(postsTable.id, postId));
  }
}
