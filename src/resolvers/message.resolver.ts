import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import Message from 'src/db/models/message.entity';
import MessageInput from './input/message.input';

@Resolver()
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
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      content: input.content,
      userId: input.user.connect.id,
    });
    return this.repoService.messageRepo.save(message);
  }
}

export default MessageResolver;
