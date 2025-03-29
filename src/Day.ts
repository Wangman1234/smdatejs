import {DateError} from "./DateError";

export class Day{
    public day: number

    public constructor(weekday:number){
        if(weekday > 6 || weekday < 1){
            throw new DateError({
                name: 'DATE_SIZE_ERROR',
                message: 'weekday out of range',
            })
        } else {
            this.day = weekday
        }
    }
}