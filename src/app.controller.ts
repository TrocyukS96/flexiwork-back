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
  async getHello(): Promise<HelloWorldDto> {
    const users =await this.dbService.user.findMany({})
    console.log('users', users)
    return {message:this.appService.getHello()}
  }
}
