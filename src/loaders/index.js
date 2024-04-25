import expressLoader from "./express";
import mongoDBLoader from "./mongodb";

export default async (app) => {
	await mongoDBLoader();
	console.log("~~~~~~~~~~~ MongoDB loaded ~~~~~~~~~~~");
	
	await expressLoader(app);
	console.log("~~~~~~~~~~~ Express loaded ~~~~~~~~~~~");
}