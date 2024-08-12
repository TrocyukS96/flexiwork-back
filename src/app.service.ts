import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { DbService } from './db/db.service';

@Injectable()
export class AppService {
  constructor(private dbService: DbService) {}
}
