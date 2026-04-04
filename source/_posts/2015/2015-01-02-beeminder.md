---
title: "Beeminder"
date: 2015-01-02 08:35:00
tags:
  - incentives
alias: post/106888206432/index.html
---

Zenobase helps collect and analyze data, but there are no badges or other incentives to help you keep your New Year’s resolutions. Fortunately, there are several services that can be used for that. [Beeminder](https://www.beeminder.com/), for example, lets you pledge money for a goal–a powerful motivation for many people (if you fail, they keep your money).

Beeminder integrates with a few services like Fitbit and even Zapier, but we used [Beeminder’s API](https://www.beeminder.com/api) to integrate Beeminder with Zenobase, which opens up quite a few more options. Here’s how it works:

**1.** Create a goal in Beeminder. For example, our goal may be to spend a total of at least one hour at the gym every week (this is what Beeminder calls a “Do More” goal).

**2.** Go to one of your existing buckets in Zenobase, or create a new bucket for any of the supported data sources. For tracking where we spend our time, the [Moves app](https://moves-app.com/) is a good choice.

**3.** Add a “beeminder” task to the bucket. Enter the name of the Beeminder goal, whether to count events (the default) or add up the values from a field, and whether to filter the data. For our gym example, we choose the “duration” field, and filter on “tag:Gym”.

![Create Task Dialog](nhji96TfMH1rqupev.png) Zenobase will now update your goal whenever the bucket is refreshed (buckets can be set to refresh automatically, if you are on a paid plan). Make sure beeminder is the last task in the list.

Here’s our “gym” goal after it has been updated from Zenobase:

![Pretty Lines](nhji4gSAXD1rqupev.png) Other goals that could be automated via Zenobase:

*   Go to the gym at least 3x a week, only counting visits that last at least 1h (Moves app; filter on “duration:\[1h..)”).
*   Don’t spend more than half an hour per day in coffee shops, unless traveling (Moves app; report duration, filter on e.g. “location:47.443,-122.648,47.767,-121.998”).
*   Go to bed before midnight at least 5x a week (any supported sleep tracker; filter on “timestamp$min.hour\_of\_day:\[20..\*)”).
*   Remember to take 1000 IU of Vitamin D per day ([Trackthisforme](http://www.trackthisfor.me/)).
*   Drive less than 10mi per day, excluding weekends ([Automatic](https://www.automatic.com/); report distance, filter on “timestamp.day\_of\_week:\[1..5\]”).
*   Spend no more than 8h per day on the computer when the weather is nice ([RescueTime](https://www.rescuetime.com/) + Moves + Forecast; exercise for the reader)…

Other ideas or need help? [Get in touch](mailto:support@zenobase.com), or [discuss on the Beeminder forum](http://forum.beeminder.com/t/zeeminding/368).
