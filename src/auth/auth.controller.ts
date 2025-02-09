import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SessionInfo } from './session-info.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
      ) {}

    @Post('sign-up')
    @ApiCreatedResponse()
    async signUp(
        @Body() body:SignUpBodyDto,
        @Res({ passthrough: true }) res: Response,
    ){
        return await this.authService.signUp(
            body.email,
            body.password,
          );
    }

    @Post('sign-in')
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
   async signIn(
    @Body() body:SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
){
        return await this.authService.signIn(
            body.email,
            body.password,
          );
        
    }

    @Post('sign-out')
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    signOut(@Res({ passthrough: true }) res: Response) {
     
      return { message: 'Logged out successfully' };
    }

    @Get('session')
    @ApiOkResponse({
      type: GetSessionInfoDto,
    })
    @UseGuards(JwtAuthGuard)
    getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
      return session;
    }
}
