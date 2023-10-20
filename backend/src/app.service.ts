import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Welcome to the GitHub commits NestJS application';
  }
}
