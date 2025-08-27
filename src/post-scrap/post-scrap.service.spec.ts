import { Test, TestingModule } from '@nestjs/testing';
import { PostScrapService } from './post-scrap.service';

describe('PostScrapService', () => {
  let service: PostScrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostScrapService],
    }).compile();

    service = module.get<PostScrapService>(PostScrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
