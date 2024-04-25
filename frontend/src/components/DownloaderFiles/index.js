import React, {memo, useEffect, useRef, useState} from 'react';
import {Form, Formik} from "formik";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {userOperations, userSelectors} from "../../store/user";
import Button from "../Button";
import styles from "./DownloaderFiles.module.scss"
import HomePagesTitle from "../HomePagesTitle";
import {Link, Redirect} from "react-router-dom";

const DownloaderFiles = () => {
    const [loadingPhoto, setLoadingPhoto] = useState(false);
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
        console.log(values);

        axios.post(`/api/users/${dataUser._id}/images`, {photo: values.image})
            .then((response) => {
                if (!unmounted.current) {
                    // localStorage.setItem('dataUser', JSON.stringify(response.data.data));
                    dispatch(userOperations.dataUserOperation(response.data.data));
                    setLoadingPhoto(true);
                    console.log(response);
                }
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

        const myImg = event.target.files[0];
            const FR = new FileReader();
            FR.readAsDataURL(myImg);
            FR.onloadend = () => {
                const files=(FR.result);
                imgRef.current.src=files;
                setFieldValue("image", files);
            };
    }

    return (
        <div className={styles.downloaderFiles}>
            {loadingPhoto && <Redirect to={"/home/events/list"}/>}

            <HomePagesTitle title='Фото профиля'/>
            <p className={styles.header_text}>
                Загрузите изображение, чтобы использовать его в качестве аватара.
            </p>
            <div className={styles.content}>
                <div className={styles.containerForm}>
                    <img
                        src="../photoDownload.png"
                        className={styles.img}
                        ref={imgRef}
                    >
                    </img>
                    <Formik
                        initialValues={{
                            image: ''
                        }}
                        onSubmit={onSubmit}
                    >
                        {({setFieldValue, handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <label className={styles.labelImg}> ВЫБЕРИТЕ ФАЙЛ
                                    <input
                                        name="file"
                                        type="file"
                                        required
                                        className={styles.inputEl}
                                        onChange={(event) => onChangeInput( event,setFieldValue)}
                                    />
                                </label>
                                <div className={styles.twoButton}>
                                    <Link to="/home/events/list" className={styles.link}>
                                        <Button
                                            classList={"buttonDownloadWhite"}
                                            type="button"
                                        >ПРОПУСТИТЬ
                                        </Button>
                                    </Link>
                                    <Button classList={"buttonDownloadGrey"} type="submit">ЗАВЕРШИТЬ</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default memo(DownloaderFiles);