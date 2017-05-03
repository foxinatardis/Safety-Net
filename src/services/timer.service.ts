import { Injectable } from "@angular/core";
import { ITimerOptions } from '../interfaces/timerOptions.interface';

@Injectable()
export class TimerService {
    constructor() {  }

    timerActive: boolean = false;
    activeTimer;


    public startTimer(options: ITimerOptions) {

    }

    public cancelTimer() {
        clearTimeout(this.activeTimer);
        this.timerActive = false;
    }
}
