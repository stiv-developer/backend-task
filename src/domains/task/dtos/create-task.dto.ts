import { IsString, IsIn, IsNotEmpty, MinLength, MaxLength, IsDateString, IsPositive, IsInt, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3) 
  @MaxLength(100)
  @ApiProperty({ example: 'Aprender NestJS', description: 'Título de la tarea' })
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3) 
  @MaxLength(500)
  @ApiProperty({ example: 'Realizar tarea .......', description: 'Descripción de la tarea' })
  description: string;

  @IsDateString()
  @ApiProperty({ example: '2025-02-28T00:00:00.000Z', description: 'Seleccionar fecha' })
  fechaVencimiento: Date;

  @IsString()
  @IsIn(['pendiente', 'completada'])
  @ApiProperty({ example: 'pendiente', description: 'Seleccionar Estado' })
  estado:string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ example: '5', description: 'ID del usuario' })
  usuarioId: number;
}