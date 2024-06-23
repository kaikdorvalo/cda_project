import { PartialType } from '@nestjs/mapped-types';
import { CreateBadgeCategoryDto } from './create-badge-category.dto';

export class UpdateBadgeCategoryDto extends PartialType(CreateBadgeCategoryDto) {}
