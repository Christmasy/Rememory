﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Rememory.Persistance.Models;

[JsonConverter(typeof(StringEnumConverter))]
public enum TelegramState
{
    Default,
    InputVisitedPlaces,
    InputJourneyStartDate,
}