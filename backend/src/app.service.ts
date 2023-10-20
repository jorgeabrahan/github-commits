import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly owner = 'jorgeabrahan';
  private readonly repo = 'github-commits';
  private readonly baseUrl = `https://api.github.com/repos/${this.owner}/${this.repo}`;

  getWelcome(): string {
    return 'Welcome to the GitHub commits NestJS application';
  }

  async getCommits() {
    const { data } = await axios.get(`${this.baseUrl}/commits`);
    return data;
  }
}
