package domain

type PostTagRelation struct {
	ID int `gorm:"primary_key"`
	V  int `gorm:"not null;type:bigint"`

	TagId  int `gorm:"not null"`
	PostId int `gorm:"not null"`
}
