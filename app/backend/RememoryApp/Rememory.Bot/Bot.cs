namespace Rememory.Bot;
using System;
using System.Threading;
using Telegram.Bot;
using Telegram.Bot.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
using Update = Telegram.Bot.Types.Update;
using SimpleInjector;

public class UIHandler
{
    #region Commands

    private const string StartCommand = "/start";
    private const string AddJourneyCommand = "/addjourney";
    private const string CurrentDayCommand = "/currentday";
    private const string HelpCommand = "/help";
    private const string SiteCommand = "/gotosite";

    #endregion

    #region Calendar
    public enum DayName
    {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
    public class Day
    {
        public Day(DayName name, ushort number)
        {
            Name = name; Number = number;
        }
        public DayName Name { get; set; }
        public ushort Number { get; set; }
    }
    public enum MonthName
    {
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    }
    public class Month
    {
        public Month(MonthName monthName, uint year)
        {
            this.Name = monthName;
            this.Year = year;
            var leapyear = this.Year % 4 == 0;
            var days = this.Name == MonthName.February ? (leapyear ? 29 : 28) : (this.Name == MonthName.April || this.Name == MonthName.June || this.Name == MonthName.September || this.Name == MonthName.November ? 30 : 31);
            this.Days = new Day[days];
            var firstday = year * 365 + (leapyear ? -1 : 0) + ((year - (year % 4)) / 4) - ((year - (year % 400)) / 400) + 4;
            var month = (int)monthName;
            firstday += month < 1 ? 0 : 31;
            firstday += month < 2 ? 0 : (leapyear ? 29 : 28);
            firstday += month < 3 ? 0 : 31;
            firstday += month < 4 ? 0 : 30;
            firstday += month < 5 ? 0 : 31;
            firstday += month < 6 ? 0 : 30;
            firstday += month < 7 ? 0 : 31;
            firstday += month < 8 ? 0 : 31;
            firstday += month < 9 ? 0 : 30;
            firstday += month < 10 ? 0 : 31;
            firstday += month < 11 ? 0 : 30;
            firstday %= 7;
            for (int i = 0; i < this.Days.Length; i++)
                this.Days[i] = new Day((DayName)((i + firstday) % 7), (ushort)(i + 1));
        }
        public uint Year { get; set; }
        public MonthName Name { get; set; }
        public Day[] Days { get; set; }
        public ushort Weeks
        {
            get
            {
                var days = (int)this.Days[0].Name + this.Days.Length - 1;
                return (ushort)(((days - (days % 7)) / 7) + (days % 7 > 0 ? 1 : 0));
            }
        }
    }
    
