package domain

type PostTag struct {
	ID int `gorm:"primary_key"`
	V  int `gorm:"not null;type:bigint"`

	Tag         string `gorm:"not null;size:150"`
	ParentTagId int    `gorm:"not null"`
}
