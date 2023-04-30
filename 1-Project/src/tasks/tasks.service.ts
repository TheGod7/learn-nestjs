import { Injectable } from '@nestjs/common';
import { Tasks, taskStatus } from './tasks.entity';
import { v4 } from 'uuid';
import { UpdateTasksDTO } from './dto/task.dto';
@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];
  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task = { id: v4(), title, description, status: taskStatus.PENDING };
    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string) {
    console.log(this.tasks.filter((t) => t.id !== id));
    this.tasks == this.tasks.filter((t) => t.id !== id);
  }
  getTaskById(id: string) {
    return this.tasks.find((d) => d.id === id);
  }
  updateTask(id: string, updateFields: UpdateTasksDTO) {
    const task = this.getTaskById(id);
    const update = Object.assign(task, updateFields);

    this.tasks = this.tasks.map((m) => (m.id === id ? update : task));

    return update;
  }
}
