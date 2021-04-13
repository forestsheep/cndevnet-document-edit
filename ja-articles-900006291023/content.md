# 空间显示事件
<h2>
    空间首页显示后的事件
</h2>
<p>
    
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            只对启用了「使用空间门户和多主题」的空间起效。
        </p>
    </li>
    <li>
        <p>
            对来宾空间不起效。
        </p>
    </li>
    <li>
        <p>
            所有的部件加载完成之后才会发生。
        </p>
    </li>
    <li>
        <p>
             返回了 kintone.Promise 对象后，会等待异步处理完成后开始下一步处理。
        </p>
    </li>
</ul>
<h3>
    事件类型
</h3>
<table>
    <tbody>
        <tr class="firstRow">
            <th>
                环境
            </th>
            <th>
                事件类型
            </th>
            <th>
                事件发生时机
            </th>
        </tr>
        <tr>
            <td>
                PC 用
            </td>
            <td>
                space.portal.show
            </td>
            <td>
                空间首页显示的时候
            </td>
        </tr>
        <tr>
            <td>
                手机用
            </td>
            <td>
                mobile.space.portal.show
            </td>
            <td>
                手机空间首页显示的时候
            </td>
        </tr>
    </tbody>
</table>
<h3>
    event对象的属性
</h3>
<table>
    <tbody>
        <tr class="firstRow">
            <th>
                属性名
            </th>
            <th>
                类型
            </th>
            <th>
                说明
            </th>
        </tr>
        <tr>
            <td>
                spaceId
            </td>
            <td>
                字符串
            </td>
            <td>
                空间 ID
            </td>
        </tr>
    </tbody>
</table>
<h3>
    可以用event对象执行的操作
</h3>
<h4>
    等待异步处理完成后执行下一步处理
</h4>
<p>
    返回 kintone.Promise 对象，可以等待异步处理完成后执行 event 对象的操作。<br>
    向同一个事件注册多个句柄，会发生错误。Thenable 对象被舍弃时，后续的句柄不能得到执行。<br>
    具体写法请参照<a href="https://cybozudev.kf5.com/hc/kb/article/1319666">kintone的Promise基本写法</a>
</p>
<h3>
    范例
</h3>
<p>
    空间首页显示时显示警告信息。
</p>
<p>
    <br>
</p>
<p>
    <pre class="brush:js;toolbar:false">kintone.events.on(&#39;space.portal.show&#39;, function(event) {
  window.alert(&#39;空间首页打开了&#39;);
  return event;
});
</p>
