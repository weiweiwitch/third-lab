package domain

import "time"

type Post struct {
	ID int `gorm:"primary_key"`
	V  int `gorm:"not null;type:bigint"`

	ParentId         int       `gorm:"not null"`
	MgId             string    `gorm:"not null;size:150"`
	MgParentId       string    `gorm:"not null;size:150"`
	Title            string    `gorm:"not null;size:150"`
	Post             string    `gorm:"not null;size:256000"`
	CreateTime       time.Time `gorm:"not null;type:datetime"`
	LastModifiedTime time.Time `gorm:"not null;type:datetime"`
	Status           int       `gorm:"not null"`
	NoTags           int       `gorm:"not null"`
}
