package handlers

type Response struct {
	Status  int `json:"status"`
	Message any `json:"message"`
	Data    any `json:"data"`
}

type HTTPError struct {
	Status  int    `json:"status" example:"400"`
	Message string `json:"message" example:"bad request"`
}
