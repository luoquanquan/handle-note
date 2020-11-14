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
yum install git
```

## 获取 sentry

- 访问[onpremise](https://github.com/getsentry/onpremise)
- `git clone https://github.com/getsentry/onpremise.git`
- `git checkout -b 分支名 {你喜欢的版本号}`
- 执行 `./install.sh`, 安装 `sentry`

安装过程中会提示是否创建管理员的邮箱. 可以这会儿创建, 也可以安装完成以后再创建.
