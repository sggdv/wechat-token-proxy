# wechat-token-proxy
wechat-token-proxy 是一个获取微信 *access_token* 和 *ticket* 的服务。它能使调用微信公众号各接口的各个业务逻辑点共享 *access_token* 和 *ticket* ，避免产生冲突。

说到这个冲突，就得先了解微信的 *access_token* 。引用微信官方的描述：

> access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。

> 如果第三方不使用中控服务器，而是选择各个业务逻辑点各自去刷新access_token，那么就可能会产生冲突，导致服务不稳定。

> [详见微信官网](http://mp.weixin.qq.com/wiki/11/0e4b294685f817b95cbed85ba5e82b8f.html)

微信限定每天只能调用2000次刷新access_token的接口。换言之，每次调用公众号接口时都刷新access_token的话，很有可能超出2000次/日的限制。

开发 wechat-token-proxy 的目的，是为了让众多的业务逻辑点能和谐调用微信公众号的接口，共享access_token，减少一个令业务服务不稳定的因素。

## 项目文件说明

|文件名|功能简介|
|:--------:|------|
|conf/wx_config.json|设置微信 app_id 和 app_secret|
|destinations/wx_flush_access_token.js|获取access_token|
|shipper.js|将access_token写到文件, 或读取access_token|
|refresher/wx_access_token.json|此文件保存access_token的值|
|schedule.js|定时执行wx_flush_access_token.js|
|app.js|通过http方式输出json格式的access_token|
|conf/access.json|设置允许访问此服务的 IP 或 域名|

## 如何使用

由于使用了 *express* 框架，启动 *wechat-token-proxy* 只需要执行 *app.js* 文件。具体步骤如下：

* clone 项目
```bash
git clone https://github.com/sggdv/wechat-token-proxy.git
```


* 进入 *wechat-token-proxy* 文件夹，并安装依赖模块
```bash
cd wechat-token-proxy
npm install
```

* 设置 *conf/wx_config.json* 和 *conf/access.json* 两个文件。
*wx_config.json* 内容如下：
```bash
{
	"app_id": "微信公众号的AppID",
    "app_secret": "微信公众号的AppSecret"
}
```
*access.json* 内容如下：
```bash
{
	"ip": ["127.0.0.1"],
	"hostname": ["localhost"]
}
```

* 启动项目
```bash
node app.js
```
* 打开浏览器
访问 [http://localhost:3000](http://localhost:3000) 获取 *access_token*；
访问 [http://localhost:3000/ticket](http://localhost:3000/ticket) 获取 *ticket*。

## License
[MIT](LICENSE)
