<p>
    # 向JavaScript自定义中级开发者的目标前进（5）〜TypeScript导入篇〜
</p>
<h2>
    はじめに
</h2>
<p>
    今回は<a href="https://github.com/kintone/js-sdk/tree/master/packages/dts-gen#readme">@kintone/dts-gen</a>というkintoneでTypeScriptを使いやすくするツールと<a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">kintone JavaScript Client (@kintone/rest-api-client)</a>を使って、実践的なTypeScriptコードを書きます。<br/>TypeScriptを使ってJavaScriptカスタマイズをする基本的な方法にについては、当サイトの別記事<a href="https://developer.cybozu.io/hc/ja/articles/360023293091-TypeScript%E3%81%A7kintone%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E9%96%8B%E7%99%BA%E3%82%92%E3%81%97%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86">TypeScriptでkintoneカスタマイズ開発をしてみよう</a>で紹介しています。
</p>
<p>
    シリーズの記事一覧は<a href="https://developer.cybozu.io/hc/ja/articles/900005565903">こちら</a>。
</p>
<h2>
    TypeScriptとは。TypeScriptを使うメリット
</h2>
<p>
    TypeScriptとは、Microsoftが開発したオープンソースのプログラミング言語で、JavaScriptに「型」情報を追加できるようになっています。
</p>
<p>
    「型」というのは変数などに格納される値が、数値なのか文字列なのかなど判別するために宣言します。<br/>数値型や文字列型など基本的なもの以外にも、ユーザーが独自に定義することもできます。<br/>型情報のおかげで、扱おうとしているデータの中身が実行せずともコードを書くタイミングで明らかになるため、バグを起こしにくくなります。
</p>
<p>
    例えば、APIから取得できるkintoneの数値・計算フィールドの値は数字ではなく文字列ですが、それに直接乗算を行おうとすると、数値ではないのでエラーと判断されます。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            数値・計算フィールドにそのまま乗算を行おうとするとエラーになる例<br/>計算フィールド「合計金額」に&nbsp; &quot;record.合計金額.value * 0.1&quot; で乗算を行おうとしてエラーが表示されています。<br/><img src="https://developer.cybozu.io/hc/article_attachments/900006342026/error1.png" alt="error1.png" title="" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
        </p>
    </li>
</ul>
<p>
    他にも、あるオブジェクトの中に該当のキーが無い場合など、アクセスしようとするとIDEがエラーと判断します。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            オブジェクトにアクセスしようとするとエラーになる例<br/>オブジェクト &quot;record.文字列.value&quot; に値を代入しようとしたが、実際には「文字列」というフィールドコードが存在しないためエラーが表示されています。<br/><img src="https://developer.cybozu.io/hc/article_attachments/900006342046/error2.png" alt="error2.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
        </p>
    </li>
</ul>
<p>
    TypeScriptで、kintoneのアプリの各フィールドの型情報を用意し、それを利用することで上記のようにkintoneのフィールドコードを間違えたりせずに書くことができるようになります。<br/>特にテーブルの階層が深い複雑な構造や、REST API のリクエストパラメーターやレスポンスに対して大きな効果を発揮します。
</p>
<p>
    実際にやるとどうなるのか、サンプルを試してみましょう。
</p>
<h2>
    準備
</h2>
<p>
    コード:&nbsp;<a href="https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate">https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate</a>
</p>
<p>
    git clone またはリンク先右上の緑色の Clone or download ボタンから Zip ファイルをダウンロードしてご利用ください。<br/>以降の導入方法は上記ページの Readme を参照ください。
</p>
<p>
    &nbsp;上記コードのURL自体は<a href="https://developer.cybozu.io/hc/ja/articles/360040220451-%E7%9B%AE%E6%8C%87%E3%81%9B-JavaScript%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E4%B8%AD%E7%B4%9A%E8%80%85-%EF%BC%91-webpack%E7%B7%A8-">目指せ中級者！実践JavaScriptカスタマイズレベルアップ（１） 〜webpack編〜</a>から（４）までものと同一です。<br/>前回までの記事をお試しいただいた方も念の為再度ディレクトリ直下で npm install をやっておいてください。
</p>
<p>
    細かい設定内容は後述しますが、これでTypeScriptを利用するための必要パッケージがインストールされます。
