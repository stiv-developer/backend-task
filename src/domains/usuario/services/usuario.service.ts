import { BadRequestException, Injectable } from "@nestjs/common";
// import { PrismaService } from "src/domains/prisma/prisma.service";
import { PrismaService } from '../../prisma/prisma.service';
import { UsuarioEntity } from "../entities/usuario.entity";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {

    constructor(
        private prisma: PrismaService
    ) { }

    async getAllUsuarios(): Promise<UsuarioEntity[]> {
        try {
            const usuarios = await this.prisma.usuario.findMany();
            return usuarios.map(usuarios => UsuarioEntity.fromObject(usuarios));
        } catch (error) {
            throw new BadRequestException('Error retrieving usuarios');
        }
    }

    async createUsuario(data: CreateUsuarioDto): Promise<UsuarioEntity> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10)

            const newUsuario = await this.prisma.usuario.create({ data:{
                ...data,
                password: hashedPassword
            } });
            return UsuarioEntity.fromObject(newUsuario);
        } catch (error) {
            throw new BadRequestException('Error creating usuario');
        }
    }

}