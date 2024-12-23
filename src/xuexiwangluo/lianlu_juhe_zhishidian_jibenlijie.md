# 链路聚合知识点基本理解

## 链路聚合目的

[链路聚合(Eth-Trunk链路聚合)-CSDN博客](https://blog.csdn.net/solomonzw/article/details/143486267)

一言蔽之：把多条物理链路合并成一个逻辑链路。

* 提高宽带：一个聚合口等于多个成员链路口带宽的总和
* 提高可靠：当一个物理链路出现问题,可以通过其他的链路到达目的地。
* 负载平衡：一个聚合口可以把流量分散到其他的成员口上。

[链路聚合详解——Link Aggregation - 小王同学！ - 博客园](https://www.cnblogs.com/xiaowangtongxue/p/14754853.html)

采用链路聚合技术可以在不进行硬件升级的情况下，通过将多个物理接口捆绑为一个逻辑接口，来达到增加链路带宽的目的。

* 链路聚合一般用在交换机，汇聚层、核心层。

## 链路聚合模式

* 手动负载均衡：所有接口参与转发流量，进行负载分担。
* LACP：部分链路参与转发，非活动链路作为备份链路。

![PixPin_2024-12-23_15-35-45](https://img.yonrd.com/i/2024/12/23/pejdq7.png)

[Eth-Trunk（链路聚合）原理与配置_interface eth-trunk-CSDN博客](https://blog.csdn.net/qq_46254436/article/details/105140125)

LACP抢占机制

两端设备会选取主动端，根据以下条件选举：

* 设备系统优先级（LACP优先级）：越小越优先，默认32768
* 若系统优先级相同，则比较MAC地址：越小越优先

交换机接口会对接口进行排序，根据以下条件选举：

* 接口优先级：越小越优先
* 如果接口优先级相同，则比较接口ID（接口号）：越小越优先

![PixPin_2024-12-23_15-59-33](https://img.yonrd.com/i/2024/12/23/psfexw.png)

## 手动负载均衡配置

[华为交换机配置链路聚合（手工模式链路聚合和lacp模式聚合）-CSDN博客](https://blog.csdn.net/qq_33292195/article/details/121923939)

当需要在两个直连设备之间提供一个较大的链路带宽，而其中一端或两端设备都不支持LACP协议时，可以配置手工模式链路聚合。

![PixPin_2024-12-23_19-48-34](https://img.yonrd.com/i/2024/12/23/w8gdbk.png)

配置步骤：

* 创建链路聚合端口
* 配置手动负载均衡（mode man load-balance）
* 将相关端口加入链路聚合口（trunkport）
* 设置trunk模式，放行相关vlan

LSW1与LSW2配置一致

```
[LSW1]
vlan batch 10 20
interface Eth-Trunk1
 mode man load-balance 
 port link-type trunk
 port trunk allow-pass vlan 10 20
 trunkport g 0/0/1 to 0/0/2
 
interface GigabitEthernet0/0/3
 port link-type access
 port default vlan 10
```

## LACP模式配置

![PixPin_2024-12-23_21-24-52](https://img.yonrd.com/i/2024/12/23/zd35lf.png)

配置步骤:

* 创建聚合口
  * 配置LACP静态模式（mode）
  * 将相关端口加入聚合口（trunkport）
  * 配置活动接口上限阈值（max）
* 配置LACP优先级（各接口优先级保持一致，备份链路不用动）

```
interface Eth-Trunk1
 port link-type trunk
 port trunk allow-pass vlan 10 20
 mode lacp-static
 max active-linknumber2

interface GigabitEthernet0/0/1
 eth-trunk 1
 lacp priority 100

interface GigabitEthernet0/0/2
 eth-trunk 1
 lacp priority 100

interface GigabitEthernet0/0/3
 eth-trunk 1

interface GigabitEthernet0/0/4
 port link-type access
 port default vlan 10
```

测试

![PixPin_2024-12-23_21-24-35](https://img.yonrd.com/i/2024/12/23/zd6a98.png)



`dis interface Eth-Trunk 1`查看链路聚合1的详细信息和统计数据，借图 

https://blog.csdn.net/2301_76613557/article/details/138841867

![PixPin_2024-12-23_21-42-06](https://img.yonrd.com/i/2024/12/23/zfdc5j.png)
