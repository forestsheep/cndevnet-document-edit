<p>
    # 向JavaScript自定义中级开发者的目标前进（5）〜TypeScript导入篇〜
</p>
<h2>
    前言
</h2>
<p>
    为了更加便捷地在kintone中使用TypeScript，这次我们将演练如何使用<a href="https://github.com/kintone/js-sdk/tree/master/packages/dts-gen#readme">@kintone/dts-gen</a>和<a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">kintone JavaScript Client (@kintone/rest-api-client)</a>这两个工具来编写TypeScript。<br>关于如何用TypeScript来自定义kintone的基本方法，本网站的另一篇文章<a href="https://cybozudev.kf5.com/hc/kb/article/1427187">使用TypeScript开发kintone自定义</a>中有所介绍。大家可以自行参考。
</p>
<h2>
    什么是TypeScript？TypeScript的优点
</h2>
<p>
    TypeScript是Microsoft开发的开源编程软件。使得在JavaScript中可以添加变量的类型。
</p>
<p>
    “类型”指的是为了明确变量中所赋的值，是数值，还是字符串等种类而事先声明的。<br>除了数值、字符串等基本类型以外，用户还可以声明自定义类型。<br>因为有了“类型”信息，所以即使不去读取变量中的数据，也可以在编写代码时就知道数据类型，这样可以避免很多bug的产生。
</p>
<p>
    例如：从kintone API中获取到的数值、计算字段的数字其实不是数值型而是字符串，直接进行乘法运算的话就会被预判为错误。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            对数值、计算字段直接进行乘法运报错的例子<br>计算字段的「合计金额」&nbsp; &quot;record.合计金额.value * 0.1&quot; 中的乘法运算会显示为error。<br><img/>
        </p>
    </li>
</ul>
<p>
    除此之外，类似对象中没有指定的key之类的也会被IDE判断为error。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            访问对象时error的例子。<br>给对象 &quot;record.字符串.value&quot; 赋值时，由于实际上不存在“字符串”这个字段，所以显示了error。<br><img src=""/>
        </p>
    </li>
</ul>
<p>
    TypeScript准备了kintone应用中各个字段的类型信息，基于这些信息，可以避免上述kintone字段代码的错误输入。<br>特别是处理表格中深层复杂的结构、REST API 的request参数、response时可以发挥明显的效果。
</p>
<p>
    实际操作起来会如何呢？让我们来试一下。
</p>
<h2>
    准备
</h2>
<p>
    代码:&nbsp;<a href="https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate">https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate</a>
</p>
<p>
    请使用 git clone 或者链接右上方的绿色按钮 Clone or download 来下载 Zip 文件。<br>之后的操作方法请参考上述页面中的 Readme。
</p>
<p>
    &nbsp;上述代码的URL在<a href="https://cybozudev.kf5.com/hc/kb/article/1412604">向JavaScript自定义中级开发者的目标前进（１） 〜webpack篇〜</a>到（４）中所提到的都是同一代码。<br>在之前的文章中已经试过的用户，为以防万一，可以在目录下再次执行 npm install。
</p>
<p>
    设置的细节之后会介绍，到此为止使用TypeScript所需要的包都安装完毕了。
</p>
<h2>
    范例
</h2>
<p>
    我们使用第4篇文章<a href="https://cybozudev.kf5.com/hc/kb/article/1465334">向JavaScript自定义中级开发者的目标前进（４）〜kintone REST API Client篇〜</a>中的范例，就如何用TypeScript改写来演示一下。<br>使用到的应用也是相同的，所以请大家按第4篇来配置好应用。
</p>
<h3>
    “类型”信息的获取
</h3>
<p>
    在实际编写代码前，需要事先定义好应用中的字段类型。使用&nbsp;<a href="https://github.com/kintone/js-sdk/tree/master/packages/dts-gen">@kintone/dts-gen</a>&nbsp;这个库来获取应用字段的类型。<br>执行下列代码，获取报价单的字段类型。所生成的文件叫做类型定义文件。
</p>
<p>
    在此范例中，我们已经放置了类型定义文件。 通过执行下列代码，您环境中的应用的字段类型会覆盖类型定义文件。
