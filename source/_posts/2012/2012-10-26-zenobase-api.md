---
title: "Zenobase API"
date: 2012-10-26 02:41:00
tags:
  - announcements
  - api
alias: post/34338606275/index.html
---

Zenobase can now be accessed through a RESTful API. Possible uses for this API include mobile data entry apps, and integration with other services.

Here’s an example from the docs that shows how to add an event to a bucket:

```
curl -i -X POST 'https://api.zenobase.com/buckets/v7jg3l5ibc/' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: zeno id="args4iqh2c", hash="e7975e8bb6eabc3ef567f519fafe733339b99aca"' \
  -d '{
    "timestamp" : [ "20121024T13:10:00.000-07:00" ],
    "tag" : [ "lunch", "thai" ],
    "rating" : [ 80 ],
    "resource" : [
      {
        "title" : "Tup Tim Thai",
        "url" : "https://plus.google.com/116718770873870194999"
      }
    ]
  }'
```

Check out [the API documentation](https://zenobase.com/#/api/), and send us your feedback!
