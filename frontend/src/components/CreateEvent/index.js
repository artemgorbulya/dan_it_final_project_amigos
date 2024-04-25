import React, { useState, useCallback, memo } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./CreateEvent.module.scss";
import Stepper from "./Stepper";
import Button from "../Button";
import { Category, PlaceAndDate, Details, Photo, CreateSuccess } from "./Steps";
import { PostCreateSchema } from "../Validation";
import { createFormData,  formInitialValues } from "../../constants/event";
import { API_EVENT } from "../../constants/api";
import { userOperations } from "../../store/user";

const { steps, formId, formFields } = createFormData;

const CreateEvent = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [validNext, setValidNext] = useState(false);
    const isLastStep = activeStep === steps.length - 1;
    const currentSchema = PostCreateSchema[activeStep];
    const dispatch = useDispatch();

    const renderStepContent = useCallback((props) => {
        switch (activeStep) {
            case 0:
                PostCreateSchema[activeStep]
                    .isValid({category: props[formFields.category.name]})
                    .then(valid => setValidNext(valid));

                return <Category categoryField={formFields.category}
                                 value={props[formFields.category.name]} />;
            case 1:
                PostCreateSchema[activeStep]
                    .isValid({
                        date: props[formFields.date.name],
                        city: props[formFields.city.name]
                    })
                    .then(valid => setValidNext(valid));

                return <PlaceAndDate cityField={formFields.city}
                              addressField={formFields.address}
                              dateField={formFields.date} />;
            case 2:
                PostCreateSchema[activeStep]
                    .isValid({
                        peopleWanted: props[formFields.peopleWanted.name],
                        title: props[formFields.title.name],
                        description: props[formFields.description.name],
                    })
                    .then(valid => setValidNext(valid));

                return <Details peopleWantedField={formFields.peopleWanted}
                                titleField={formFields.title}
                                descriptionField={formFields.description} />;
            case 3:
                PostCreateSchema[activeStep]
                    .isValid({file: props[formFields.file.name]})
                    .then(valid => setValidNext(valid));

                return <Photo photoField={formFields.file} {...props}/>;
            default:
                return;
        }
    }, [activeStep]);

    const history = useHistory();

    const handleSubmit = (values, {setSubmitting, setTouched, resetForm, setStatus, setErrors}) => {
        if (isLastStep) {
            values.dateStart = !values.date.value ?
                null
                : (Array.isArray(values.date.value)
                        ? values.date.value[0].getTime()
                        : values.date.value.getTime()
                );

            values.dateEnd = !values.date.value ?
                null
                : (Array.isArray(values.date.value)
                    ? values.date.value[1] && values.date.value[1].getTime()
                    : null
                );

            axios.post(API_EVENT, values)
                .then( ({ data }) => {
                    //console.log(data.data); //event Object
                    //console.log(data.success); //true, false
                    dispatch(userOperations.dataUserOperation(data.data));
                    URL.revokeObjectURL(values.file);
                    setActiveStep(activeStep + 1);
                    resetForm({});
                    setStatus({success: true});
                }).catch(err => {
                    console.log(err);
                    setStatus({success: false});
                    setErrors({submit: err});
                });
        } else {
            setActiveStep(activeStep + 1);
            setTouched({});
        }
        setSubmitting(false);
    }

    const onPrevClick = useCallback(e => {
        e.preventDefault();
        setActiveStep(() => activeStep > 0 ? activeStep - 1 : 0);
    }, [activeStep]);

    return (
        <>
            <Stepper steps={steps} active={activeStep} />
            <div className={styles[`mainWrap-${activeStep}`]}>
                {activeStep === steps.length ? (
                    <>
                        <div className={styles[`contentWrap-${steps.length}`]}>
                            <CreateSuccess />
                        </div>
                        <div className={styles.controlsWrap}>
                            <Button
                                classList='btn btn--primary'
                                action={() => history.push('/home')}
                                children='Завершить'
                            />
                        </div>
                    </>
                ) : (
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={currentSchema}
                        onSubmit={handleSubmit}
                    >
                        {({values, isSubmitting, ...props}) => (
                            <Form id={formId} encType='multipart/form-data'>
                                <div className={styles[`contentWrap-${activeStep}`]}>
                                    { renderStepContent(values) }
                                </div>
                                <div className={styles.controlsWrap}>
                                    {activeStep !== 0 && (
                                        <Button classList='btn btn--stroke-grey' action={onPrevClick}>
                                            Назад
                                        </Button>
                                    )}
                                    <Button
                                        type='submit'
                                        classList={`btn btn--${validNext ? 'primary' : 'disabled'}`}
                                        disabled={isSubmitting}
                                    >
                                        {isLastStep ? 'Готово' : 'Далее'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </>
    );
}

export default memo(CreateEvent);