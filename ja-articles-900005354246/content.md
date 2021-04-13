<h2>
    获取 PC 版下空间首页上的空白元素
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            PC 版下只有勾选了「使用空间门户和多主题」才有效。
        </p>
    </li>
    <li>
        <p>
            元素的外观受 kintone 的 CSS 影响，所以不保证显示效果完全一样。
        </p>
    </li>
</ul>
<h3>
    空间的首页
</h3>
<p>
    <img src="https://files.kf5.com/attachments/download/23361/11575360/00160753f5a59932b0b72be0f9d2d8d/" style=""/>
</p>
<h3>
    通知详细画面
</h3>
<p>
    <img src="https://files.kf5.com/attachments/download/23361/11575361/00160753f641cef5b62e67947d73d6d/" style=""/>
</p>
<h3>
    函数
</h3>
<p>
    kintone.space.portal.getContentSpaceElement()
</p>
<h3>
    参数
</h3>
<p>
    无
</p>
<h3>
    返回值
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            返回空间的首页上方空白部分的元素。
        </p>
    </li>
    <li>
        <p>
            不可使用画面会返回null。
        </p>
    </li>
    <li>
        <p>
            来宾账号永远返回null。
        </p>
    </li>
    <li>
        <p>
            在空间显示事件外调用，不会发生 JavaScript 错误。会返回null或者元素。
        </p>
    </li>
</ul>
<h3>
    范例
</h3>
<pre class="brush:js;toolbar:false">var el = kintone.space.portal.getContentSpaceElement();</pre>
<h3>
    可以使用的页面（PC 版）
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            空间的首页
        </p>
    </li>
    <li>
        <p>
            通知详细页面 ※1
        </p>
    </li>
</ul>
<p>
    ※1 通知页面的详细内容中，显示空间的首页的情况下，可以使用。
</p>
<h2>
    获取手机版空间首页上方的空白元素
</h2>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            手机版下只有勾选了「使用空间门户和多主题」才有效。
        </p>
    </li>
    <li>
        <p>
            元素的外观受 kintone 的 CSS 影响，所以不保证显示效果完全一样。
        </p>
    </li>
</ul>
<h3>
    空间的首页
</h3>
<p>
    <img src="https://files.kf5.com/attachments/download/23361/11575363/00160753f65b7f8b8ff0ea5aec77c6b/" style=""/>
</p>
<h3>
    函数
</h3>
<p>
    kintone.mobile.space.portal.getContentSpaceElement()
</p>
<h3>
    参数
</h3>
<p>
    无
</p>
<h3>
    返回值
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            返回空间的首页上方空白部分的元素。
        </p>
    </li>
    <li>
        <p>
            不可使用画面会返回null。
        </p>
    </li>
    <li>
        <p>
            来宾账号永远返回null。
        </p>
    </li>
    <li>
        <p>
            在空间显示事件外调用，不会发生 JavaScript 错误。会返回null或者元素。
        </p>
    </li>
</ul>
<h3>
    范例
</h3>
<p>
    <span style="font-size:20px;"></span>var el = kintone.mobile.space.portal.getContentSpaceElement();
</p>
<h3>
    可以使用的页面（手机版）
</h3>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            空间首页
        </p>
    </li>
</ul>
<p>
    <br/>
</p>
