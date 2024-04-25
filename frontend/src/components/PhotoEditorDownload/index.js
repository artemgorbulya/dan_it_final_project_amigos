import React, {memo, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {userOperations, userSelectors} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import styles from "./PhotoEditorDownload.module.scss"
import {Form, Formik} from "formik";
import Button from "../Button";

const PhotoEditorDownload = () => {
    const [buttonShow, setButtonShow] = useState(false);
    const dispatch = useDispatch();
    const dataUser = useSelector(userSelectors.getDataUser);
    const unmounted = useRef(false);
    const imgRef = useRef(null);


    useEffect(() => {
        return () => {
            unmounted.current = true
        }
    }, []);

    function onSubmit(values) {
        axios.post(`/api/users/${dataUser._id}/images`, {photo: values.image})
            .then((response) => {
                // if (!unmounted.current) {
                    dispatch(userOperations.dataUserOperation(response.data.data));
                    imgRef.current.src = "/addPhoto/addPhoto.png";
                    setButtonShow(false);
                    // console.log(response);
                // }
            })
            .catch((error) => {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data.message);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    function onChangeInput(event, setFieldValue) {
        // const files = [];
        // const massImg = Array.prototype.slice.call(event.target.files);
        const FR = new FileReader();
        FR.readAsDataURL(event.target.files[0]);
        FR.onloadend = () => {
            // files.push(FR.result);
            imgRef.current.src = FR.result;
            setFieldValue("image", FR.result);
            setButtonShow(true);
        };
        // massImg.forEach((item) => {
        // });
    }

    const buttonCancel=()=>{
        imgRef.current.src = "/addPhoto/addPhoto.png";
        setButtonShow(false);
    };
    return (
        <div>
            <div className={styles.containerForm}>
                <Formik
                    initialValues={{
                        image: ""
                    }}
                    onSubmit={onSubmit}
                >
                    {({setFieldValue, handleSubmit}) => (
                        <Form onSubmit={handleSubmit}>
                            <label className={styles.imgBox} onChange={(event) => onChangeInput(event, setFieldValue)}>
                                <img src="/addPhoto/addPhoto.png" alt="" className={styles.img} ref={imgRef}/>
                                <input name="file" type="file" required className={styles.inputEl}/>
                            </label>
                            {
                                buttonShow && <div className={styles.twoButton}>
                                    <Button classList={"form_button_submit"} type="submit">ЗАГРУЗИТЬ</Button>
                                    <Button classList={"buttonDownloadWhite"} type="button" action={buttonCancel} >ОТМЕНИТЬ</Button>
                                </div>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default memo(PhotoEditorDownload);