# 由施工后跳线接入转向溯源电话运作原理

[[toc]]

## 施工后电话跳线所遇到的问题

### 事件一

装修后，寻到对应话机内部主线，跳线接入到内线后，用电话测试发现只有电流而无拨号音，怎么回事？

首先我们怀疑是线序的问题，找了施工方查清了线序，线架上是黑色、绿色，新续接的线对应是绿色、蓝色。

![Snipaste_2020-10-18_21-26-22.png](https://i.loli.net/2020/10/18/NguFtKPLsMoUQw3.png)

这里说明一下，电话线用两根线才能构成电流的回路，因为电流也必须有来有回。如果用一根电线，电流就无法流动，电流不流动就无法传递声音。

![Snipaste_2020-10-18_12-25-54.png](https://i.loli.net/2020/10/18/w7ORyUI8VnEKHdc.png)

就算座位上的线序不对，机柜这边其实是能通话的，因为机柜外线配线架已经是直接我的测试电话机的。再者用鳄鱼夹挨个试线序总不会错吧？

![Snipaste_2020-10-18_22-13-16.png](https://i.loli.net/2020/10/18/u3821rzJMYQ4IcC.png)

可现在只有电流音，这就很奇怪？！正常接通后应该是有拨号音的，难道联通又出现问题了？联通真的出问题了吗？要是几个分机出问题有可能，但联通那边大面积几乎全体出问题，这不可能 。电话致电了联通也确认没问题，现在又排除了联通那边出问题，那到底是哪里的问题呢？

施工方也很肯定的表示没动过机柜，我们也肯定外线也没动过，现在确认还是内线的问题，内线松动了吗？也不是，如果是松动的，那么施工之前就不可能还可以拨号打电话的。那是什么原因呢？

将跳线打入施工方未续过的电话线位置，经测试还是只有电流音。外线同样存在此类情况，情况就一直僵持着。到最后我们开始检查机柜电话设备插头、线路、电源有没有接入正确或异常。

这回终于发现了原因就是光猫电源没插上...

### 事件二

电话18号内线卡槽铜片位置偏移，卡槽过大，始终接入不稳，我们考虑要联通更换内线编号。但联系联通代理商更换内线编号，厂商做数据迁移耗时过久，进行如下调置。

![2020-10-19_12.png](https://i.loli.net/2020/10/19/oyXBRYp9zEDhW4i.png)



由此开始深入电话原理，在了解原理前先明白模拟电话、数字电话和IP电话的名词概念。


## 电话结构原理发展概述

在我们讲解原理前，我们首先解释几个名词。

综合布线：

**综合布线就是利用同一接口和同一传输介质，让各种不同信息传输。**具体行为表现为将电话线或网线通过110配线架RJ45口跳线至办公座位的对应端口，让用户的电话能正常通话，电脑接网络能正常上网。

此图配线架研发110多种产品原型，所以现在叫110配线架

![Snipaste_2020-10-17_23-14-52.png](https://i.loli.net/2020/10/17/IHtqmSYAJgEcb5D.png)

跳线图

> 图片摘自 [电话交换机与配线箱接法接法图 - 电子发烧友](http://www.elecfans.com/baike/wangluo/jiaohuanji/20180307644007_3.html)

![U341.png](https://i.loli.net/2020/10/18/iY6Zy94LOXJNHFK.png)

###  传统电话与IP电话拓扑结构

传统的电话、传真业务，一般是通过接入电信局提供的PSTN实现的。这种类型的接入方式使用的是线路交换的方式，独占通信线路。当使用长途业务时，费用很高。

>  图片摘自 [电子发烧友-voip的基本原理](http://www.elecfans.com/tongxin/tongxinmokuai/2017/1208/597947.html)

![2749555-1G20Q0522cP.png](https://i.loli.net/2020/10/18/ojuSsEkH64r5LAc.png)

如下表，传统电话与网络电话的对比，处于成本与办公区大面积覆盖考量，不少小企业会选择VoIP

![](https://i.loli.net/2020/10/18/OhnSqVP6EigIlFW.png)

公共交换电话网络(PSTN)与IP语音传输(VoIP)企业通用拓扑图

> 图摘自 [世讯电科-VOIP电话系统的FXS和FXO接口的区别](https://www.dsliu.com/wenti/4764.html)

![1-1Q2011Z012c4.jpg](https://i.loli.net/2020/10/18/owiqc3u4PNIrSFG.jpg)

FXO(Foreign eXchange Office)是用来连接局端设备与交换机内线来使用，所谓局端设备就是指提供网络接入的局端所提供的设备；FXS(Foreign eXchange Station)，是用来连接传统电话机使用的话音接口，普通话机连接上语音网关的FXS口之后,它能够为话机提供电流与拨号语音。

PBX(Private Branch Exchange)，即公司内部使用的电话业务网络，系统内部分机用户分享一定数量的外线，它其实说白了就是外线接线盒。

![Snipaste_2020-10-18_23-15-48.png](https://i.loli.net/2020/10/18/EHS59I4tFbwi6Ly.png)

> 摘自 [百度文库-FXS和FXO接口的区别](https://wenku.baidu.com/view/d838cad6240c844769eaee66.html)



[百度知道-IP电话的工作原理是怎样的？](https://zhidao.baidu.com/question/186378635.html)对IP电话原理总结的很好，这里做个摘录：

IP电话就是以Internet作为主要传输介质进行语音传送的。首先，语音信号通过公用电话网络被传输到网络IP电话网关；然后网关再将话音信号转换压缩成数字信号传递进入Internet；而这些数字信号通过遍及全球而成本低廉的网络将信号传递到对方所在地的网关，再由这个网关将数字信号还原成为模拟信号，输入到当地的公共电话网络，最终将语音信号传给收话人。

## 电话设备作用求解

### 光猫（model）

我们先了解光猫是干嘛的？再来谈电话

光猫又称调制调解器，数字信号转换成模拟信号的过程称为“调解”，反之称为“解调” ，它就是用来转换信号的。如果家庭只有一台设备需要联网，只用光猫还是可以的。但把光猫连上路由器，不仅可以省却拨号步骤，而且信号更稳定，通过发射WiFi信号，还能让更多设备共同联网。

> 参考 [电信小百科-光猫路由器傻傻分不清，家里有了光猫，路由器还有必要吗？](https://baijiahao.baidu.com/s?id=1605777270604382829&wfr=spider&for=pc)

现在的固话基本都是光纤介入了，从电信机房到家里所有的传输线路都是光纤，然后家里的固话并不能直接识别这种信号，所以需要安装光猫，光猫的尾纤连接光纤接收光信号，并转换成数字信号，再通过RJ11接口使固定电话正常使用。

提问：[百度知道-没有光猫可以打电话吗?](https://zhidao.baidu.com/question/354712749.html)

![Snipaste_2020-10-18_23-40-17.png](https://i.loli.net/2020/10/18/VTISqE7woCxZMyO.png)

###  模拟电话、数字电话、IP电话

电话发展到今天大致经过了模拟电话——数字电话——IP电话的过程，模拟和数字都是用的RJ11，走的还是传统的专用线路，而IP电话是RJ45接口，完全走互联网。IP电话机的供电方式必须要外接电源适配器，一般电话机通常不需要电源，通过电话线从电信交换机取电。

> [sohu-IP电话与一般电话的区别](https://www.sohu.com/a/404912416_120315470)

模拟话机采用模拟信号进行传输，由于模拟信号的抗干扰性/失真度高等情况，造成产品质量可靠性方面比较差；数字话机的电路在传输时，对模拟信号进行编解码数字化，传输的信号是二进制数字信号，在抗干扰/失真度等质量可靠性方面有很好的保证。有支持转码的语音网关也可将模拟变为数字信号。

> 参考 [lidason-如何正确区分模拟电话、数字电话和IP电话](http://www.lidason.cn/content/?246.html)

###  电话交换机与线控交换机

电话交换机：公司内部与与外部的通讯信息传输系统。所以有一个相对稳定、安全、快捷、方便的电话交换系统是极其关键的。

程控交换机：能够提供许多新的用户服务功能，如缩位拨号、来电显示、叫醒业务、呼叫转移、呼叫等待等业务，不再是单一的语音业务了。

在企业实际工作中，电话交换机与程控交换机基本混为一谈，在使用上目前没太大区别，基本功能都有，目前主要是在原有基础功能上各个厂家产品卖点不同而已。

> 参考 [百度知道-电话交换机与程控交换机的区别是什么？](https://zhidao.baidu.com/question/207098399.html)；设备图摘自京东商城。

![Snipaste_2020-10-18_13-20-31.png](https://i.loli.net/2020/10/18/xvbiAH2knO1jloC.png)

## 总结拓扑图

> 摘自 [威谱数字程控电话交换机TDMx-2000 DA系列](http://www.wpet.com.cn/product/pbx/DA/TDMx-2000-DA900.html) 并参考 [百度文库-威谱TDMx2000技术手册V3.4](https://wenku.baidu.com/view/54ed430ca4e9856a561252d380eb6294dd8822ac.html)

![H0.jpg](https://i.loli.net/2020/10/27/tgK4c3N1MjWJTxp.jpg)