</p>
<h2>
    サンプル
</h2>
<p>
    第4回の記事、<a href="https://developer.cybozu.io/hc/ja/articles/900000566086">目指せ中級者！実践JavaScriptカスタマイズレベルアップ（４） 〜kintone REST API Client編〜</a>と同様のサンプルでTypeScriptならどう書くかという感じでコードを書いてみたいと思います。<br/>第4回の記事と同様のアプリを利用するので上記記事の「アプリの用意と設定」のようにアプリを用意してから以下お試しください。
</p>
<h3>
    型情報の取得
</h3>
<p>
    コードを実際に編集する前に、JavaScript APIにアクセスするための型定義を用意します。&nbsp;<a href="https://github.com/kintone/js-sdk/tree/master/packages/dts-gen">@kintone/dts-gen</a>&nbsp;というライブラリを使うことで、JavaScriptAPIで扱うための型定義をアプリから取得できます。<br/>下記コマンドを実行し、見積アプリから型情報を取得しておきます。作成されたものを型定義ファイルといいます。
</p>
<p>
    型定義ファイルは、サンプルにすでにはいっていますが、下記のコードを実行することでお使いの環境のアプリの定義で上書きされます。
</p>
<pre>npx @kintone/dts-gen --host https://kintoneのドメイン.cybozu.com/ -u ユーザー名 -p パスワード --app-id アプリID --type-name Quote --namespace KintoneTypes -o src/types/Quote.d.ts</pre>
<p>
    &nbsp;Copyクリップボードにコピーしました
</p>
<p>
    今回のサンプルコードのケースでは、見積アプリと商品アプリの2アプリを利用しますが、見積アプリのみJavaScriptAPIで値の書き換えを行うため、見積アプリの型定義ファイルを @kintone/dts-gen で生成します。商品アプリはREST APIで書き換えるため、別途サンプルコード内に型定義を行う必要があります。
</p>
<p>
    コマンドが成功すると、下記のような型定義ファイルが生成されます。
</p>
<p>
    ファイル: src/types/Quote.d.ts
</p>
<p>
    <br/>
