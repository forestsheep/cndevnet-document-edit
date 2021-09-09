<h2>
    前言
</h2>
<p>
    根据 <a href="https://developer.cybozu.io/hc/ja/articles/4405430903833">Cybozu CDN からの jqGrid、Handsontable 配信停止について （日文）</a>中所提到的<br/>截止到2022年2月28日，Cybozu CDN 不再提供 jqGrid、Handsontable 一部分版本的引用。
</p>
<p>
    现在向正在使用这些库的用户，说明对应的方法。
</p>
<h3>
    对象
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <strong>jqGrid：版本 4.7.1 以上</strong>
        </p>
    </li>
    <li>
        <p>
            <strong>Handsontable：版本 7.0.0 以上</strong>
        </p>
    </li>
</ul>
<p>
    请参照下面的指南确认是否涉及该库
</p>
<p>
    <a href="https://cybozudev.kf5.com/hc/kb/article/1521802/">Cybozu CDN 使用状况确认指南</a>
</p>
<h2>
    对应方法
</h2>
<p>
    如果使用了所涉及到的库，请在下列中选择一项进行对应
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/4405898445465#method1">有償ライセンスを別途購入の上、利用を継続する</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/4405898445465#method2">無償ライセンスのバージョンに変更し、利用を継続する</a>
        </p>
    </li>
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/4405898445465#method3">当該ライブラリの利用を中止する</a>
        </p>
    </li>
</ul>
<p>
    如继续使用，则在自定义画面中的以下文件需要变更。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <strong>jqGrid：jquery.jqGrid.min.js、grid.locale-ja.js（以本地为准）、ui.jqgrid.css</strong>
        </p>
    </li>
    <li>
        <p>
            <strong>Handsontable：handsontable.full.min.js、handsontable.full.min.css<br/></strong>※ 如实际情况和上述不符，请以实际设置中的状况为准。
        </p>
    </li>
</ul>
<p>
    变更自定义文件的时候，请不要更改原本文件排列顺序。否则可能造成不能正常运行。
</p>
<p>
    <strong>变更后的画面示例（适用于URL）<br/></strong><img src="https://developer.cybozu.io/hc/article_attachments/4405563501849/license_guide-01.png" alt="URLによる適用の場合の画面例" title="" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/>
</p>
<p>
    <strong>变更后的画面示例（适用于文件）<br/><img src="https://developer.cybozu.io/hc/article_attachments/4405571134233/license_guide-02.png" alt="ファイルによる適用の場合の画面例" title="" style="border-width:1px;border-style:solid;border-color:rgb(221,221,221);max-width:800px;vertical-align:middle;height:auto;"/></strong>
</p>
<h3>
    购买有偿许可，继续使用
</h3>
<p>
    从库的提供者处购买有偿许可，并切换引用。
</p>
<ol class=" list-paddingleft-2">
    <li>
        <p>
            购买许可，获取文件<br/><strong>jqGrid ：</strong><br/><a href="http://guriddo.net/?page_id=103334">在 Guriddo 的主页</a>&nbsp;购买有偿许可，根据说明获取文件。<br/><br/><strong>Handsontable ：</strong><br/><a href="https://handsontable.com/pricing">在 Handsontable 的主页</a>&nbsp;购买有偿许可，根据说明获取文件。<br/><br/>
        </p>
    </li>
    <li>
        <p>
            切换自定义的设置<br/>在「通过JavaScript / CSS自定义」画面、删除既存的文件，替换成获取到的文件。
        </p>
    </li>
</ol>
<h3>
    变更为无偿的许可版本，继续使用。
</h3>
<p>
    从Cybozu CDN 或其他 CDN 服务中获取 URL，<br/>或者在库的提供元的 GitHub 中获取文件，切换到无偿许可。
</p>
<p>
    这个方法是将库的版本降级，使用中的自定义内容可能会不工作。请务必进行动作确认。如果不运作的话，请修改自定义。
</p>
<p>
    可供无偿使用的版本号如下。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <strong>jqGrid ：4.7.1 之前的版本</strong>
        </p>
    </li>
    <li>
        <p>
            <strong>Handsontable ：7.0.0 之前的版本</strong>
        </p>
    </li>
</ul>
<ol class=" list-paddingleft-2">
    <li>
        <p>
            获取 URL 或者文件<br/>获取 Cybozu CDN（<a href="https://cybozudev.kf5.com/hc/kb/article/206405/#step2-13">jqGrid</a>&nbsp;和&nbsp;<a href="https://cybozudev.kf5.com/hc/kb/article/206405/#step2-11">Handsontable</a>&nbsp;所在处）或者其他 CDN 服务所提供的文件的地址。<br/><br/>或者从库提供者的 GitHub 中获取文件。<br/><strong>jqGrid （以版本 4.7.0 为例）：</strong><br/><a href="https://github.com/tonytomov/jqGrid/releases/tag/v4.7.0">https://github.com/tonytomov/jqGrid/releases/tag/v4.7.0</a>&nbsp;下载后将「Source code(zip)」解压缩，<br/>得到「js」「css」目录下的同名文件。<br/><br/><strong>Handsontable （以版本 6.2.2 为例）：<br/></strong><a href="https://github.com/handsontable/handsontable/releases/tag/6.2.2">https://github.com/handsontable/handsontable/releases/tag/6.2.2</a>&nbsp;下载后将「Source code(zip)」解压缩，得到「dist」目录下的同名文件。<br/><br/>
        </p>
    </li>
    <li>
        <p>
            切换自定义的设置<br/>在「通过JavaScript / CSS自定义」画面、删除既存的文件，替换成获取到的文件。
        </p>
    </li>
</ol>
<h3>
    停止使用涉及到的库
</h3>
<p>
    如要停止使用涉及到的库，在「通过JavaScript / CSS自定义」画面中将既存的库 URL 或 JavaScript 文件删除。
</p>
<h2>
    使用 kintone 插件的对应
</h2>
<p>
    如在 kintone 插件中使用了所涉及到的库，请在下列中选择一项进行对应。
</p>
<h3>
   继续使用涉及到的库（有偿或无偿）
</h3>
<p>
    如果是自己开发的插件，则可以在删除该库的 URL，替换成按「对应方法」中说明的获取到的 URL 或绑定文件。进行再打包。<br/>详细内容请参照<a href="https://cybozudev.kf5.com/hc/kb/article/1000664/">kintone 插件开发流程</a>
</p>
<p>
    如果是第三方提供的插件，则可以向提供者进行咨询。
</p>
<h3>
    停止使用涉及到的库
</h3>
<p>
    如要停止使用涉及到的库，可以在应用的管理画面中将插件设置为无效，或者删除插件。
</p>
<h2>
    参考情报
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            Cybozu CDN 不提供 Handsontable 脆弱性的补丁版本。
        </p>
    </li>
    <li>
        <p>
            <a href="https://free-jqgrid.github.io/jqGrid/">free-jqgrid</a>&nbsp;是一个提供和 jqgrid 相似功能的无偿第三方库。可以在责任自负的前提下自行判断是否将其作为 jqgrid 替代方案。
        </p>
    </li>
</ul>
<h2>
    关联情报
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <a href="https://developer.cybozu.io/hc/ja/articles/4405430903833">关于 Cybozu CDN 停止提供 jqGrid、Handsontable 引用的通知</a>
        </p>
    </li>
</ul>
<p>
    <br/>
</p>
