import {DateError} from "./DateError";

export class Month {
    public month: number
    public part: number

    public constructor(month:number){
        if(month > 11 || month < 1){
            throw new DateError({
                name: 'DATE_SIZE_ERROR',
                message: 'month out of range',
            })
        } else {
            this.month = month
            if (1 <= month && month <= 6){
                this.part = 1
            } else if (7 <= month && month <= 10){
                this.part = 2
            } else {
                this.part = 3
            }
        }
    }

    public toString(): string {
        return this.part + "部" + this.month + "月";
    }
}