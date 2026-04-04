---
title: "Time Ranges"
date: 2014-10-06 22:38:00
alias: post/99352350852/index.html
---

Events in Zenobase don’t have an explicit begin and end field, just a single timestamp field. So how can time ranges be represented? There are two options:

**A.** _Set the begin as the timestamp, and store the duration._ This is the most obvious approach, but it has one drawback: You won’t be able to filter or aggregate data using the end time (because of time zones and daylight savings times, the local end time can’t be calculated reliably simply by adding the duration to the begin time).

![](nd1nkj9bEg1rqupev.png)

**B.** _Record two timestamps._ Then when filtering or aggregating events, you can specify if you want to use the lower timestamp (`timestamp$min`) or the higher timestamp (`timestamp$max`). You may still want to record an explicit duration as well, to filter or aggregate on the duration.

![](nd1nkqVJWR1rqupev.png)

Being able to aggregate on the end timestamp is especially useful when looking at sleep data: Consider this plot of average sleep durations by day, based on the begin timestamp (which sometimes falls before, and sometimes after midnight):

![](nd1olxCWmH1rqupev.png)

Here is the same plot again, but this time using the end timestamps:

![](nd1on12hVw1rqupev.png)

This is why the second approach is now being used by default when importing sleep data from services like Fitbit or Jawbone. Does this make life easier for you? Let us know!
