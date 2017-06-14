package org.ariane.thirdlab.resp;

/**
 * Created by ariane on 2017/6/14.
 */
public class LabResp<T> {
	public int rt;
	public T data;

	public LabResp(int rt) {
		this.rt = rt;
	}
}
