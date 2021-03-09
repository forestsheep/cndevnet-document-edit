<h2>
    Index
</h2>
<h2>
    kintone UI Component是什么
</h2>
<p>
    kintone UI Component是类kintone UI风的组件的集成库。<br>可以利用在 kintone 自定义或插件的UI组件开发上。<br>本文中讲介绍 kintone UI Component v1 的功能。<br>在 v1 中，提供了桌面电脑版和手机版。<br>所支持的组件在文档网站&nbsp;<a href="https://kintone-ui-component.netlify.app/docs/components/desktop/button">Components</a>（日文）&nbsp;中可供查看。
</p>
<h3>
    Github
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://github.com/kintone-labs/kintone-ui-component">https://github.com/kintone-labs/kintone-ui-component</a>
        </p>
    </li>
</ul>
<h3>
    文档
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://kintone-ui-component.netlify.app/">https://kintone-ui-component.netlify.app</a>（日文）
        </p>
    </li>
</ul>
<h4>
    发行说明
</h4>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://kintone-ui-component.netlify.app/blog/2021/03/04/v1.0.0-release-notes">https://kintone-ui-component.netlify.app/blog/2021/03/04/v1.0.0-release-notes</a>（日文）
        </p>
    </li>
</ul>
<p>
    发行说明中介绍了 V1 的发行背景以及版本升级的内容。
</p>
<h3>
    kintone UI Component（v1以后）的支持方针
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            关于 kintone UI Component 的规格，不提供技术上的支持。<br>如需咨询请参考<a href="https://faq.cybozu.info/alphascope/cybozu/web/kintone/Detail.aspx?id=1763">支持的询问方式</a>（日文）。
        </p>
    </li>
    <li>
        <p>
            其他&nbsp;<a href="https://github.com/kintone-labs/kintone-ui-component/issues/new/choose">GitHub Issue</a>&nbsp;，疑问，或需求等也欢迎提出。
        </p>
    </li>
    <li>
        <p>
            在版权说明的允许的范围内，您可以进行改写代码，再次发行等商业活动。<br>版权说明的种类在客户端的库页面或 GitHub 的仓库页面里找到。
        </p>
    </li>
</ul>
<h2>
    导入方法
</h2>
<p>
    请参考文档网站&nbsp;<a href="https://kintone-ui-component.netlify.app/docs/getting-started/quick-start">Quick Start</a>（日文）
</p>
<p class="operaCheck">
    &nbsp;v0 的使用方法请参考&nbsp;<a href="https://cybozudev.kf5.com/hc/kb/article/1228393/">使用“kintone UI Component​”轻松创建kintone风格的UI组件</a><br>另外如果您正在考虑升级新版本的话，可以参考&nbsp;<a href="https://kintone-ui-component.netlify.app/docs/guides/comparison-v0-v1">v0 和 v1 写法上的区别</a>
</p>
<h2>
    特徴
</h2>
<h3>
    デスクトップ版、モバイル版それぞれに対応した UI パーツ
</h3>
<p>
    デスクトップ版だけでなくモバイル版にも対応した UI パーツが実装されています。<br>ここでは、Button と MobileCheckbox をご紹介します。
</p>
<h4>
    Button
</h4>
<pre class="brush:js;toolbar:false">(function() {    
&#39;use strict&#39;;    
// レコード詳細画面    
kintone.events.on(&#39;app.record.index.show&#39;, function(event) {    
var header = kintone.app.getHeaderMenuSpaceElement();    
var button = new Kuc.Button({    
text: &#39;sample&#39;,    
type: &#39;submit&#39;,    
className: &#39;options-class&#39;,    
id: &#39;options-id&#39;,    
visible: true,    
disabled: false    
});    
header.appendChild(button);    
button.addEventListener(&#39;click&#39;, function(event) {    
console.log(event);    
});    
return event;    
});    
})();</pre>
<p>
    <br><img src="https://developer.cybozu.io/hc/article_attachments/900006426766/KUCv1_button.png" alt="KUCv1_button.png" width="472" height="255" title="" style="border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; height: auto; color: rgb(74, 74, 74); font-family: helvetica, arial, &quot;hiragino kaku gothic pro&quot;, meiryo, &quot;ms pgothic&quot;, sans-serif; font-size: 15.4px; background-color: rgb(250, 250, 250);"/>&nbsp;
</p>
<p>
    <br>
</p>
<h4>
    MobileCheckbox
