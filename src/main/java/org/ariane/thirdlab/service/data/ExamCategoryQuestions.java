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
}

