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
	 * 统计特定类别问题数
	 *
	 * @param categoryId
	 * @return
	 */
	public Integer calSpecCategoryQuestionNum(long categoryId);

	/**
	 * 查询特定类别问题
	 *
	 * @param categoryId
	 * @return
	 */
	public List<ExamQuestion> findQuestions(long categoryId);

	/**
	 * 获取一定数量的问题
	 *
	 * @param categoryId
	 * @param num
	 * @return
	 */
	public List<ExamQuestion> findQuestionsLimit(long categoryId, int num);
}
