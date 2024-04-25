import * as yup from "yup";

const FIELD_REQUIRED = 'This field is required';
// const phoneRegExp = /^((\+38))?([ ])?((\(\d{3}\))|(\d{3}))?([ ])?(\d{3}[- ]?\d{2}[- ]?\d{2})$/;
const eMailRegExp=/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;


const ValidationLogin = yup.object().shape({

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

});
export default ValidationLogin;