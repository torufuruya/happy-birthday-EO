happy-birthday-EO
=================

In order to remember the blessing of the birthday of friends who congratulated me on my birthday.

# Imprement Process Memo

## Facebook API の 調査

- jQueryだけでFeedを取得する方法
 - http://www.webopixel.net/javascript/628.html

- Developer登録からしっかりとGraphAPIを使う方法
 - http://socialmedia.project0884.com/facebook/facebook.php

## 実装

### jQueryだけでFeedを取得する

- PublicのRSS Feedのサポート終了
 - http://www.staynalive.com/2011/05/twitter-and-facebook-both-quietly-kill.html#

### Developer登録してちゃんとGraphAPIを使う

- developer登録
 - https://developers.facebook.com/apps

- JavaScript SDKの取得
 - http://socialmedia.project0884.com/facebook/js_sdk.php

- ウォールの取得
 - http://socialmedia.project0884.com/facebook/get_wall.php#js_sdk_sample
 - AccessToken取得するの面倒だなと思ってたらSDKにgetAccessToken()を発見
 - 取得できたけど、なぜか2件だけ...

- ニュースフィードの取得
 - http://socialmedia.project0884.com/facebook/get_news_feed.php
 - ウォールと同様にgetAccessToken()で取得したaccess_tokenでいけるかと思ったらError
 - "read_stream" の Permissionが必要だと怒られる
 - やっぱりちゃんとAccessToken取得しなきゃAPIをフルには使えなそう...

- profile img 取得
 - ```<img src="https://graph.facebook.com/{id}/picture?type=square">```

## やりたい

- フィードの内容を「誕生日」「おめでとう」などの文言でフィルターして引っかかったものだけ抽出
- nextの取得（paging）
- メッセージもらった人の誕生日を表示（あと何日とか）
- 友達の誕生日表示のとなりにその人のウォールに書き込める導線
