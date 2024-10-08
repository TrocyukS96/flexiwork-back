import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './db/db.service';

class HelloWorldDto {
  message:string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private dbService:DbService) {}

  @Get()
  async getPosts(): Promise<string> {
    return 'Hello world!!!'
  }
}
