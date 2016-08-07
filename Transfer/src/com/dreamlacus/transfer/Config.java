package com.dreamlacus.transfer;

import java.util.ArrayList;
import java.util.List;

public class Config {
	List<Trans> transList = new ArrayList<Trans>();

	private Config() {

	}

	public static Config defaults() {
		Config config = new Config();
		config.addTrans(new Trans("127.0.0.1:80","127.0.0.1:8080"));
		return config;
	}

	public static Config parse(String json) {
		Config config = new Config();
		return config;
	}

	public List<Trans> getTransList() {
		List<Trans> list = new ArrayList<Trans>();
		for(Trans t : transList){
			list.add(t);
		}
		return list;
	}
	
	private void addTrans(Trans trans){
		this.transList.add(trans);
	}

	public static class Trans {
		String local;
		String remote;

		Trans() {

		}

		Trans(String local, String remote) {
			this.local = local;
			this.remote = remote;
		}

		public String getLocal() {
			return local;
		}

		public void setLocal(String local) {
			this.local = local;
		}

		public String getRemote() {
			return remote;
		}

		public void setRemote(String remote) {
			this.remote = remote;
		}
		
		public String getLocalIP(){
			return ip(local);
		}
		
		public int getLocalPort(){
			return port(local);
		}
		
		public String getRemoteIP(){
			return ip(remote);
		}
		
		public int getRmotePort(){
			return port(remote);
		}
		
		private String ip(String str){
			String[] tmp = str.split(":");
			return tmp.length > 1 ? tmp[0] : null;
		}
		
		private int port(String str){
			String[] tmp = str.split(":");
			String p = tmp.length > 1 ? tmp[1] : tmp[0];
			return Integer.valueOf(p);
		}
		
	}
}
