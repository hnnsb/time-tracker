import { Category } from "./category";
import { v4 as uuidv4 } from "uuid";

export class Task {
  id: string;
  name: string;
  description: string = "";
  startTime: Date | undefined;
  endTime: Date | undefined;
  pauseStart: Date | undefined;
  pauseTime: number = 0;
  category: Category | undefined;
  correction: number = 0;

  constructor(name: string, description: string, startTime?: Date, category?: Category) {
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
      startTime: json.startTime ? new Date(json.startTime) : undefined,
      endTime: json.endTime ? new Date(json.endTime) : undefined,
      pauseStart: json.pauseStart ? new Date(json.pauseStart) : undefined,
      category: json.category ? Category.fromJSON(json.category) : undefined,
      correction: json.correction ? json.correction : 0, // necessary because of old data saved in local storage that hasn't got this field.
    });
  }

  /**
   * Returns the time the task has been running, without pauses.
   * @returns {number}
   */
  getDuration(): number {
    if (!this.isStarted()) {
      return -1;
    }

    if (this.isPaused()) {
      // Calculate correct duration when task is paused.
      return (
        new Date().getTime() -
        this.startTime.getTime() -
        this.pauseTime -
        (new Date().getTime() - this.pauseStart.getTime()) +
        this.correction
      );
    } else if (this.isRunning()) {
      // Task is running.
      return new Date().getTime() - this.startTime.getTime() - this.pauseTime + this.correction;
    } else {
      // Task is stopped.
      return this.endTime.getTime() - this.startTime.getTime() - this.pauseTime + this.correction;
    }
  }

  /**
   * Returns true if the task is started. A started task can be paused.
   * @returns {boolean}
   */
  isStarted(): boolean {
    return this.startTime !== undefined;
  }

  /**
   * Returns true if the task is paused. A paused task can be unpaused.
   * @returns {boolean}
   */
  isPaused(): boolean {
    return this.pauseStart !== undefined;
  }

  /**
   * Returns true if the task is stopped. A stopped task cannot be unpaused.
   * A stopped task is not paused.
   * @returns {boolean}
   */
  isStopped(): boolean {
    return this.endTime !== undefined;
  }

  /**
   * Returns true if the task is running. A running task can be paused. A running task is neither
   * paused nor stopped.
   */
  isRunning(): boolean {
    return !this.isPaused() && !this.isStopped();
  }

  unpause() {
    if (!this.isPaused()) {
      throw new Error("Cannot unpause running task");
    }
    this.pauseTime += new Date().getTime() - this.pauseStart.getTime();
    this.pauseStart = undefined;
    console.debug("Resuming from pause", this.pauseTime, this.pauseStart, this.isPaused());
  }

  start() {
    if (this.startTime) {
      throw new Error("Cannot start already started task");
    }
    this.startTime = new Date();
    console.debug("Starting", this.startTime);
  }

  pause() {
    if (this.isPaused()) {
      throw new Error("Cannot pause paused task");
    }
    this.pauseStart = new Date();
    console.debug("Pausing", this.pauseTime, this.pauseStart, this.isPaused());
  }

  stop() {
    if (this.endTime) {
      throw new Error("Cannot stop already stopped task");
    }
    if (this.isPaused()) {
      this.unpause();
    }
    this.endTime = new Date();
    this.pauseStart = undefined;
  }
}
