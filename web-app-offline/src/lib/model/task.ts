import { Category } from "./category";

export class Task {
  id: string | undefined;
  name: string;
  description: string = "";
  startTime: Date;
  endTime: Date | null;
  pauseStart: Date | null;
  pauseTime: number;
  category: Category | null;

  constructor(name, description, startTime, category?) {
    this.name = name;
    this.description = description;
    this.startTime = startTime;
    if (category) {
      this.category = category;
    } else {
      this.category = null;
    }

    this.endTime = null;
    this.pauseStart = null;
    this.pauseTime = 0;
  }
}
