package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.dao.ExamQuestionCategoryDao;
import org.ariane.thirdlab.dao.ExamQuestionDao;
import org.ariane.thirdlab.domain.ExamQuestion;
import org.ariane.thirdlab.domain.ExamQuestionCategory;
import org.ariane.thirdlab.service.ExamService;
import org.ariane.thirdlab.service.data.ExamCategoryQuestions;
import org.ariane.thirdlab.service.data.ExamCategorySummary;
import org.ariane.thirdlab.service.data.ExamPreparedQuestions;
import org.ariane.thirdlab.service.data.ExamQuestionInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ExamServiceImpl implements ExamService {

	@Autowired
	private ExamQuestionCategoryDao examQuestionCategoryDao;

	@Autowired
	private ExamQuestionDao examQuestionDao;

	@Override
	public List<ExamCategorySummary> queryExamCategorySummary() {
		List<ExamCategorySummary> list = new ArrayList<>();
		Map<Long, Long> categoryNumMap = new HashMap<>();
		List<Object[]> categoryNums = examQuestionDao.calCategoryQuestionNum();
		for (Object[] categoryNum : categoryNums) {
			Long count = (Long) categoryNum[0];
			Long categoryId = (Long) categoryNum[1];
			categoryNumMap.put(categoryId, count);
		}

		List<ExamQuestionCategory> categories = examQuestionCategoryDao.findAll();
		for (ExamQuestionCategory category : categories) {
			ExamCategorySummary summary = new ExamCategorySummary();
			summary.id = category.getId();
			summary.category = category.getCategory();
			summary.parentCategoryId = category.getParentCategoryId();

			Long count = categoryNumMap.get(category.getId());
			if (count == null) {
				count = 0L;
			}
			summary.questionNum = count.intValue();
			list.add(summary);
		}

		return list;
	}

	@Override
	public int addCategory(String categoryName, long parentId) {
		ExamQuestionCategory category = new ExamQuestionCategory();
		category.setCategory(categoryName);
		category.setParentCategoryId(parentId);
		examQuestionCategoryDao.save(category);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int updateCategory(long categoryId, String categoryName, long parentCategoryId) {
		ExamQuestionCategory category = examQuestionCategoryDao.findById(categoryId);
		if (category == null) {
			return TlResultCode.NOT_FOUND_TARGET_CATEGORY;
		}

		category.setCategory(categoryName);
		category.setParentCategoryId(parentCategoryId);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int delCategory(long categoryId) {
		int questionNum = examQuestionDao.calSpecCategoryQuestionNum(categoryId);
		if (questionNum > 0) {
			return TlResultCode.CANT_DEL_NO_EMPTY_CATEGORY;
		}

		ExamQuestionCategory category = examQuestionCategoryDao.findById(categoryId);
		if (category == null) {
			return TlResultCode.NOT_FOUND_TARGET_CATEGORY;
		}
		examQuestionCategoryDao.delete(category);
		return TlResultCode.SUCCESS;
	}

	@Override
	public ExamCategoryQuestions queryExamCategoryQuestions(long categoryId) {
		ExamQuestionCategory category = examQuestionCategoryDao.findById(categoryId);
		if (category == null) {
			return null;
		}

		ExamCategoryQuestions examCategoryQuestions = new ExamCategoryQuestions();
		examCategoryQuestions.categoryId = categoryId;
		examCategoryQuestions.categoryName = category.getCategory();
		List<ExamQuestion> questions = examQuestionDao.findQuestions(categoryId);
		for (ExamQuestion question : questions) {
			ExamQuestionInfo q = new ExamQuestionInfo();
			q.questionId = question.getId();
			q.question = question.getQuestion();
			q.answer = question.getAnswer();
			q.answerOther1 = question.getAnswer2();
			q.answerOther2 = question.getAnswer3();
			q.answerOther3 = question.getAnswer4();
			q.proficiency = question.getProficiency();
			examCategoryQuestions.questions.add(q);
		}
		return examCategoryQuestions;
	}

	@Override
	public int addQuestion(String questionStr, String answerStr, String answerOther1, String answerOther2, String answerOther3, long categoryId) {
		ExamQuestion question = new ExamQuestion();
		question.setQuestion(questionStr);
		question.setAnswer(answerStr);
		question.setAnswer2(answerOther1);
		question.setAnswer3(answerOther2);
		question.setAnswer4(answerOther3);
		question.setCategoryId(categoryId);
		examQuestionDao.save(question);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int updateQuestion(long questionId, String questionStr, String answerStr, String answerOther1, String answerOther2, String answerOther3,
							  long categoryId) {
		ExamQuestion question = examQuestionDao.findById(questionId);
		if (question == null) {
			return TlResultCode.NOT_FOUND_TARGET_QUESTION;
		}

		question.setQuestion(questionStr);
		question.setAnswer(answerStr);
		question.setAnswer2(answerOther1);
		question.setAnswer3(answerOther2);
		question.setAnswer4(answerOther3);
		question.setCategoryId(categoryId);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int delQuestion(long questionId) {
		ExamQuestion question = examQuestionDao.findById(questionId);
		if (question == null) {
			return TlResultCode.NOT_FOUND_TARGET_QUESTION;
		}

		examQuestionDao.delete(question);
		return TlResultCode.SUCCESS;
	}

	@Override
	public ExamPreparedQuestions prepareQuestions(long categoryId, int num) {
		ExamPreparedQuestions examPreparedQuestions = new ExamPreparedQuestions();
		List<ExamQuestion> questions = examQuestionDao.findQuestionsLimit(categoryId, num);
		for (ExamQuestion question : questions) {
			ExamQuestionInfo q = new ExamQuestionInfo();
			q.questionId = question.getId();
			q.question = question.getQuestion();
			q.answer = question.getAnswer();
			q.answerOther1 = question.getAnswer2();
			q.answerOther2 = question.getAnswer3();
			q.answerOther3 = question.getAnswer4();
			q.proficiency = question.getProficiency();
			examPreparedQuestions.questions.add(q);
		}
		return examPreparedQuestions;
	}

}
