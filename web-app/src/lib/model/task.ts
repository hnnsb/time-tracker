export interface Task {
    id: number | undefined;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date | null | undefined;
    userId: any;
}