import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver('Seed')
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}
  @Mutation(() => Boolean, {
    name: 'ExecuteSeed',
    description: 'Ejecuta la construcción de la base de datos ',
  })
  async seedDatabase() {
    return true;
    // return this.seedService.executeSeed();
  }
  @Query(() => String)
  hello() {
    return '¡Hola, GraphQL!';
  }
}
