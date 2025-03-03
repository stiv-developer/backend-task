import { Module } from "@nestjs/common";
import { TaskController } from "./controllers/task.controller";
import { TaskService } from "./services/task.service";
import { PrismaModule } from "../prisma/prisma..module";

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [PrismaModule]
})
export class TaskModule{}