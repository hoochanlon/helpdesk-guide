# Batch批量可并发业务编程

我们可以用批处理、注册表来减少我们去花费大量时间去执行重复性高的工作需求。比如说：

* 多台主机的可信任站点及兼容视图配置
* 每台机器的主页设置
* 每台机器IP地址的设定
* 多台主机的操作系统激活
* 每台机器点击安装多个的软件程序

::: tip
BAT批处理学习网站推荐：
* [w3cschool-批处理教程](https://www.w3cschool.cn/dosmlxxsc1/wvqyr9.html)
* [Windows 批处理脚本学习教程](http://docs.30c.org/dosbat/index.html)
* [脚本之家-批处理专栏](https://www.jb51.net/list/list_106_1.htm)
:::

各业务编程目录

[[toc]]

使用方式为将以下整段代码拷贝到记事本并将格式改为`.bat`该脚本语言后缀格式执行。以上，希望能够帮助到因执行过于重复任务而苦恼的你😀

## 可信任站点

``` batch
:: 可信任站点设置
:: 网址及地址，改写成你自己需要设置的网址及地址
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ZoneMap\Domains\baidu.com\www" /v http /t REG_DWORD /d 0x00000002 /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ZoneMap\Domains\8.8.4.8" /v http /t REG_DWORD /d 0x00000002 /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ZoneMap\Domains\test.com.cn" /v http /t REG_DWORD /d 0x00000002 /f

:: 主页设置
reg add "HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main" /v "Start Page" /t reg_sz /d www.google.com /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main" /v "Default_Page_URL" /t reg_sz /d www.google.com /f
:: 主页死锁！
reg add "HKCU\Software\Policies\Microsoft\Internet Explorer\Control Panel" /v HomePage /d 1 /f >nul
:: 异议！该指令用于解除死锁！
reg delete "HKCU\Software\Policies\Microsoft\Internet Explorer\Control Panel" /v HomePage /f
pause
```

## 兼容性视图与安全级别注入

首先自行手动输入兼容性视图的站点，然后`regedit`进入注册表，找到`\HKCU\Software\Microsoft\Internet Explorer\BrowserEmulation\ClearableListData`选择`文件`->`导出`，即可。

原理同上，IE安全站点级别设置在`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Zones\2`的PMDisplayName值为Trusted sites，即是安全站点区域，将安全站点等级下拉条调至最低，再将“2项”导出即可。

关键点：我们可以用 Reg To Bat 将注册表转换为批处理程序， 再利用 BatToExeConverter 将批处理脚本换为exe可执行程序。

## 批量打印(python)

> 摘自 [蓝骑兵-Python实现批量打印功能](http://www.lanqibing.com/python实现批量打印功能/)

```python
import win32api
import win32print
import os
def printer_loading(filename):
    win32api.ShellExecute (
    0,
    "print",
    filename,
    '/d:"%s"' % win32print.GetDefaultPrinter (),
    ".",
    0
    )
path='D:/文件夹'
for filenames in os.listdir(path):
    printer_loading(os.path.join(path,filenames))
```
::: tip

推荐阅读《Python编程快速上手 让繁琐工作自动化》

:::



## 半自动化IP修改

<!-- <details><summary>IP设置脚本源码</summary> -->

``` batch
@echo off
mode con lines=30 cols=60
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
rem 以管理员权限运行，下面可以写你的bat代码了

rem //设置变量 BG为办公缩写，SC为生产网缩写
:: 脚本IP是随意设置的，如需使用请根据公司环境自行修改
set NAME="以太网"
rem //以下属性值可以根据需要更改
set ADDR_BG=10.1.2.3
set MASK=255.255.255.0
set GATEWAY_BG=10.1.2.1
set DNS_BG_1=10.1.2.99
set DNS_BG_2=10.1.2.100

set ADDR_SC=172.16.1.3
set GATEWAY_SC=172.16.1.1
set DNS_SC_1=172.16.1.99
set DNS_SC_2=172.16.1.100

rem //以上属性依次为IP地址、子网掩码、网关、首选DNS、备用DNS

echo 当前可用操作有：
echo 1 设置为默认办公网IP
echo 2 设置为默认生产网IP
echo 3 手动填写办公网IP
echo 4 手动填写生产网IP
echo 5 退出
echo 请选择后回车：
set /p operate=
if %operate%==1 goto 1
if %operate%==2 goto 2
if %operate%==3 goto 3
if %operate%==4 goto 4
if %operate%==5 goto 5


:1
echo 正在设置默认办公网IP，请稍等...
rem //可以根据你的需要更改 
echo IP地址 = %ADDR_BG%
echo 掩码 = %MASK%
echo 网关 = %GATEWAY_BG%
netsh interface ipv4 set address %NAME% static %ADDR_BG% %MASK% %GATEWAY_BG% 
echo 首选DNS = %DNS_BG_1% 
netsh interface ipv4 set dns %NAME% static %DNS_BG_1%
echo 备用DNS = %DNS_BG_2% 
if "%DNS_BG_2%"=="" (echo DNS_BG_2为空) else (netsh interface ipv4 add dns %NAME% %DNS_BG_2%) 
echo 默认办公网IP已设置！
pause
goto 5

:2
echo 正在设置默认生产网IP，请稍等...
rem //可以根据你的需要更改 
echo IP地址 = %ADDR_SC%
echo 掩码 = %MASK%
echo 网关 = %GATEWAY_SC%
netsh interface ipv4 set address %NAME% static %ADDR_SC% %MASK% %GATEWAY_SC% 
echo 首选DNS = %DNS_SC_1% 
netsh interface ipv4 set dns %NAME% static %DNS_SC_1%
echo 备用DNS = %DNS_SC_2% 
if "%DNS_SC_2%"=="" (echo DNS_SC_2为空) else (netsh interface ipv4 add dns %NAME% %DNS_SC_2%) 
echo 默认生产网IP已设置！
pause
goto 5


:3
echo 正在进行设置办公网IP，请稍等...
rem //可以根据你的需要更改 

set /p ADDR_BG=开始IP:
echo IP地址 = %ADDR_BG%
echo 掩码 = %MASK%
set /p  GATEWAY_BG=网关:
echo 网关 = %GATEWAY_BG%
netsh interface ipv4 set address %NAME% static %ADDR_BG% %MASK% %GATEWAY_BG% 
echo 首选DNS = %DNS_BG_1% 
netsh interface ipv4 set dns %NAME% static %DNS_BG_1%
echo 备用DNS = %DNS_BG_2% 
if "%DNS_BG_2%"=="" (echo DNS2为空) else (netsh interface ipv4 add dns %NAME% %DNS_BG_2%) 
echo 手动办公网IP已设置！
pause
goto 5

:4
echo 正在设置生产网IP，请稍等...
rem //可以根据你的需要更改 

set /p ADDR_SC=开始IP:
echo IP地址 = %ADDR_SC%
echo 掩码 = %MASK%
set /p GATEWAY_SC=网关:
echo 网关 = %GATEWAY_SC%
netsh interface ipv4 set address %NAME% static %ADDR_SC% %MASK% %GATEWAY_SC% 
echo 首选DNS = %DNS_SC_1% 
netsh interface ipv4 set dns %NAME% static %DNS_SC_1%
echo 备用DNS = %DNS_SC_2% 
if "%DNS_SC_2%"=="" (echo DNS2为空) else (netsh interface ipv4 add dns %NAME% %DNS_SC_2%) 
echo 手动生产网IP已设置！
pause
goto 5

:4
exit
```
<!-- </details> -->

::: tip

:::

## 远程激活

### Windows

> 选自 [零散坑知识分享-一句命令激活](https://03k.org/kms.html)

kms激活的前提是你的系统是批量授权版本，即VL版，一般企业版都是VL版；专业版有零售和VL版，家庭版旗舰版OEM版等等那就肯定不能默认直接用kms激活。

``` batch
:: kms服务器地址设置（set kms）为kms.03k.org
slmgr /skms kms.03k.org
:: 执行激活
slmgr /ato
```

### office

进入office安装源目录执行 

``` batch
cscript ospp.vbs /sethst:kms.03k.org
cscript ospp.vbs /act
```

相关远程激活站点：
* [kms激活服务-一键激活](https://kms.library.hk/)
* [Windows系统一句命令激活](https://v0v.bid/)
* [cangshui-一键激活Windows和office脚本](https://kms.cangshui.net/)
* [kms.zym-kms激活服务](http://kms.zym.com/)




<!-- Global site tag (gtag.js) - Google Analytics -->

<!-- 
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-157837686-3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-157837686-3');
  </script>

 -->