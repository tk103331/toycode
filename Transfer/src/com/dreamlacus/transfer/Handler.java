package com.dreamlacus.transfer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import com.dreamlacus.transfer.Config.Trans;

public class Handler extends Thread {

	private Socket socket;

	private Socket client;
	
	private Pipe lrPipe;
	
	private Pipe rlPipe;

	private Trans trans;

	private boolean stoped = false;

	public Handler(Socket socket, Trans trans) {
		this.socket = socket;
		this.trans = trans;
	}

	public void run() {
		while (!stoped) {
			boolean ready = isSocketReady(socket);
			if(ready){
				if(!isSocketReady(client)){
					connect();
				}
			}else{
				stoped = true;
			}
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		close();
	}
	
	private void close(){
		log("close");
		try {
			if (client != null) {
				client.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			if (socket != null) {
				socket.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		lrPipe.close();
		rlPipe.close();
	}
	
	private void connect(){
		try {
			client = new Socket(trans.getRemoteIP(), trans.getRmotePort());
			log("create a socket : " + client);
			lrPipe = new Pipe(client.getInputStream(), socket.getOutputStream());
			lrPipe.start();
			rlPipe = new Pipe(socket.getInputStream(), client.getOutputStream());
			rlPipe.start();
		} catch (Exception e) {
			stoped = true;
			e.printStackTrace();
		}
	}

	private boolean isSocketReady(Socket socket) {
		return socket != null && !socket.isClosed() && !socket.isInputShutdown() && !socket.isOutputShutdown();
	}
	
	private void log(String info) {
		Tools.log(this.getClass().getName() + "    " + info);
	}

	private class Pipe extends Thread {
		private InputStream in;
		private OutputStream out;

		public Pipe(InputStream in, OutputStream out) {
			this.in = in;
			this.out = out;
		}

		public void run() {
			log("pipe start");
			byte[] buf = new byte[1024];
			int n = -1;
			while (!stoped && isSocketReady(socket) && isSocketReady(client)) {
				//log("check data");
				try {
					while ((n = in.read(buf)) != -1) {
						out.write(buf, 0, n);
						out.flush();
					}
				} catch (Exception e) {
					e.printStackTrace();
					break;
				}
			}
			close();
		}
		
		public void close(){
			log("close");
			try {
				if (in != null) {
					in.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		private void log(String info) {
			Tools.log(this.getClass().getName() + "    " + info);
		}
	}
}
