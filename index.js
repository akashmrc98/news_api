const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require('dotenv').config()


const data = require("./data.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/news", (req, res) => {
	return res.status(200).json(data.articles);
});

cron.schedule("*/15 * * * *", async () => {
	const response = await axios.get(process.env.NEWS_API);
	const latestNewsItems = response.data.articles;
	// let currentNewsItems = data.articles;
	// const diff = latestNewsItems.filter((x) => !currentNewsItems.includes(x));
	// currentNewsItems = [...diff, ...currentNewsItems];

	// const totalCount = currentNewsItems.length;
	// if (totalCount > 100)
	// 	for (let i = 0; i < totalCount - 100; i++) currentNewsItems.pop();

	fs.writeFileSync(
		path.resolve(__dirname, "data.json"),
		JSON.stringify({ articles: latestNewsItems })
	);
});

app.listen(5000, async () => {
	console.log("App is running at port 5001");
});
