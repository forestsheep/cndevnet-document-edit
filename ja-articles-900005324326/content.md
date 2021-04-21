<p>
    本次将于2021年5月9日进行定期维护，在此向大家介绍维护时与kintone API相关的更新信息。<br/>如更新通知的内容有需要添加或更改，届时将在本文章后面追加更改或新增的内容。<br/>另外，还将依次更改受API更新影响的API文档。
</p>
<h2>
    kintone API
</h2>
<h3>
    本次 kintone 更新信息
</h3>
<p>
    5月的版本中，空间首页的小部件可以根据需要而设置成显示或不显示。
 &nbsp; &nbsp;另外，伴随着这次改动，一部分的 API 和事件也相应地得到了对应。
</p>
<h3>
    kintone JavaScript API
</h3>
<h4>
    新增功能
</h4>
<p>
    5月的版本中，空间首页的各个小部件可以根据需要而设置成显示或不显示。
 &nbsp; &nbsp;改动如下所示。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <strong>以下的触发时机，由「所有的小部件渲染完成之后」から「所有不是非显示的小部件渲染完成之后」に変更されます。</strong>
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                对象 API
            </p>
        </li>
        <ul class=" list-paddingleft-2">
            <li>
                <p>
                    <a href="https://cybozudev.kf5.cn/hc/kb/article/1518697/">空间首页显示事件</a>&nbsp;space.portal.show, mobile.space.portal.show
                </p>
            </li>
        </ul>
        <li>
            <p>
                备注
            </p>
        </li>
        <ul class=" list-paddingleft-2">
            <li>
                <p>
                    5月份定期维护中，空间首页的各个小部件的显示与否（手机则是标签）可以设置了。
                </p>
            </li>
        </ul>
    </ul>
</ul>
<h4>
    改善功能
</h4>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <strong>改善了从省略形式下的 API 路径所生成的 JavaScript API，无论指定什么路径，必定会加上「.json」的行为。</strong>
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                対象 API
            </p>
        </li>
        <ul class=" list-paddingleft-2">
            <li>
                <p>
                    <a href="https://cybozudev.kf5.cn/hc/kb/article/207506#step2">获取URL（没有查询字符串）</a>&nbsp;kintone.api.url()
                </p>
            </li>
            <li>
                <p>
                    <a href="https://cybozudev.kf5.cn/hc/kb/article/207506#step3">获取URL（附有查询字符串）</a>&nbsp;kintone.api.urlForGet()
                </p>
            </li>
        </ul>
        <li>
            <p>
                修正内容<br/>kintone.api.url(&#39;/k/v1/<strong>records.json</strong>&#39;) とした場合<br/>
            </p>
        </li>
        <ul class=" list-paddingleft-2">
            <li>
                <p>
                    変更前生成的是：https://example.cybozu.cn/k/v1/r<strong>ecord.json.json</strong>
                </p>
            </li>
            <li>
                <p>
                    变更后生成的是：https://example.cybozu.cn/k/v1/<strong>record.json</strong>
                </p>
            </li>
        </ul>
        <li>
            <p>
                本次改善所带来的影响<br/>类似kintone.api.url(&#39;/k/v1/records&#39;) 这种省略「.json」的写法，是不受影响的。
            </p>
            <p>
                这些 API 本来规定是不可以加上「.json」的。<br/>加上了「.json」的话会得到在末尾再加一次「.json」的URL。<br/>今后加「.json」的话，就不会得到再加一次「.json」的结果了。
            </p>
            <p>
                使用这个 API 、请确认会不会得到像「.json.json」这种结尾的URL去访问 REST API。
            </p>
        </li>
        <li>
            <p>
                備考<br/>伴随着这次改善，<a href="https://cybozudev.kf5.com/hc/kb/article/207506#step1">发送kintone REST API请求</a>&nbsp;中也可以使用加上了「.json」的这种路径了。<br/>例如：kintone.api(&#39;/k/v1/record<strong>.json&#39;</strong>, &#39;GET&#39;, ... )
            </p>
        </li>
    </ul>
</ul>
<h3>
    kintone REST API
</h3>
<h4>
    新增功能
</h4>
<p>
    5月的版本中，空间首页的各个小部件可以根据需要而设置成显示或不显示。
 &nbsp; &nbsp;改动如下所示。
</p>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            <strong>新增了关于获取空间信息 API 的小部件的显示状态的参数</strong><br/>这些显示状态只有对启用了「使用空间门户和多主题」的空间起效。<br/>
        </p>
    </li>
    <ul class=" list-paddingleft-2" style="list-style-type: square;">
        <li>
            <p>
                対象 API
            </p>
        </li>
        <ul class=" list-paddingleft-2">
            <li>
                <p>
                    <a href="https://cybozudev.kf5.com/hc/kb/article/1303901">获取空间的信息</a>&nbsp;/k/v1/space.json
                </p>
            </li>
        </ul>
        <li>
            <p>
                备注<br/>应答参数中新增了以下参数。
            </p>
        </li>
        <ul class=" list-paddingleft-2">
            <li>
                <p>
                    showAnnouncement：「通知」的显示状态
                </p>
            </li>
            <li>
                <p>
                    showAppList：「应用列表」的显示状态
                </p>
            </li>
            <li>
                <p>
                    showMemberList：「成员列表」的显示状态
                </p>
            </li>
            <li>
                <p>
                    showThreadList：「主题列表」的显示状态
                </p>
            </li>
            <li>
                <p>
                    showRelatedLinkList：「关联链接列表」的显示状态
                </p>
            </li>
        </ul>
    </ul>
</ul>
