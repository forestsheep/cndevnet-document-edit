这是获取提醒器的条件通知的API。

### URI
URI根据是正式环境还是测试环境的不同尔不同。

#### 正式环境的设置值获取时
https://(子域名).cybozu.com/k/v1/app/notifications/reminder.json

来宾空间的应用: https://(子域名).cybozu.com/k/guest/(スペースの ID)/v1/app/notifications/reminder.json

#### 测试环境的设置值获取时
https://(子域名).cybozu.com/k/v1/preview/app/notifications/reminder.json
来宾空间的应用: https://(子域名).cybozu.com/k/guest/(スペースの ID)/v1/preview/app/notifications/reminder.json

### HTTP方法
GET

>必要なアクセス権
アプリ管理権限

|   |   |
|---|---|
|   |   |

リクエストパラメータ
パラメータ名	指定する値	必須	説明
app	数値または文字列	必須	アプリのIDを指定します。
lang	文字列	 	フィールドや選択肢の名前に「言語ごとの名称」を設定している場合に、取得する名称の言語を指定します。
日本語の名称を取得する場合：ja
英語の名称を取得する場合：en
中国語の名称を取得する場合：zh
ログインユーザーの言語設定で取得する場合：user*
*ログインユーザーの言語設定が「Webブラウザの設定にしたがう」の場合、
Accept-Languageヘッダがあればその設定が反映され、
Accept-Languageヘッダがなければcybozu.com共通管理の「ローカライズの設定」で設定された言語で取得されます。
デフォルトの名称を取得する場合：default
省略すると、デフォルトの名称が取得されます。
リクエストの例
送信するリクエストは、パラメータの送信方法によって異なります。パラメータ「app」と「lang」を指定したリクエストの例は、次のとおりです。

URL にパラメータを含める場合
