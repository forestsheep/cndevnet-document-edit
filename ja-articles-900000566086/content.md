<p>
    # 向JavaScript自定义中级开发者的目标前进（４）〜kintone REST API Client篇〜
</p>
<h2>
    前言
</h2>
<p>
    我们曾在<a href="https://cybozudev.kf5.com/hc/kb/article/1412604">向JavaScript自定义中级开发者的目标前进（１） 〜webpack篇〜</a>中介绍了为了自定义多个应用所如何去使用Webpack。<br/>这次，我们准备向大家介绍如何同样用Webpack环境，来安装和使用kintone REST API Client来使得处理kintone REST API更为方便。
</p>
<h2>
    kintone REST API Client是什么
</h2>
<p>
    获取全部记录，UPSERT（记录已存在的话更新，否则新建）等<br/>通过使用kintone REST API来更简单地操作记录和应用的方便的工具。
</p>
<p>
    ※本来，有着相同用途的库——<a href="https://github.com/kintone/kintone-js-sdk">kintone JS SDK</a>，但是现在不推荐使用了。<br/>之前如果您一直在使用kintone JS SDK的话，<br/>借这次介绍的机会，非常推荐您尝试一下kintone REST API Client。
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
    这样，安装完成后，kintone REST API Client就可以使用了。<br/>如果您是初次使用，可以参考下面文章中的Quick Start章节
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
    文档中有各个项目的函数说明、参数和返回值等说明。英语中不能理解的部分，请用翻译网站等可以帮助理解。<br/><br/>1. 函数名<br/>2. 函数的说明<br/>3. 函数的返回值<br/>4. 函数的参数
</p>
<h2>
    <img src="https://developer.cybozu.io/hc/article_attachments/900003563006/js-sdk_record_md_at_master___kintone_js-sdk.png" alt="js-sdk_record_md_at_master___kintone_js-sdk.png" title="" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
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
    <span style="font-size:18px;font-weight:700;">新建记录</span>
</p>
<p>
    应用ID为1, 字段代码为field_code_1里填入&quot;示例文本1&quot;的记录作成时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.addRecord({app: &quot;1&quot;, record: {field_code_1: {value: &quot;示例文本1&quot; }}});</pre>
<p>
    <span style="font-size:18px;font-weight:700;">更新记录</span>
</p>
<p>
    应用ID为1, 记录ID为10, 字段代码为field_code_1里填入&quot;示例文本2&quot;后更新记录时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.updateRecord({app: &quot;1&quot;, id: &quot;10&quot;, record: {field_code_1: {value: &quot;示例文本2&quot;}}});</pre>
<p>
    <span style="font-size:18px;font-weight:700;">批量更新记录</span><br/>
</p>
<p>
    批量更新下面的三条记录<br/>
 &nbsp; &nbsp;&nbsp;&nbsp;应用ID为1, 记录ID为11, 字段代码为field_code_1里填入&quot;示例文本1&quot;<br/>
 &nbsp; &nbsp;&nbsp;&nbsp;应用ID为1, 记录ID为12, 字段代码为field_code_2里填入&quot;示例文本2&quot;<br/>
 &nbsp; &nbsp;&nbsp;&nbsp;应用ID为1, 记录ID为13, 字段代码为field_code_3里填入&quot;示例文本3&quot;<br/>
 &nbsp; &nbsp;时做如下操作
