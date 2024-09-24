import { Category } from "./category";
import { v4 as uuidv4 } from "uuid";

export class Task {
  id: string;
  name: string;
  description: string = "";
  startTime: Date;
  endTime: Date | undefined;
  pauseStart: Date | undefined;
  pauseTime: number = 0;
  category: Category | undefined;

  constructor(name: string, description: string, startTime: Date, category?: Category) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.startTime = startTime;
    if (category) {
      this.category = category;
    }
  }

  static fromJSON(json: any): Task {
    const task = Object.create(Task.prototype);
    return Object.assign(task, json, {
      startTime: new Date(json.startTime),
      endTime: json.endTime ? new Date(json.endTime) : undefined,
      pauseStart: json.pauseStart ? new Date(json.pauseStart) : undefined,
      category: json.category ? Category.fromJSON(json.category) : undefined,
    });
  }

  getDuration(): number {
    if (this.endTime) {
      return this.endTime.getTime() - this.startTime.getTime() - this.pauseTime;
    } else {
      return new Date().getTime() - this.startTime.getTime() - this.pauseTime;
    }
  }
}
