import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
    constructor(private dbService: DbService) {}

    findByEmail(email:string): Promise<User | null>{
        return this.dbService.user.findFirst({
            where:{email}
        })
    }

    create(email:string,hash:string,salt:string){
        return this.dbService.user.create({
            data:{email,salt,hash}
        })
    }
}
