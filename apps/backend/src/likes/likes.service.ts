import { Inject, Injectable } from '@nestjs/common';
import { LikePostArgs } from './args/likePost.args';
import { DBSetup, LikesTable } from '@/db/types/db.types';
import { DB } from '@/db/db.module';
import { likesTable } from '@/db/schema/like.schema';
import { and, count, eq } from 'drizzle-orm';

@Injectable()
export class LikesService {
  constructor(@Inject(DB) private db: DBSetup) {}

  async likePost(likePost: LikePostArgs, id: number) {
    const values = { postId: likePost.postId, userId: id, liked: true };
    const result = await this.db
      .insert(likesTable)
      .values(<LikesTable>values)
      .onConflictDoUpdate({
        target: [likesTable.userId, likesTable.postId],
        set: { liked: true }
      })
      .returning();
    return result.length > 0;
  }
  async unlikePost(likePost: LikePostArgs, id: number) {
    const values = { postId: likePost.postId, userId: id, liked: false };
    const result = await this.db
      .insert(likesTable)
      .values(<LikesTable>values)
      .onConflictDoUpdate({
        target: [likesTable.userId, likesTable.postId],
        set: { liked: false }
      })
      .returning();
    return result.length > 0;
  }
  async getPostLikeCount(postId: number) {
    const [likesOfPost] = await this.db
      .select({ totalLikes: count(likesTable.id) })
      .from(likesTable)
      .where(and(eq(likesTable.postId, postId), eq(likesTable.liked, true)));
    return likesOfPost.totalLikes;
  }
  async userLikedPost(likePost: LikePostArgs, userId: number) {
    // console.log(likePost);
    // console.log(userId);
    const userLike = await this.db
      .select()
      .from(likesTable)
      .where(and(eq(likesTable.postId, likePost.postId), eq(likesTable.userId, userId)));
    console.log(userLike);
    return userLike.length > 0 && userLike[0].liked;
  }
}
