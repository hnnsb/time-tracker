export interface Task {
    id: number | undefined;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date | null | undefined;
    pauseStart: Date | null | undefined;
    pauseTime: number;
    email: string;
}