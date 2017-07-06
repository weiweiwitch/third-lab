package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.resp.AddGroupRt;

/**
 * Created by ariane on 2017/7/3.
 */
public interface ProjectGroupService {

	/**
	 * 添加项目组
	 *
	 * @param name
	 * @return
	 */
	public AddGroupRt addProjectGroup(String name);

	/**
	 * 修改组名
	 *
	 * @param groupId
	 * @param name
	 * @return
	 */
	public int changeGroupName(long groupId, String name);

	/**
	 * 删除项目组
	 *
	 * @param groupId
	 * @return
	 */
	public int delGroup(long groupId);

}
