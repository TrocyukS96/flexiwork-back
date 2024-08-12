import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [PostsService,DbService],
  controllers: [PostsController],
})
export class PostsModule {}
