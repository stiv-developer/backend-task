import { Module } from '@nestjs/common';
import { TaskModule } from './domains/task/task.module';
import { UsuarioModule } from './domains/usuario/usuario.module';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  imports: [TaskModule, UsuarioModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
