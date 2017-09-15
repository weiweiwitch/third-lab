package dao

import (
	"github.com/jinzhu/gorm"
	"thirdlab/tl/domain"
)

func FindPostTagRelationByPostId(db *gorm.DB, postId int) []*domain.PostTagRelation {
	relations := make([]*domain.PostTagRelation, 0)
	db.Where(&domain.PostTagRelation{PostId: postId}).
		Find(&relations)
	return relations
}
