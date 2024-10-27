# 批量对人员进行文件夹授权

>1. 域名以 CSYLQ 为例，操作文件夹均以开启共享。
>2. edge浏览器，右击图片，在新标签页中打开图像，或放大图像。

## 缘起

由于每个消费业务的同事都需要登录域用户上机操作的，分配不同的组长，因此有着不同组长共享文件夹访问权限，以及通用的质检文件夹访问权限，这就需要根据人事已提供的 ”域控权限申请登记表“，繁复的进行对人员的域账户添加及相关文件授权。

![ ](https://cdn.sa.net/2024/10/27/nghrE4ysNVWmjFS.png)

相关要求：

* 读取权限说明：共享权限：读取；安全权限（NTFS权限）读取。
* 编辑、读写权限说明：共享权限：读取、更改；安全权限：读取、读取和执行、列出文件内容、修改、写入。

质检文件夹权限是通用的，所以可以做成规模化的脚本执行。组员不同所属组长的文件夹权限，可以用简单的命令形式执行。

## 单个文件夹批量授权

### 起手

从最简单的起手，单个用户设置文件夹权限

> 更多模板：[suv789 - 当使用 PowerShell 管理 Active Directory（AD）域用户时，以下是一些初级的示例和操作：PowerShell 在进行 AD 域用户管理时的强大功能和灵活性。PowerShell 在自动化和管理 Active Directory 域用户方面的强大能力，能够高效处理复杂的管理任务和安全操作 
](https://www.cnblogs.com/suv789/p/18284489)

```
<#安全权限#>

# 安全权限设置为只读。
icacls "C:\共享文件夹\谢多意组" /grant "csylq\王诗语:(OI)(CI)(R)" /t # /t 表示递归

# 安全权限设置为编辑
icacls "C:\共享文件夹\樊小华" /grant "csylq\王诗语:(OI)(CI)(M)" /t

# 安全权限设置为读取、读取和执行、列出文件内容
icacls "C:\共享文件夹\谢多意组" /grant "csylq\王诗语:(OI)(CI)(RX)" /t

# 删除用户文件夹权限
icacls "C:\共享文件夹\谢多意组" /remove "csylq\王诗语" /t


<#共享权限#>

# 读写权限
Grant-SmbShareAccess -Name "樊小华组" -AccountName "csylq\王诗语" -AccessRight Change -Force


# 只读权限
Grant-SmbShareAccess -Name "谢多意组" -AccountName "csylq\王诗语" -AccessRight Read -Force

# 完全控制
Grant-SmbShareAccess -Name "朱爱梅组" -AccountName "csylq\王诗语" -AccessRight Full -Force

# 删除权限
Revoke-SmbShareAccess -Name "谢多意组" -AccountName "csylq\王诗语" -Force

<#
同一用户不能同时使用 -ReadAccess 和 -ChangeAccess，因为这会产生冲突。
你需要选择一种权限方式，要么是读取，要么是修改（Change 权限已经包含了读取权限）。
所以在这种情况下，给用户直接赋予 Change 权限就足够了，因为它包括读取和写入权限。
之所以精准定位是因为共享名称唯一，共享文件夹改名变成独立的非共享文件夹。
#>
```

### 成型

以批量授权用户质检文件夹访问权限只读为例

![ ](https://cdn.sa.net/2024/10/27/CoyB1I27hMtcJL9.png)

```
# 定义共享名称和文件夹路径
$shareName = "质检"  # 共享名称
$folderPath = "C:\共享文件夹\质检"  # 共享文件夹的实际路径
$domainUsersFile = "C:\Users\Administrator\Desktop\质检名单.txt"  # 包含用户的txt文件路径（不带域名）

# 定义域名
$domain = "CSYLQ"

# 读取txt文件，假设每行是一个用户名（不带域名）
$domainUsers = Get-Content -Path $domainUsersFile

foreach ($user in $domainUsers) {
    # 为每个用户加上域名前缀
    $fullUserName = "$domain\$user"

    Write-Host "正在为用户 $fullUserName 添加权限..."

    # 1. 添加共享权限（只读）
    try {
        Grant-SmbShareAccess -Name $shareName -AccountName $fullUserName -AccessRight Read -Force
        Write-Host "共享权限：用户 $fullUserName 已被授予只读访问权限。"
    } catch {
        Write-Host "共享权限：无法为用户 $fullUserName 添加访问权限，可能该用户已存在或发生其他错误。"
    }

    # 2. 添加NTFS权限（只读）
    try {
        # 使用icacls命令授予用户只读权限
        # 显式 vs 继承权限：普通权限界面显示的是显式设置的权限，而“高级”选项中还会显示从父文件夹或其他权限继承而来的权限。
        # $icaclsCommand = "icacls `"$folderPath`" /grant `"${fullUserName}:(R)`" /t" # 隐示权限
        #(OI) 是“对象继承”，表示权限将应用到文件夹内的文件。
        #(CI) 是“容器继承”，表示权限将应用到文件夹内的子文件夹。
        $icaclsCommand = "icacls `"$folderPath`" /grant `"${fullUserName}:(OI)(CI)R`" /t" # 显示权限
        # 将字符串转换为命令
        Invoke-Expression $icaclsCommand
        Write-Host "NTFS权限：用户 $fullUserName 已被授予只读访问权限。"
    } catch {
        Write-Host "NTFS权限：无法为用户 $fullUserName 添加访问权限，可能发生错误。"
    }
}
```

![ ](https://cdn.sa.net/2024/10/27/aEDfri2lAuOSMZX.png)

![ ](https://cdn.sa.net/2024/10/27/DfJXyzmaEvhWtQk.png)

## 多个文件夹批量授权

对生产作业1、生产作业2文件夹进行批量授权相关用户读写操作。

```
# 定义共享名称和文件夹路径
$shares = @(
    # 定义了一个包含两个共享的数组 $shares。在循环中，我们为每个用户和每个共享依次添加权限。
    # 这样，用户将同时获得对“生产作业1”和“生产作业2”两个文件夹的访问权限。
    @{ Name = "生产作业1"; Path = "C:\共享文件夹\生产作业1" },
    @{ Name = "生产作业2"; Path = "C:\共享文件夹\生产作业2" }
)

$domainUsersFile = "C:\Users\Administrator\Desktop\生产作业名单.txt"  # 包含用户的txt文件路径（不带域名）

# 定义域名
$domain = "CSYLQ"

# 读取txt文件，假设每行是一个用户名（不带域名）
$domainUsers = Get-Content -Path $domainUsersFile

foreach ($user in $domainUsers) {
    # 为每个用户加上域名前缀
    $fullUserName = "$domain\$user"

    foreach ($share in $shares) {
        Write-Host "正在为用户 $fullUserName 添加权限到共享 $($share.Name)..."

        # 1. 添加共享权限（只读）
        try {
            Grant-SmbShareAccess -Name $share.Name -AccountName $fullUserName -AccessRight Change -Force
            Write-Host "共享权限：用户 $fullUserName 已被授予 $($share.Name) 的只读访问权限。"
        } catch {
            Write-Host "共享权限：无法为用户 $fullUserName 添加访问权限到 $($share.Name)，可能该用户已存在或发生其他错误。"
        }

        # 2. 添加NTFS权限（只读）
        try {
            $icaclsCommand = "icacls `"$($share.Path)`" /grant `"${fullUserName}:(OI)(CI)(M)`" /t" # 显示权限
            # 将字符串转换为命令
            Invoke-Expression $icaclsCommand
            Write-Host "NTFS权限：用户 $fullUserName 已被授予 $($share.Name) 的只读访问权限。"
        } catch {
            Write-Host "NTFS权限：无法为用户 $fullUserName 添加访问权限到 $($share.Name)，可能发生错误。"
        }
    }
}

```

![ ](https://cdn.sa.net/2024/10/27/3hofrswHJpy1ZY5.png)

![ ](https://cdn.sa.net/2024/10/27/7YdOu843rxvSi5j.png)