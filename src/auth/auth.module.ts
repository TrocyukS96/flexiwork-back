import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { JwtStrategy } from './jwt.stategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    UsersModule, 
    JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, PasswordService,JwtStrategy],
  exports:[JwtModule,PassportModule]
})
export class AuthModule {}
