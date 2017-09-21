package dao

import (
	"github.com/jinzhu/gorm"
	"thirdlab/tl/domain"
)

func FindPostTags(db *gorm.DB) []*domain.PostTag {
	postTags := make([]*domain.PostTag, 0)
	db.Find(&postTags)
	return postTags
}

func FindPostTagById(db *gorm.DB, id int) *domain.PostTag {
	tag := &domain.PostTag{}
	notFound := db.First(&tag, id).RecordNotFound()
	if notFound {
		return nil
	}

	return tag
}

func FindPostTagsByParentTagId(db *gorm.DB, parentTagId int) []*domain.PostTag {
	postTags := make([]*domain.PostTag, 0)
	if parentTagId == 0 {
		return postTags
	}

	db.Where(&domain.PostTag{ParentTagId: parentTagId}).Find(&postTags)
	return postTags
}
