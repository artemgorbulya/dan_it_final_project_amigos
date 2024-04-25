export const parsePeopleWanted = (peopleWanted) => {
	if (peopleWanted === "girl") return "Девушка";
	if (peopleWanted === "boy") return "Мужчина";
	if (peopleWanted === "company") return "Компания";
	if (peopleWanted === "no matter") return "Всё равно";
}