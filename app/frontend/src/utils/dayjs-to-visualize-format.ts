import dayjs from "dayjs";

export default function dayjsToVizualizeFormat(day: dayjs.Dayjs, dayNumber: number): string {
    const formattedDate = dayjs(day).format('DD.MM.YYYY');
    const dayJourney = `День ${dayNumber}. ${formattedDate}`;
    return dayJourney;
}