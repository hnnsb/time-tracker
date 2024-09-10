import {Category} from "@/lib/model/category";

export class Task {
    id: string | undefined;
    name: string;
    description: string = "";
    startTime: Date;
    endTime: Date | null;
    pauseStart: Date | null;
    pauseTime: number;
    email: string;
    category: Category | null;

    constructor(name, description, startTime, email, category?) {
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.email = email;
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