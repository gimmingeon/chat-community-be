import { Test, TestingModule } from '@nestjs/testing';
import { PostHashtagService } from './post-hashtag.service';

describe('PostHashtagService', () => {
  let service: PostHashtagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostHashtagService],
    }).compile();

    service = module.get<PostHashtagService>(PostHashtagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
