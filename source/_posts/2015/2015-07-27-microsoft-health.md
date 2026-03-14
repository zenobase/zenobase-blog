---
title: "Microsoft Health"
date: 2015-07-27 03:47:53
tags:
  - microsoft band
  - microsoft health
alias: post/125139509557/index.html
---

The [Microsoft HealthBand](https://www.microsoft.com/microsoft-band/en-us) (and the [Microsoft Health](https://www.microsoft.com/microsoft-health/en-us) app) is another nice option for recording self-tracking data; we now support syncing _activities_, _sleep_ and day or hour-resolution _step counts_ (incl calories burned and average heart rate) to your [zenobase.com](https://zenobase.com/) account, where you can further analyze and correlate that data with other sources.

![](tumblr_inline_ns4na6qVr01rqupev_540.png) Some notes:

*   Like Apple and Google, Microsoft has neglected to store time zone offsets, so if you travel or move across time zones, some of your data will have incorrect local times.
*   We are not retrieving begin or end locations for activities, because doing so through the current API is too expensive.
*   The current API doesn’t expose any of the [UV or GSR](https://www.microsoft.com/microsoft-band/en-us/support/hardware/sensors) data the Microsoft Band collects; hopefully that will be added soon.

If you have any questions or suggestions, [let us know](mailto:support@zenobase.com)!
