import * as yup from "yup";
const FIELD_REQUIRED = 'This field is required';

const ValidationChangePassword = yup.object().shape({
    oldPassword: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED)
        .min(8, 'min 8 symbol'),
    newPassword: yup
        .string()
        .trim()
        .required(FIELD_REQUIRED)
        .min(8, 'min 8 symbol'),
    confirmPassword: yup
        .string()
        .trim()
        .min(8, 'min 8 symbol')
        .required(FIELD_REQUIRED)
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
export default ValidationChangePassword;