</p>
<table>
    <tbody>
        <tr class="firstRow">
            <td></td>
            <td>
                declare namespace KintoneTypes {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                interface Quote {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                No: kintone.fieldTypes.SingleLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                文字列__1行_: kintone.fieldTypes.SingleLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                文字列__複数行_: kintone.fieldTypes.MultiLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                日付: kintone.fieldTypes.Date;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                合計金額: kintone.fieldTypes.Calc;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                見積明細: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                type: &quot;SUBTABLE&quot;;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                value: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                id: string;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                value: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                単価: kintone.fieldTypes.Number;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                数量: kintone.fieldTypes.Number;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                型番: kintone.fieldTypes.SingleLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                商品名: kintone.fieldTypes.SingleLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                小計: kintone.fieldTypes.Calc;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                };
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }[];
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                };
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                interface SavedQuote extends Quote {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                $id: kintone.fieldTypes.Id;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                $revision: kintone.fieldTypes.Revision;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                更新者: kintone.fieldTypes.Modifier;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                作成者: kintone.fieldTypes.Creator;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                レコード番号: kintone.fieldTypes.RecordNumber;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                更新日時: kintone.fieldTypes.UpdatedTime;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                作成日時: kintone.fieldTypes.CreatedTime;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
    </tbody>
</table>
<p>
    &nbsp;Copyクリップボードにコピーしました
</p>
<p>
    <br/>
</p>
<h3>
    サンプルコード
</h3>
<p>
    ファイル: src/apps/quote_ts/index.ts
</p>
<p>
    <br/>
</p>
<table>
    <tbody>
        <tr class="firstRow">
            <td></td>
            <td>
                import {KintoneRestAPIClient, KintoneRecordField} from &#39;@kintone/rest-api-client&#39;;
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 製品アプリの型を定義
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                type SavedProduct = {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                $id: KintoneRecordField.ID;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                $revision: KintoneRecordField.Revision;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                更新者: KintoneRecordField.Modifier;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                作成者: KintoneRecordField.Creator;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                レコード番号: KintoneRecordField.RecordNumber;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                更新日時: KintoneRecordField.UpdatedTime;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                作成日時: KintoneRecordField.CreatedTime;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                ラジオボタン: KintoneRecordField.RadioButton;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                文字列__複数行__0: KintoneRecordField.MultiLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                型番: KintoneRecordField.SingleLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                商品名: KintoneRecordField.SingleLineText;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                数値: KintoneRecordField.Number;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                在庫数: KintoneRecordField.Number;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 商品アプリのアプリIDを入力してください
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const productsAppId = 122;
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                const events = [&#39;app.record.create.submit&#39;, &#39;app.record.edit.submit&#39;];
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                kintone.events.on(events, async (event) =&gt; {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const record = event.record as KintoneTypes.Quote;
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // kintoneへ接続するためのインスタンスを作成
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const client = new KintoneRestAPIClient({});
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 今回はコード簡略化のために、テーブルの商品は重複禁止とします。
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                // ただの簡易的な重複チェックなので意味は理解しなくてOKです。
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const hasDuplicatedRow = record.見積明細.value.some((rowA, indexA, arr) =&gt; {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                return arr.find(
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                (rowB, indexB) =&gt;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                indexA !== indexB &amp;&amp; rowA.value.型番.value === rowB.value.型番.value
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                );
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                });
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                if (hasDuplicatedRow) {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                event.error = &#39;重複した商品は登録できません。&#39;;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                return event;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // テーブルに入っている商品レコードを取得
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                let products;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                try {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                // Genericに型を指定することで, products変数を利用する際に型推論ができる
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                products = await client.record.getRecords&lt;SavedProduct&gt;({
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                app: productsAppId,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                query: `型番 in (${record.見積明細.value
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                &nbsp; &nbsp; &nbsp; &nbsp;.map((row) =&gt; `&quot;${row.value.型番.value}&quot;`)
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                &nbsp; &nbsp; &nbsp; &nbsp;.join(&#39;, &#39;)})`,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                });
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                } catch (error) {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                event.error = &#39;レコードの取得に失敗しました&#39;;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                return event;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 商品リストの在庫数を差し引いたデータを作成
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const deductedProductRecords = products.records.map((productRecord) =&gt; {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const tableRow = record.見積明細.value.find(
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                (row) =&gt; productRecord.型番.value === row.value.型番.value
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                );
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // アップデートのキーとなる型番と, 差し引いた在庫数を格納する。
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                return {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                型番: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                value: productRecord.型番.value,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                },
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                在庫数: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                value:
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                Number(productRecord.在庫数.value) -
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                Number(tableRow?.value.数量.value),
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                },
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                };
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                });
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 在庫数を差し引いたあと在庫数が0未満になるようなレコードがないか確認
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                const noStockRecords = deductedProductRecords.filter(
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                (productRecord) =&gt; Number(productRecord.在庫数.value) &lt; 0
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                );
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 差し引き1未満のレコードがでた場合はエラーとみなしレコードの作成をストップさせる
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                if (noStockRecords.length &gt; 0) {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                // event.errorにデータをいれたあとeventを返すとレコードの作成をストップできる
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                // どの商品が問題か示すために在庫が足りない商品の型番を列挙する
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                event.error = `在庫がない商品があります。型番 ${noStockRecords
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                &nbsp; &nbsp; &nbsp;.map((productRecord) =&gt; productRecord.型番.value)
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                &nbsp; &nbsp; &nbsp;.join(&#39;, &#39;)}`;
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                return event;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                // 問題なければアップデート
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                try {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                await client.record.updateRecords({
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                app: productsAppId,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                records: deductedProductRecords.map((productRecord) =&gt; {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                return {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                updateKey: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                field: &#39;型番&#39;,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                value: productRecord.型番.value,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                },
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                record: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                在庫数: {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                value: productRecord.在庫数.value,
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                },
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                },
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                };
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }),
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                });
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                } catch (error) {
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                event.error = `アップデートに失敗しました。${error.message}`;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                return event;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                }
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                return event;
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                });
            </td>
        </tr>
    </tbody>
</table>
<p>
    &nbsp;Copyクリップボードにコピーしました
</p>
<p>
    <br/>
</p>
<p>
    実際にコードを編集してみて、27行目あたりでrecordの中身をみようとするとどうなるか、Visual Studio Codeの挙動を試してみてください。
</p>
<p>
    下記画像のように、「record.」と入力していくと見積アプリのフィールドに基づいたサジェストがされるはずです。
</p>
<p>
    <img src="https://developer.cybozu.io/hc/article_attachments/900007244463/suggestion.gif" alt="suggestion.gif" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
</p>
<h3>
    サンプルコードの説明
</h3>
<p>
    ここではTypeScriptのすべてを説明することはできませんが、サンプルコードの概要をかいつまんで紹介します。
</p>
<p>
    実際には、第4回で紹介しているコードとはあまり差分はありません。下記に示す型情報の扱いのみ違いがあります。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            26行目: event.recordの型情報を付与<br/><img src="https://developer.cybozu.io/hc/article_attachments/900006342226/kintone-types-quote.png" alt="kintone-types-quote.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/><br/>
        </p>
        <pre>const record = event.record as kintoneTypes.Quote;</pre>
        <p>
            &nbsp;Copyクリップボードにコピーしました
        </p>
        <p>
            とかかれた箇所ですが、これは先述の @kintone/dts-gen で作成した型定義を当てています。こうすることで、「event.record は 見積アプリのレコードですよ」ということを定義できます。<br/>これを<a href="https://typescript-jp.gitbook.io/deep-dive/type-system/type-assertion">型アサーション</a>といいます。
        </p>
    </li>
    <li>
        <p>
            4行目〜18行目: 製品アプリの型定義（@kintone/rest-api-client用）<br/><br/>実は、<a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">@kintone/rest-api-client</a>はTypeScriptをサポートしています。<br/>ただし、@kintone/rest-api-clientの型定義は、@kintone/dts-genのようにコマンドから作成することができません。<br/>そのため、このように製品アプリの型を自身で用意する必要があります。<br/>@kintone/rest-api-clientの型定義方法の詳細は<a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/typescript.md">こちら</a>を御覧ください。
        </p>
    </li>
    <li>
        <p>
            48行目: @kintone/rest-api-clientに型情報を渡す<br/><img src="https://developer.cybozu.io/hc/article_attachments/900007244643/types-definition.png" alt="types-definition.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/><br/>
        </p>
        <pre>products = await client.record.getRecords&lt;SavedProduct&gt;({</pre>
        <p>
            &nbsp;Copyクリップボードにコピーしました
        </p>
        <p>
            としている行ですが、4行目~18行目で定義した製品アプリの型情報（SavedProduct）を渡すことで、getRecords()で返ってくるレコードは、SavedProduct型ですよと教えています。<br/>これにより、REST APIから返却されたレコードについてもサジェストされるようになります。
        </p>
    </li>
</ul>
<h3>
    サンプルコードのビルド
</h3>
<p>
    ブラウザにTypeScriptを直接動作させることはできませんが、TypeScript→JavaScriptに変換できるようにWebpackの設定を追記しています。<br/>ビルドコマンドを打つことで、JavaScriptに変換できるので、それをアップロードします。
</p>
<pre>npx webpack --mode production</pre>
<p>
    &nbsp;Copyクリップボードにコピーしました
</p>
<p>
    詳細は、<a href="https://developer.cybozu.io/hc/ja/articles/900001933483">目指せ中級者！実践JavaScriptカスタマイズレベルアップ（３） 〜自動で一括ファイルアップロード編〜</a>をご確認ください。自動ファイルアップロードもできます。
</p>
<h2>
    おわりに
</h2>
<p>
    TypeScript自体と、それに対応するkintoneのエコシステムが醸成されてきた結果、このようにかなりよい開発体験を得ることができるようになってきました。<br/>kintoneを扱う上で完全には避けられない、フィールドコードの勘違いなど、大分減らせることでバグも未然に防ぐことができ、かなりTypeScriptでkintoneをカスタマイズするのは大分魅力的だと思っています。
</p>
<p>
    今回の記事でTypeScriptに興味がでたら、ぜひ入門者用の書籍などを参考にして学んでみてください。TypeScripは昨今ではかなり人気でもあり、今後の開発の役に立つと思います。
</p>
<p>
    シリーズの記事一覧は<a href="https://developer.cybozu.io/hc/ja/articles/900005565903">こちら</a>。
</p>
<p>
    このTipsは、2021年2月版 kintone、@kintone/rest-api-client@1.10.0 で確認したものになります。
</p>
<p>
    <br/>
</p>
