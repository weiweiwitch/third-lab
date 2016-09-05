package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ExamQuestionCategoryDao;
import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.domain.ExamQuestionCategory;
import org.ariane.thirdlab.domain.Post;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExamQuestionCategoryDaoImpl extends AbstractDaoImpl<ExamQuestionCategory> implements ExamQuestionCategoryDao {

	public ExamQuestionCategoryDaoImpl() {
		super(ExamQuestionCategory.class);
	}


}
