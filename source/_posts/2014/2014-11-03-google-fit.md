---
title: "Google Fit"
date: 2014-11-03 18:48:00
tags:
  - google fit
alias: post/101689041097/index.html
---

[Google Fit](https://developers.google.com/fit/) is an open platform for storing fitness data. It has both an Android SDK and a Web API, which makes it easy for services like Zenobase to retrieve data on your behalf ([compared to Apple Health](http://blog.zenobase.com/post/100624681047)).

Google Fit stores data from Google apps and devices, and services like Basis, Polar or Nike+ have announced plans to store data in Google Fit as well. Of course, it remains to be seen how well this will be implemented; the only integrations we have tested so far are [Runtastic](https://www.runtastic.com/) and [Strava](http://www.strava.com/).

Google Fit has a clever, generic data model that consists of user-recorded “sessions” and separate “data streams” for every data source and data type. Google Fit has a few standard data types, as well as several built-in data streams that consolidate data from other streams, e.g. step counts.

So what data can you import from Google Fit into Zenobase right now, and how does it work?

We added a _google-activities_ task that lets you choose to retrieve either explicitly recorded exercise sessions, or automatically detected activities (which includes periods of “not moving” and “in vehicle”). To this, we add consolidated step counts and distances, as well as a starting location based on the platform’s location stream. We also look for any streams that have speed averages, calories expended or heart rate averages for the period of each activity.

![](tumblr_inline_neh7v4eJp11rqupev.png) Google Fit also supports data streams with custom data types. Handling this in a flexible manner would require more configuration, which we might decide to handle in future [similar to how we deal with the Reporter app](http://blog.zenobase.com/post/77238240850).

We don’t have any plans to support writing data back to Google Fit, as a lot of data stored in Zenobase can’t easily be mapped to Google Fit’s numbers-only data model. However, if you are a developer, you can use [our API](https://zenobase.com/#/api/) to implement a custom solution that works for you.

To get started, simply create a new bucket on [zenobase.com](https://zenobase.com/), and choose the appropriate template. Be sure to [let us know](https://twitter.com/zenobase) if there is any data we are missing, or should handle differently!

**Update:** There is now also a _google-weight_ and a _google-cardio_ task, for retrieving body weight and heart rate measurements.
