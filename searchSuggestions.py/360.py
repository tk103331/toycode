#coding=utf8
import urllib.request
import json
import re

def getSuggestion(word):
	headers={'User-Agent':'Mozilla/4.0'}
	url = "http://sug.so.360.cn/suggest?callback=suggest_so&encodein=utf-8&encodeout=utf-8&format=json&fields=word,obdata&word="+word
	req = urllib.request.Request(url,None,headers)
	res_data = urllib.request.urlopen(req)
	res = res_data.read().decode('utf8')
	
	s=res.replace('suggest_so(','').replace(');','')
	sugs=json.loads(s)
	return sugs['result']

while True:
	wd=input('Input a keyword:')
	if wd:
		sugs=getSuggestion(wd)
		if sugs:
			for sug in sugs:
				print("    " + sug['word'])
		else:
			print('None')
			continue
	else:
		break
