package model

type Lecturer struct {
	NoDosen string `json:"noDosen"`
	Nama    string `json:"nama"`
	Prodi   string `json:"prodi"`
	Email   string `json:"email"`
	Status  string `json:"status"`
}
