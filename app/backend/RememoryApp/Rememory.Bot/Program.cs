using Microsoft.Extensions.Options;
using Rememory.Bot;
using Rememory.Bot.Services;
using Rememory.Persistance;
using Rememory.Persistance.Client;
using Rememory.Persistance.Repositories.DayRepository;
using Rememory.Persistance.Repositories.JourneyRepository;
using Rememory.Persistance.Repositories.UserRepository;
using Telegram.Bot;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        services.Configure<DatabaseConfig>(
            context.Configuration.GetSection("DatabaseConfig"));
        services.AddSingleton<IDatabaseClient, DatabaseClient>();
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<IJourneyRepository, JourneyRepository>();
        services.AddSingleton<IDayRepository, DayRepository>();
        
        services.Configure<BotConfiguration>(
            context.Configuration.GetSection("BotConfiguration"));
        
        // Register named HttpClient to benefits from IHttpClientFactory
        // and consume it with ITelegramBotClient typed client.
        // More read:
        //  https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-5.0#typed-clients
        //  https://docs.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests
        services.AddHttpClient("telegram_bot_client")
            .AddTypedClient<ITelegramBotClient>((httpClient, sp) =>
            {
                var botConfiguration = sp.GetService<IOptions<BotConfiguration>>()!.Value;
                var options = new TelegramBotClientOptions(botConfiguration.BotToken!);
                return new TelegramBotClient(options, httpClient);
            });

        services.AddScoped<UpdateHandler>();
        services.AddScoped<ReceiverService>();
        services.AddHostedService<PollingService>();
    })
    .Build();

await host.RunAsync();