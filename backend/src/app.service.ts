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
    try {
      const { data } = await axios.get(`${this.baseUrl}/commits`);
      return data;
    } catch (_) {
      throw new Error('Error while fetching commits from GitHub');
    }
  }

  async getCommitsByAuthor(author: string) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}/commits?author=${author}`,
      );
      return data;
    } catch (_) {
      throw new Error('Error while fetching commits by user from GitHub');
    }
  }

  async getCommitsByDate(dateSince: string, dateUntil: string) {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}/commits?since=${dateSince}T00:00:00Z&until=${dateUntil}T23:59:59Z`,
      );
      return data;
    } catch (_) {
      throw new Error('Error while fetching commits by date from GitHub');
    }
  }

  async getCommitsByKeyword(keyword: string) {
    try {
      const { data } = await axios.get(`${this.baseUrl}/commits`);
      return data.filter(
        (commit) =>
          commit?.commit?.message
            ?.toLowerCase()
            ?.includes(keyword?.toLowerCase()),
      );
    } catch (_) {
      throw new Error('Error while fetching commits by keyword from GitHub');
    }
  }

  async getCommitsByFilters(
    author?: string,
    dateSince?: string,
    dateUntil?: string,
    keyword?: string,
  ) {
    let url = `${this.baseUrl}/commits`;
    const params = [];

    if (dateSince && dateUntil) {
      params.push(
        `since=${dateSince}T00:00:00Z`,
        `until=${dateUntil}T23:59:59Z`,
      );
    }

    if (author) {
      params.push(`author=${author}`);
    }

    if (params.length > 0) url += '?' + params.join('&');
    try {
      const { data } = await axios.get(url);

      let commits = data;
      // if a keyword is present
      if (keyword) {
        // filter comments by keyword
        commits = commits.filter(
          (commit) =>
            commit?.commit?.message
              ?.toLowerCase()
              ?.includes(keyword?.toLowerCase()),
        );
      }
      return commits;
    } catch (_) {
      throw new Error('Error while fetching commits by filters from GitHub');
    }
  }
}
