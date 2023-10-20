import { Controller, Get } from '@nestjs/common';
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
}
