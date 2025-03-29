import fetch from 'node-fetch';
import * as fs from 'fs';
import {SingMingDate} from "./SingMingDate";

const datesURL = "https://raw.githubusercontent.com/Wangman1234/SMDate/main/datesCondensed.txt"
const cache = "./tmp/cache.csv";
export let years: Record<number, string> = {}
export async function load() {
    const datesRaw = await fetch(datesURL);
    const body = await datesRaw.text();
    fs.writeFile(cache, body, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    setYears()
}
function setYears() {
    let body = fs.readFileSync(cache, 'utf8');
    let lines = body.split('\n');
    let out: Record<number, string> = {};
    let m = 3000
    for (let line in lines) {
        if (lines[line].startsWith('#')) {
            m = Number(lines[line].replace("#", ""))
            continue
        }
        const split = lines[line].split('-')
        for (let i = Number(split[1]); i <= Number(split[2]); i++) {
            out[i] = split[0] + ":" + toChineseNumerals(i - Number(split[1]) + 1, true)
        }
    }
    years = out
}

export const day1 = new Date("1433-3-20")
export let dayNow = new Date()

export function toChineseNumerals(num:number, year: boolean = false, base: number = 10): string {
    let flag = false;
    if (num < 0) {
        flag = true;
        num = -num
    }
    if (num == 0) {
        return "〇"
    }
    if (num == 1 && year) {
        return "元"
    }
    function toCNum(smallNum:number, base: number): string {
        let nums = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
        if (base > smallNum) {
            return nums[smallNum]
        } else {
            return nums[0]
        }
    }
    function toCPlace(place:number, base: number): string {
        switch (base) {
            case 10:
                let smallVals = ["", "十", "百", "千"]
                let largeVals = ["", "万", "亿", "兆"]
                // let smallVals = [".", "a", "b", "c"]
                // let largeVals = [".", "d", "e", "f", "g", "h", "i"]
                let ap = place % 4
                let ad = place / 4
                if (ap == 0) {
                    if (ad % 2 == 1) return largeVals[1]
                    else if (ad % 4 == 2) return largeVals[2]
                    else if (ad % 8 == 4) return largeVals[3]
                    else return largeVals[0]
                } else {
                    return smallVals[ap]
                }
            default:
                return ""
        }
    }

    let str: string[] = []
    let i = 0
    while ((base ** i) <= num){
        let newNum = Math.floor(num / (base ** i))
        let part = newNum % base;
        if ((i % 4 == 0 && i != 0) || part != 0) {
            str.push(toCNum(part, base) + toCPlace(i, base))
            // str.push(part + toCPlace(i, base))
        } else str.push("")
        i++
    }
    let newStr: string[] = []
    const l = str.length
    for (let j = 0; j < l; j++) {
        newStr.push(<string>str.pop())
    }
    for (const k in newStr) {

    }
    let out = newStr.join("")
    if (flag) {
        out = "负" + out
    }
    return out
}

function datediff(first: Date, second: Date) {
    return Math.ceil((Number(second) - Number(first)) / (1000 * 60 * 60 * 24));
}
export function daysFrom1(date:Date) {
    return datediff(day1, date)
}
export function toSingMingDate(date:Date) {
    return SingMingDate.from1(daysFrom1(date))
}

load().then(() => {console.log("years loaded")})
setYears()
