import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { Post as PostModel } from "@prisma/client";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

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
    @UseGuards(JwtAuthGuard)
    async getPosts(): Promise<GetPostsDto> {
      const posts =await this.postsService.getPosts()
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