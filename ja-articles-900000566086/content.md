# 向JavaScript自定义中级开发者的目标前进（４）〜kintone REST API Client篇〜

<h2>
前言
</h2>
<p>
我们曾在<a href="https://cybozudev.kf5.com/hc/kb/article/1412604">向JavaScript自定义中级开发者的目标前进（１） 〜webpack篇〜</a>中介绍了为了自定义多个应用所如何去使用Webpack。<br>这次，我们准备向大家介绍如何同样用Webpack环境，来安装和使用kintone REST API Client来使得处理kintone REST API更为方便。
</p>
<h2>
kintone REST API Client是什么
</h2>
<p>
获取全部记录，UPSERT（记录已存在的话更新，否则新建）等<br>通过使用kintone REST API来更简单地操作记录和应用的方便的工具。
</p>
<p>
※本来，有着相同用途的库——<a href="https://github.com/kintone/kintone-js-sdk">kintone JS SDK</a>，但是现在不推荐使用了。<br>之前如果您一直在使用kintone JS SDK的话，<br>借这次介绍的机会，非常推荐您尝试一下kintone REST API Client。
</p>
<h2>
使用前的准备
</h2>
<p>
就像在<a href="https://cybozudev.kf5.com/hc/kb/article/1412604">向JavaScript自定义中级开发者的目标前进（１） 〜webpack篇〜</a>所说明的一样，让JavaScript处于可编译状态是大前提。
</p>
<p>
输入下列命令并执行
</p>
<pre>npm install @kintone/rest-api-client</pre>
<p>
这样，安装完成后，kintone REST API Client就可以使用了。<br>
如果您是初次使用，可以参考下面文章中的Quick Start章节
</p>
<p>
<a href="https://cybozudev.kf5.com/hc/kb/article/1389642#quickstart">kintone JavaScript Client (@kintone/rest-api-client)</a>
</p>
<h2>
    使用方法
</h2>
<p>
<a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">GitHub的kintone-rest-api-client</a> 中记述了使用方法，因为是英语写成，这里对各个文档的使用方法一一做介绍。
</p>
<h3>
    文档
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md">记录</a>的操作
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                这里记载着记录得获取或新建等操作内容。通常来说，这些文档是最基础的。
            </p>
        </li>
    </ul>
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/app.md">应用</a>的操作
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                这里记载着有关应用设置变更的内容。如果是想变更应用的设置，可以看这里，但基本上使用频度较低。
            </p>
        </li>
    </ul>
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/file.md">文件</a>的操作
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                这里记载着文件的上传，下载等有关操作的内容。向记录中添加文件时做如下操作请参考这里。
            </p>
        </li>
    </ul>
    <li>
        <p>
            <a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/bulkRequest.md">BulkRequest</a>的操作
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                这里记载着复数个应用的记录批量操作的内容。
            </p>
        </li>
    </ul>
</ul>
<h3>
    文档的阅读方法
</h3>
<p>
    文档中有各个项目的函数说明、参数和返回值等说明。英语中不能理解的部分，请用翻译网站等可以帮助理解。<br><br>1. 函数名<br>2. 函数的说明<br>3. 函数的返回值<br>4. 函数的参数
</p>
<h2>
    <img src="https://developer.cybozu.io/hc/article_attachments/900003563006/js-sdk_record_md_at_master___kintone_js-sdk.png" alt="js-sdk_record_md_at_master___kintone_js-sdk.png" title="" style="box-sizing: border-box; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; cursor: pointer; height: auto;"/>
</h2>
<h2>
    使用的例子
</h2>
<p>
    下面使用文档中所记载的中一部分作为例子来说明。我们使用async/await的形式来表述。谨供参考。
</p>
<h3>
    记录的获取
</h3>
<p>
    获取应用的ID为1，记录号为10的记录时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.getRecord({app: &quot;1&quot;, id: &quot;10&quot;});</pre>
<h3>
    记录的批量获取
</h3>
<p>
    2020年7月的定期维护中，之后所制作的应用offset的上限为1万件，所以如果想全部获取的话，就有必要使用<a href="https://cybozudev.kf5.com/hc/kb/article/1409214">游标 API</a>
</p>
<p>
    但是，在kintone REST API Client中不必特别在意游标 API的使用，而可以像下面那样一下子获取全部记录。
</p>
<p>
    获取应用的ID为1, 字段代码为price, price为1000以上的记录时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.getAllRecords({app: &quot;1&quot;, condition: &quot;price &gt;= 1000&quot;});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">新建记录</span>
