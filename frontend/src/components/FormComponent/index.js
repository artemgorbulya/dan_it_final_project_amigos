import React, { memo } from 'react';
import {Form, Formik} from "formik";
import styles from "./FormComponent.module.scss"
import PropTypes from "prop-types";


const FormComponent = ({ formFields, initialValues, validationSchema, handleSubmit }) => {
    return(
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {()=>{
                    return(
                        <Form
                            action=""
                            className={styles.formStyle}
                            children={formFields}
                            key={formFields.key}
                        />
                    )
                }}
            </Formik>
        </div>
    )
};
FormComponent.propTypes = {
    formFields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    initialValues:PropTypes.object,
    validationSchema:PropTypes.object,
    handleSubmit:PropTypes.func
};

FormComponent.defaultProps = {
    formFields:[],
    initialValues:{},
    validationSchema:{},
    handleSubmit:undefined
};
export default memo(FormComponent);