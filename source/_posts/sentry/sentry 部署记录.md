---
title: sentry 部署记录
date: 2020-11-13 13:50:31
categories:
  - 工程化
tags:
  - docker
  - sentry
---

## 安装 docker

执行命令, 一键安装

```bash
curl -sSL https://get.daocloud.io/docker | sh
```

## 安装 docker-compose

- 利用国内镜像安装 `docker-compose` 实测秒下
    ```bash
    curl -L "https://get.daocloud.io/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```

- 设置可运行
    ```bash
    chmod +x /usr/local/bin/docker-compose
    ```

ps: 如果没有执行这个命令的话, 使用 `docker-compose` 命令会报 `Permission Denied`

## 配置阿里云加速器

访问[阿里云镜像网址](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors?spm=5176.12901015.0.i12901015.76b5525caiPyWb)

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://r3tdolb4.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 安装 git

```bash
yum install git -y
```

## 获取 sentry

- 访问[onpremise](https://github.com/luoquanquan/onpremise.git)
- `git clone https://github.com/luoquanquan/onpremise.git`
- `git checkout bjh-sentry` 切换到项目专用分支
- 执行 `./install.sh`, 安装 `sentry`

安装过程中会提示是否创建管理员的邮箱. 可以这会儿创建, 也可以安装完成以后再创建. 安装完成后, 使用命令 `docker-compose up` 就可以启动 sentry. 访问 {IP:9000} 可以访问到相关内容.

## 安装 nginx

- 执行 `yum install nginx -y` 在宿主机安装 `nginx`
- 修改 `nginx.conf`(默认路径 `/usr/nginx/nginx.conf`)
- 把 `sentry` 对应的域名指向本地 `9000` 端口号
- well done

`nginx` 默认限制的可上传文件大小是 `1m`, 但是项目中稍微大一点的 `sourceMap` 文件就会超出限制报 `413` 请求包体过大的错误. 需要在 nginx 配置文件 `http` 配置中添加 `client_max_body_size 50m;` 就行了...

## sentry 后台管理页面限制内网访问

正常情况下, 判断内网直接使用 `nginx` 内置变量 `$remote_addr` 即可, 我们这里由于使用的环境是集群的环境, 所以需要判断的是 `$proxy_add_x_forwarded_for`, 在 `nginx/nginx.conf` 文件中添加一下内容.

```nginx
location / {
    if ($proxy_add_x_forwarded_for !~* ^111\.206\.214\.28.*) {
        add_header Content-Type "text/plain; chartset=utf-8";
        return 200 "you don't have access to visit this app, please contact the Administrator ~"
    }

    proxy_pass http://sentry;
}
```
