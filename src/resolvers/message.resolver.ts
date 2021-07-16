import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Message from 'src/db/models/message.entity';
import MessageInput from './input/message.input';
import User from 'src/db/models/user.entity';

@Resolver(() => Message)
class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => [Message])
  public async getMessagesFromUser(
    @Args('userID') userId: number,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({ where: { userId } });
  }

  @Query(() => Message, { nullable: true })
  public async message(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(data: MessageInput): Promise<Message> {
    const message = this.repoService.messageRepo.create();
    message.content = data.content;
    message.userId = data.user.connect.id;

    return this.repoService.messageRepo.save(message);
  }

  @ResolveField(() => User)
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}

export default MessageResolver;
