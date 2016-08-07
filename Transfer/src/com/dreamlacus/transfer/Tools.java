package com.dreamlacus.transfer;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Tools {
	
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public static byte[] ip2b(String ip){
		String[] ipStr = ip.split("\\.");
        byte[] ipBuf = new byte[4];
        for(int i = 0; i < 4; i++){
            ipBuf[i] = (byte)(Integer.parseInt(ipStr[i])&0xff);
        }
        return ipBuf;
	}
	
	public static void log(String info){
		System.out.println(sdf.format(new Date()) + "    " + Thread.currentThread().getName() + "    " + info);
	}
}