    public static InlineKeyboardButton[][] CreateCalendar(Month mon)
    {
        var calendar = new InlineKeyboardButton[mon.Weeks + 3][];
        var pos = 0;
        calendar[0] = new InlineKeyboardButton[1] { InlineKeyboardButton.WithCallbackData($"{mon.Name} {mon.Year}", $"year {mon.Year}") };
        var days = new[] { "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" };
        calendar[1] = new InlineKeyboardButton[7];
        for (int i = 0; i < 7; i++)
            calendar[1][i] = InlineKeyboardButton.WithCallbackData(days[i], $"{(DayName)i}");
        for (int i = 2; i < mon.Weeks + 2; i++)
        {
            calendar[i] = new InlineKeyboardButton[7];
            for (int j = 0; j < 7; j++)
            {
                if (pos < mon.Days.Length)
                {
                    if ((int)mon.Days[pos].Name == j)
                    {
                        calendar[i][j] = InlineKeyboardButton.WithCallbackData($"{mon.Days[pos].Number}", $"{mon.Days[pos].Name}, {mon.Name} {mon.Days[pos].Number}");
                        pos++;
                    }
                    else calendar[i][j] = InlineKeyboardButton.WithCallbackData("*", "Empty day");
                }
                else calendar[i][j] = InlineKeyboardButton.WithCallbackData("*", "Empty day");
            }
        }
        calendar[calendar.Length - 1] = new InlineKeyboardButton[2];
        var previousmonth = mon.Name == MonthName.January ? MonthName.December : mon.Name - 1;
        var nextmonth = mon.Name == MonthName.December ? MonthName.January : mon.Name + 1;
        var previousyear = previousmonth == MonthName.December ? mon.Year - 1 : mon.Year;
        var nextyear = nextmonth == MonthName.January ? mon.Year + 1 : mon.Year;
        calendar[calendar.Length - 1][0] = InlineKeyboardButton.WithCallbackData($"{previousmonth}", $"month {previousyear} {((ushort)previousmonth)}");
        calendar[calendar.Length - 1][1] = InlineKeyboardButton.WithCallbackData($"{nextmonth}", $"month {nextyear} {((ushort)nextmonth)}");
        return calendar;
    }
    public static InlineKeyboardButton[][] CreateCalendar(uint year)
    {
        var keyboard = new InlineKeyboardButton[6][];
        keyboard[0] = new InlineKeyboardButton[1]{ InlineKeyboardButton.WithCallbackData($"{year}", $"Year {year}") };
        for (int i = 1, n = 0; i < 5; i++)
        {
            keyboard[i] = new InlineKeyboardButton[3];
            for (int j = 0; j < 3; j++, n++)
            {
                var month = (MonthName)n;
                keyboard[i][j] = InlineKeyboardButton.WithCallbackData(text:$"{month}",   callbackData:$"month {year} {n}");
            }
        }
        keyboard[5] = new InlineKeyboardButton[2]{
            InlineKeyboardButton.WithCallbackData($"{year - 1}",$"year {year - 1}"),
            InlineKeyboardButton.WithCallbackData($"{year + 1}",$"year {year + 1}")
        };
        return keyboard;
    }
    
    private void OnCallbackQuery(CallbackQuery query)
    {
        var cbargs = query.Data.Split(' ');
        switch (cbargs[0])
        {
            case "month":
                var month = new Month((MonthName)Enum.Parse(typeof(MonthName), cbargs[2]), uint.Parse(cbargs[1]));
                inputDate += month.Year + "." + ((int) month.Name + 1);
                var mkeyboard = new InlineKeyboardMarkup(CreateCalendar(month));
                client.EditMessageReplyMarkupAsync(chatId:query.Message.Chat.Id, messageId:query.Message.MessageId, replyMarkup:mkeyboard);
                break;
            case "year":
                var ykeyboard = new InlineKeyboardMarkup(CreateCalendar(uint.Parse(cbargs[1])));
                client.EditMessageReplyMarkupAsync(chatId:query.Message.Chat.Id, messageId:query.Message.MessageId, replyMarkup:ykeyboard);
                break;
            default:
                client.AnswerCallbackQueryAsync(callbackQueryId:query.Id);
                var q = query.Data.Split();
                if (q[0]=="Empty") break;
                inputDate += "." + q[2];
                if (state == "journey end date")
                {
                    client.EditMessageTextAsync(chatId: query.Message.Chat.Id, messageId: query.Message.MessageId,
                        text: "Дата начала поездки: "+inputDate);
                    state = "success add journey";
                    var rm = new InlineKeyboardMarkup(CreateCalendar(2023));
                    SendTextMessage(query.Message.Chat, "Выберите дату конца поездки", rm);
                    inputDate = "";
                    journeyAdd.dateStart = inputDate;
                }
                else if (state == "success add journey")
                {
                    client.EditMessageTextAsync(chatId: query.Message.Chat.Id, messageId: query.Message.MessageId,
                        text: "Дата конца поездки: "+inputDate);
                    state = "";
                    journeyAdd.dateEnd = inputDate;
                    SendTextMessage(query.Message.Chat, "Поездка успешно создана!");
                    var telegramUserId = query.From.Id;
                    Console.WriteLine("Добавляю в базу " + journeyAdd.name + " " + journeyAdd.dateStart + " " + journeyAdd.dateEnd);
                    inputDate = "";
                }
                break;
        }
    }

    #endregion
    
    private readonly TelegramBotClient client;
    private string state = "";
    private Journey journeyAdd;
    private DayDescription day;
    public string inputDate = "";

    public class Journey
    {
        public string name;
        public string dateStart;  // DateTime
        public string dateEnd;
        public Journey(string name)
        {
            this.name = name;
        }
    }
    
