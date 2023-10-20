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

  async getCommitsByAuthor(author: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/commits?author=${author}`,
    );
    return data;
  }

  async getCommitsByDate(dateSince: string, dateUntil: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/commits?since=${dateSince}T00:00:00Z&until=${dateUntil}T23:59:59Z`,
    );
    return data;
  }
}
