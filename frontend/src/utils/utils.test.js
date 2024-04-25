import {parsePeopleWanted} from "./parsePeopleWanted";

describe("testing utils functions", () => {
	it('should return valid value parsePeopleWanted', () => {
		expect(parsePeopleWanted("boy")).toEqual("Мужчина")
		expect(parsePeopleWanted("girl")).toEqual("Девушка")
		expect(parsePeopleWanted("company")).toEqual("Компания")
		expect(parsePeopleWanted("no matter")).toEqual("Всё равно")
	});
})
