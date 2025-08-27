import { Test, TestingModule } from '@nestjs/testing';
import { PostScrapController } from './post-scrap.controller';
import { PostScrapService } from './post-scrap.service';

describe('PostScrapController', () => {
  let controller: PostScrapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostScrapController],
      providers: [PostScrapService],
    }).compile();

    controller = module.get<PostScrapController>(PostScrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
