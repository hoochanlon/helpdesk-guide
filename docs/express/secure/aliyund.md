# 初体验阿里云服务器及被攻击后

阿里云发给我短信，检测到了网上的恶意脚本攻击。扫描到我云主机，并用脚本恶意破坏系统与Ddos攻击的“黑客”。据查为： https://github.com/Tremblae/Tremble 。其实，早在发我短信前，他们安全团队实际上老早知道并分析过这个事了…

## 初步操作连接、配置、上传与下载

连接主机输入主机密码，设置主机名。

``` 
# 连接主机
ssh root@公网IP
# 设置主机名
hostnamectl set-hostname xiaohong
# 正常设置主机名需要重启，执行bash刷新
bash
````

现象：由于ssh的加密性质，电脑重装之后，远程输入密码就登陆不上了。解决办法：电脑设置一次VNC，此时需要删除ssh的hnown_hosts。

```
rm -rf ~/.ssh/known_hosts && rm -rf ~/.ssh/known_hosts.old
```

从Linux下载文件到本地，先安装lrzsz

```
yum install lrzsz
```

* `sz 对应的文件名` 即下载。
* `lz 对应的文件名` 即上传。


## 网上的恶意脚本攻击

扫描到我云主机，并用脚本恶意破坏系统与Ddos攻击的“黑客”。据查为： https://github.com/Tremblae/Tremble 。

* 写好正则的手法去扫描检测公网云主机
* 通过常用的开放端口，不断用数据字典暴力破解密码，或是其他后门绕开密码，植入脚本
* 用脚本或打包好的二进制程序，卸载系统组件，乱改文件造成系统不稳定，并开放主机其他端口Ddos别人

![](https://fastly.jsdelivr.net/gh/hoochanlon/Free-NTFS-for-Mac/shashin/zei.png)

处理办法：

关闭自己不用的桌面系统远程端口，如Windows，3389。“0.0.0.0/0”是任何人都能访问的，自己可临时百度IP，用公网IP登录。设置在“云服务器ECS” -> "ECS安全组"，编辑即可。

阿里云技术支持的推荐

* 操作系统加固：https://help.aliyun.com/knowledge_list/60787.html
* web应用加固：https://help.aliyun.com/knowledge_list/60792.html

### Linux那奇葩的防火墙

Linux的逻辑和我们平常见到的图形操作系统Windows、macOS不太一样，指定一个某某程序，禁止它们联网。在Windows、macOS很容易做到，但在Linux却不是很好办...防火墙主要针对于web、ftp等这类资源访问服务器的。而且呢，这类不少的软件产品也是要钱的。看来正版Windows贵，使用起来也为广大人民群众所接受的产品，这也是有道理的。Linux难用但免费，不过是企业省钱，加之术业有专攻罢了。

阿里云客服给我找来了[“创建新用户，限制新用户联网”的解决方案](https://www.zhihu.com/question/419420632)，着实脑洞新奇。也确实，一个软件可能存在此相关的多个进程联网；而且还要一一知晓每个软件的联网进程名，这太反人类了。

![](https://cdn.jsdelivr.net/gh/hoochanlon/ihs-simple/AQUICK/catzhihufwlinux.png)

现在的Linux，通过web访问，也有图形化的配置界面了，安装软件什么的，也如同Windows一样简单。就比如说[mdserver-web](https://github.com/midoks/mdserver-web)、[宝塔面板](https://www.bt.cn/new/index.html)，也难怪这么多卖防火墙的，像深信服、山石都是的，以及阿里搞什么加钱购买的云盾防火墙，就是这个理。

根据这情况那就备些防火墙相关的常用命令吧，把GitHub及对其加速CDN，一块ban了吧。等需要时，再来解禁一下这些主机IP。这个嘛，倒是可以做个一键脚本。

#### firewall-cmd

使用firewall-cmd，需将系统的防火墙服务打开。

```
systemctl start firewalld
```

禁止192.168.128.137访问主机，如果要取消的话，将`--add`换成`--remove`就好。

```
 firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.128.137" drop'
```

重载并查看规则条目

```
firewall-cmd --reload  && firewall-cmd --list-rich-rules
```

细致到禁用对方主机具体访问端口的话，复制如下命令。参数：filter，本地数据限制；-s源地址，-d目的地址，-p协议，--dport端口，-j行为/REJECT拒绝/ACCEPT同意/DROP丢弃。

```
firewall-cmd --direct  -add -rule ipv4 filter INPUT  1 -s  172.25.254.50  -p  tcp   -dport  22 -j  REJECT
```

参考：[博客园-Linux命令之firewall-cmd](https://www.cnblogs.com/diantong/p/9713915.html)、[csdn-Linux系统上的防火墙命令](https://blog.csdn.net/weixin_43780179/article/details/125046304)、[爱码网-linux下防火墙的管理工具firewall-cmd](https://www.likecs.com/show-203862572.html)。
