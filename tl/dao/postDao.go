package dao

import (
	"github.com/jinzhu/gorm"
	"thirdlab/tl/domain"
)

func FindPosts(db *gorm.DB) []*domain.Post {
	posts := make([]*domain.Post, 0)
	db.Find(&posts)
	return posts
}

func FindPostById(db *gorm.DB, id int) *domain.Post {
	post := &domain.Post{}
	notFound := db.First(&post, id).RecordNotFound()
	if notFound {
		return nil
	}

	return post
}

func FindPostsByTitle(db *gorm.DB, postParam string) []*domain.Post {
	posts := make([]*domain.Post, 0)
	db.Where("title like ?", "%"+postParam+"%").
		Find(&posts)
	return posts
}

func FindPostsByIds(db *gorm.DB, ids []int) []*domain.Post {
	posts := make([]*domain.Post, 0)
	db.Where("id IN (?)", ids).
		Find(&posts)
	return posts
}