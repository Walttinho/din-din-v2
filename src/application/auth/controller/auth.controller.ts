import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginAuthDto } from '../../../domain/dtos/LoginAuthDto';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get('protected')
  getProtectedResource() {
    return { message: 'This is a protected route' };
  }
}
