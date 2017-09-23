package dao

import (
	"github.com/jinzhu/gorm"
	"thirdlab/tl/domain"
)

func FindSummary(db *gorm.DB) *domain.Summary {
	summary := &domain.Summary{}

	notFound := db.First(&summary).RecordNotFound()
	if notFound {
		return nil
	}

	return summary
}
