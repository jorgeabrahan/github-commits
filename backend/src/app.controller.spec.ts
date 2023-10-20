import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AppController', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCommits', () => {
    it('should return an array of commits', async () => {
      const result = [];
      mockedAxios.get.mockResolvedValue({ data: result });

      expect(await service.getCommits()).toBe(result);
    });
  });
});
