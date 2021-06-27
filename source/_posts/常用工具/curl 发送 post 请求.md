---
title: curl 发送 post 请求
date: 2021-06-26 15:10:31
categories:
  - 工具
tags:
  - curl
  - post
---

## 启动测试服务

使用 node 启动一个 server 服务, 用于返回请求信息 ~

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({method: req.method, headers: req.headers }));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

首先, 在控制台执行 `node` 并执行以上代码.
然后, 通过浏览器方位 `http://127.0.0.1:3000/` 能够返回内容说明测试服务启动成功.

默认情况下返回内容如下:
```json
{
  "method": "GET",
  "headers": {
    "host": "127.0.0.1:3000",
    "connection": "keep-alive",
    "pragma": "no-cache",
    "cache-control": "no-cache",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
    "sec-ch-ua-mobile": "?0",
    "dnt": "1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-fetch-site": "none",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "cookie": "_ga=GA1.1.589824147.1622638110"
  }
}
```

## 测试各种命令

- 使用 curl 发送 get 请求

```bash
curl http://127.0.0.1:3000
```

- 使用 curl 发送 post 请求

```bash
curl -XPOST http://127.0.0.1:3000
```

- 携带请求头

```bash
curl -XPOST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
http://127.0.0.1:3000
```

- 携带 Cookie 的请求

```bash
curl -XPOST \
-v --cookie "name=quanquan; age=18" \
http://127.0.0.1:3000
```
