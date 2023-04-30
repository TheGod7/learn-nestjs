import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTasksDTO, createTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() newTask: createTaskDTO) {
    return this.tasksService.createTask(newTask.title, newTask.description);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateFields: UpdateTasksDTO) {
    return this.tasksService.updateTask(id, updateFields);
  }
}
