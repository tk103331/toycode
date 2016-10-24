#coding=utf8
import urllib.request
import json
import re

def getSuggestion(word):
	headers={'User-Agent':'Mozilla/5.0'}
	#url = "https://www.google.com.hk/complete/search?client=hp&hl=zh-CN&sugexp=ernk_timepromotiona&gs_rn=35&gs_ri=hp&tok=rNp0iPattR-lTwVnhtFFxg&cp=1&gs_id=3i0&q="+word+"&xhr=t"
	#req = urllib.request.Request(url,None,headers)
	url = "https://www.google.com.hk/complete/search?client=hp&q="+word
	res_data = urllib.request.urlopen(url)
	print(res_data)
	res = res_data.read()
	s=res.decode('utf8').replace('window.google.ac.h(','').replace(')','')
	sugs=json.loads(s)
	return sugs[1]

while True:
	wd=input('Input a keyword:')
	if wd:
		sugs=getSuggestion(wd)
		if sugs:
			for sug in sugs:
				print(sug[0])
		else:
			print('None')
			continue
	else:
		break
