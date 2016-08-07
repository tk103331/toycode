package com.dreamlacus.transfer;

import java.util.ArrayList;
import java.util.List;

public class Transfer {
	
	private Config config;
	
	private List<Listener> listenerList = new ArrayList<Listener>();
	
	public Transfer(){
		this.config = Config.defaults();
	}
	
	public Transfer(Config config){
		this.config = config;
	}
	
	public void start(){
		List<Config.Trans> list = config.getTransList();
		for(Config.Trans t : list){
			Listener l = new Listener(t);
			l.start();
			listenerList.add(l);
		}
	}
	
	public void stop(){
		for(Listener l : listenerList){
			l.interrupt();
		}
	}

	public static void main(String[] args) {
		new Transfer().start();

	}

}
