### MAC

```shell
Command + Shift + .			 # 显示隐藏文件（在文件夹中同时按三个键）
Command + Shift + 5 		 # 截图工具
command + c   # 复制
command + v   # 粘贴
command + x   # 剪切
command + z   # 撤销
command + s   # 保存
command + ++   # 放大
command + --   # 缩小
command + f   # 打开搜索“查找”窗口

command + m   # 最小化当前窗口
command + q   # 退出当前App
command + control + f   # 全屏相当于win F11
command + tab   # 选择 / 切换到下一个常用App



rm -rf 目录名		# 删除文件夹   -r 表示向下递归，不管有多少级目录，一并删除
rm 文件名				# 删除文件   -f 表示强制删除
```

- [tldr](https://link.zhihu.com/?target=https%3A//link.juejin.cn/%3Ftarget%3Dhttps%253A%252F%252Fgithub.com%252Ftldr-pages%252Ftldr)

```shell
# tldr 工具  

tldr	xxx  # 查看xxx的命令有哪些
```



### 必备



#### NVM

```bash
# 使用 gitee 镜像安装
export NVM_SOURCE=https://gitee.com/mirrors/nvm.git
curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash
```



#### [Homebrew ](https://brew.sh/)

> 一套Mac 的软体套件管理工具，目的是简化Mac OS X 系统上的软体安装过程

-   **软件包的管理器**

  ```bash
  /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"   # 安装命令【使用镜像方案】
  brew install wget  # 安装wget
  
  
  Brew一些常用命令：
  
  brew ls # 本地软件库列表
  brew pin 软件名：锁定某一软件为特定版本。(解除锁定用unpin)
  针对pin命令需要说明的是，如果某个软件需要依赖某个被锁定的软件，则被锁定的软件会被强制升级为最新版本。
  brew –cache：查看所安软件的安装包下载的目录，可以定期清理该目录。
  brew info 软件名：查询某一所安装的软件信息
  
  
  brew help    # 查看帮助信息
  brew -v      # 查看版本
  brew list    # 查看安装列表
  brew search [包名] # 查询可用软件包
  brew info [包名] # 查看软件信息
  
  brew update  # 更新Homebrew自己
  brew outdated  # 查询是否有可更新的软件包
  brew upgrade   # 更新所有已安装的软件
  brew upgrade [包名]  # 更新指定软件
  
  brew pin $FORMULA   #锁定某个包，不进行更新
  brew unpin $FORMULA  #取消锁定
  
  brew install [包名]   #安装软件包
  brew install git  # 安装git
  brew install git-lfs # 安装git-lfs
  brew install wget  # 安装wget
  brew install openssl  # 安装openssl
  
  brew uninstall [包名]  # 卸载安装包
  brew uninstall git  #卸载git
  
  ## Brew默认不会卸载软件的旧版本
  brew cleanup  # 清理所有包的旧版本
  brew cleanup [包名] #清理指定包的旧版本
  brew cleanup -n  #查看可清理的旧版本包，不执行实际操作
  
  # 卸载Homebrew
  cd `brew --prefix`
  rm -rf Cellar
  brew prune
  rm `git ls-files`
  rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
  rm -rf .git
  rm -rf ~/Library/Caches/Homebrew
  
  ```
  
  
  
  



### 第三方软件

- 报错1：xxx已损坏，无法打开，你应该将它移到废纸篓

  报错2：打不开xxx，因为它来自身份不明的开发者

  报错3：打不开xxx，因为 Apple 无法检查其是否包含恶意软件

  报错4：Error The xxx may be damaged……

1. 方案一：

   系统设置>隐私与安全性 ，查看是否有 「任何来源」 的选项

   如果提示阻止使用某软件，打开即可

2. 方案二：**绕过Gatekeeper公证**

   将打不开的安装包拖动到桌面

   打开终端，输入代码：`sudo xattr -r -d com.apple.quarantine`

   将安装包直接拖拽到终端中（本质是文件的路径），按下回车

   输入开机密码，再次尝试即可打开应用

3. 方案三：

   https://mp.weixin.qq.com/s?__biz=Mzg5NTcwOTk1OQ==&mid=2247512439&idx=4&sn=0f16bcc9ee5edd70a2085548900c04dc&scene=19#wechat_redirect
