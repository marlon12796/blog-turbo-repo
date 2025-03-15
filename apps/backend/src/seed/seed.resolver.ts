import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}
  @Mutation(() => Boolean, {
    name: 'ExecuteSeed',
    description: 'Ejecuta la construcción de la base de datos '
  })
  async seedDatabase() {
    return this.seedService.executeSeed();
  }
}
