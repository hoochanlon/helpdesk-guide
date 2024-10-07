# 添加备份域控制器实现容错

## 原理

> 在设置IP地址的【高级】选项中，可以设置三个以上备用的DNS

增加一至两台的备份DC，需要备用 DNS，当主DC出现问题，可以通过备用DNS连接到备用DC。

![ ](https://s2.loli.net/2024/10/07/bPKGH95jT8R4qVe.png)

## 添加备份

安装一台Server加入到域，并用 administrator 登录到域，然后在【仪表板】->【管理】->【添加角色和功能向导】选择【DNS服务器】、【Active Directory 域服务】。

![ ](https://cdn.sa.net/2024/10/07/Faej1fCmYoMtnHG.png)

将此服务器提升为域控制器，并添加到现有域

![ ](https://cdn.sa.net/2024/10/07/aJwgeZLDA4lmGj6.png)

![ ](https://cdn.sa.net/2024/10/07/GzEmhwBdZ5DfTL9.png)

选择需要备份的主DC

![ ](https://cdn.sa.net/2024/10/07/ZNyhgITsPOS9Laf.png)

## 测试效果

### AD、组策略、MMC检查

打开【Active Driectory 用户和计算机】、【DNS 管理器】、【组策略管理器】查看内容是否备份过来。

![ ](https://cdn.sa.net/2024/10/07/MPjvWnqQgUCrwRF.png)

【运行】-> `MMC` ->【文件】->【添加/删除管理单元】，加入两个【Active Driectory 用户和计算机】，并其中一个域中创建账户，刷新测试效果。

![ ](https://cdn.sa.net/2024/10/07/VFNEeRjb5z68TkA.png)

### 主域断网测试连续性

主域 DC 禁用网卡，断网

![ ](https://cdn.sa.net/2024/10/07/YUF395HlV42aiXG.png)

配置备份域的DNS

![ ](https://cdn.sa.net/2024/10/07/ztTNb3ogI9vQkHD.png)

![ ](https://cdn.sa.net/2024/10/07/sO2c6RU3gHLY4Dp.png)

测新注册的域用户登录

![ ](https://cdn.sa.net/2024/10/07/uIpT3rfgBY7siQ1.png)