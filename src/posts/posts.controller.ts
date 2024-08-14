import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Post as PostModel, Prisma } from "@prisma/client";
import { PostsService } from "./posts.service";
import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";

class PostDto {

    title:string
    description:string
  }

class GetPostsDto{
  @ApiProperty()
    posts:PostDto[]
  }
  
  class CreatePostDto {
    title:string
    description:string
  }
  
  class DeletePostDto {
    id:number
  }
  

@Controller('posts')
export class PostsController  {
    constructor (private readonly postsService:PostsService){}

    @Get('')
    @ApiOkResponse({
        type:GetPostsDto
      })
    async getPosts(): Promise<GetPostsDto> {
      const posts =await this.postsService.getPosts()
      console.log('posts', posts)
      return posts
    }
  
    @Post('')
    async createPost(@Body() createPostDto: CreatePostDto) {
      return await this.postsService.createPost(createPostDto);
    }
  
    @Delete(':id')
    async deletePost(@Param('id') id:string): Promise<PostModel > {
      return this.postsService.deletePost((id));
    }
}