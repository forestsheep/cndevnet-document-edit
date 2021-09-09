はじめに
--------

別アプリからテーブルのデータをまるごと参照したいけど、
関連レコード機能ではテーブルを参照できない..と悩んでいる方、実は多いのではないでしょうか？

そんな方々のために、今回はアプリ間でテーブルのデータを参照する方法をまとめました。
早速、詳細を見ていきましょう。

環境準備
--------

* kintone アプリ
  \- kintone アプリストア  にある「[旅費精算申請](https://kintone-sol.cybozu.co.jp/apps/073-ryohi.html)」と「[出張申請](https://kintone-sol.cybozu.co.jp/apps/026-shuccho.html)」を使います。
* エディター
  \- エディターの準備については[こちら](https://developer.cybozu.io/hc/ja/articles/211029283#step2)をご参照ください。

カスタマイズのイメージ
----------------------

今回のカスタマイズで実現したいことは、「出張申請」アプリから「旅費精算申請」アプリの「旅費」テーブルのデータを参照することです。

* **パターン1：REST APIを使って参照する**
* **パターン2：標準機能のみで参照する**　の２パターンの方法を紹介します。

パターン1：REST APIを使って参照する
-----------------------------------

テーブルのデータを参照する際、下記のように、業務に応じて必要な参照の仕方は色々あると思います。

* **テーブルデータを別のアプリから取得したい**
* **テーブルデータを別のアプリに保存したい**

この記事では、まずは上記２パターンの自動参照を実現する、JavaScript カスタマイズを使った方法を紹介したいと思います。

### テーブルデータを別のアプリから取得する

#### **仕組み**

具体的には「**別アプリからテーブルデータを取得し、詳細画面のスペースフィールドに表示させる**」仕組みになります。

今回の例では、「出張申請」アプリのレコード詳細画面が表示されたときに、
「旅費精算申請」アプリから「旅費」テーブルのデータを取得し、スペースフィールドに表示させるイメージです。アプリ間の関係図は下記になります。

![2-1-outline-drawing.png](https://developer.cybozu.io/hc/article_attachments/900002748206/2-1-outline-drawing.png)

#### **完成イメージ**

![2-1-rendering_images.png](https://developer.cybozu.io/hc/article_attachments/900002792743/2-1-rendering_images.png)

#### **適用手順**

* **「出張申請」アプリ：
  **

1. フィールドコードが「出張申請番号」のレコード番号フィールドを追加する。
2. フィールドコードが「tableSpace」のスペースフィールドを一つ追加する。

   フィールドコード

   フィールドの種類

    備考

   出張申請番号

   レコード番号

   「旅費精算申請」レコードを特定するための番号です。
   同じ「出張申請番号」の「旅費精算申請」レコードのテーブルデータを参照し、「出張申請」レコードに反映します。

   tableSpace

   スペース

   取得した「旅費精算申請」のテーブルデータを表示するために利用します。
3. サンプルプログラムをJavaScriptファイルに保存し、設定画面からファイルを読み込む。
   ※ファイルの読み込み方法は[「JavaScriptやCSSでアプリをカスタマイズする」](https://jp.cybozu.help/k/ja/user/app_settings/js_customize.html)をご参照ください。

スペースフィールドにデータを表示させる場合、表示されたデータは、標準機能で合計値を計算することができません。スペースフィールドに表示されたデータも含めて、金額の合計値を計算したい場合は、「旅費精算申請」アプリから取得したデータを利用して合計値を算出する処理が必要です。

* **「旅費精算申請」アプリ：**

1. フィールドコードが「出張申請番号」のレコード番号フィールド（必須項目）を追加する。

   フィールドコード

   フィールドの種類

    備考

   出張申請番号

   数値

   「出張申請」レコードを特定するための番号です。
   同じ「出張申請番号」の「出張申請」レコードに、「旅費精算申請」のテーブルデータを反映します。

   紐つけたい「出張申請」アプリのレコード番号を、こちらに入力します。

   ※「出張申請アプリ」の「出張申請番号」とフィールドコードを合わせてください。
   ※「必須項目にする」「値の重複を禁止する」にチェックしてください。

#### **サンプルプログラム**

「出張申請」アプリのレコード詳細画面の表示イベントで、
「旅費精算申請」アプリから「旅費」テーブルのデータを取得し、「出張申請」アプリのスペースフィールドに表示させる処理になります。

```javascript

```

/\*

\* テーブルのデータを別アプリから参照するサンプルプログラム

\* Copyright (c) 2020 Cybozu

\*

\* Licensed under the MIT License

\* https://opensource.org/licenses/mit-license.php

\*/

(function() {

'use strict';

kintone.events.on('app.record.detail.show', function(event) {

// 「旅費精算申請アプリ」のアプリのIDに書き換えてください

var APP\_ID = 123;

// 「出張申請番号」として利用する「レコード番号」を取得

var applicationNumber = kintone.app.record.getId();

// フィールドコードを変数に格納

var businessTripExpenses = '旅費';

var date = '旅費日付';

var transportation = '手段';

var summary = '旅費摘要';

var amount = '旅費金額';

var receipt = '旅費領収書';

// 「旅費精算申請アプリ」情報を表示する表を作成

var tableHtml = '<thead><tr>' +

'<th>' + date + '</th>' +

'<th>' + transportation + '</th>' +

'<th>' + summary + '</th>' +

'<th>' + amount + '</th>' +

'<th>' + receipt + '</th>' +

'</tr>' +

'</thead>' +

'</tbody>';

// スペースフィールドに作成した表を表示

var tableEl = document.createElement('table');

tableEl.id = 'table';

tableEl.border = '1';

tableEl.style.textAlign = 'center';

tableEl.style.padding = '10px';

tableEl.insertAdjacentHTML('afterbegin', tableHtml);

kintone.app.record.getSpaceElement('tableSpace').appendChild(tableEl);

// 「旅費精算申請アプリ」から「出張申請番号」が同じのレコードを取得

var params = {

'app': APP\_ID,

'query': '出張申請番号 = ' + applicationNumber

};

return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params).then(function(resp) {

var travelExpenseAppRecords = resp.records;

// 同じ「出張申請番号」のレコードが「旅費精算申請アプリ」に存在しないときにエラーを表示

if (travelExpenseAppRecords.length === 0) {

window.alert('「旅費精算申請アプリ」に同じ「出張申請番号」のレコードがないため、「旅費」テーブルのデータを表示できません。');

return event;

}

// 取得した「旅費精算申請アプリ」のテーブルデータを作成した表に格納

var tableRows = travelExpenseAppRecords\[0\]\[businessTripExpenses\].value;

var tableRef = document.getElementById('table');

tableRows.forEach(function(row) {

var tableRow = tableRef.insertRow(-1);

var cell1 = tableRow.insertCell(-1);

var cell2 = tableRow.insertCell(-1);

var cell3 = tableRow.insertCell(-1);

var cell4 = tableRow.insertCell(-1);

var cell5 = tableRow.insertCell(-1);

cell1.appendChild(document.createTextNode(row.value\[date\].value));

cell2.appendChild(document.createTextNode(row.value\[transportation\].value));

cell3.appendChild(document.createTextNode(row.value\[summary\].value));

cell4.appendChild(document.createTextNode(row.value\[amount\].value));

cell5.appendChild(document.createTextNode(row.value\[receipt\].value));

});

return event;

}).catch(function(error) {

// エラー表示をする

window.alert('エラーが起こりました。エラーメッセージ：' + error.message);

return event;

});

});

})();

####  **動作確認**

1. 「旅費精算申請」アプリに新規レコードを作成し、保存する。
   \- 「旅費」テーブルにデモ用のデータを登録する。
2. 「出張申請」アプリに新規レコードを作成し、保存する。
   保存後のレコード詳細画面の「tableSpace」スペースフィールドに、
   「完成イメージ」のようなテーブルが表示されたかどうかを確認する。

### テーブルデータを別のアプリに登録する

#### **仕組み

**

具体的には「**レコード保存時に、テーブルデータを参照させたいアプリのテーブルにも登録する**」になります。

今回の例では、「旅費精算申請」アプリのレコードを保存するときに、
「旅費」テーブルのデータを「出張申請」アプリにも保存するイメージになります。アプリ間の関係図は下記になります。

![2-2-outline-drawing.png](https://developer.cybozu.io/hc/article_attachments/900002748226/2-2-outline-drawing.png)

#### **完成イメージ

**

![2-2-rendering_images.png](https://developer.cybozu.io/hc/article_attachments/900002792723/2-2-rendering_images.png)

#### **適用手順**

* **「出張申請」アプリ：**

1. フィールドコードが「出張申請番号」のレコード番号フィールドを追加する。
2. 設定から、取得したデータを格納するためのテーブルを追加する。

   フィールドコード

   フィールドの種類

    備考

   出張申請番号

   レコード番号

   「旅費精算申請」レコードを特定するための番号です。
   同じ「出張申請番号」の「旅費精算申請」レコードから更新されたテーブルデータを「出張申請」レコードに反映します。

   旅費

   テーブル

   「旅費精算申請」の「旅費」テーブルと同じものを追加します。

* **「旅費精算申請」アプリ：**

1. フィールドコードが「出張申請番号」のレコード番号フィールドを追加する。

   フィールドコード

   フィールドの種類

    備考

   出張申請番号

   数値

   「出張申請」レコードを特定するための番号です。
   同じ「出張申請番号」の「出張申請」レコードに、「旅費精算申請」のテーブルデータを反映します。

   紐つけたい「出張申請」アプリのレコード番号を、こちらに入力します。

   ※「出張申請アプリ」の「出張申請番号」とフィールドコードを合わせてください。
   ※「必須項目にする」「値の重複を禁止する」にチェックしてください。
2. サンプルプログラムをJavaScriptファイルに保存し、設定画面からファイルを読み込む。
   ※ファイルの読み込み方法は[「JavaScriptやCSSでアプリをカスタマイズする」](https://jp.cybozu.help/k/ja/user/app_settings/js_customize.html)をご参照ください。

#### **サンプルプログラム

**

「旅費精算申請」アプリのレコード追加・編集画面の保存成功後イベントで、
「旅費精算申請」アプリの「旅費」テーブルのデータを、「出張申請」アプリの「旅費」テーブルにも登録する処理になります。

/\*

\* テーブルデータを別のアプリに保存するサンプルプログラム

\* Copyright (c) 2020 Cybozu

\*

\* Licensed under the MIT License

\* https://opensource.org/licenses/mit-license.php

\*/

(function() {

'use strict';

// 「出張申請アプリ」のアプリのIDに書き換えてください。

var APP\_ID = 123;

// フィールドコードを変数に格納

var businessTripExpenses = '旅費';

var applicationNumber = '出張申請番号';

kintone.events.on(\['app.record.edit.submit', 'app.record.create.submit'\], function(event) {

// 「旅費精算申請アプリ」のサブテーブルオブジェクトを取得

var travelExpenseAppRecord = event.record;

var tableRows = travelExpenseAppRecord\[businessTripExpenses\].value;

// 「旅費精算申請アプリ」のサブテーブルオブジェクトを配列に格納

var subtable = tableRows.map(function(row) {

return {value: row.value};

});

// 出張申請アプリから、同じ「出張申請番号」(レコード番号)のレコードを取得

var paramForGet = {

'app': APP\_ID,

'id': travelExpenseAppRecord\[applicationNumber\].value

};

return kintone.api(kintone.api.url('/k/v1/record', true), 'GET', paramForGet).then(function(resp) {

var businessTripAppRecord = resp.record;

// 「出張申請アプリ」に同じ「出張申請番号」のレコードが存在しないときにエラーを表示

if (!businessTripAppRecord) {

window.alert('「出張申請アプリ」に同じ「出張申請番号」のレコードがないため、旅費精算申請データの更新ができません。');

return event;

}

// 取得した出張申請データに旅費精算申請データを更新

var paramForPut = {

'app': APP\_ID,

'id': travelExpenseAppRecord\[applicationNumber\].value,

'record': {

// 旅費精算申請データ(サブテーブル)

'旅費': {

'value': subtable

}

}

};

// データを追加したレコードを「出張申請アプリ」に反映

return kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', paramForPut);

}).then(function(resp2) {

// 処理成功したときのメッセージ

window.alert('出張申請アプリに旅費精算申請データを反映しました!');

return event;

}).catch(function(error) {

// 処理が失敗したときにエラー表示をする

window.alert('出張申請アプリへの反映が失敗しました。\\n' + error.message);

return event;

});

});

})();

 Copyクリップボードにコピーしました

#### **動作確認**

1. 「出張申請」アプリに新規レコードを作成し、保存する。
2. 「旅費精算申請」アプリに新規レコードを作成し、保存する。
   \- 「旅費」テーブルにデモ用のデータを登録する。
3. 「旅費精算申請」アプリのレコード追加/編集画面を保存する際に、
   「出張申請アプリに旅費精算申請データを反映しました」のメッセージが表示されたら、
   1で作成した「出張申請」レコードの「旅費」テーブルに、データが反映されたどうかを確認する。

パターン2：標準機能のみで参照する
---------------------------------

JavaScript を使ったカスタマイズの方法を紹介しましたが、
もう少し手軽にできる、標準機能を使った方法についてもご紹介したいと思います。

アクションボタンを押す作業があるなど、利便性に少し欠ける方法ですが、
ノンコーディングでできるので、ご興味のある方はぜひ試してみてください。

### **仕組み**

「**テーブルとして保存したいデータは、別のアプリに保存しておき****、**
**そのアプリから、関連レコード機能を使ってデータを参照する**」という仕組みになります。

今回の例で使うアプリの場合、

* **「旅費明細」アプリを作成する**
* **「旅費精算申請」アプリのテーブルデータに相当する内容を、「旅費明細」アプリに保存する**
* **保存された「旅費明細」アプリのデータを「旅費精算申請」「出張申請」アプリから、関連レコードを使って参照する**

というイメージになります。アプリ間の関係図は下記になります。

![1-outline-drawing.png](https://developer.cybozu.io/hc/article_attachments/900002722503/1-outline-drawing.png)

 新しい「旅費明細」アプリへのデータの登録は、「旅費精算申請」アプリのアクションボタンを使って、
１レコードにテーブル１行のデータを保存する、という運用になります。

### **完成イメージ**

![1-rendering-image.png](https://developer.cybozu.io/hc/article_attachments/900002722403/1-rendering-image.png)

### **適用手順**

* **「旅費明細」アプリ：**

1. 「旅費明細」アプリを新規作成する。
   \-「日付」「手段」「旅費摘要」「金額」「領収書」など、
   「旅費精算申請」アプリのテーブルデータに相当する内容を保存するためのフィールドを追加する。
   \- フィールド名が「旅費申請番号」の文字列 (1行)フィールドを追加する。
   \- 追加するフィールドの詳細は下記をご参照ください。

   フィールド名

   フィールドの種類

    備考

   日付

   日付フィールド

   旅費の「日付」情報を入力します。

   手段

   ドロップダウン

   旅費の「手段」情報を入力します。

   旅費摘要

    文字列（1行）

   旅費の「旅費摘要」情報を入力します。

   金額

    数値

   旅費の「金額」情報を入力します。

   領収書

    チェックボックス

   旅費の「領収書」情報を入力します。 

   旅費申請番号

    文字列（1行）

   関連レコードとアクションの関連付けのキーとして利用します。

* **「旅費精算申請」アプリ：**

1. 「旅費」テーブルを削除する。
2. アクション機能を設定する。
   \- アクションの設定の「フィールドの関連付け」で、
   「No」フィールドと「旅費明細」アプリの「旅費申請番号」を関連付けさせる。
   ※アクションの設定方法は[こちら](https://jp.cybozu.help/k/ja/user/app_settings/appaction/set_appaction.html)をご参照ください。
3. 関連レコード一覧フィールドを追加し、「旅費明細」アプリのデータを参照できるように設定する。
   \- 追加するフィールドの詳細は下記をご参照ください。

   フィールド名

   フィールドの種類

    備考

   旅費明細

   関連レコード一覧

* 参照するアプリ：旅費明細
* 表示するレコードの条件：このアプリのフィールド「No」と参照するアプリのフィールド「旅費申請番号」
* 表示するフィールド：「旅費精算申請」アプリに表示させたいフィールド
* 関連レコードの設定方法詳細は[こちら](https://jp.cybozu.help/k/ja/user/app_settings/form/related_records/set_relatedrecords.html)をご参照ください。

テーブルの代わりに、関連レコード機能で「旅費精算申請」アプリに「旅費」データを表示させる場合、テーブルデータでは行える、標準機能の合計値の計算ができなくなります。関連レコードにある金額データも含めて合計値を計算したい場合は、[こちらの記事](https://developer.cybozu.io/hc/ja/articles/203030394)をご参照ください。「テーブルデータの参照」部分の動作をまず試してみたい方は、「旅費精算申請」の「旅費」テーブルを削除する際に、「旅費合計」計算フィールドも含めて削除してください。

* **「出張申請」アプリ：**

1. フィールドコードが「旅費申請番号」の文字列 (1行)フィールドを作成する。
   （関連レコードとアクションの関連付けのキーとして利用）
2. 関連レコード一覧フィールドを追加し、「旅費明細」アプリのデータを参照できるように設定する。
   \- 追加するフィールドの詳細は下記をご参照ください。

   フィールド名

   フィールドの種類

    備考

   旅費申請番号

   文字列（1行）

   関連レコードとアクションの関連付けのキーとして利用します。

   旅費明細

   関連レコード一覧

* 参照するアプリ：旅費明細
* 表示するレコードの条件：このアプリのフィールド「旅費申請番号」と参照するアプリのフィールド「旅費申請番号」
* 表示するフィールド：「旅費精算申請」アプリに表示させたいフィールド
* 関連レコードの設定方法の詳細は[こちら](https://jp.cybozu.help/k/ja/user/app_settings/form/related_records/set_relatedrecords.html)をご参照ください。

おわりに
--------

今回のTipsで、アプリ間でテーブルのデータを参照する方法を紹介しました(^0^)/

他にも、データ参照でよく使われる[関連レコードのカスタマイズ](https://developer.cybozu.io/hc/ja/sections/360002613691)や、
[テーブルのほかの活用方法](https://developer.cybozu.io/hc/ja/sections/360002613651)など、便利な情報がたくさんありますので、ぜひ確認してみてください♪

 このTipsは、2020年7月版 kintone で確認したものになります。
