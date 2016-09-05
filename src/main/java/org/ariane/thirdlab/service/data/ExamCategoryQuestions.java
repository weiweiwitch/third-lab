package org.ariane.thirdlab.service.data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ariane on 16/9/5.
 */
public class ExamCategoryQuestions {
	public long categoryId;
	public String categoryName;
	public List<ExamQuestionInfo> questions = new ArrayList<>();

	public static class ExamQuestionInfo {
		public long questionId;
		public String question;
		public String answer;
		public String answerOther1;
		public String answerOther2;
		public String answerOther3;
		public int proficiency; // 熟练度
	}
}