</p>
<p>
    应用ID为1, 字段代码为field_code_1里填入&quot;示例文本1&quot;的记录作成时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.addRecord({app: &quot;1&quot;, record: {field_code_1: {value: &quot;示例文本1&quot; }}});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">更新记录</span>
</p>
<p>
    应用ID为1, 记录ID为10, 字段代码为field_code_1里填入&quot;示例文本2&quot;后更新记录时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.updateRecord({app: &quot;1&quot;, id: &quot;10&quot;, record: {field_code_1: {value: &quot;示例文本2&quot;}}});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">批量更新记录</span><br>
</p>
<p>
    批量更新下面的三条记录<br>
    &nbsp;&nbsp;应用ID为1, 记录ID为10, 字段代码为field_code_1里填入&quot;示例文本1&quot;<br>
    &nbsp;&nbsp;应用ID为1, 记录ID为11, 字段代码为field_code_1里填入&quot;示例文本2&quot;<br>
    &nbsp;&nbsp;应用ID为1, 记录ID为12, 字段代码为field_code_1里填入&quot;示例文本3&quot;<br>
    时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.updateAllRecords({
  app: 1,
  // レコードは、オブジェクトの配列で指定します。
  records: [
    {id: &#39;10&#39;, record: {field_code_1: {value: &#39;示例文本1&#39;}}},
    {id: &#39;11&#39;, record: {field_code_1: {value: &#39;示例文本2&#39;}}},
    {id: &#39;12&#39;, record: {field_code_1: {value: &#39;示例文本3&#39;}}},
  ]
});</pre>
<p>
    <span style="font-size: 18px; font-weight: 700;">增补记录</span>
</p>
<p>
    所谓增补，就是指当该记录不存在时新建一条记录，该记录存在时则更新该记录的操作。
</p>
<p>
    应用ID为1, 更新字段代码为&quot;field_key&quot;, field_key的值为&quot;apple&quot;的记录, 把字段代码为field_code_1中填入&quot;示例文本1&quot;时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.upsertRecord({
  app: &quot;1&quot;, updateKey: {field: &quot;field_key&quot;, value: &quot;apple&quot; }, record: {field_code_1: {value: &quot;示例文本1&quot;}}
});</pre>
<h2>
    范例
</h2>
<p>
    下面展示使用kintone REST API Client来实现应用之间的数据的取用的范例。
</p>
<h3>
    剧本
</h3>
<p>
    准备两个应用。一个是商品列表。另一个是报价单。
    制作报价单，选取商品列表中的商品，然后根据单价和数量计算其总价。
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
    保存時に、数量分の、在庫数がなければ保存させない。在庫がある場合は、在庫引当処理を行う（商品リストアプリの在庫数をへらす）<br>※「在庫数」フィールドは今回のサンプルで追加します。
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
            &nbsp;アプリの用意<br>kintoneアプリストアにある「商品見積書パック」を選び「このアプリパックを追加」を押して追加してください。<img src="https://developer.cybozu.io/hc/article_attachments/900003118726/mceclip0.png" alt="mceclip0.png" title="" style="box-sizing: border-box; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; cursor: pointer; height: auto; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;"/>
        </p>
    </li>
    <li>
        <p>
            アプリの設定<br>商品リストアプリに、フィールド名とフィールドコードが「在庫数」のフィールドを追加してください。また、見積書アプリからルックアップするためのレコードを1つ以上登録してください。
        </p>
    </li>
</ol>
<h3>
    JavaScriptカスタマイズ
</h3>
<p>
    コードを書き、ビルドしたものを見積書アプリにアップロードしてください。<br>コードは、以下のリポジトリにも公開しています。<br><a href="https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate/tree/master/src/apps/quote">https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate/tree/master/src/apps/quote</a>
</p>
<p>
    &nbsp;ビルドやアップロード方法については<a href="https://developer.cybozu.io/hc/ja/articles/900001933483-%E7%9B%AE%E6%8C%87%E3%81%9B-JavaScript%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E4%B8%AD%E7%B4%9A%E8%80%85-%EF%BC%93-%E8%87%AA%E5%8B%95%E3%81%A7%E4%B8%80%E6%8B%AC%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E7%B7%A8-">目指せ！JavaScriptカスタマイズ中級者（３） 〜自動で一括ファイルアップロード編〜</a>などの記事を参照ください。
</p>
<p>
    4行目のアプリIDについては、環境に合わせて書き換えてください。
</p>
<p>
    <br>
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
    <br>
</p>
