package domain

type Summary struct {
	ID int `gorm:"primary_key"`
	V  int `gorm:"not null;type:bigint"`

	Summary string `gorm:"not null;size:256000"`
}
