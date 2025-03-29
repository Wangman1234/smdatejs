import {DateError} from "./DateError";

export class Week{
    public week: number

    public constructor(week:number){
        if(week > 6 || week < 1){
            throw new DateError({
                name: 'DATE_SIZE_ERROR',
                message: 'week out of range',
            })
        } else {
            this.week = week
        }
    }

    public toString(): string {
        return this.week + "期";
    }
}