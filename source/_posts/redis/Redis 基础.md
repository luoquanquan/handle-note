---
title: Redis 基础
date: 2020-01-28 20:50:31
categories:
  - 后端
tags:
  - 数据库
  - Redis
---

## 安装

```shell
brew install redis
```

## 配置文件路径

```shell
/usr/local/etc/redis.conf
```

## 启动

```shell
# 前台启动
redis-server

# 后台启动
redis-server &
```

## 客户端 cli

```shell
redis-cli
```

## redis 数据类型

- string 字符串 `get set getrange incr decr expire`
- hash 对象 `hset hget hdel hmget hgetall`
- 列表 数组 `lpush lpop lrange lrem lindex rpush rpop ...`
- set 集合
  - 无序集合 `sadd smembers srem sunion sinter sdiff`
  - 有序集合 `zadd zrange withscores`

## 操作

### 通用

- 查看 redis 中的所有 keys
```shell
keys *
```

- 删除一条记录
```shell
del a
```

- 查看记录值的类型
```shell
type a
```

- 给某条记录设置有效时间
```shell
expire a 5
```

- 查看某条记录的有效时间
```shell
ttl a
```

### 字符串相关

- 设置一条记录
```shell
set a 1
```

- 获取记录
```shell
get a
```

- 让某条记录自增
```shell
incr a
```

- 让某条记录自减
```shell
decr a
```

- 获取某条记录指定范围内的值
```shell
set name quanquan
getrange name 0 1 # qu -> 包前也包后
```

### hash 相关

- 创建一条记录
```shell
hset user name quanquan
```

- 获取记录的属性
```shell
hget user name
```

- 设置记录的另一条属性
```shell
hset user sex male
```

- 获取记录的多条属性
```shell
hmget user sex name
```

- 获取记录的所有内容
```shell
hgetall user
```

- 删除记录的某个属性字段
```shell
hdel user name
```

### 列表相关

- 创建一条记录(向左 push)
```shell
lpush arr 1 2 3 4 5
```

- 查看记录范围内的值
```shell
lrange arr 0 -1
```

- 创建一条记录(向右 push)
```shell
rpush arr2 1 2 3 4 5
```

- 查看记录范围内的值
```shell
lrange arr2 0 -1
```

- 从数组头部删除一条记录
```shell
lpop arr
```

- 从数组尾部删除一条记录
```shell
rpop arr
```

- 删除指定的记录
```shell
lrem arr 3 3
# 其中, arr 是指定要操作的数组
# 第一个 3 指的是数组遍历数组中的三个元素范围
# 第二个 3 指的是从数组中找到数字 3 并移除他
```

- 取出数组中指定的项
```shell
# index 是从 0 开始的
lindex arr 1
```

### 集合相关

#### 无序集合

- 创建一条记录
```shell
sadd myset 1 2 3 4
```

- 列出所有的记录
```shell
smembers myset
```

- 删除集合中的某一项
```shell
srem myset 1
```

- 取两个 set 的并集
```shell
sunion myset myset1
```

- 取两个 set 的交集
```shell
sinter myset myset1
```

- 取两个 set 的差集
```shell
sdiff myset myset1
```

### 有序集合

- 创建记录
```shell
zadd my 1 100
zadd my 2 200
zadd my 1 101
```

- 查看指定范围的记录
```shell
zrange my 0 -1

# 1) "100"
# 2) "101"
# 3) "200"
```
