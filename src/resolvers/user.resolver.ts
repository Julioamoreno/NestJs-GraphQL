import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import User from 'src/db/models/user.entity';
import UserInput from './input/user.input';

@Resolver()
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async user(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): Promise<User> {
    const user = this.repoService.userRepo.create({ email: input.email });
    return this.repoService.userRepo.save(user);
  }

  @Mutation(() => User)
  public async createUserOrAuthentication(
    @Args('data') input: UserInput,
  ): Promise<User> {
    let user = await this.repoService.userRepo.findOne({
      where: { email: input.email },
    });

    if (!user) {
      user = this.repoService.userRepo.create({ email: input.email });
      await this.repoService.userRepo.save(user);
    }
    return user;
  }
}

export default UserResolver;
