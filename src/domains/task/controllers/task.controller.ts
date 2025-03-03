import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update.task.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las tareas' })
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Get('/user/:id')
    @ApiOperation({ summary: 'Obtener todas las tareas por ID de usuario' })
    async getAllTaskById(@Param('id') id:number){
        return this.taskService.getAllTasksByUserId(Number(id))
    }

    @Post()
    @ApiOperation({ summary: 'Registrar tarea' })
    async createTask(@Body(new ValidationPipe()) data: CreateTaskDto) {
        const task = await this.taskService.createTask(data);
        if (!task) {
            throw new NotFoundException(`Task not created`);
        }
        return task;
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener tarea por ID' })
    async getTaskById(@Param('id') id: string) {
        const taskfound = await this.taskService.getTaskById(Number(id));
        if (!taskfound) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return taskfound;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar tarea' })
    async deleteTask(@Param('id') id: string) {
        const taskfound = await this.taskService.getTaskById(Number(id));
        if (!taskfound) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return await this.taskService.deleteTask(Number(id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar tarea' })
    async updateTask(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateTaskDto) {
        
        const taskFound = await this.taskService.getTaskById(Number(id));
        if (!taskFound) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return this.taskService.updateTask(Number(id), data);
    }
}