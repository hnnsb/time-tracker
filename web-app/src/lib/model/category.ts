import { v4 as uuidv4 } from "uuid";

export class Category {
  id: string;
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.id = uuidv4();
    this.name = name;
    this.color = color;
  }

  static fromJSON(json: any): Category {
    const category = Object.create(Category.prototype);
    return Object.assign(category, json);
  }
}
