import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TaskEntity } from "../entities/task.entity";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update.task.dto";

@Injectable()
export class TaskService {

    constructor(
        private prisma: PrismaService
    ) { }

    async getAllTasks(): Promise<TaskEntity[]> {
        try {
            const tasks = await this.prisma.task.findMany();
            return tasks.map(task => TaskEntity.fromObject(task));
        } catch (error) {
            throw new BadRequestException('Error retrieving tasks');
        }
    }

    async getAllTasksByUserId(usuarioId: number): Promise<TaskEntity[]> {
        try {
        const tasks = await this.prisma.task.findMany({
            where: {
                usuarioId: usuarioId,
            },
        });

        return tasks.map(task => TaskEntity.fromObject(task));

        }catch (error) {
            throw new BadRequestException(`Error retrieving task with ID ${usuarioId}`);
        }
    }

    async getTaskById(id: number): Promise<TaskEntity> {
        try {
            const task = await this.prisma.task.findUnique({ where: { id } });
            if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

            return TaskEntity.fromObject(task);
        } catch (error) {
            throw new BadRequestException(`Error retrieving task with ID ${id}`);
        }
    }

    async createTask(data: CreateTaskDto): Promise<TaskEntity> {
        try {
            const newTask = await this.prisma.task.create({ data });
            return TaskEntity.fromObject(newTask);
        } catch (error) {
            throw new BadRequestException('Error creating task');
        }
    }

    async updateTask(id: number, data: Partial<UpdateTaskDto>): Promise<TaskEntity> {
        try {
            const existingTask = await this.prisma.task.findUnique({ where: { id } });
            if (!existingTask) throw new NotFoundException(`Task with ID ${id} not found`);

            const updatedTask = await this.prisma.task.update({ where: { id }, data });
            return TaskEntity.fromObject(updatedTask);
        } catch (error) {
            throw new BadRequestException(`Error updating task with ID ${id}`);
        }
    }

    async deleteTask(id: number): Promise<TaskEntity> {
        try {
            const existingTask = await this.prisma.task.findUnique({ where: { id } });
            if (!existingTask) throw new NotFoundException(`Task with ID ${id} not found`);

            const deletedTask = await this.prisma.task.delete({ where: { id } });
            return TaskEntity.fromObject(deletedTask);
        } catch (error) {
            throw new BadRequestException(`Error deleting task with ID ${id}`);
        }
    }
}