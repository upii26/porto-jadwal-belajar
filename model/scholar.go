package model

type Scholar struct {
	NIM    string `json:"nim"`
	Nama   string `json:"nama"`
	Prodi  string `json:"prodi"`
	Gender string `json:"gender"`
	Email  string `json:"email"`
	Status string `json:"status"`
}
