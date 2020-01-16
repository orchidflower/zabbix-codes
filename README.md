Zabbix Codes查询维护系统
===

# 0. 概述
Zabbix中的报警码可以通过本系统查询如下内容：

* 错误原因；
* 解决办法；
* 联系人。

# 1. 操作人员
本系统将由运维人员操作使用。

# 2. 通过特定的URL可以查询指定的代码代表的含义。

# 3. 如何开始开发
## 3.1 启动后台
首先确保`Node.js`,`yarn`已经安装配置好。然后运行`yarn`安装依赖库。然后执行：`yarn dev`启动后台服务。

```
cd zabbix-codes
cd server
yarn
yarn dev
```

## 3.2 启动前端
前端项目在`zabbix_codes/web_content`目录下。使用webpack可以启动测试用的前端服务器。可以使用`npm start dev`启动（具体可看`package.json`中的定义）：

```
cd zabbix_codes
cd web
yarn
yarn serve
```


# 4. 如何发布
TBC

# 5. 架构概述
本工程使用Node.js构建，使用了nodejs的async、await特性，需要nodejs本身的支持。主要用的依赖包有：

* Koajs
* mysqljs/mysql
* redis
* log4js
* swagger-jsdoc
* swagger-ui

# 6. 前端功能架构
前端功能使用Vue.js构建。同时使用了ElementUI库。