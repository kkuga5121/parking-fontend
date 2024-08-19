import { ILpr } from "./lpr.type";

export interface LprParking {
    id: string;
    lprId?: string;
    timeParking: string;
    timeCapture: Date;
    timeUpdate?: Date;
    alarmCount?: number;
    lprId2?: string;
    lprdata? : ILpr;
  }
  export interface LprParkingShow{
    id: string;
    license: string;
    province: string;
    timeParking: string;
    timeCapture: string;
    timeUpdate: string;
    alarm: number;
    lprId: string;
  }