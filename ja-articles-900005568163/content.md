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
            26行目: event.recordの型情報を付与<br><img src="https://developer.cybozu.io/hc/article_attachments/900006342226/kintone-types-quote.png" alt="kintone-types-quote.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/><br>
        </p>
        <pre>const record = event.record as kintoneTypes.Quote;</pre>
        <p>
            &nbsp;Copyクリップボードにコピーしました
        </p>
        <p>
            とかかれた箇所ですが、これは先述の @kintone/dts-gen で作成した型定義を当てています。こうすることで、「event.record は 見積アプリのレコードですよ」ということを定義できます。<br>これを<a href="https://typescript-jp.gitbook.io/deep-dive/type-system/type-assertion">型アサーション</a>といいます。
        </p>
    </li>
    <li>
        <p>
            4行目〜18行目: 製品アプリの型定義（@kintone/rest-api-client用）<br><br>実は、<a href="https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client">@kintone/rest-api-client</a>はTypeScriptをサポートしています。<br>ただし、@kintone/rest-api-clientの型定義は、@kintone/dts-genのようにコマンドから作成することができません。<br>そのため、このように製品アプリの型を自身で用意する必要があります。<br>@kintone/rest-api-clientの型定義方法の詳細は<a href="https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/typescript.md">こちら</a>を御覧ください。
        </p>
    </li>
    <li>
        <p>
            48行目: @kintone/rest-api-clientに型情報を渡す<br><img src="https://developer.cybozu.io/hc/article_attachments/900007244643/types-definition.png" alt="types-definition.png" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/><br>
        </p>
        <pre>products = await client.record.getRecords&lt;SavedProduct&gt;({</pre>
        <p>
            &nbsp;Copyクリップボードにコピーしました
        </p>
        <p>
            としている行ですが、4行目~18行目で定義した製品アプリの型情報（SavedProduct）を渡すことで、getRecords()で返ってくるレコードは、SavedProduct型ですよと教えています。<br>これにより、REST APIから返却されたレコードについてもサジェストされるようになります。
        </p>
    </li>
</ul>
<h3>
    サンプルコードのビルド
</h3>
<p>
    ブラウザにTypeScriptを直接動作させることはできませんが、TypeScript→JavaScriptに変換できるようにWebpackの設定を追記しています。<br>ビルドコマンドを打つことで、JavaScriptに変換できるので、それをアップロードします。
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
    TypeScript自体と、それに対応するkintoneのエコシステムが醸成されてきた結果、このようにかなりよい開発体験を得ることができるようになってきました。<br>kintoneを扱う上で完全には避けられない、フィールドコードの勘違いなど、大分減らせることでバグも未然に防ぐことができ、かなりTypeScriptでkintoneをカスタマイズするのは大分魅力的だと思っています。
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
    <br>
</p>
