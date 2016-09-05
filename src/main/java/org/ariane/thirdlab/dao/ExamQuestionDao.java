package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.ExamQuestion;

import java.util.List;

public interface ExamQuestionDao extends AbstractDao<ExamQuestion> {

	/**
	 * 计算各类别的题目的数量
	 *
	 * @return
	 */
	public List<Object[]> calCategoryQuestionNum();

	/**
	 * 查询特定类别问题
	 *
	 * @param categoryId
	 * @return
	 */
	public List<ExamQuestion> findQuestions(long categoryId);
}
