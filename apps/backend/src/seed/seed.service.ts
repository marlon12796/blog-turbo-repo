import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import { DB } from 'src/db/db.module';
import { DBSetup } from 'src/db/types/db.types';
import { sql } from 'drizzle-orm';
import { usersTable } from 'src/db/schema/users.schema';
import { postsTable } from 'src/db/schema/posts.schema';
import { likesTable } from 'src/db/schema/like.schema';
import { commentsTable } from 'src/db/schema/comment.schema';
@Injectable()
export class SeedService {
  constructor(@Inject(DB) private readonly db: DBSetup) {}
  async executeSeed() {
    const isProd = process.env.NODE_ENV === 'prod';
    if (isProd) throw new BadRequestException('No podemos correr las semillas en producción');
    const defaultPassword = await hash('1234567');
    this.deleteDatabase();
    const users = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      bio: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
      password: defaultPassword
    }));
    await this.db.insert(usersTable).values(users);
    const posts = Array.from({ length: 200 }).map(() => {
      return {
        slug: this.generateSlug(faker.lorem.sentence()),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        thumbnail: faker.image.urlPicsumPhotos({ height: 320, width: 320, blur: 0 }),
        authorId: faker.number.int({ min: 1, max: 10 }),
        published: true
      };
    });
    const likeSet = new Set<string>();
    const likes: { postId: number; userId: number }[] = [];
    while (likes.length < 400) {
      const postId = faker.number.int({ min: 1, max: 200 });
      const userId = faker.number.int({ min: 1, max: 10 });
      const key = `${postId}-${userId}`;
      if (!likeSet.has(key)) {
        likeSet.add(key);
        likes.push({ postId, userId });
      }
    }

    // Generar comentarios (10 por post)
    const COMMENTS_PER_POST = 10;
    const comments: { postId: number; authorId: number; content: string }[] = [];
    for (let postId = 1; postId <= posts.length; postId++) {
      for (let comment = 1; comment <= COMMENTS_PER_POST; comment++)
        comments.push({ postId, authorId: faker.number.int({ min: 1, max: 10 }), content: faker.lorem.sentence() });
    }
    await Promise.all([
      this.db.insert(postsTable).values(posts),
      this.db.insert(likesTable).values(likes),
      this.db.insert(commentsTable).values(comments)
    ]);
    return true;
  }
  private generateSlug(title: string) {
    return title
      .toLowerCase() // Convierte el texto a minúsculas
      .trim() // Elimina espacios en blanco al inicio y al final
      .replace(/ /g, '-') // Reemplaza espacios con guiones (-)
      .replace(/[^\w-]+/g, ''); // Elimina todos los caracteres que no sean letras, números o guiones
  }

  private deleteDatabase() {
    this.db.transaction((tx) => {
      tx.run(sql`PRAGMA foreign_keys = OFF;`);
      tx.run(sql`DELETE FROM comments;`);
      tx.run(sql`DELETE FROM likes;`);
      tx.run(sql`DELETE FROM post_tags;`);
      tx.run(sql`DELETE FROM posts;`);
      tx.run(sql`DELETE FROM tags;`);
      tx.run(sql`DELETE FROM users;`);
      tx.run(sql`DELETE FROM sqlite_sequence WHERE name IN ('comments', 'likes', 'post_tags', 'posts', 'tags', 'users');`);
      tx.run(sql`PRAGMA foreign_keys = ON;`);
    });

    this.db.run(sql`VACUUM;`);
  }
}
