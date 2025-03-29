import {toChineseNumerals, years} from "./Functions";

export class Year {
    public constructor(public yYear: number) {}

    private toNamedYear(year: number): [string, string] {
        try {
            return [years[year].split(':')[0], years[year].split(':')[1]];
        } catch (Error) {
            return ["新明", toChineseNumerals(year)]
        }
    }

    private namedYear = this.toNamedYear(this.yYear)
    public monarch = this.namedYear[0]
    public year = this.namedYear[1]
    public leapYear = this.yYear % 32 == 0 || this.yYear % (96 * 32) == 3056
    public daysUntil = (366 * (this.yYear - 1)) - (24 * (Math.floor((this.yYear - 1) / 32) + Math.floor((this.yYear - 1 + 16) / (32 * 96))))
    public days = (366 * (this.yYear)) - (24 * (Math.floor(this.yYear / 32) + Math.floor((this.yYear + 16) / (32 * 96))))

    public toString(): string {
        return this.monarch + this.year + "年"
    }
}