# 由园区停电账号认证报错引发的思考

## 事件经过

园区停电，然后我们的UPS在供电，奇怪为什么能够登上服务器网址认证，平时经常登录的账号密码，此时却显示错误？会不会硬件坏了？机器宕机账号密码就没了？也不不太可能，后来经过了解才知道原理是把AD服务器关了，而AC又是基于AD域服务器账号来验证的（设置）。

## 前提名词了解

在搜寻了资料查阅了有关“单点登录”、“LDAP”等名词。

> [知乎-什么情况适合使用LDAP?](https://www.zhihu.com/question/21594237)

单点登录：简称为 SSO，是目前比较流行的企业业务整合的解决方案之一。SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。比如登录了QQ客户端，然后你可以打开腾讯微博，QQ空间，QQ邮箱等等一系列的应用，这时候我们不需要在一个个再输入用户名和密码了，作为受信任的站点，就可以直接登录了。这些我们都已经司空见惯了，其实这就是单点登录的例子。

> 参考 [wilburxu-LDAP概念和原理介绍](https://www.cnblogs.com/wilburxu/p/9174353.html)

我们日常的办公系统是不是有多个？每个系统之间是不是都有独立的账号密码？密码多了，有时候半天想不起来哪个密码对应哪个系统？“LDAP统一认证服务”就是为这个而生。

在了解LDAP之前又涉及到AD域，AD域就是类似于文件夹及文件的树状用户管理结构，如下图

![406373701.png](https://i.loli.net/2020/11/06/ZSCzbLTfFw4X6K3.png)

**标识名称（distinguished Name，DN）**：它是对象在 Active Directory 内的完整路径，此 DN 表示账户张三存储在 **moonxy.com\软件研发部\Web前端组**路径中，**DN** 有三个属性，分别是 **CN，OU，DC**。

* ***DC (Domain Component)：域名组件***

* ***CN (Common Name)：通用名称，一般为用户名或计算机名***

* ***OU (Organizational Unit)：组织单位***

了解完AD域目录服务后，我们再来看看LDAP的介绍：LDAP它就是由目录数据库和一套访问协议组成的系统的轻量级目录访问协议。目录没有事务处理、回滚等复杂功能，不适于存储修改频繁的数据，是一个为查询、浏览和搜索而优化的数据库。

## 深信服AC设置AD验证

> [\#原创分享#深信服AC对接无线AC做AD域账号密码认证](https://bbs.sangfor.com.cn/forum.php?mod=viewthread&tid=124057)  （还有关于无线网的AC设置）

![ ](https://i.loli.net/2021/01/30/XBc7Jk9GqKVmYyw.png)

## 其实说到底我们还不明白AC是干什么的

我们都知道AC是访问控制，可具体功能却是一概不知的。是否能做路由器、DNS、防火墙？一问起来，确实一脸懵逼，茫然无措....

AC基本功能：

* [深信服AC部署模式](https://wenku.baidu.com/view/29a9945ca4c30c22590102020740be1e640ecc40.html)
* [百度文库-深信服ac基本功能介绍](https://wenku.baidu.com/view/faac2526250c844769eae009581b6bd97e19bcef.html)
* [深信服AC基础认证技术共24页文档](https://wenku.baidu.com/view/bb19531d534de518964bcf84b9d528ea80c72f93.html)
* [深信服AD(负载均衡器)演示介绍](https://wenku.baidu.com/view/60ad8c999a6648d7c1c708a1284ac850ac02042a.html)

ps：win server配置DNS回环地址，DNS因为部署在AD服务器上，之后再设置转发器配置常见的阿里DNS转发，完成访问外网，操作图例：[创建AD域之后设置DNS服务访问外网](https://www.cnblogs.com/dongcom/p/10440649.html)。深信服的防火墙也是作为dns来使用的，相当于是DNS代理。

![ ](https://i.loli.net/2021/01/30/nVl7voSfOjZJFmK.jpg)

