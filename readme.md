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
首先确保`Node.js`,`npm`已经安装配置好。然后运行`npm install`安装依赖库。然后执行：`npm start`启动后台服务。

```
cd zabbix_codes
npm install
npm start
# 或者运行
pm2-dev ./bin/www
```

## 3.2 启动前端
使用webpack可以启动测试用的前端服务器。可以使用`npm start dev`启动（具体可看`package.json`中的定义）：

```
cd web_content
npm start dev
```


# 4. 如何发布
TBC

# 5. 架构概述
本工程使用Node.js构建。主要用的依赖包有：

* Express
* tj/co + co-Express
* mysqljs/mysql
* log4js
* swagger-jsdoc
* swagger-ui

# 6. 前端功能架构
前端功能使用Vue.js构建。同时使用了ElementUI库。