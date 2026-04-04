---
title: "DIY Spreadsheet Importer"
date: 2014-04-30 22:46:00
tags:
  - json
  - javascript
  - csv
  - API
alias: post/84362516897/index.html
---

Zenobase can export and import its own files (in JSON format) from and to any bucket, but how can we import arbitrary spreadsheets?

Most spreadsheets can be converted to a suitable JSON file with a little bit of scripting. We’ll use this spreadsheet as an example:

First, download and install [Node.js](http://nodejs.org/), which lets us run scripts written in JavaScript on the command line. Then run `npm install moment-timezone ya-csv` to install the [Moment.js](http://momentjs.com/docs/) module (for handling dates and times), and the [ya-csv](https://github.com/koles/ya-csv) module (for reading CSV files) into the current directory.

The following script will read the spreadsheet above, and convert it to a JSON file:

Run this script with `node drink_convert.js < drink.csv > drink.json` to get this result:

The `drink.json` file can be imported into any existing bucket. You might want to add some widgets, e.g. to show the total volume drunk over time, or the average volume drunk by day of week.

![](n4v825A2AG1rqupev.png)

To adapt the script to your data, check out the [list of supported fields and units in the API docs](https://zenobase.com/#/api/create-event). If you need any help, please [get in touch](mailto:support@zenobase.com)!
