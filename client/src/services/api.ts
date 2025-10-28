import axios from "axios";

export const api = axios.create({
	baseURL: "http://192.168.0.8:3333",
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
	responseType: "json",
	responseEncoding: "utf8",
});
