import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./services/usuario.service";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService],
    imports: [PrismaModule]
})
export class UsuarioModule{}