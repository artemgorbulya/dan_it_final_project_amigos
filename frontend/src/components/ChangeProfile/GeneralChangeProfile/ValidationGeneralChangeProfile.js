import * as yup from "yup";

const FIELD_REQUIRED = 'This field is required';
const phoneRegExp = /^((\+38))?([ ])?((\(\d{3}\))|(\d{3}))?([ ])?(\d{3}[- ]?\d{2}[- ]?\d{2})$/;
// const eMailRegExp=/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;

const ValidationGeneralChangeProfile = yup.object().shape({

    firstName: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    lastName: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED),
    selectYear:  yup
        .number()
        .required(FIELD_REQUIRED),
    selectMonth: yup
        .number()
        .required(FIELD_REQUIRED),
    selectDate:  yup
        .number()
        .required(FIELD_REQUIRED)
        .test('selectDate', 'Invalid Day',
            function(day) {
                const month = this.options.parent.selectMonth;
                const year = this.options.parent.selectYear;
                // February
                if (month === 2) {
                    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
                    if (day > 29 || (day === 29 && !isLeapYear)) {
                        return false;
                    }
                }
                return true;
            }
        )
        .test(
            'selectDate', 'Invalid Day',
            function(day) {
                const month = this.options.parent.selectMonth;
                // Check months with less than 31 days
                // 4. April
                // 6. June
                // 9. September
                // 11. November
                if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
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
    about:yup
        .string()
        .trim(),
    mobile: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED)
        .matches(phoneRegExp, 'Phone error!'),
    languages: yup
        .array(),
});
export default ValidationGeneralChangeProfile;