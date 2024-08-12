import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Post as PostModel, Prisma } from "@prisma/client";
import { PostsService } from "./posts.service";

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
  
  class DeletePostDto {
    id:number
  }
  

@Controller('/posts')
export class PostsController  {
    constructor (private readonly postsService:PostsService){}

    @Get()
    async getPosts(): Promise<GetPostsDto> {
      const posts =await this.postsService.getPosts()
      console.log('posts', posts)
      return posts
    }
  
    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
      return await this.postsService.createPost(createPostDto);
    }
  
    @Delete(':id')
    async deletePost(@Param('id') id:string): Promise<PostModel > {
      return this.postsService.deletePost((id));
    }
}