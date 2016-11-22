Set sapiX = CreateObject("SAPI.SpVoice")
sapiX.Volume = 100 '音量
sapiX.Rate = 1 '语音速率 越大越快
FlagsAsync=1  '同步或异步，1是异步
'下面这段是选系统已安装的语音，可以不运行，用控制面板人工手选好的
'set colVoice=sapiX.getVoices() '安装有多少个语音集合可选
'set sapiX.Voice=colVoice(1) '选第1种语音


strText=strText & "刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，刘越，开始我直接求上帝赐辆自行车。后来我琢磨上帝办事儿不是这个路数。 于是老子偷了一辆然后求上帝宽恕。"

sapiX.Speak strtext,FlagsAsync  '同步或异步
msgbox "调试窗口，注意同步和异步效果"
sapiX.Pause '暂停SPEAK，异步有效，如果MSGBOX按下去，还在扯的一段就卡察
MSGBOX "PAUSE，继续发音"
sapiX.Resume