---
title: "Apple Health"
date: 2014-10-22 00:07:00
tags:
  - api
  - healthkit
alias: post/100624681047/index.html
---

![](ndtjxxZ6nx1rqupev.png)

[Apple Health](https://www.apple.com/ios/whats-new/health/) stores health and fitness data from different apps in a single place on iOS 8. It’s already supported by several dozen popular apps. But how can you get hold of this data to do your own analyses? The options are:

1.  Create your own app, using the iOS [HealthKit API](https://developer.apple.com/healthkit/) (sorry, no Web API).
2.  Use the [QS Access](http://blog.zenobase.com/post/109071607752) or [Hipbone](http://blog.zenobase.com/post/143121853082) apps.
3.  Export the data from the Health app, and figure out how to process it.

In this post, we’ll show how to process files exported from the Health app with a simple NodeJS script, similar to in [this previous post](http://blog.zenobase.com/post/84362516897), where we showed how to convert CSV files to JSON files that can be imported into [Zenobase](https://zenobase.com/) for further analysis.

Before getting started, let’s have a look at a sample file exported from the Health app:

Some caveats:

*   Despite what the header of the file implies, it’s not a well-formed XML document (maybe SGML?), so we’ll need to use an XML parser that is “lenient” (a.k.a. “non-strict”).
*   Apple does not store time zones or even time zone offsets. When exporting, the Health app uses the current time zone offset to format the timestamps. In consequence, the timestamps differ depending on when the export was done (i.e. during or outside of daylight savings time), and where it was done (i.e. the current time zone)…
*   Some of the data appears to be aggregated already, e.g. at the day level.

Following is the script we’ll use to process this file, and output JSON. You’ll have to tweak it to suit your needs; fields and units supported in Zenobase are documented [here](https://zenobase.com/#/api/create-event).

After installing the required modules with `npm install sax saxpath xml2js moment`, running `node export.js export.json` outputs this file:

This file can be imported into Zenobase: Create a new bucket using the default template, chose _Import_ from the drop-down menu, and once the data is imported, add and remove widgets until the dashboard looks [something like this](https://zenobase.com/#/buckets/h0h8999mmb/):

![Dashboard](ndthc4XyD71rqupev.png)

**Credits:** Thanks to [@eramirez](https://twitter.com/eramirez) for providing us with sample data for testing!

.gist {width:500px !important;} .gist-file .gist-data {max-height: 500px;max-width: 500px;}
