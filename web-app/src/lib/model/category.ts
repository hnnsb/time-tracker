export class Category {
  id: string | undefined;
  name: string;
  email: string;
  color: string;

  constructor(name, email, color) {
    this.name = name;
    this.email = email;
    this.color = color;
  }
}