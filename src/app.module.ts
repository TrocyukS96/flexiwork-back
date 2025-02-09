import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [DbModule, PostsModule,ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
