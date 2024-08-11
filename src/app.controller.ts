import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { Post as PostModel } from '@prisma/client';

class HelloWorldDto {
  message:string
}

class PostDto {
  title:string
  description:string
}

class GetPostsDto{
  posts:PostDto[]
}

class CreatePostDto {
  title:string
  description:string
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private dbService:DbService) {}



  @Get()
  async getPosts(): Promise<GetPostsDto> {
    const posts =await this.appService.getPosts()
    console.log('posts', posts)
    return posts
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.appService.createPost(createPostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel > {
    return this.appService.deletePost({ id: Number(id) });
  }
}
