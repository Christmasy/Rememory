import dayjs from 'dayjs';

export class Journey {
    public id: string;
    public userId: string;
    public title: string;
    public start: dayjs.Dayjs;
    public end: dayjs.Dayjs;
  
    public constructor (id: string, userId: string, title: string, start: dayjs.Dayjs, end: dayjs.Dayjs) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.start = start;
        this.end = end;
    }
}
  