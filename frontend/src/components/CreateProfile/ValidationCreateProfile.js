import * as yup from "yup";

const FIELD_REQUIRED = 'This field is required';
const phoneRegExp = /^((\+38))?([ ])?((\(\d{3}\))|(\d{3}))?([ ])?(\d{3}[- ]?\d{2}[- ]?\d{2})$/;
const eMailRegExp=/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;

const ValidationCreateProfile = yup.object().shape({

    firstName: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    lastName: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    sex: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    selectYear:  yup
        .number()
        .required(FIELD_REQUIRED),
    selectMonth: yup
        .string()
        .required(FIELD_REQUIRED),
    selectDate:  yup
        .number()
        .required(FIELD_REQUIRED)
        .test('selectDate', 'Invalid Day',
            function(day) {
                const month = this.options.parent.selectMonth;
                const year = Number(this.options.parent.selectYear);

                // February
                if (month === "Февраль") {
                    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
                    if (isLeapYear && day <= 29) return true;
                    if (day > 29 || (day === 29 && !isLeapYear)) {
                        return false;
                    }
                }

                // Whether the data is properly calculated with the total days in month
                if ((month === "Апрель" || month === "Июнь" || month === "Сентябрь" || month === "Ноябрь") && day === 31) {
                    return false;
                }
                return true;
            }
        ),
    country:yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    city: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    mobile: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED)
        .matches(phoneRegExp, 'Phone error!'),
    email:  yup
        .string()
        .trim()
        .required(FIELD_REQUIRED)
        .matches(eMailRegExp, 'E-mail error!'),
    password: yup
        .string()
        .trim()
        .min(8, 'min 8 symbol')
        .required(FIELD_REQUIRED),
    confirmPassword: yup
        .string()
        .trim()
        .min(8, 'min 8 symbol')
        .required(FIELD_REQUIRED)
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export default ValidationCreateProfile;