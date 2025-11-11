## string常用方法
**1、Replace	string替换字符串:**

```csharp
string st = "abcdef";

string newstring = st.Replace('a','x');

Console.WriteLine(newstring);	//即:xbcdef
```

**<font style="color:rgb(77, 77, 77);">2</font>****<font style="color:rgb(77, 77, 77);">、Remove	C#删除字符串：</font>**

```csharp
string st = "abcdef";

string newstring = st.Remove(4);

Console.WriteLine(newstring);  //即：abcd
```

**<font style="color:rgb(77, 77, 77);">3、Substring	C#字符串截取：</font>**

```csharp
string st = "abcdef";

string newstring = st.Substring(2);

Console.WriteLine(newstring);  //即：cdef

public string Substring(int startIndex,int count); 从startIndex位置开始，提取count个字符。
如：  

string st = "abcdef";

string newstring = st.Substring(2，2);

Console.WriteLine(newstring);  //即：cd
```

**<font style="color:rgb(77, 77, 77);">4、Split	C#拆分字符串</font>**

```csharp
string st = "语文|数学|英语|物理";

string[] split = st.Split(new char[]{'|'},2);

for (int i = 0; i < split.Length; i++)
{
    Console.WriteLine(split[i]);
}
```

**<font style="color:rgb(77, 77, 77);">5、IsNullOrEmpty</font>****	****<font style="color:rgb(77, 77, 77);">判断string是否为空</font>**

```csharp
string str="";  
1、if(str=="")  
2、if(str==String.Empty)  
3、if(str.length==0) 
if(string.IsNullOrEmpty( str )) 
if(str!=null&&str.length==0)  
```

**<font style="color:rgb(77, 77, 77);">6、Insert	字符串插入</font>**

```csharp
string str="123456";  
str.Insert(0,"x");//x123456
```

