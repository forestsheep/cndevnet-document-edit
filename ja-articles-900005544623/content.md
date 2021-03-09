<h2>
    Index
</h2>
<h2>
    kintone UI Component是什么
</h2>
<p>
    kintone UI Component是类kintone UI风的组件的集成库。<br>可以利用在 kintone 自定义或插件的UI组件开发上。<br>本文中讲介绍 kintone UI Component v1 的功能。<br>在 v1 中，提供了电脑版和手机版。<br>所支持的组件在文档网站&nbsp;<a href="https://kintone-ui-component.netlify.app/docs/components/desktop/button">Components</a>（日文）&nbsp;中可供查看。
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
    &nbsp;v0 的使用方法请参考&nbsp;<a href="https://cybozudev.kf5.com/hc/kb/article/1228393/">使用“kintone UI Component​”轻松创建kintone风格的UI组件</a>。<br>另外如果您正在考虑升级新版本的话，可以参考&nbsp;<a href="https://kintone-ui-component.netlify.app/docs/guides/comparison-v0-v1">v0 和 v1 写法上的区别</a>（日文）。
</p>
<h2>
    特征
</h2>
<h3>
    电脑版和手机版各自对应的 UI 组件
</h3>
<p>
    不仅仅是电脑版，我们也开发了手机版的 UI 组件<br>在这里，我们来对Button 和 MobileCheckbox 来做一些介绍。
</p>
<h4>
    Button
</h4>
<pre class="brush:js;toolbar:false">(function() {    
&#39;use strict&#39;;    
// 记录详细画面    
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
<br>
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
    kintone 组件的相似度的提高
</h3>
<p>
    各组件忠实地再现了 kintone 标准组件的 UI 和动作<br>在这里，我们截图比较一下 v1 组件和标准组件.
</p>
<table>
    <thead>
        <tr class="firstRow">
            <td>
                组件
            </td>
            <td>
                kintone UI Component
            </td>
            <td>
                标准组件
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
    必须输入的图标显示与否的设置，未输入时的样例显示字符串的设置等<br>标准功能也可以实装，非常方便。
</p>
<h3>
    在属性中申明
</h3>
<p>
    用属性的方式申明并保存组件的值，可以使用 JavaScript 标准函数来编写代码。<br>由于和 JavaScript 的写法类似，使得新手和老手都可以非常方便的使用。
</p>
<h4>
    示例代码
</h4>
<pre class="brush:js;toolbar:false">var kintoneHeaderSpace = kintone.app.getHeaderMenuSpaceElement();    
var button = new Kuc.Button({    
text: &#39;sample&#39;    
});    
button.text = &#39;update&#39;;    
kintoneHeaderSpace.appendChild(button);</pre>
<h3>
    ClassName、ID 的指定
</h3>
<p>
    各组件的 ClassName 和 ID 都可以分别指定。<br>通过对各个件分别设置 CSS，以达到微调效果。
</p>
<h3>
    无障碍
</h3>
<p>
    我们对应了键盘操作，语音等无障碍访问功能。<br>由于各 OS 的设置方法不尽相同，您可以根据所使用的 OS 进行确认。
</p>
<h2>
    注意事项
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            v1 只提供 JavaScript 版。没有 React 版。
        </p>
    </li>
    <li>
        <p>
            在IE11下不能正常运作，请注意。<br>详情见<a href="https://kintone-ui-component.netlify.app/docs/getting-started/quick-start#%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E5%AF%BE%E5%BF%9C%E7%8A%B6%E6%B3%81">浏览器对应状况</a>。
        </p>
    </li>
</ul>
<h2>
    更新履歴
</h2>
<p>
    今后有组件的追加或是功能的更新，下面的开发商的链接中有最新情报，可以随时确认。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            GitHub Releases:&nbsp;<a href="https://github.com/kintone-labs/kintone-ui-component/releases">https://github.com/kintone-labs/kintone-ui-component/releases</a>
        </p>
    </li>
    <li>
        <p>
            发行说明:&nbsp;<a href="https://kintone-ui-component.netlify.app/blog">https://kintone-ui-component.netlify.app/blog</a>（日文）
        </p>
    </li>
</ul>
<h2>
    结束语
</h2>
<p>
    使用kintone UI Component，可以让费时费力的自定义开发成为一件简单的事情。<br>「自己来制作 kintone 风的按钮或下拉框之类的组件会很麻烦吧」。对有这种感叹的<br>或是想获得更高效率的开发人士，非常推荐使用本软件。
</p>
<p class="operaCheck">
    此Tips在2021年1月版的 kintone 和 kintone UI Component v1.0.0 中确认过。
</p>
