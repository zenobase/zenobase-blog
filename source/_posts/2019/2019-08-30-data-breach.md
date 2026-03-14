---
title: "Data Breach"
date: 2019-08-30 18:25:49
alias: post/187378238312/index.html
---

Earlier this week, we discovered that some of our internal data could be accessed by anyone who knew where to look. This likely happened (ironically) during a move to a more secure setup.

Other than contacting our users, the most urgent damage control task was to ensure that tokens issued by third-party services granting access to their user’s data were revoked as soon as possible.

Following is the status of every service we integrate with. Services in (brackets) use expiring tokens, so are less critical (since the code required to refresh these tokens was not exposed). Highlighted services remain outstanding…

| Service | Status |
| --- | --- |
| **Automatic** | no response to support request |
| Beeminder | resolved through support request within 24h |
| Dropbox | resolved through management console |
| **FitBark** | no response to support request |
| (Fitbit) | resolved through management console |
| Foursquare | resolved through management console |
| Goodreads | resolved through management console |
| **(Google Fit)** | no response to support request |
| (Hexoskin) | resolved through support request within 24h |
| (iHealth) | response after 2 months, no action |
| Last.fm | resolved through support request within 24h |
| **(MapMyFitness)** | no response to support request |
| (Microsoft Health) | resolved through management console |
| **Misfit** | no response to support request |
| (Netatmo) | resolved through management console |
| (Oura) | resolved through management console |
| RescueTime | resolved through support request within 24h |
| **Runkeeper** | no response to support request |
| Strava | resolved through support request within 4d |
| Trackthisforme | resolved through support request within 24h |
| (Trakt) | resolved through support request within 24h |
| (WakaTime) | resolved through support request within 24h, logs checked for suspicious activity |
| **(Withings)** | ongoing support request |
