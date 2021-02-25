## 通知条件（提醒）的获取
这是获取通知条件（提醒）的API。

### URI
URI根据正式环境还是测试环境的不同而不同。

#### 正式环境的设置值获取时
https://(子域名).cybozu.com/k/v1/app/notifications/reminder.json

来宾空间的应用: https://(子域名).cybozu.com/k/guest/(スペースの ID)/v1/app/notifications/reminder.json

#### 测试环境的设置值获取时
https://(子域名).cybozu.com/k/v1/preview/app/notifications/reminder.json
来宾空间的应用: https://(子域名).cybozu.com/k/guest/(スペースの ID)/v1/preview/app/notifications/reminder.json

### HTTP方法
GET

### 需要的权限
应用的管理权限

### 请求的参数

|参数名   |值类型   |必须|说明|
|---|--------|---|---|
|app|数值或字符串|必须|指定为应用的ID|
|lang|字符串||字段或选择项的名字设置为【多语言对应】时，指定取得语言的名称<br> <ui><li>获取日语的名字时，指定为:ja</li><li>获取英语的名字时，指定为:en</li><li>获取中文的名字时，指定为:zh</li><li>获取登录者所设置的语言时，指定为:user*</li>&nbsp;&nbsp;*登录者所设置的语言是【与Web浏览器的设置相同】时，<br>&nbsp;&nbsp;头部里有Accept-Language的话，会获取到所设置的值，<br>&nbsp;&nbsp;头部里没有Accept-Language的话，会获取到cybozu.cn共通管理中的本地化设置中所设置的语言<li>获取默认的名称时，指定为:default</li></ui>省略时，会取到默认的名称|

#### 请求的范例
发送的请求根据参数的设置方式而不同。参数指定了【app】和【lang】的请求的范例如下所示。
**URL上带有参数时**
```
GET /k/v1/app/notifications/reminder.json?app=1&lang=ja HTTP/1.1
    Host: example.cybozu.com:443
    X-Cybozu-Authorization: QWRtaW5pc3RyYXRvcjpjeWJvenU=
    Authorization: Basic QWRtaW5pc3RyYXRvcjpjeWJvenU=
```
**请求正文里带有参数时**
头部
```
GET /k/v1/app/notifications/reminder.json HTTP/1.1
  Host: example.cybozu.com:443
  X-Cybozu-Authorization: QWRtaW5pc3RyYXRvcjpjeWJvenU=
  Authorization: Basic QWRtaW5pc3RyYXRvcjpjeWJvenU=
```
正文
```
{
  "app": 1,
  "lang": "ja"
}
```

### 应答参数
| 参数名 | 值类型 | 说明 |
|---|---|---|
| notifications  |  数组 | 通知条件的数组  |
| notifications[].timing  |  对象 | 通知时间的对象  |
| notifications[].timing.code  |  字符串 | 通知时间的基准日时所设置字段的字段代码  |
| notifications[].timing.daysLater  |  字符串 | 基准日时前后（几天）的设置值<br>基准日时之前用负整数表示  |
| notifications[].timing.hoursLater  |  字符串 | 基准日时加上daysLater的时间前后（几小时）的设置值<br>基准日时之前用负整数表示  |
| notifications[].timing.time  |  字符串 | 基准日加上daysLater后当天的几点的设置值<br>基准日时所表示的字段里设置为绝对时刻的或者是日期字段时，会返回这一项  |
| notifications[].fiterCond  |  字符串 | 提醒的通知条件，会以查询语句的形式表示<br>关于查询语句的格式，可以参考下面的链接<br>[批量获取记录（在查询中指定条件）](https://cybozudev.kf5.com/hc/kb/article/201594/#step2)<br>如指定了已删除用户、组织、团体的话，会返回错误信息  |
| notifications[].title  |  字符串 | 提醒通知条件的内容  |
| notifications[].targets  |  数组 |  通知对象的数组 |
| notifications[].targets[].entity  |  对象 | 通知对象  |
| notifications[].targets[].entity.type  |  字符串 | 通知对象的类型<ul><li>USER:用户</li><li>GROUP:团体</li><li>ORGANIZATION:组织</li><li>FIELD_ENTITY:创建者·更新这·作业者·用户选择·组织选择·团体选择字段</li></ul>  |
| notifications[].targets[].entity.code  |  字符串 | 通知对象的代码<br>根据notifications[].targets[].entity.type 的值，会返回下列值<ul><li>FIELD_ENTITY时:创建者·更新这·作业者·用户选择·组织选择·团体选择字段的字段代码</li><li>其他情况:通知的对象</li></ul>如果是来宾，则在登录名的前面加上【guest/】  |
| notifications[].targets[].includeSubs  |  布尔值 | 下级组织继承设置与否<br>notifications[].targets[].entity.type 是 ORGANIZATION 或者FIELD_ENTITY 里的组织选择字段没有被指定时、永远返回 false <br>true:继承<br>false:不继承  |
| timezone  |  字符串 | 提醒时间的时区<br>通知条件（提醒）从来没有被设置过时，返回 null  |
| revision  |  字符串 | 应用设置的修订版本号  |

#### 应答的范例
```

{
  "notifications": [
    {
      "timing": {
        "code": "创建日期",
        "daysLater": "1",
        "hoursLater": "2"
      },
      "filterCond": "用户选择字段 in (\"user1\")",
      "title": "提醒",
      "targets": [
        {
          "entity": {
            "type": "USER",
            "code": "user1"
          },
          "includeSubs": false
        }
      ]
    },
    {
      "timing": {
        "code": "创建日期",
        "daysLater": "-3",
        "time": "08:30"
      },
      "filterCond": "用户选择字段 in (\"user1\")",
      "title": "提醒",
      "targets": [
        {
          "entity": {
            "type": "USER",
            "code": "user1"
          },
          "includeSubs": false
        }
      ]
    }
  ],
  "timezone": "Asia/Tokyo",
  "revision": "2"
}
```
### JavaScript范例
**[kintone Rest API](https://cybozudev.kf5.com/hc/kb/article/207506/)**
```

var body = {
    'app': kintone.app.getId(),
    'lang': 'ja'
  };

  kintone.api(kintone.api.url('/k/v1/app/notifications/reminder', true), 'GET', body, function(resp) {
    // success
    console.log(resp);
  }, function(error) {
    // error
    console.log(error);
  });
```

**XMLHttpRequest**
```

var appId = kintone.app.getId();
var url = 'https://{subdomain}.cybozu.com/k/v1/app/notifications/reminder.json?app=' + appId + '&lang=ja';

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
xhr.onload = function() {
  if (xhr.status === 200) {
    // success
    console.log(JSON.parse(xhr.responseText));
  } else {
    // error
    console.log(JSON.parse(xhr.responseText));
  }
};

xhr.send();
```
