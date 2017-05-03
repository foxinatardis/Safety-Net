import { INet } from './net.interface';
import { CustomMessage }from './customMessage.interface';

export interface ITimerOptions {
    net: INet,
    message: CustomMessage,
    minutes: number,
    hours: number
}
