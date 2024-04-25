import * as yup from "yup";

const filterSchema = yup.object({
	minAge: yup.number().moreThan(16, "Возраст должен быть больше 16").lessThan(110, "Возраст должен быть меньше 100"),
	maxAge: yup.number().moreThan(16, "Возраст должен быть больше 16").lessThan(110, "Возраст должен быть меньше 100"),
});

export default filterSchema;