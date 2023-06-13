import dayjs from "dayjs";

export default function getDaysJourneyArray(start: dayjs.Dayjs, end: dayjs.Dayjs): string[] {
    const daysJourneyArray: string[] = [];
    let dayCounter = 1;

    for (let date = dayjs(start); date <= dayjs(end); date = date.add(1, 'day')) {
      const formattedDate = date.format('DD.MM.YYYY');
      const dayJourney = `День ${dayCounter}. ${formattedDate}`;
      daysJourneyArray.push(dayJourney);
      dayCounter++;
    }
    //console.log(daysJourneyArray)
    return daysJourneyArray;
}
