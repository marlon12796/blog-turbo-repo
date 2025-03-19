import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DB } from 'src/db/db.module';
import { AuthType, DBSetup, UserTable } from 'src/db/types/db.types';
import { hash } from 'argon2';
import { usersTable } from 'src/db/schema/users.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly db: DBSetup) {}
  async create(createUserInput: CreateUserInput, authType: AuthType = AuthType.LOCAL) {
    const { password, ...user } = createUserInput;
    const hashedPassword = password ? await hash(password) : null;
    const [userCreated] = await this.db
      .insert(usersTable)
      .values(<UserTable>{ ...user, authType, password: hashedPassword })
      .onConflictDoNothing({ target: usersTable.email })
      .returning();

    return userCreated;
  }

  async findOneByEmail(email: string, throwIfNotFound = true) {
    const [user] = await this.db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!user && throwIfNotFound) throw new NotFoundException(`No se encontró un usuario con el email: ${email}`);

    return user ?? null;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