</p>
<pre class="brush:js;toolbar:false">npx @kintone/dts-gen --host https://kintone的域名.cybozu.cn/ -u 用户名 -p 密码 --app-id 应用ID --type-name Quote --namespace KintoneTypes -o src/types/Quote.d.ts</pre>
<p>
    这次的范例中，使用了报价单应用和商品应用，但只用JavaScriptAPI改写报价单应用的值、所以用 @kintone/dts-gen 只生成了报价单应用字段的类型定义文件。商品应用使用REST API来改写，所以需要另外在范例大妈中定义类型。
</p>
<p>
    命令执行成功后，会生成像下面这样的文件
</p>
<p>
    文件: src/types/Quote.d.ts
</p>
<pre class="brush:js;toolbar:false">
declare namespace KintoneTypes {
  interface Quote {
    No: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    文字列__複数行_: kintone.fieldTypes.MultiLineText;
    日付: kintone.fieldTypes.Date;
    合計金額: kintone.fieldTypes.Calc;
    見積明細: {
      type: "SUBTABLE";
      value: {
        id: string;
        value: {
          単価: kintone.fieldTypes.Number;
          数量: kintone.fieldTypes.Number;
          型番: kintone.fieldTypes.SingleLineText;
          商品名: kintone.fieldTypes.SingleLineText;
          小計: kintone.fieldTypes.Calc;
        };
      }[];
    };
  }
  interface SavedQuote extends Quote {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
</pre>
<h3>
    范例代码
</h3>
<p>
    文件: src/apps/quote_ts/index.ts
</p>
<pre class="brush:js;toolbar:false">

import {KintoneRestAPIClient, KintoneRecordField} from '@kintone/rest-api-client';

// 製品アプリの型を定義
type SavedProduct = {
  $id: KintoneRecordField.ID;
  $revision: KintoneRecordField.Revision;
  更新者: KintoneRecordField.Modifier;
  作成者: KintoneRecordField.Creator;
  レコード番号: KintoneRecordField.RecordNumber;
  更新日時: KintoneRecordField.UpdatedTime;
  作成日時: KintoneRecordField.CreatedTime;
  ラジオボタン: KintoneRecordField.RadioButton;
  文字列__複数行__0: KintoneRecordField.MultiLineText;
  型番: KintoneRecordField.SingleLineText;
  商品名: KintoneRecordField.SingleLineText;
  数値: KintoneRecordField.Number;
  在庫数: KintoneRecordField.Number;
}

// 商品アプリのアプリIDを入力してください
const productsAppId = 122;

const events = ['app.record.create.submit', 'app.record.edit.submit'];

kintone.events.on(events, async (event) => {
  const record = event.record as KintoneTypes.Quote;

  // kintoneへ接続するためのインスタンスを作成
  const client = new KintoneRestAPIClient({});

  // 今回はコード簡略化のために、テーブルの商品は重複禁止とします。
  // ただの簡易的な重複チェックなので意味は理解しなくてOKです。
  const hasDuplicatedRow = record.見積明細.value.some((rowA, indexA, arr) => {
    return arr.find(
      (rowB, indexB) =>
        indexA !== indexB && rowA.value.型番.value === rowB.value.型番.value
    );
  });
  if (hasDuplicatedRow) {
    event.error = '重複した商品は登録できません。';
    return event;
  }

  // テーブルに入っている商品レコードを取得
  let products;
  try {
    // Genericに型を指定することで, products変数を利用する際に型推論ができる
    products = await client.record.getRecords<SavedProduct>({
      app: productsAppId,
      query: `型番 in (${record.見積明細.value
        .map((row) => `"${row.value.型番.value}"`)
        .join(', ')})`,
    });
  } catch (error) {
    event.error = 'レコードの取得に失敗しました';
    return event;
  }

  // 商品リストの在庫数を差し引いたデータを作成
  const deductedProductRecords = products.records.map((productRecord) => {
    const tableRow = record.見積明細.value.find(
      (row) => productRecord.型番.value === row.value.型番.value
    );

    // アップデートのキーとなる型番と, 差し引いた在庫数を格納する。
    return {
      型番: {
        value: productRecord.型番.value,
      },
      在庫数: {
        value:
          Number(productRecord.在庫数.value) -
          Number(tableRow?.value.数量.value),
      },
    };
  });

  // 在庫数を差し引いたあと在庫数が0未満になるようなレコードがないか確認
  const noStockRecords = deductedProductRecords.filter(
    (productRecord) => Number(productRecord.在庫数.value) < 0
  );

  // 差し引き1未満のレコードがでた場合はエラーとみなしレコードの作成をストップさせる
  if (noStockRecords.length > 0) {
    // event.errorにデータをいれたあとeventを返すとレコードの作成をストップできる
    // どの商品が問題か示すために在庫が足りない商品の型番を列挙する
    event.error = `在庫がない商品があります。型番 ${noStockRecords
      .map((productRecord) => productRecord.型番.value)
      .join(', ')}`;

    return event;
  }

  // 問題なければアップデート
  try {
    await client.record.updateRecords({
      app: productsAppId,
      records: deductedProductRecords.map((productRecord) => {
        return {
          updateKey: {
            field: '型番',
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
});
</pre>
<p>
    请实际编辑一下，尝试查看27行附近的record中的内容，然后看看Visual Studio Code会发生什么吧。
</p>
<p>
    就像下方的图片那样，输入「record.」后，报价应用的字段就会出现在提示框中了。
</p>
<p>
    <img src="https://developer.cybozu.io/hc/article_attachments/900007244463/suggestion.gif" alt="suggestion.gif" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
</p>
<h3>
    范例代码的说明
</h3>
<p>
    由于篇幅关系不能表尽TypeScript，在此就范例代码大致要点做一些介绍。
</p>
<p>
    其实，和第四篇所介绍的代码基本没有什么不同。如下所示，只有类型信息的处理上有所不同。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            第26行: 申明event.record的类型信息<br><img src="https://developer.cybozu.io/hc/article_attachments/900006342226/kintone-types-quote.png" alt="kintone-types-quote.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/><br>
        </p>
        <pre class="brush:js;toolbar:false">const record = event.record as kintoneTypes.Quote;</pre>
        <p>
            这里指的是之前讲到的用 @kintone/dts-gen 所作成的类型。这么做可以定义「event.record 是报价应用的的记录哦」这件事。<br>这就是所谓的<a href="https://typescript-jp.gitbook.io/deep-dive/type-system/type-assertion">类型断言（日文）</a>
        </p>
    </li>
    <li>
        <p>
            第4行〜第18行: 产品应用的类型定义（@kintone/rest-api-client）<br><br>实际上<a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">@kintone/rest-api-client</a>是支持TypeScript的。<br>但是，@kintone/rest-api-client 的类型定义不是像 @kintone/dts-gen 一样是用命令行完成的。<br>所以，必须像这样准备好产品应用自身的类型。<br>@kintone/rest-api-client的类型定义的详细方法请参照<a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/typescript.md">这里</a>
        </p>
    </li>
    <li>
        <p>
            第48行: 向 @kintone/rest-api-client 里传递类型信息<br><img src="https://developer.cybozu.io/hc/article_attachments/900007244643/types-definition.png" alt="types-definition.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/><br>
        </p>
        <pre class="brush:js;toolbar:false">products = await client.record.getRecords&lt;SavedProduct&gt;({</pre>
        <p>
            这一行，通过把第4行~第18行所定义的产品应用的类型信息（SavedProduct）传递过去，告诉我们得到getRecords()所返回的记录是SavedProduct类型。<br>这样，REST API 所返回的记录就会得到提示框的支持了。
        </p>
    </li>
</ul>
<h3>
    范例代码的编译
</h3>
<p>
    我们不能在浏览器里直接执行TypeScript，但可以通过webpack把TypeScript转换成JavaScript。<br>输入以下命令，转换完之后再上传。
</p>
<pre class="brush:js;toolbar:false">npx webpack --mode production</pre>
<p>
    详细信息请参照<a href="https://cybozudev.kf5.com/hc/kb/article/1426229">向JavaScript自定义中级开发者的目标前进（３） 〜自动批量上传文件篇〜</a>还具有自动上传功能。
</p>
<h2>
    结束语
</h2>
<p>
    把 TypeScript 和 kintone 的生态环境相互酝酿结合，得到了相当不错的开发体验。<br>在处理 kintone 字段的过程中，不可避免地需要进行对照字段代码等繁琐又容易出错的工作。而使用 TypeScript 的特性，便可将此防范于未然，对于开发者来说是一大福音。
</p>
<p>
    如果对本篇文章感兴趣的话，十分建议借此契机开始学习 TypeScript。TypeScript 如今备受瞩目，相信将来一定可以在开发中起到非常重要的作用。
</p>
<p>
    该Tips在 kintone 2021年2月版，@kintone/rest-api-client@1.10.0 中进行过确认。
</p>
