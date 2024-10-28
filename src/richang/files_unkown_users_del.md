# 批量删除文件夹权限的未知用户残留

如果用户此前在相关文件夹有对应的共享、安全权限，常规直接删除用户会留下残留，如图。

![ ](https://cdn.sa.net/2024/10/28/1cvfjOIPAxiEstG.png)

![ ](https://cdn.sa.net/2024/10/28/alWTyNHIMES2fXR.png)

## 删除安全权限

### 删除文件夹未知用户的安全权限

```
# 定义共享文件夹路径
$folderPath = "C:\共享文件夹\生产作业2"

# 获取文件及文件夹的现有权限
$acl = Get-Acl -Path $folderPath

# 查找并删除所有未知用户（使用 SID 表示的权限）
$acl.Access | Where-Object { $_.IdentityReference -match "^S-1-" } | ForEach-Object {
    $acl.RemoveAccessRule($_)
}

# 应用更改后的 ACL
Set-Acl -Path $folderPath -AclObject $acl

Write-Output "已成功删除文件夹 $folderPath 中的未知用户权限"
```

![ ](https://cdn.sa.net/2024/10/28/ZnSOJNlWCwm7BkK.png)


### 删除根目录中所有文件夹中包含未知用户的安全权限


```
# 定义根文件夹路径
$folderPath = "C:\共享文件夹"  # 替换为实际路径

# 递归遍历指定文件夹及其子文件夹
Get-ChildItem -Path $folderPath -Recurse | ForEach-Object {
    # 获取当前文件或文件夹的 ACL
    $acl = Get-Acl -Path $_.FullName

    # 查找所有未知用户（SID 格式且没有解析为用户名的账户）
    $unknownSIDs = $acl.Access | Where-Object { $_.IdentityReference -match "^S-1-" }

    # 删除每个未知用户的权限
    foreach ($rule in $unknownSIDs) {
        $acl.RemoveAccessRule($rule)
        Write-Output "已删除文件/文件夹 $($_.FullName) 中的未知用户权限: $($rule.IdentityReference.Value)"
    }

    # 将更改后的 ACL 应用到文件或文件夹
    Set-Acl -Path $_.FullName -AclObject $acl
}

Write-Output "已成功删除文件夹 $folderPath 中所有未知用户的安全权限"
```

![ ](https://cdn.sa.net/2024/10/28/kDamfRUSqgYXKlP.png)


## 删除共享权限

### 删除未知用户共享权限

```
# 定义共享名称
$shareName = "生产作业2"  # 替换为实际共享名称

# 获取共享的访问权限
$accessRules = Get-SmbShareAccess -Name $shareName

# 筛选未知用户（匹配 AccountName 包含 SID 的条目）
$unknownSIDs = $accessRules | Where-Object { $_.AccountName -match "S-1-" }

# 遍历并删除每个未知用户的共享权限
foreach ($rule in $unknownSIDs) {
    $unknownSID = $rule.AccountName
    Write-Output "正在删除共享 '$shareName' 中的未知用户权限: $unknownSID"
    Revoke-SmbShareAccess -Name $shareName -AccountName $unknownSID -Force
}

Write-Output "已成功删除共享 '$shareName' 中所有未知用户的权限"

```

![ ](https://cdn.sa.net/2024/10/28/gyVwTYX3lMKauZ9.png)



### 删除所有共享文件夹中的未知用户权限

```
# 获取所有共享
$shares = Get-SmbShare

# 遍历每个共享
foreach ($share in $shares) {
    $shareName = $share.Name
    Write-Output "正在处理共享文件夹: $shareName"
    
    # 获取当前共享的访问权限
    $accessRules = Get-SmbShareAccess -Name $shareName

    # 筛选未知用户（匹配 SID 格式的账户）
    $unknownSIDs = $accessRules | Where-Object { $_.AccountName -match "S-1-" }

    # 删除每个未知用户的共享权限
    foreach ($rule in $unknownSIDs) {
        $unknownSID = $rule.AccountName
        Write-Output "  删除共享 '$shareName' 中的未知用户权限: $unknownSID"
        Revoke-SmbShareAccess -Name $shareName -AccountName $unknownSID -Force
    }
}

Write-Output "已成功删除所有共享文件夹中的未知用户权限"

```

![ ](https://cdn.sa.net/2024/10/28/csArnl3BzIw5Gq7.png)