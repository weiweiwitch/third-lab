package org.ariane.thirdlab.service.data;

import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectGoal;
import org.ariane.thirdlab.domain.ProjectSection;
import org.ariane.thirdlab.domain.ProjectTask;

import java.util.ArrayList;
import java.util.List;

public class SpecProjectData {

	public int rt;

	public Project project;

	public List<ProjectSection> sections = new ArrayList<>();

	public List<ProjectGoal> goals = new ArrayList<>();

	public List<ProjectTask> tasks = new ArrayList<>();

	public SpecProjectData() {

	}

	public SpecProjectData(int rt) {
		this.rt = rt;
	}
}