</p>
<pre class="brush:js;toolbar:false">const res = await client.record.updateAllRecords({
  app: 1,
  // レコードは、オブジェクトの配列で指定します。
  records: [
    {id: &#39;11&#39;, record: {field_code_1: {value: &#39;示例文本1&#39;}}},
    {id: &#39;12&#39;, record: {field_code_2: {value: &#39;示例文本2&#39;}}},
    {id: &#39;13&#39;, record: {field_code_3: {value: &#39;示例文本3&#39;}}},
  ]
});</pre>
<p>
    <span style="font-size:18px;font-weight:700;">增补记录</span>
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
 &nbsp; &nbsp;制作报价单时，用Lookup组件来选取商品列表中的商品。
</p>
<p>
    然后，制作一个符合下列要求的自定义JavaScript。
</p>
<ol class=" list-paddingleft-2">
    <li>
        <p>
            制作报价单时（保存时），选择商品的数量会使得商品得在库数量减少。
        </p>
    </li>
    <li>
        <p>
            制作报价单时（保存时），选择商品的数量大于在库数量时会保错。
        </p>
    </li>
</ol>
<h3>
    保存时的样子
</h3>
<p>
    保存时，所选数量大于在库数不能保存。在库数足够时减去相应数量。
</p>
<p>
    <img src="https://developer.cybozu.io/hc/article_attachments/900003502703/mceclip0.png" alt="mceclip0.png" title="" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
</p>
<h3>
    应用的准备
</h3>
<h4>
    1. 下载模板文件
</h4>
<p>
    <a href="https://files.kf5.com/attachments/download/23361/11551719/001606ea15248cbd9c3b067e3cc7865/">模板文件</a>
</p>
<h4>
    2. 创建应用
</h4>
<p>
    创建应用时选择【通过导入模板文件创建】，选择刚才下载的模板文件来创建。成功后你会发现【商品列表】和【报价单】两个应用已经创建好了。
</p>
<h4>
    3. 在商品列表中加入至少一条记录，并填好在库数量。
</h4>
<h3>
    自定义JavaScript
</h3>
<p>
    写完代码，把编译好的代码上传到报价单应用中。
</p>
<p>
    &nbsp;编译和上传的方法请参考<a href="https://cybozudev.kf5.com/hc/kb/article/1426229">向JavaScript自定义中级开发者的目标前进（３） 〜自动批量上传文件篇〜</a>中所记述内容。
</p>
<p>
    第四行中的应用id，请根据实际情况更换。
</p>
<pre class="brush:js;toolbar:false">import { KintoneRestAPIClient } from &#39;@kintone/rest-api-client&#39;
// 商品列表的应用id
const productsAppId = 12
const events = [&#39;app.record.create.submit&#39;, &#39;app.record.edit.submit&#39;]
kintone.events.on(events, async (event) =&gt; {
  const { record } = event
  // kintone连接的实例
  const client = new KintoneRestAPIClient()
  // 这次为了简便，表中的商品不允许重复。
  // 只是简易的重复检查，不理解也没关系。
  const hasDuplicatedRow = record.报价明细.value.some((rowA, indexA, arr) =&gt; {
    return arr.find((rowB, indexB) =&gt; indexA !== indexB &amp;&amp; rowA.value.型号.value === rowB.value.型号.value)
  })
  if (hasDuplicatedRow) {
    event.error = &#39;不允许选择重复的商品&#39;
    return event
  }
  // 获取表中的商品记录
  let products
  try {
    products = await client.record.getRecords({
      app: productsAppId,
      query: `型号 in (${record.报价明细.value.map((row) =&gt; `&quot;${row.value.型号.value}&quot;`).join(&#39;, &#39;)})`,
    })
  } catch (error) {
    event.error = &#39;获取记录失败&#39;
    return event
  }
  // 在商品列表的库存中减去相应数量
  const deductedProductRecords = products.records.map((productRecord) =&gt; {
    const tableRow = record.报价明细.value.find((row) =&gt; productRecord.型号.value === row.value.型号.value)
    // 存放型号值和计算后的库存值
    return {
      型号: {
        value: productRecord.型号.value,
      },
      在库数量: {
        value: Number(productRecord.在库数量.value) - Number(tableRow.value.数量.value),
      },
    }
  })
  // 计算后的库存值是否有小于0的情况
  const noStockRecords = deductedProductRecords.filter((productRecord) =&gt; Number(productRecord.在库数量.value) &lt; 0)
  // 存在1条以上记录时报错并跳过保存
  if (noStockRecords.length &gt; 0) {
    // event.error中存放错误信息后返回
    // 列出出问题的商品型号
    event.error = `存在库存不够的商品。型号 ${noStockRecords
      .map((productRecord) =&gt; productRecord.型号.value)
      .join(&#39;, &#39;)}`
    return event
  }
  // 没有问题的话更新
  try {
    await client.record.updateRecords({
      app: productsAppId,
      records: deductedProductRecords.map((productRecord) =&gt; {
        return {
          updateKey: {
            field: &#39;型号&#39;,
            value: productRecord.型号.value,
          },
          record: {
            在库数量: {
              value: productRecord.在库数量.value,
            },
          },
        }
      }),
    })
  } catch (error) {
    event.error = `更新失败 ${error.message}`
    return event
  }
  return event
})</pre>
<p>
    <br/>
</p>
<p>
    上传完成后，确认下有没有实现预想功能。
</p>
<h3>
    结束语
</h3>
<p>
    直接使用kintone的JavaScript API虽然一点问题也没有，但是如果使用kintone REST API Client的话，可以更简单的实现数据的存取。非常推荐您尝试一下。
</p>
