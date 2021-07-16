import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

export default MessageInput;
