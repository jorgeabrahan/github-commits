import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(): string {
    return this.appService.getWelcome();
  }

  @Get('commits')
  getCommits() {
    return this.appService.getCommits();
  }

  @Get('commits/author')
  getCommitsByAuthor(@Query('author') author: string) {
    return this.appService.getCommitsByAuthor(author);
  }
}
