---
title: "Programmatic Uploads"
date: 2014-10-03 19:11:59
tags:
  - api
  - data-source
alias: post/99071925137/index.html
---

You can use [our API](https://zenobase.com/#/api/) to add, update or remove data from Zenobase via a script. In this post, we’ll show sample code for uploading multiple events from a file to a bucket.

First, we need to obtain a special token that has to be included in all requests in order to prove that we are authorized to access our data. This token can be obtained using a simple command-line client like `wget` or `curl`, [as described here](https://zenobase.com/#/api/password-grant).

Note that a token obtained using this method expires after 31 days. To create a token that does not expire, we’d have to use the “implicit grant” method, [which is a bit more involved](https://zenobase.com/#/api/implicit-grant).

As in our [previous post](http://blog.zenobase.com/post/84362516897), where we showed how to convert a csv file into json, we’ll again use [Node.js](http://nodejs.org/), plus a module for parsing command line arguments, which can be added by running `npm install yargs`.

Finally, here’s the script that will read data from a json file ([sample file](https://gist.github.com/ejain/94388d6e0a448e6de19f)), and upload it to the specified bucket:

Need any help adapting this script to your use case? [Get in touch](mailto:hello@zenobase.com)!
