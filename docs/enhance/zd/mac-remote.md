# Mac-Win跨平台建立远程桌面

## mac连接win

[Get started with the macOS client](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-mac)如下图[点击下载](https://install.appcenter.ms/orgs/rdmacios-k2vy/apps/microsoft-remote-desktop-for-mac/distribution_groups/all-users-of-microsoft-remote-desktop-for-mac)

⚠️：由于RDP在App Store需要美区id下载，因此需要从官网文档再转入下载软件

![截屏2021-03-15 下午1.55.07.png](https://i.loli.net/2021/03/15/ZT3uQo89YME5wJA.png)

**注意在系统属性的远程登录设置允许远程协助（默认为关闭），允许任意版本桌面连接。** 这些设置好之后在mac的远程登录客户端输入ip或主机名即可完成远程登录。

### 远程连接中断问题

```
开始-->运行-->gpedit.msc
计算机配置->管理模板->Windows组件
远程桌面服务->远程桌面会话主机->会话时间限制
```

![截屏2021-03-15 下午1.46.43.png](https://i.loli.net/2021/03/15/cStg8lM92XrnyOC.png)

如图两项改为“从不”，此外将休眠禁用，网卡取消节约电源；在远程登录修改主机名断开问题，重新再分配更改成员分组设置就好了。

![截屏2021-03-15 下午2.28.52.png](https://i.loli.net/2021/03/15/drXvLnS3bsTGe9Q.png)

## win 连接 mac

下载[vncviewer](https://www.realvnc.com/en/connect/download/viewer/)，在mac开启屏幕共享，输入用户名密码即可。

![截屏2021-03-15 下午2.52.23.png](https://i.loli.net/2021/03/15/LzscY7FICvRexj4.png)

⚠️：Mac的用户名是参照国外名来的，国外姓名与国内姓名顺序相反

> 关于远程连接协议：截图自 [知乎-构建自己的远程接入系统](https://zhuanlan.zhihu.com/p/146548321)

![截屏2021-03-15 下午3.18.33.png](https://i.loli.net/2021/03/15/4NblOG32BqT5EoU.png)

关于Mac远程桌面建议可参考 [知乎-Mac OS X 上有什么好的远程桌面操控软件吗？](https://www.zhihu.com/question/19873013)，有兴趣还可以使用Chrome 自带的远程桌面（需下载插件）。

**⚠️warning**

**Windows与Mac建⽴VNC远程共享，Mac与Windows⼜建⽴RDP远程桌⾯，当Mac再连接Windows桌⾯，平台上的vnc viewer还在运行时，就会存在该软件进入死循环冲突造成系统卡顿。**

**因此，建议建⽴平台间的单向远程桌⾯共享。**