---
title: "SunSprite"
date: 2015-04-02 15:53:00
tags:
  - data-source
  - iot
alias: post/115303836797/index.html
---

[SunSprite](https://www.sunsprite.com/) is a small wearable device that records how much light you are exposed to throughout the day. This data can be quite useful, especially when combined with other data like sleep or mood.

![](nm6rumELXK1rqupev_540.jpg)

To use this data in Zenobase, simply [export it from SunSprite](https://www.sunsprite.com/mydata/) (as a CSV file), create a new bucket using the _SunSprite_ template, and import the file.

You can set a _tag_ to add to each record, and your time zone (SunSprite currently doesn’t keep track of this).

Lux values are stored as _light_, averaged by hour. Negative values like -56.5 (an artifact of SunSprite’s analog-to-digital converter) are treated as 0. The [UV index](http://en.wikipedia.org/wiki/Ultraviolet_index) values are mapped to _ratings_ (0 is 100%, and 10 is 0%).

Here’s what your dashboard might look like:

![](nm6r8raOaZ1rqupev_540.png)

You can always add more data via the _Import_ menu item.

If you want to correlate this data with data from another source, [we’ll be glad to show you how!](mailto:hello@zenobase.com)
