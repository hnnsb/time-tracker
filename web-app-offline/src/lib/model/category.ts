import { v4 as uuidv4 } from "uuid";

export class Category {
  id: string | undefined;
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.id = uuidv4();
    this.name = name;
    this.color = color;
  }
}
