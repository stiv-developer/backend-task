import { Body, Controller, Get, NotFoundException, Post, ValidationPipe } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    async getAllUsuarios() {
        return this.usuarioService.getAllUsuarios();
    }

    @Post()
    @ApiOperation({ summary: 'Crear Usuario' })
    async createUsuario(@Body(new ValidationPipe()) data: CreateUsuarioDto) {
        const task = await this.usuarioService.createUsuario(data);
        if (!task) {
            throw new NotFoundException(`Task not created`);
        }
        return task;
    }
}