Set html = CreateObject("htmlfile")
Set http = CreateObject("Msxml2.ServerXMLHTTP")

html.designMode = "on" ' 开启编辑模式

http.open "GET", "http://www.cnblogs.com/cate/python/", False
http.send
strHtml = http.responseText

html.write strHtml ' 写入数据
Set post_list = html.getElementById("post_list")
For Each el In post_list.children
    WScript.Echo el.getElementsByTagName("a")(0).innerText
Next