</h4>
<pre class="brush:js;toolbar:false">(function(){    
&#39;use strict&#39;;    
kintone.events.on(&#39;mobile.app.record.detail.show&#39;, function(event){    
var space = kintone.mobile.app.record.getSpaceElement(&#39;mobileSpace&#39;);    
var checkbox = new Kuc.MobileCheckbox({    
label: &#39;Fruit&#39;,    
requiredIcon: true,    
items: [{    
label: &#39;orange&#39;,    
value: &#39;Orange&#39;    
},{    
label: &#39;apple&#39;,    
value: &#39;Apple&#39;    
}],    
value: [&#39;Orange&#39;],    
itemLayout: &#39;horizontal&#39;,    
className: &#39;options-class&#39;,    
id: &#39;options-id&#39;,    
visible: true,    
disabled: false,    
borderVisible: true    
});    
space.appendChild(checkbox);    
checkbox.addEventListener(&#39;change&#39;, function(event) {    
console.log(event);    
});    
return event;    
});    
})();</pre>
<p>
    <br><img src="https://developer.cybozu.io/hc/article_attachments/900007325923/KUCv1_mobilecheckbox.png" alt="KUCv1_mobilecheckbox.png" width="289" height="496" style="border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221); max-width: 800px; vertical-align: middle; height: auto; color: rgb(74, 74, 74); font-family: helvetica, arial, &quot;hiragino kaku gothic pro&quot;, meiryo, &quot;ms pgothic&quot;, sans-serif; font-size: 15.4px; background-color: rgb(250, 250, 250);"/>&nbsp;
</p>
<p>
    <br>
</p>
<h3>
    kintone パーツの再現度の向上
</h3>
<p>
    各コンポーネントは kintone 標準パーツの UI や挙動を忠実に再現しています。<br>ここでは、コンポーネントと標準パーツをキャプチャで比較します。
</p>
<table>
    <thead>
        <tr class="firstRow">
            <td>
                パーツ
            </td>
            <td>
                kintone UI Component
            </td>
            <td>
                標準パーツ
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                Dropdown
            </td>
            <td>
                <img src="https://developer.cybozu.io/hc/article_attachments/900006426786/KUCv1_dropdown.png" alt="KUCv1_dropdown.png" width="350" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
            </td>
            <td>
                <img src="https://developer.cybozu.io/hc/article_attachments/900007325943/kintone_dropdown.png" alt="kintone_dropdown.png" width="350" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
            </td>
        </tr>
        <tr>
            <td>
                Mobile TextArea
            </td>
            <td>
                <img src="https://developer.cybozu.io/hc/article_attachments/900006426806/KUCv1_textarea.png" alt="KUCv1_textarea.png" width="350" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
            </td>
            <td>
                <img src="https://developer.cybozu.io/hc/article_attachments/900006426826/kintone_TextArea.png" alt="kintone_TextArea.png" width="350" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
            </td>
        </tr>
    </tbody>
</table>
<p>
    必須アイコン表示/非表示の設定が行えたり、空欄時に入力例として表示されるテキストを設定できたりと、<br>標準機能で行える設定をコンポーネントでも実装できるようになり、より使いやすくなりました。
</p>
<h3>
    プロパティでの宣言
</h3>
<p>
    コンポーネントに保存する値はプロパティでの宣言となっていて、JavaScript の標準関数を用いたコーディングが可能です。<br>JavaScript の書き方に近いことで、開発に携わって間もない方にも開発に慣れている方にも使いやすくなっています。
</p>
<h4>
    サンプルコード
</h4>
<pre class="brush:js;toolbar:false">var kintoneHeaderSpace = kintone.app.getHeaderMenuSpaceElement();    
var button = new Kuc.Button({    
text: &#39;sample&#39;    
});    
button.text = &#39;update&#39;;    
kintoneHeaderSpace.appendChild(button);</pre>
<h3>
    ClassName、ID の指定
</h3>
<p>
    各パーツの ClassName と ID をそれぞれ指定できます。<br>設定したいパーツごとに CSS を適用したり、ID を指定したりと細かな設定もカスタマイズに反映できます。
</p>
<h3>
    アクセシビリティ対応
</h3>
<p>
    キー操作、読み上げ等のアクセシビリティに対応しました。<br>利用する OS ごとに設定方法が異なるため、お使いの OS をご確認して設定してください。
</p>
<h2>
    注意事項
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            v1 は JavaScript 版のみの提供です。React 版はありません。
        </p>
    </li>
    <li>
        <p>
            IE11 では正常に動作しないためご留意ください。<br>詳しくは<a href="https://kintone-ui-component.netlify.app/docs/getting-started/quick-start#%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E5%AF%BE%E5%BF%9C%E7%8A%B6%E6%B3%81">ブラウザ対応状況</a>をご確認ください。
        </p>
    </li>
</ul>
<h2>
    更新履歴
</h2>
<p>
    今後の対応コンポーネントの追加など、機能の更新履歴や最新情報は下記の開発元のページをご確認ください。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            GitHub Releases:&nbsp;<a href="https://github.com/kintone-labs/kintone-ui-component/releases">https://github.com/kintone-labs/kintone-ui-component/releases</a>
        </p>
    </li>
    <li>
        <p>
            リリースノート:&nbsp;<a href="https://kintone-ui-component.netlify.app/blog">https://kintone-ui-component.netlify.app/blog</a>
        </p>
    </li>
</ul>
<h2>
    おわりに
</h2>
<p>
    kintone UI Component を使うと、自作では時間のかかるカスタマイズも簡単に行うことができます。<br>「kintone で使われているボタンやドロップダウンパーツを再現したいけど自作するのは大変だな」と感じている方にも、<br>より効率的に開発を行いたいと感じている方にも、是非ご利用いただければと思います。
</p>
<p>
    このTipsは、2021年1月版 kintone および kintone UI Component v1.0.0 で確認したものになります。
</p>
<p>
    <br>
</p>