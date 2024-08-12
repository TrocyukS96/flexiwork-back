import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PostsService {
    constructor(private dbService: DbService) {}

    async getPosts(): Promise<{posts:Post[]}> {
        const posts =await this.dbService.post.findMany({
          });
          return {posts}
        }
      
        async createPost(data: {
          title:string,
          description:string
        }): Promise<Post> {
          const response  =await this.dbService.post.create({
            data,
          });
      
          return response
        }
      
        async deletePost(id:string): Promise<Post> {
            console.log('where', id)
          const response = await this.dbService.post.delete({
            where:{
              id:  parseInt(id) as any
            },
          });
      
          return response
        }
}
