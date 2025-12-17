# 防火墙邮件拦截与杀软残留项清除

## 防火墙邮件拦截

检查邮件服务器地址无误，邮件运营商服务器地址如图

![image-20201211095826527.png](https://i.loli.net/2020/12/11/YMTcCpUqZehwykd.png)



在取消勾选SSL切换邮件协议依旧无效后决定重装。重装还是出现异常，再卸载时发现有一段关于指定程序防火墙的命令提示。

![image-20201211094643105.png](https://i.loli.net/2020/12/11/hoZEABmzDfre7Tx.png)

防火墙选择允许通过，输入`firewall.cpl`

![image-20201211095259708.png](https://i.loli.net/2020/12/11/wKJmGRYvgtkMEun.png)

通过之后即可正常接收邮件了。

![image-20201211095456267.png](https://i.loli.net/2020/12/11/zrCRWf6vqs8Sdtx.png)

## 防邮箱冒用

有些别有用心的人将自己名称更换成别人的邮箱账号冒用他人，其实仔细注意还是能够分别的。我们查看邮箱源码还能够发现额外的端倪，如主机IP地址，确认是否由对方常驻地发出。

![Snipaste_2021-01-30_19-18-26.png](https://i.loli.net/2021/01/30/VM3jPrCbcuBS1qv.png)

## 杀软残留项清除

word打开出现金山毒霸残留，现象为word启动时出现“Kingsoft Internet security office addin”

![image-20201211100004667.png](https://i.loli.net/2020/12/11/XPzN6f8bOElQmtA.png)

选择“是”，运行`regedit`并通过注册表`hkey_local_machine`中 `software`子项，查找关键字***kingsoft*** 找到相关加载项删除即可。

### 注册表与加载项

* [百度百科-注册表](https://baike.baidu.com/item/%E6%B3%A8%E5%86%8C%E8%A1%A8%E7%BC%96%E8%BE%91%E5%99%A8/501083?fr=aladdin)
* [注册表是什么意思 注册表各部分有什么作用及功能-jb51](https://www.jb51.net/diannaojichu/172234.html)

注册表就一类似档案记录系统，存有组件及加载项、软硬件信息配置档案。如果有相关组件加载项、软硬件信息异常删除相关注册表即可。