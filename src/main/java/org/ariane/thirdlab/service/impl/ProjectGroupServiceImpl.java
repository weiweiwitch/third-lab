package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.resp.AddGroupRt;
import org.ariane.thirdlab.dao.ProjectGroupDao;
import org.ariane.thirdlab.domain.ProjectGroup;
import org.ariane.thirdlab.service.ProjectGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProjectGroupServiceImpl implements ProjectGroupService {

	@Autowired
	private ProjectGroupDao projectGroupDao;

	@Override
	public AddGroupRt addProjectGroup(String name) {
		ProjectGroup group = new ProjectGroup();
		group.setName(name);
		projectGroupDao.save(group);

		AddGroupRt rt = new AddGroupRt();
		rt.rt = TlResultCode.SUCCESS;
		rt.groupId = group.getId();
		return rt;
	}

	@Override
	public int changeGroupName(long groupId, String name) {
		ProjectGroup group = projectGroupDao.findById(groupId);
		if (group == null) {
			return TlResultCode.NOT_FOUND_PROJECT_GROUP;
		}

		group.setName(name);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int delGroup(long groupId) {
		ProjectGroup group = projectGroupDao.findById(groupId);
		if (group == null) {
			return TlResultCode.NOT_FOUND_PROJECT_GROUP;
		}

		projectGroupDao.delete(group);

		return TlResultCode.SUCCESS;
	}

}
