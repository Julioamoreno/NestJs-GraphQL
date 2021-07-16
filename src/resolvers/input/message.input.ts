import { Field, InputType } from 'type-graphql';
import UserInput from './user.input';

@InputType()
class MessageUserConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class MessageUserInput {
  @Field({ nullable: true })
  readonly connect: MessageUserConnectInput;

  @Field({ nullable: true })
  readonly create: UserInput;
}

@InputType()
class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly user: MessageUserInput;
}

export default MessageInput;
