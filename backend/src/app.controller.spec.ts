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

      expect(await service.getCommits()).toEqual(result);
    });
  });

  describe('getCommitsByAuthor', () => {
    it('should return an array of commits by the specified author', async () => {
      const result = [];
      mockedAxios.get.mockResolvedValue({ data: result });

      expect(await service.getCommitsByAuthor('jorgeabrahan')).toEqual(result);
    });
  });

  describe('getCommitsByDate', () => {
    it('should return an array of commits between the specified dates', async () => {
      const result = [];
      mockedAxios.get.mockResolvedValue({ data: result });

      expect(
        await service.getCommitsByDate('2023-10-01', '2023-10-31'),
      ).toEqual(result);
    });
  });

  describe('getCommitsByFilters', () => {
    it('should return an array of commits that match the specified filters', async () => {
      const result = [];
      mockedAxios.get.mockResolvedValue({ data: result });

      expect(
        await service.getCommitsByFilters(
          'jorgeabrahan',
          '2023-10-01',
          '2023-10-31',
          'Test',
        ),
      ).toEqual(result);
    });
  });
});
