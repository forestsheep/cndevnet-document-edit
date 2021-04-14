<h2>
    导出用户所使用的服务信息 API（JSON）
</h2>
<p>
    此API用于通过 JSON 格式导出用户所使用的服务信息。
</p>
<h3>
    HTTP 方法
</h3>
<p>
    GET
</p>
<h3>
    URI
</h3>
<p>
    https://{subdomain}.cybozu.com/v1/users/services.json
</p>
<h3>
    请求头部
</h3>
<table>
    <tbody>
        <tr class="firstRow">
            <td>
                头部
            </td>
            <td>
                值和说明
            </td>
        </tr>
        <tr>
            <td>
                X-Cybozu-Authorization
            </td>
            <td>
                请指定为对「登录名:密码」进行 BASE64 编码之后的值。
            </td>
        </tr>
        <tr>
            <td>
                Authorization
            </td>
            <td>
                Basic 认证启用的情况下，请指定为对字符串「Basic」和「登录名:密码」进行 BASE64 编码之后的值。
            </td>
        </tr>
    </tbody>
</table>
<p>
    &nbsp;
</p>
<pre class="brush:plain;toolbar:false">// Sample
X-Cybozu-Authorization: QWRtaW5pc3RyYXRvcjpjeWJvenU=
Authorization: Basic QWRtaW5pc3RyYXRvcjpjeWJvenU=</pre>
<h3>
    导出参数
</h3>
<table>
    <tbody>
        <tr class="firstRow">
            <td>
                参数名
            </td>
            <td>
                类型
            </td>
            <td>
                必须
            </td>
            <td>
                说明
            </td>
        </tr>
        <tr>
            <td>
                codes
            </td>
            <td>
                数组
            </td>
            <td>
                可省略
            </td>
            <td>
                想要获取的用户的 code 的一览<br/>如省略，则以全用户为对象，取最大100条。
            </td>
        </tr>
        <tr>
            <td>
                offset
            </td>
            <td>
                数值
            </td>
            <td>
                可省略
            </td>
            <td>
                偏移量<br/>如省略，则取0。
            </td>
        </tr>
        <tr>
            <td>
                size
            </td>
            <td>
                数值
            </td>
            <td>
                可省略
            </td>
            <td>
                取得件数<br/>如省略，则取100。
            </td>
        </tr>
    </tbody>
</table>
<h4>
    用 HTTP 请求发送参数
</h4>
<p>
    查询字符串
</p>
<pre class="brush:plain;toolbar:false">codes[0]=1&amp;codes[1]=2&amp;codes[2]=3&amp;offset=0&amp;size=100</pre>
<p>
    包含在请求头部的字符串
</p>
<pre class="brush:plain;toolbar:false">GET /v1/users/services.json?codes[0]=1&amp;codes[1]=2&amp;codes[2]=3&amp;offset=0&amp;size=100 HTTP/1.1
Host: example.cybozu.com:443
X-Cybozu-Authorization: QWRtaW5pc3RyYXRvcjpjeWJvenU=
Authorization: Basic QWRtaW5pc3RyYXRvcjpjeWJvenU=</pre>
<ul class=" list-paddingleft-2">
    <li>
        <p>
            不需要 Content-Type
        </p>
    </li>
</ul>
<h3>
    应答
</h3>
<h4>
    参数
</h4>
<table>
    <tbody>
        <tr class="firstRow">
            <td>
                参数名
            </td>
            <td>
                值得种类
            </td>
            <td>
                说明
            </td>
        </tr>
        <tr>
            <td>
                users
            </td>
            <td>
                数组
            </td>
            <td>
                用户使用的服务信息一览<br/>按用户ID得升序排列。
            </td>
        </tr>
        <tr>
            <td>
                users[].code
            </td>
            <td>
                字符串
            </td>
            <td>
                用户编号
            </td>
        </tr>
        <tr>
            <td>
                users[].services
            </td>
            <td>
                数组
            </td>
            <td>
                使用中的服务名<br/>用且只用以下的字符串构成。
                <ul class=" list-paddingleft-2">
                    <li>
                        <p>
                            kintone
                        </p>
                    </li>
                </ul>如该用户没有使用任何服务，则返回空的数组。<br/>kitone的服务代码是 ki
            </td>
        </tr>
    </tbody>
</table>
<h4>
    应答的范例
</h4>
<pre class="brush:plain;toolbar:false">
{
  "users": [
    {
      "code": "user1",
      "services": ["kintone", "garoon"]
    },
    {
      "code": "user2",
      "services": ["kintone", "garoon"]
    }
  ]
}
</pre>
<h3>
    权限
</h3>
<p>
    所有的用户都可以使用。
</p>
