import "@babel/polyfill";
import express from "express";
import path from "path";
import CONFIG from "./config/index";
import appLoader from "./loaders/index";
import createConnection from "./loaders/webSocket";

const startServer = async () => {
	const app = express();

	await appLoader(app);

	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
	})

	const server = app.listen(CONFIG.PORT, () => {
		console.log(`############## Server has started on port ${CONFIG.PORT}! ##############`);
	})
	
	createConnection(server);
};

startServer();
