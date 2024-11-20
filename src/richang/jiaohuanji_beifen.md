# 交换机配置备份

备份要求：所有的内外网接入、汇聚、核心交换机。

使用 IPOP 软件，开启ftp服务，设置存放文件位置

![ ](https://cdn.sa.net/2024/10/28/pIm3ra1NoDjdc8X.png)

```
# 填写我们要导出配置到主机的地址
ftp 192.168.185.58

# 以默认的二进制传输
binary

# 导出
put vrpcfg.zip
```

![ ](https://cdn.sa.net/2024/10/28/RSmqcPC7nDzoHUt.png)

更简单的方式 `dis cu` 将显示的配置全部复制进记事本保存。 