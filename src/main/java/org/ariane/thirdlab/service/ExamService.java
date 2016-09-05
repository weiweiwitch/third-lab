package org.ariane.thirdlab.service;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.service.data.ExamCategoryQuestions;
import org.ariane.thirdlab.service.data.ExamCategorySummary;

import java.util.List;

/**
 * Created by ariane on 16/9/3.
 */
public interface ExamService {
	/**
	 * 查询试题类别汇总信息
	 *
	 * @return
	 */
	public List<ExamCategorySummary> queryExamCategorySummary();

	/**
	 * 查询特定类别问题集
	 *
	 * @param categoryId
	 * @return
	 */
	public ExamCategoryQuestions queryExamCategoryQuestions(long categoryId);

	/**
	 * 添加问题
	 *
	 * @param questionStr
	 * @param answerStr
	 * @param answerOther1
	 * @param answerOther2
	 * @param answerOther3
	 * @param categoryId
	 * @return
	 */
	public int addQuestion(String questionStr, String answerStr, String answerOther1, String answerOther2, String answerOther3, long categoryId);

	/**
	 * 更新问题
	 *
	 * @param questionId
	 * @param questionStr
	 * @param answerStr
	 * @param answerOther1
	 * @param answerOther2
	 * @param answerOther3
	 * @param categoryId
	 * @return
	 */
	public int updateQuestion(long questionId, String questionStr, String answerStr, String answerOther1, String answerOther2, String answerOther3,
							  long categoryId);

	/**
	 * 删除问题
	 *
	 * @param questionId
	 * @return
	 */
	public int delQuestion(long questionId);

}
