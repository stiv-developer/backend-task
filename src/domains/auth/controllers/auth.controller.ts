import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar Sesión' })
    async login(@Body() { email, password }: { email: string; password: string }) {
        return this.authService.login(email, password);
    }

}