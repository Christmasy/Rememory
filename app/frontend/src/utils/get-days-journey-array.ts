import dayjs from "dayjs";

export default function getDaysJourneyArray(start: dayjs.Dayjs, end: dayjs.Dayjs): string[] {
    const daysJourneyArray: string[] = [];

    for (let date = dayjs(start); date <= dayjs(end); date = date.add(1, 'day')) {
      daysJourneyArray.push(date.toString());
    }
    return daysJourneyArray;
}
