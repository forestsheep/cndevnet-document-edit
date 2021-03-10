<h2>
    はじめに
</h2>
<p>
    <a href="https://developer.cybozu.io/hc/ja/articles/360040220451">目指せ！JavaScriptカスタマイズ中級者（１） 〜webpack編〜</a>では複数のアプリカスタマイズを扱うためのWebpackの導入をしていました。<br/>今回は同じWebpackの環境で、kintone REST APIを扱うのに便利なkintone REST API Clientをインストールして利用できるようにし、簡単に使い方をお伝えします。
</p>
<h2>
    kintone REST API Clientとは
</h2>
<p>
    レコード全件取得や、アップサート（既存のデータがあればアップデート、なければインサート）など、<br/>レコードやアプリの操作を簡単にできるようにする、kintone REST APIを使うための便利なツールです。
</p>
<p>
    ※もともと、同じ用途のライブラリーとして<a href="https://github.com/kintone/kintone-js-sdk">kintone JS SDK</a>というものもありますが、そちらは利用非推奨となっております。<br/>今までkintone JS SDKを使っていた方も今回紹介するkintone REST API Clientを是非利用いただければと思います。
</p>
<h2>
    使うための準備
</h2>
<p>
    <a href="https://developer.cybozu.io/hc/ja/articles/360040220451">目指せ！JavaScriptカスタマイズ中級者（１） 〜webpack編〜</a>で説明したようにJavaScriptファイルをbuildできるようになっているのが前提です。
</p>
<p>
    下記をコマンドラインから入力し実行します。
</p>
<pre>npm install @kintone/rest-api-client</pre>
<p>
    これでインストールがはじまり、kintone REST API Clientが利用できるようになります。<br/>はじめて利用する方は以下の記事のQuickStartをやってみると良いでしょう。
</p>
<p>
    <a href="https://developer.cybozu.io/hc/ja/articles/900000767263-kintone-JavaScript-Client-kintone-rest-api-client-#quickstart-nodejs">kintone JavaScript Client (@kintone/rest-api-client)</a>
</p>
<h2>
    使い方
</h2>
<p>
    <a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">GitHubのkintone-rest-api-client</a>のページに利用方法などが書かれていますが、英語ですのでリファレンスのどこを参照すればよいかを説明します。
</p>
<h3>
    リファレンス
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md">Record</a>操作に関するリファレンス
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                ここではレコードの取得や作成などレコードの操作に関することが記載されています。通常、このリファレンスが基本になると思います。
            </p>
        </li>
    </ul>
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/app.md">App</a>操作に関するリファレンス
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                アプリの設定変更操作に関することが記載されています。アプリの設定を自動で変更したいなどがあれば使いますが、見る頻度は基本的に低いはずです。
            </p>
        </li>
    </ul>
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/file.md">File</a>操作に関するリファレンス
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                ファイルのアップロード、ダウンロードに関することが記載されています。レコードにファイルを添付したい場合などもこちらを利用することになります。
            </p>
        </li>
    </ul>
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/bulkRequest.md">BulkRequest</a>に関するリファレンス
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                複数アプリへのレコード一括処理に関することが記載されています。
            </p>
        </li>
    </ul>
</ul>
<h3>
    リファレンスの読み方
</h3>
<p>
    リファレンスの各項目には、その関数の説明と、Parameters（関数の引数）とReturns（関数の返り値）があります。英語で読み取れないところはGoogle翻訳などを利用すれば理解の一助になるかと思います。<br/><br/>1. 関数名<br/>2. 関数の説明<br/>3. 関数の返り値<br/>4. 関数の引数
</p>
<h2>
    <img src="https://developer.cybozu.io/hc/article_attachments/900003563006/js-sdk_record_md_at_master___kintone_js-sdk.png" alt="js-sdk_record_md_at_master___kintone_js-sdk.png" title="" style="box-sizing: border-box; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; cursor: pointer; height: auto;"/>
</h2>
<h2>
    使用例
</h2>
<p>
    リファレンスに記載されているものから一部、使用例を下記にしめします。async/await形式で記述します。参考にしてください。
</p>
<h3>
    レコードを取得
</h3>
<p>
    アプリIDが1, レコード番号が10のレコードを取得したい場合
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.getRecord({app: &quot;1&quot;, id: &quot;10&quot;});</pre>
<h3>
    レコードを一括取得
</h3>
<p>
    2020年7月定期メンテナンスで、それ以降に作られるアプリはoffset上限が1万件となってしまったため、レコードを全件取得する場合は<a href="https://developer.cybozu.io/hc/ja/articles/360028843531-%E3%82%AB%E3%83%BC%E3%82%BD%E3%83%AB-API-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E4%B8%80%E6%8B%AC%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B">カーソル API</a>を使う必要があります。
