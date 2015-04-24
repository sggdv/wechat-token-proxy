# wechat-token-proxy
wechat-token-proxy 是一个获取微信access_token的服务。它能使调用微信公众号各接口的各个业务逻辑点共享access_token，避免产生冲突。

说到这个冲突，就得先了解微信的access_token。引用微信官方的描述：

> access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。

> 如果第三方不使用中控服务器，而是选择各个业务逻辑点各自去刷新access_token，那么就可能会产生冲突，导致服务不稳定。

微信限定每天只能调用2000次刷新access_token的接口。换言之，每次调用公众号接口时都刷新access_token的话，很有可能超出2000次/日的限制。

开发 wechat-token-proxy 的目的，是为了让众多的业务逻辑点能和谐调用微信公众号的接口，共享access_token，减少一个令业务服务不稳定的因素。

|文件名|简介|
|:--------:|------|
|wx_config.json|设置微信 app_id 和 app_secret|
|wx_flush_access_token.js|获取access_token|
|shipper.js|将access_token写到文件|
|wx_access_token.json|此文件保存access_token的值|
|schedule.js|定时执行wx_get_access_token.js|
|app.js|通过http方式输出json格式的access_token|
|public/status.html|查看中控服务器执行状态|

## License
[MIT](LICENSE)
