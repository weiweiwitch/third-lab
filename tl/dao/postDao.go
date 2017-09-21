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

func FindPostsByParentPostId(db *gorm.DB, parentId int) []*domain.Post {
	posts := make([]*domain.Post, 0)
	if parentId == 0 {
		return posts
	}
	db.Where(&domain.Post{ParentId: parentId}).
		Find(&posts)
	return posts
}

func FindPostsByTitle(db *gorm.DB, postParam string) []*domain.Post {
	posts := make([]*domain.Post, 0)
	db.Where("title like ?", "%"+postParam+"%").
		Find(&posts)
	return posts
}

// 找出所有相同tag的文章
func FindPostsByTagId(db *gorm.DB, tagId int) []*domain.Post {
	posts := make([]*domain.Post, 0)
	if tagId == 0 {
		return posts
	}
	db.Where(&domain.Post{TagId: tagId}).
		Find(&posts)
	return posts
}

func FindPostsUntagged(db *gorm.DB) []*domain.Post {
	posts := make([]*domain.Post, 0)
	db.Where("tag_id = ?", 0).
		Find(&posts)
	return posts
}
