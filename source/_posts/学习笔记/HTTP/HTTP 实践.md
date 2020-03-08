---
title: HTTP 实践
date: 2020-03-05 11:50:31
categories:
  - 前端
tags:
  - HTTP
  - nginx
---

## 安装

```shell
brew install nginx
```

安装成功后 `nginx` 的位置在 `/usr/local/etc/nginx` 目录下.

## 启动

```shell
nginx
```

运行 `nginx` 命令没有报错说明安装启动成功, 验证方式为浏览器直接访问 [localhost](http://localhost) 查看是否成功展示 `nginx` 欢迎页面

<!-- more -->

## 配置

> 正式线上配置的 nginx 需要配置 DNS 来把域名指向我们的服务器 IP. 由于本地开发, 直接修改 hosts 即可

```hosts
12.0.0.1 quanquan.com
```

PS: 每次修改配置文件以后都要执行 `nginx -s reload` 重启 `nginx`

### 导入额外配置文件

安装 `nginx` 成功后, 其配置文件的默认配置文件为 `/usr/local/etc/nginx/nginx.conf` 文件,
打开配置文件, 取消 `include servers/*;` 这一行前边的注释, 就可以随意在 `servers` 目录下创建配置文件了. 本次笔记中只创建 `test.conf` 配置文件

### 配置一个简单的代理服务器

编写 nginx 配置文件如下
```nginx
server {
    listen 80;
    server_name quanquan.com;
    location / {
        proxy_pass http://127.0.0.1:3333;
    }
}
```

创建一个 `server` 文件
```js
const http = require('http')

http.createServer((request, response) => {
    console.log(request.headers);
    response.end('<h1>Hello world<h1>')
}).listen(3333, () => {
    console.log('the server is running~')
})
```

服务文件中, 对于所有的请求直接返回了 `<h1>Hello world<h1>`, 并且打印了请求的头信息, 可以看到以上的代理服务虽然能够成功代理到业务服务但是打印的 HOST 头信息, 变成了代理服务请求的 HOST: 127.0.0.1:3333

### 修正 HOST 头信息

把 location 块修改为以下内容即可
```conf
...
location / {
    proxy_pass http://127.0.0.1:3333;
    proxy_set_header Host $host;
}
...
```

### 配置代理缓存服务器

第一步, 指定缓存信息
```conf
proxy_cache_path /Users/quanquanluo/nginx_cache levels=1:2 keys_zone=cache:10m max_size=10g inactive=60m use_temp_path=off;
```
在此步骤中我们指定了, nginx 缓存的目录重启 nginx 之后会在指定的缓存目录创建一个

第二步, 把 location 块修改为以下内容即可
```conf
...
location / {
    proxy_cache my_cache;
    proxy_pass http://127.0.0.1:3333;
    proxy_set_header Host $host;
}
...
```

第三步, 升级 `server.js`

```js
const http = require('http')
const fs = require('fs')
const sleep = () => new Promise(resolve => setTimeout(() => resolve(), 2e3))

const img = fs.readFileSync('./test.jpg')

http.createServer(async (request, response) => {
    const {url} = request
    console.log(url);
    if (url === '/') {
        response.end('<h1>Hello world<h1><img src="/test.jpg" />')
    }

    if (url === '/test.jpg') {
        await sleep()
        response.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'max-age=5, s-maxage=10'
        })
        response.end(img)
    }

    response.end()
}).listen(3333, () => {
    console.log('the server is running~')
})
```

第四步, 通过 Vary 字段可以指定只有某个请求头一致的时候才能使用缓存

示例,
```js
response.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'max-age=5, s-maxage=10',
    Vary: 'User-Agent'
})
```

以上配置指定了只有请求头 `User-Agent` 一致的时候才能使用缓存. 这个的使用场景就是为相同的终端提供一致的缓存信息

### 在本地配置 https 服务

第一步, 生成证书.
```shell
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout localhost-privkey.pem -out localhost-cert.pem
```
执行该步骤后, 会在当前目录创建 `localhost-privkey.pem` `localhost-cert.pem` 两个文件

第二步, 修改配置爱文件中的 server 块
```nginx
server {
    listen 443 ssl;
    server_name quanquan.com;

    ssl_certificate_key    path to /localhost-privkey.pem;
    ssl_certificate        path to /localhost-cert.pem;
    ....
}
```
新版的 chrome 中, 自建的证书, 没有了不安全页面的继续访问入口. 所以有了下一步

第三步, 安装并信任刚刚创建的证书

- 在 finder 中找到生成的 localhost-cert.pem 文件并双击
- 在钥匙串登录类别中找到创建证书时候输入的证书名字, 我写的是 CN
- 双击刚刚安装的证书弹出以下图片, 按照图示设置

![2020-03-05-15-58-30](http://handle-note-img.niubishanshan.top/2020-03-05-15-58-30.png)

至此, 再通过 https 访问 `quanquan.com` 弹出的不安全页面就可以通过高级, 选择仍要前往了. 本地配置 https 环境完成

### 访问 http 自动跳转到 https

在配置文件中添加以下配置即可
```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name quanquan.com;
  return 302 https://$server_name$request_uri;
}
```

### 升级 http2

就这么一句
```nginx
listen 443 http2 ssl;
```

### 开启 http2 Server-Push

第一步, nginx 配置文件 `server` 块中添加 `http2_push_preload on;`
第二步, 升级服务代码

```js
...
if (url === '/') {
    response.writeHead(200, {
        'Link': '</test.jpg>; rel=preload; as=image'
    })
    response.end('<h1>Hello world<h1><img src="/test.jpg" />')
}
...
```
以上代码的意思是当浏览器访问 `/` 路径时, 主动向浏览器推送 test.jpg

由于, 自签名的证书构建的 https 会被浏览器标记为不安全的服务, 所以浏览器上看不到效果...

但是这个语法是没有问题的~

## 参考文章

[HTTP/2 服务器推送（Server Push）教程](http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)
[HTTP、HTTP2.0、SPDY、HTTPS 你应该知道的一些事](https://www.cnblogs.com/wujiaolong/p/5172e1f7e9924644172b64cb2c41fc58.html)
