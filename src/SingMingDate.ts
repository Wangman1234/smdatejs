import {Day} from "./Day";
import {Week} from "./Week";
import {Month} from "./Month";
import {Year} from "./Year";
import {DateError} from "./DateError";
import {dayNow, toSingMingDate} from "./Functions";

export class SingMingDate {
    public day: Day
    public week: Week
    public month: Month
    public year: Year

    public constructor(year: Year | number, month: Month | number, week: Week | number, day: Day | number) {
        if (typeof year === "number") {
            this.year = new Year(year)
        } else {
            this.year = year
        }
        if (typeof month === "number") {
            this.month = new Month(month)
        } else {
            this.month = month
        }
        if (typeof week === "number") {
            this.week = new Week(week)
        } else {
            this.week = week
        }
        if (typeof day === "number") {
            this.day = new Day(day)
        } else {
            this.day = day
        }
        this.check()
    }

    public static day1() {
        return new SingMingDate(1, 1, 1, 1)
    }

    public static fromDate(dateString: String, delimiters = '/') {
        const ds = dateString.split(delimiters)
        return new SingMingDate(Number(ds[3]), Number(ds[2]), Number(ds[1]), Number(ds[0]))
    }

    public static from1(daysFrom1: number) {
        function yearToDay(days1: number, yearE: number) {
            return Number(BigInt(days1) - (BigInt(yearE) * 366n
                - BigInt(yearE) / 32n * 24n - (BigInt(yearE) + 16n) / 32n / 96n * 24n))
        }

        function checkYear(year: number, day: number) {
            return (new Year(year).leapYear && day > 342) || day > 366
        }

        let yearEstimate = Number(BigInt(daysFrom1) * 32n * 96n / 1122024n)
        let daysOtherYear = yearToDay(daysFrom1, yearEstimate - 1)
        while (yearEstimate <= 0 || checkYear(yearEstimate, daysOtherYear)) {
            yearEstimate++
            daysOtherYear = yearToDay(daysFrom1, yearEstimate - 1)
        }
        while (daysOtherYear <= 0) {
            yearEstimate--
            daysOtherYear = yearToDay(daysFrom1, yearEstimate - 1)
        }
        let year = new Year(yearEstimate)
        let bool = true
        let i = 0
        while (bool) {
            i += 1
            if (new Month(i).part == 3 && daysOtherYear <= 6) {
                bool = false
            } else if (year.leapYear && new Month(i).part == 2 && daysOtherYear <= 30) {
                bool = false
            } else bool = !((!year.leapYear || new Month(i).part == 1) && daysOtherYear <= 36)

            if (!bool) break

            if (year.leapYear && new Month(i).part == 2) {
                daysOtherYear -= 30
            } else {
                daysOtherYear -= 36
            }
        }
        let month = new Month(i)
        let week = new Week(Math.floor((daysOtherYear - 1) / 6) + 1)
        let day = new Day((daysOtherYear - 1) % 6 + 1)
        return new SingMingDate(year, month, week, day)
    }

    private check() {
        if (this.year.yYear < 1) {
            throw new DateError({name: 'DATE_SIZE_ERROR', message: "year too early"})
        }
        if (this.year.leapYear) {
            if (this.month.part == 2 && this.week.week > 5) {
                throw new DateError({name: 'DATE_SIZE_ERROR', message: "second part too big"})
            }
        }
        if (this.month.part == 3 && this.week.week > 1) {
            throw new DateError({name: 'DATE_SIZE_ERROR', message: "third part too big"})
        }
    }

    public static now() {
        return toSingMingDate(dayNow)
    }

    public toString(): string {
        return this.year.toString() + this.month.toString() + this.week.toString() + this.day.toString()
    }
}

console.log("" + SingMingDate.now())