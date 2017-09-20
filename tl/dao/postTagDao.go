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

func FindPostTagByTagIds(db *gorm.DB, tagIds []int) []*domain.PostTag {
	postTags := make([]*domain.PostTag, 0)
	db.Where("id IN (?)", tagIds).
		Find(&postTags)
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
