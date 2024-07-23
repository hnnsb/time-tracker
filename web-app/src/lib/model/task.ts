export class Task {
    id: number | undefined;
    name: string;
    description: string = "";
    startTime: Date;
    endTime: Date | null;
    pauseStart: Date | null;
    pauseTime: number;
    email: string;

    constructor(name, description, startTime, email) {
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.email = email;

        this.endTime = null;
        this.pauseStart = null;
        this.pauseTime = 0;
    }
}