</p>
<p>
    ですが、kintone REST API Clientではカーソル APIを意識せずとも下記のように全件取得できます。
</p>
<p>
    アプリIDが1, フィールドコードがprice, priceが1000以上のものを取得したい場合
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.getAllRecords({app: &quot;1&quot;, condition: &quot;price &gt;= 1000&quot;});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">レコード作成</span>
</p>
<p>
    アプリIDが1, フィールドコードがfield_code_1に&quot;サンプルテキスト&quot;と入力されたレコードを作成したい場合
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.addRecord({app: &quot;1&quot;, record: {field_code_1: {value: &quot;サンプルテキスト1&quot; }}});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">レコードをアップデート</span>
</p>
<p>
    アプリIDが1, レコードIDが10, フィールドコードがfield_code_1に&quot;サンプルテキスト2&quot;と入力された状態にレコードを更新したい場合
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.updateRecord({app: &quot;1&quot;, id: &quot;10&quot;, record: {field_code_1: {value: &quot;サンプルテキスト2&quot;}}});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">レコードを一括アップデート</span><br/>
</p>
<p>
    下記のように3レコードを一括で更新したい場合
</p>
<p>
    アプリIDが1, レコードIDが10, フィールドコードがfield_code_1に&quot;サンプルテキスト1&quot;<br/>アプリIDが1, レコードIDが11, フィールドコードがfield_code_1に&quot;サンプルテキスト2&quot;<br/>アプリIDが1, レコードIDが12, フィールドコードがfield_code_1に&quot;サンプルテキスト3&quot;
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.updateAllRecords({
  app: 1,
  // レコードは、オブジェクトの配列で指定します。
  records: [
    {id: &#39;11&#39;, record: {field_code_1: {value: &#39;サンプルテキスト1&#39;}}},
    {id: &#39;12&#39;, record: {field_code_2: {value: &#39;サンプルテキスト2&#39;}}},
    {id: &#39;13&#39;, record: {field_code_3: {value: &#39;サンプルテキスト3&#39;}}},
  ]
});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">レコードをアップサート</span>
</p>
<p>
    アップサートとは、該当するレコードがなければインサート（挿入・新規作成）、該当するレコードがあればアップデート（更新）をするための機能です。
</p>
<p>
    アプリIDが1, 更新のキーに利用するフィールドコードが&quot;field_key&quot;, field_keyの値が&quot;apple&quot;, 更新するフィールドコードがfield_code_1で更新内容が&quot;サンプルテキスト1&quot;の場合
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.upsertRecord({
  app: &quot;1&quot;, updateKey: {field: &quot;field_key&quot;, value: &quot;apple&quot; }, record: {field_code_1: {value: &quot;サンプルテキスト1&quot;}}
});</pre>
<h2>
    サンプル
</h2>
<p>
    アプリ間のデータのやり取りでkintone REST API Clientを中心に使ったサンプルを示します。
</p>
<h3>
    シナリオ
</h3>
<p>
    kintoneアプリストアに、見積書アプリと商品リストアプリの2つのアプリがパックになっている「商品見積書パック」というものがあります。見積書アプリで見積作成時に、ルックアップフィールドを用いて商品リストアプリにある商品を選べるものです。
</p>
<p>
    それを利用して、下記の仕様を満たすようアプリのカスタマイズとJavaScriptカスタマイズを行います。
</p>
<ol class=" list-paddingleft-2">
    <li>
        <p>
            見積作成時（見積アプリでレコード保存時）に、選択されている商品の在庫数を減らす。
        </p>
    </li>
    <li>
        <p>
            見積作成時（見積アプリでレコード保存時）に、選択されている商品の在庫がない場合はエラーを表示する
        </p>
    </li>
</ol>
<h3>
    保存時のイメージ
</h3>
<p>
    保存時に、数量分の、在庫数がなければ保存させない。在庫がある場合は、在庫引当処理を行う（商品リストアプリの在庫数をへらす）<br/>※「在庫数」フィールドは今回のサンプルで追加します。
</p>
<p>
    <img src="https://developer.cybozu.io/hc/article_attachments/900003502703/mceclip0.png" alt="mceclip0.png" title="" style="box-sizing: border-box; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; cursor: pointer; height: auto;"/>
</p>
<h3>
    アプリの用意と設定
</h3>
<ol class=" list-paddingleft-2">
    <li>
        <p>
            &nbsp;アプリの用意<br/>kintoneアプリストアにある「商品見積書パック」を選び「このアプリパックを追加」を押して追加してください。<img src="https://developer.cybozu.io/hc/article_attachments/900003118726/mceclip0.png" alt="mceclip0.png" title="" style="box-sizing: border-box; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; cursor: pointer; height: auto; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;"/>
        </p>
    </li>
    <li>
        <p>
            アプリの設定<br/>商品リストアプリに、フィールド名とフィールドコードが「在庫数」のフィールドを追加してください。また、見積書アプリからルックアップするためのレコードを1つ以上登録してください。
        </p>
    </li>
</ol>
<h3>
    JavaScriptカスタマイズ
</h3>
<p>
    コードを書き、ビルドしたものを見積書アプリにアップロードしてください。<br/>コードは、以下のリポジトリにも公開しています。<br/><a href="https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate/tree/master/src/apps/quote">https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate/tree/master/src/apps/quote</a>
</p>
<p>
    &nbsp;ビルドやアップロード方法については<a href="https://developer.cybozu.io/hc/ja/articles/900001933483-%E7%9B%AE%E6%8C%87%E3%81%9B-JavaScript%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E4%B8%AD%E7%B4%9A%E8%80%85-%EF%BC%93-%E8%87%AA%E5%8B%95%E3%81%A7%E4%B8%80%E6%8B%AC%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E7%B7%A8-">目指せ！JavaScriptカスタマイズ中級者（３） 〜自動で一括ファイルアップロード編〜</a>などの記事を参照ください。
</p>
<p>
    4行目のアプリIDについては、環境に合わせて書き換えてください。
</p>
<p>
    <br/>
</p>
<pre class="brush:js;toolbar:false">import {KintoneRestAPIClient} from &#39;@kintone/rest-api-client&#39;;
// 商品リストのアプリIDを入力してください
const productsAppId = 122;
const events = [&#39;app.record.create.submit&#39;, &#39;app.record.edit.submit&#39;];
kintone.events.on(events, async (event) =&gt; {
  const {record} = event;
  // kintoneへ接続するためのインスタンスを作成
  const client = new KintoneRestAPIClient();
  // 今回はコード簡略化のために、テーブルの商品は重複禁止とします。
  // ただの簡易的な重複チェックなので意味は理解しなくてOKです。
  const hasDuplicatedRow = record.見積明細.value.some((rowA, indexA, arr) =&gt; {
    return arr.find((rowB, indexB) =&gt; indexA !== indexB &amp;&amp; rowA.value.型番.value === rowB.value.型番.value);
  });
  if (hasDuplicatedRow) {
    event.error = &#39;重複した商品は登録できません。&#39;;
    return event;
  }
  // テーブルに入っている商品レコードを取得
  let products;
  try {
    products = await client.record.getRecords({
      app: productsAppId,
      query: `型番 in (${record.見積明細.value
        .map((row) =&gt; `&quot;${row.value.型番.value}&quot;`)
        .join(&#39;, &#39;)})`,
    });
  } catch (error) {
    event.error = &#39;レコードの取得に失敗しました&#39;;
    return event;
  }
  // 商品リストの在庫数を差し引いたデータを作成
  const deductedProductRecords = products.records.map((productRecord) =&gt; {
    const tableRow = record.見積明細.value.find(
      (row) =&gt; productRecord.型番.value === row.value.型番.value
    );
    // アップデートのキーとなる型番と, 差し引いた在庫数を格納する。
    return {
      型番: {
        value: productRecord.型番.value,
      },
      在庫数: {
        value: Number(productRecord.在庫数.value) - Number(tableRow.value.数量.value),
      },
    };
  });
  // 在庫数を差し引いたあと在庫数が0未満になるようなレコードがないか確認
  const noStockRecords = deductedProductRecords.filter(
    (productRecord) =&gt; Number(productRecord.在庫数.value) &lt; 0
  );
  // 差し引き1未満のレコードがでた場合はエラーとみなしレコードの作成をストップさせる
  if (noStockRecords.length &gt; 0) {
    // event.errorにデータをいれたあとeventを返すとレコードの作成をストップできる
    // どの商品が問題か示すために在庫が足りない商品の型番を列挙する
    event.error = `在庫がない商品があります。型番 ${noStockRecords
      .map((productRecord) =&gt; productRecord.型番.value)
      .join(&#39;, &#39;)}`;
    return event;
  }
  // 問題なければアップデート
  try {
    await client.record.updateRecords({
      app: productsAppId,
      records: deductedProductRecords.map((productRecord) =&gt; {
        return {
          updateKey: {
            field: &#39;型番&#39;,
            value: productRecord.型番.value,
          },
          record: {
            在庫数: {
              value: productRecord.在庫数.value,
            },
          },
        };
      }),
    });
  } catch (error) {
    event.error = `アップデートに失敗しました。${error.message}`;
    return event;
  }
  return event;
});</pre>
<p>
    アップロードしたら、シナリオが実現できるか動作確認してください。
</p>
<h3>
    おわりに
</h3>
<p>
    kintoneのJavaScript APIをそのまま使いつづけてももちろん問題ないですが、kintone REST API Clientを使うとより簡単にRESTでデータを扱えるようになるので、ぜひ利用してみてください。
</p>
<p>
    <br/>
</p>
