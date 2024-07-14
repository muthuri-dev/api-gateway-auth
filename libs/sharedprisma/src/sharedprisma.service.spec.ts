import { Test, TestingModule } from '@nestjs/testing';
import { SharedprismaService } from './sharedprisma.service';

describe('SharedprismaService', () => {
  let service: SharedprismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedprismaService],
    }).compile();

    service = module.get<SharedprismaService>(SharedprismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
