<h2>
    Index
</h2>
<ul class="anchor-link list-paddingleft-2">
    <li>
        <p>
            <a href="#section1">前言</a>
        </p>
    </li>
    <li>
        <p>
            <a href="#section2">可以做的事</a>
        </p>
    </li>
    <li>
        <p>
            <a href="#section3">前提环境</a>
        </p>
    </li>
    <li>
        <p>
            <a href="#section4">步骤</a>
        </p>
    </li>
    <li>
        <p>
            <a href="#section5">需要的对应</a>
        </p>
    </li>
    <li>
        <p>
            <a href="#section6">使用了所涉及库的文章列表</a>
        </p>
    </li>
    <li>
        <p>
            <a href="#section7">关联情报</a>
        </p>
    </li>
</ul>
<h2>
    前言
</h2>
<p>
    本篇将向您介绍如何利用浏览器的开发工具来确认是否引用了Cybozu CDN的 jqGrid 和 Handsontable。
</p>
<h2>
    可以做的事
</h2>
<p>
    在现在打开的画面中，就可以确认是否引用了Cybozu CDN的 jqGrid 和 Handsontable。
用这个方法，不能确定具体是哪个应用使用了所涉及库。
</p>
<h3>
    不清楚应用是否使用了库的时候
</h3>
<p>
    如果您是参考本网站的文章进行自定义开发，而那篇文章中指明使用了所涉及库的时候，那有可能是已经用到了。
</p>
<p>
    请查看<a href="#section6">使用了所涉及库的文章列表</a>一节
</p>
<p>
    或者您可以询问当时自定义开发员。
</p>
<h2>
    前提环境
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            本指南是针对在 Google Chrome 浏览器中使用 kintone 的
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;情况下进行确认。
        </p>
    </li>
    <li>
        <p>
            必须具有所确认应用的阅览权限。
        </p>
    </li>
</ul>
<h2>
    步骤
</h2>
<p>
    在kintone 的各个应用一览画面或者首页，进行以下操作。
</p>
<ol class=" list-paddingleft-2">
    <li>
        <p>
            点击 Google Chrome 的[更多工具] &gt; [开发者工具]
        </p>
    </li>
    <li>
        <p>
            「Sources」标签的左侧树型结构中，找到像图中所展示的「js.cybozu.com」或「js.kintone.com」または「js.cybozu.cn」<br/><strong>如果没有，则表明该应用（如果是在kintone首页中确认，则表明全体自定义）没有用到 Cybozu CDN。</strong><br/><img src="https://files.kf5.com/attachments/download/23361/12299109/0016139af55b61a8a31b4a2cf4ff7de/" alt="0016139af55b61a8a31b4a2cf4ff7de"/>
        </p>
    </li>
    <li>
        <p>
            如果有的话，请单击「js.cybozu.com」或「js.kintone.com」或「js.cybozu.cn」左侧的[▶]记号。<br/>会显示出「｛Cybozu CDN 库名｝/｛版本｝」一览表<br/>※只显示「｛Cybozu CDN 库名｝」不显示版本的话，点击「｛Cybozu CDN 库名｝」左侧的[▶]记号，则可以看到版本号。<br/><img src="https://files.kf5.com/attachments/download/23361/12299114/0016139af5d81cf40a475fab3435040/" alt="0016139af5d81cf40a475fab3435040"/>
        </p>
    </li>
    <li>
        <p>
            确认是否需要对应。符合以下情况之一，需要对应。
        </p>
    </li>
</ol>
<ul class=" list-paddingleft-2" style="list-style-type: square;">
    <li>
        <p>
            <strong>库名是「jqGrid」且版本在 4.7.1 以上</strong>
        </p>
    </li>
    <li>
        <p>
            <strong>库名是「handsontable」且版本在 7.0.0 以上</strong>
        </p>
    </li>
</ul>
<h2>
    需要的对应
</h2>
<p>
    使用了所涉及库的话，请参照下面的链接进行对应。
</p>
<p>
    <a href="https://dev.kf5.com">Cybozu CDN 许可证对应指南</a>
</p>
<h2>
    使用了所涉及库的文章列表
</h2>
<h3>
    jqGrid
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/202640870">予算アプリと実績アプリの集計表をカスタマイズビューに表示する（日文）</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/207605686">予算と実績をリアルタイムに把握する経費精算システムパッケージ（日文）</a>
        </p>
    </li>
</ul>
<h3>
    HandsonTable
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://cybozudev.kf5.com/hc/kb/article/1013129">kintone电子表格程序</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://cybozudev.kf5.com/hc/kb/article/1014085">使用kintone的电子表格插件来实现Excel风格的UI</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://cybozudev.kf5.com/hc/kb/article/1015004/">通过Handsontable在kintone上实现像Excel一样编辑数据 之系列1</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/207331836">Handsontableを使ってkintoneをExcelライクに入力しよう その2 （日文）</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/207605686">予算と実績をリアルタイムに把握する経費精算システムパッケージ （日文）</a>
        </p>
    </li>
</ul>
<h2>
    关联情报
</h2>
<p>
    <a href="https://developer.cybozu.io/hc/ja/articles/4405430903833">Cybozu CDN からの jqGrid、Handsontable 配信停止について （日文）</a>
</p>
<p>
    <br/>
</p>
