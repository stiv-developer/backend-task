import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/domains/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';

import { UsuarioEntity } from "src/domains/usuario/entities/usuario.entity";

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<UsuarioEntity | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email }
    });

    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return UsuarioEntity.fromObject(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { token },
    });

    return { token };
  }

}