#coding=utf8
import urllib.request
import json
import re

def getSuggestion(word):
	headers={'User-Agent':'Mozilla/4.0'}
	url = "http://suggestion.baidu.com/su?wd="+word+"&p=3&cb=window.bdsug.sug&from=superpage&t=1392097137657"
	req = urllib.request.Request(url,None,headers)
	res_data = urllib.request.urlopen(req)
	res = res_data.read().decode('gbk')
	#print(res)

	m=re.search('s:.*',res)
	s=m.group(0)
	s=s.replace('s:','').replace('});','')
	sugs=json.loads(s)
	return sugs

while True:
	wd=input('Input a keyword:')
	if wd:
		sugs=getSuggestion(wd)
		if sugs:
			for sug in sugs:
				print(sug)
		else:
			print('None')
			continue
	else:
		break
