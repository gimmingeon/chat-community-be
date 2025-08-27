import { PartialType } from '@nestjs/mapped-types';
import { CreatePostScrapDto } from './create-post-scrap.dto';

export class UpdatePostScrapDto extends PartialType(CreatePostScrapDto) {}
