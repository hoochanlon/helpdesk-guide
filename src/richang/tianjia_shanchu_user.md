#  批量添加、删除域用户

**缘起**

由于每个消费业务的同事都需要登录域用户上机操作的，分配不同的组长，因此有着不同组长共享文件夹访问权限，以及通用的质检文件夹访问权限，这就需要根据人事已提供的 ”域控权限申请登记表“，繁复的进行对人员的域账户添加及相关文件授权。

![ ](https://cdn.sa.net/2024/10/27/nghrE4ysNVWmjFS.png)

**批量添加域用户**

一、以添加新用户到组织单元【生产团队】里的子级【售后】单元为例

二、域名以 CSYLQ 为例 

三、初始密码固定，登录需要更改初始密码，域用户都在其业务的组织单元内。

```
# 导入Active Directory模块
Import-Module ActiveDirectory

# 测试一行命令
# New-ADUser -Name "王光光" -SamAccountName "王光光" -UserPrincipalName "王光光@CSYLQ.com" `
#            -Path "OU=消费业务,OU=生产团队,DC=CSYLQ,DC=com" -GivenName "光光" -Surname "王" `
#            -AccountPassword (ConvertTo-SecureString "Mima12345" -AsPlainText -Force) `
#            -Enabled $true -ChangePasswordAtLogon $true

<# 参考资料：https://learn.microsoft.com/en-us/powershell/module/activedirectory/new-aduser?view=windowsserver2022-ps #>


# 导入Active Directory模块
Import-Module ActiveDirectory

# 读取txt文件中的用户列表
$filePath = "C:\Users\Administrator\Desktop\添加用户.txt"  # 替换为实际的文件路径
$userList = Get-Content -Path $filePath  # -Encoding UTF8

# 固定密码
$password = "Mima12345"

# 循环处理用户列表
foreach ($userName in $userList) {
    # 尝试创建用户
    try {
        New-ADUser -Name $userName -SamAccountName $userName -UserPrincipalName "$userName@csylq.com" `
                   -Path "OU=售后,OU=生产团队,DC=CSYLQ,DC=com" `
                   -AccountPassword (ConvertTo-SecureString $password -AsPlainText -Force) `
                   -Enabled $true -ChangePasswordAtLogon $true

        Write-Host "用户 $userName 已成功创建。"
    } catch {
        Write-Host "创建用户 $userName 时发生错误: $_"
    }
}

# 暂停脚本
Read-Host "按 Enter 键继续..."
```

![ ](https://cdn.sa.net/2024/10/27/FxUu2zvlBTV9d53.png)

**批量删除域用户**


```
# 导入Active Directory模块
Import-Module ActiveDirectory

# 读取txt文件中的用户列表
$filePath = "C:\Users\Administrator\Desktop\删除用户.txt"  # 替换为实际的文件路径
$userList = Get-Content -Path $filePath # -Encoding UTF8

# 循环删除用户
foreach ($user in $userList) {
    try {
        Remove-ADUser -Identity $user -Confirm:$false -ErrorAction Stop
        Write-Host "已删除用户: $user"
    } catch {
        Write-Host "用户 $user 不存在，已忽略错误。"
    }
}

# 暂停脚本
Read-Host "按 Enter 键继续..."

```

![ ](https://cdn.sa.net/2024/10/27/aupKFxJOd3mftZR.png)