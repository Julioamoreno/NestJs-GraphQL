import { Controller, Get } from '@nestjs/common';
import RepoService from './repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  async getHello(): Promise<string> {
    const messageCount = await this.repoService.messageRepo.count();
    return `There are ${messageCount} existent messages`;
  }
}
