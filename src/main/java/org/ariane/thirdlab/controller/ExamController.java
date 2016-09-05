package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.service.ExamService;
import org.ariane.thirdlab.service.data.ExamCategoryQuestions;
import org.ariane.thirdlab.service.data.ExamCategorySummary;
import org.ariane.thirdlab.service.data.ExamPreparedQuestions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExamController {

	@Autowired
	private ExamService examService;

	/**
	 * 查询问题类别汇总信息
	 *
	 * @return
	 */
	@RequestMapping(value = "/categorysummary", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse categorySummary() {
		List<ExamCategorySummary> data = examService.queryExamCategorySummary();
		QueryResponse queryResponse = new QueryResponse(TlResultCode.SUCCESS);
		queryResponse.data = data;
		return queryResponse;
	}

	/**
	 * 创建类别
	 *
	 * @param needCreateCategory
	 * @return
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse createCategory(@RequestBody CategoryDetailData needCreateCategory) {
		String categoryName = needCreateCategory.categoryName;
		long parentId = needCreateCategory.parentId;
		int rt = examService.addCategory(categoryName, parentId);
		QueryResponse queryResponse = new QueryResponse(rt);
		return queryResponse;
	}

	/**
	 * 更新类别
	 *
	 * @param id
	 * @param needUpdateCategory
	 * @return
	 */
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse updateCategory(@PathVariable long id, @RequestBody CategoryDetailData needUpdateCategory) {
		String categoryName = needUpdateCategory.categoryName;
		long parentId = needUpdateCategory.parentId;
		int rt = examService.updateCategory(id, categoryName, parentId);
		QueryResponse queryResponse = new QueryResponse(rt);
		return queryResponse;
	}

	public static class CategoryDetailData {
		public String categoryName;
		public long parentId;
	}

	/**
	 * 删除类别
	 *
	 * @param id
	 */
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse deleteCategory(@PathVariable long id) {
		int rt = examService.delCategory(id);
		QueryResponse queryResponse = new QueryResponse(rt);
		return queryResponse;
	}

	/**
	 * 查询特定类别的问题集
	 *
	 * @return
	 */
	@RequestMapping(value = "/categoryquestions", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse queryCategoryQuestions(int categoryId) {
		ExamCategoryQuestions examCategoryQuestions = examService.queryExamCategoryQuestions(categoryId);
		if (examCategoryQuestions == null) {
			QueryResponse queryResponse = new QueryResponse(TlResultCode.NOT_FOUND_TARGET_CATEGORY);
			return queryResponse;
		}

		QueryResponse queryResponse = new QueryResponse(TlResultCode.SUCCESS);
		queryResponse.data = examCategoryQuestions;
		return queryResponse;
	}

	/**
	 * 创建文章
	 *
	 * @param needCreateQuestion
	 * @return
	 */
	@RequestMapping(value = "/questions", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse createPost(@RequestBody QuestionDetailData needCreateQuestion) {
		String question = needCreateQuestion.question;
		String answer = needCreateQuestion.answer;
		String answerOther1 = needCreateQuestion.answerOther1;
		String answerOther2 = needCreateQuestion.answerOther2;
		String answerOther3 = needCreateQuestion.answerOther3;
		long categoryId = needCreateQuestion.categoryId;
		int rt = examService.addQuestion(question, answer, answerOther1, answerOther2, answerOther3, categoryId);
		QueryResponse queryResponse = new QueryResponse(rt);
		return queryResponse;
	}

	/**
	 * 更新题目
	 *
	 * @param id
	 * @param needUpdateQuestion
	 * @return
	 */
	@RequestMapping(value = "/questions/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse updateQuestion(@PathVariable long id, @RequestBody QuestionDetailData needUpdateQuestion) {
		String question = needUpdateQuestion.question;
		String answer = needUpdateQuestion.answer;
		String answerOther1 = needUpdateQuestion.answerOther1;
		String answerOther2 = needUpdateQuestion.answerOther2;
		String answerOther3 = needUpdateQuestion.answerOther3;
		long categoryId = needUpdateQuestion.categoryId;
		int rt = examService.updateQuestion(id, question, answer, answerOther1, answerOther2, answerOther3, categoryId);
		QueryResponse queryResponse = new QueryResponse(rt);
		return queryResponse;
	}

	public static class QuestionDetailData {
		public String question;
		public String answer;
		public String answerOther1;
		public String answerOther2;
		public String answerOther3;
		public long categoryId;
	}

	/**
	 * 删除题目
	 *
	 * @param id
	 */
	@RequestMapping(value = "/questions/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse deleteQuestion(@PathVariable long id) {
		int rt = examService.delQuestion(id);
		QueryResponse queryResponse = new QueryResponse(rt);
		return queryResponse;
	}

	@RequestMapping(value = "/preparequestions", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public QueryResponse PrepareSpecCategoryQuestions(int categoryId, int num) {
		ExamPreparedQuestions data = examService.prepareQuestions(categoryId, num);
		QueryResponse queryResponse = new QueryResponse(TlResultCode.SUCCESS);
		queryResponse.data = data;
		return queryResponse;
	}
}
