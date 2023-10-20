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

  @Get('commits/date')
  getCommitsByDate(
    @Query('dateSince') dateSince: string,
    @Query('dateUntil') dateUntil: string,
  ) {
    // date format ISO 8601: `{year}-{month}-{day}`
    return this.appService.getCommitsByDate(dateSince, dateUntil);
  }

  @Get('commits/keyword')
  getCommitsByKeyword(@Query('keyword') keyword: string) {
    return this.appService.getCommitsByKeyword(keyword);
  }

  @Get('commits/filters')
  getCommitsByFilters(
    @Query('author') author?: string,
    @Query('dateSince') dateSince?: string,
    @Query('dateUntil') dateUntil?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.appService.getCommitsByFilters(
      author,
      dateSince,
      dateUntil,
      keyword,
    );
  }
}
