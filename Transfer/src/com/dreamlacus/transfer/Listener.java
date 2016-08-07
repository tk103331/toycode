package com.dreamlacus.transfer;

import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

import com.dreamlacus.transfer.Config.Trans;

public class Listener extends Thread {

	private int BACK_LOG = 10;

	private Trans trans;
	private ServerSocket server;
	private boolean stoped = false;
	private List<Handler> handlerList = new ArrayList<Handler>();

	public Listener(Trans trans) {
		this.trans = trans;
	}

	public void run() {
		String ip = trans.getLocalIP();
		int port = trans.getLocalPort();

		try {
			if (ip == null) {
				server = new ServerSocket(port);
			} else {
				server = new ServerSocket(port, BACK_LOG, InetAddress.getByAddress(Tools.ip2b(ip)));
			}
			log("listen on port : " + port);
			while (!stoped) {
				Socket socket = server.accept();
				log("coming a socket : " + socket);
				Handler h = new Handler(socket, trans);
				h.start();
				handlerList.add(h);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void log(String info) {
		Tools.log(this.getClass().getName() + "    " + info);
	}

}