    public class DayDescription
    {
        public DateTime day;
        public string dayPlaces;  // DateTime
        public string dayDescription;
        public DayDescription(DateTime day, string dayPlaces)
        {
            this.day = day;
            this.dayPlaces = dayPlaces;
        }
    }

    public UIHandler(TelegramBotClient client)
    {
        this.client = client;
    }
    
    public async void SendTextMessage(Chat chat, string text, IReplyMarkup replyMarkup = null) =>
        await client.SendTextMessageAsync(chat, text, replyMarkup: replyMarkup);
    
    public void HandleUpdate(ITelegramBotClient client, Update update, CancellationToken cancellationToken)
    {
        try
        {
            if (update.Type == UpdateType.Message)
            {
                var messageText = update.Message.Text;
                var telegramUser = update.Message.From;
                var chat = update.Message.Chat;
                if (messageText == StartCommand)
                {
                    SendTextMessage(chat, "Привет! Я - Rememory Travel bot. Чтобы увидеть команды нажми на кнопку “меню”");
                    state = "";
                }
                else if (messageText == SiteCommand)
                {
                    var keyb = new InlineKeyboardButton("https://ulearn.me/");
                    keyb.Url = "https://ulearn.me/";
                    SendTextMessage(chat, "Для перехода на сайт нажмите кнопку", new InlineKeyboardMarkup(keyb));
                }
                else if (messageText == AddJourneyCommand)
                {
                    SendTextMessage(chat, "Введите название поездки. Можно использовать название страны или города, куда отправляетесь");
                    journeyAdd = new Journey(messageText);
                    state = "journey start date";
                }
                else if (messageText == CurrentDayCommand)
                {
                    var currentDay = update.Message.Date;
                    state = "current day places";  //next bot message will be journey start date
                    SendTextMessage(chat, "today is: "+currentDay);
                }
                else if (messageText == HelpCommand)
                {
                    SendTextMessage(chat, "Привет! Я - rememory bot... Чтобы увидеть команды нажми на кнопку “меню”");
                    state = "";
                }
                else if (state != "")
                {
                    if (state == "current day places")
                    {
                        state = "current day impress";
                        SendTextMessage(chat, "Какие места вы посетили?");
                    }
                    else if (state == "current day impress")
                    {
                        day = new DayDescription(DateTime.Today, messageText);
                        state = "current day success";
                        SendTextMessage(chat, "Опишите ваши впечатления");
                    }
                    else if (state == "current day success")
                    {
                        day.dayDescription = messageText;
                        state = "";
                        SendTextMessage(chat, "Ваш ответ сохранён");
                        Console.WriteLine(day.day + " " + day.dayPlaces + " " + day.dayDescription);
                    }
                    else if (state == "journey start date")
                    {
                        inputDate = "";
                        state = "journey end date";
                        var rm = new InlineKeyboardMarkup(CreateCalendar(2023));
                        SendTextMessage(chat, "Выберите дату начала поездки", rm);
                    }
                }
                else SendTextMessage(chat, "Я тебя нэ панимаЦ!");
            }
            else if (update.Type == UpdateType.CallbackQuery)
            {
                OnCallbackQuery(update.CallbackQuery);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
    
    public void HandleError(ITelegramBotClient client, Exception exception, CancellationToken cancellationToken)
    {
        // throw exception;
    }
}

class Program
{
    public static string token = "6155288247:AAGiHFris19Hf4Xk014zehTvSJKdlB0KSdw";
    public static void RegisterAll(Container container)
    {
        container.RegisterSingleton<TelegramBotClient>(
            () => new TelegramBotClient(token));
        container.RegisterSingleton<UIHandler>();
    }
    
    static void Main(string[] args)
    {
        var container = new Container();
        RegisterAll(container);
        container.Verify();
        var client = container.GetInstance<TelegramBotClient>();
        var updateHandler = container.GetInstance<UIHandler>();
        var cts = new CancellationTokenSource();
        var receiverOptions = new ReceiverOptions();
        client.StartReceiving(
            updateHandler.HandleUpdate,
            updateHandler.HandleError,
            receiverOptions,
            cts.Token);
        Console.ReadLine();
        cts.Cancel();
    }
}
