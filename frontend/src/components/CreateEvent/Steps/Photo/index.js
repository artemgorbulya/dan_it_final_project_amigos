import React, { memo } from "react";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import styles from "./Photo.module.scss";
import InputFile from "../../../Form/InputFile";
import Button from "../../../Button";

const Photo = ({ photoField, file }) => {
  let clearPhoto;

  return (
      <>
        <h3 className={styles.subtitle}>Добавить фото</h3>
        <div className={styles.addPhoto}>
          <div className={styles.wrap}>
            {file
                ? (<>
                      <img src={file}
                           className={styles.loadedImage}
                           alt='' />
                      <Button classList='closeBtn' action={() => clearPhoto()}>
                        <i className='icon--cancel' /><span/>
                      </Button>
                    </>
                )
                : (<div className={`${styles.block} icon--add-photo`} />)
            }
          </div>
          <label className={styles['form-row']}>
            <Field
                hidden
                name={photoField.name}
                component={({ form }) => {
                  clearPhoto = () => {
                    form.setFieldValue('file', '');
                    form.setFieldValue('photo', '');
                  }

                  return (
                      <InputFile
                          display={false}
                          onChange={e => {
                            form.setFieldValue(photoField.name, URL.createObjectURL(e.target.files[0]));

                            const fileReader = new FileReader();
                            fileReader.onload = (event) => {
                              form.setFieldValue('photo', event.target.result);
                            }
                            fileReader.readAsDataURL(e.target.files[0]);
                          }}
                      />
                  )
                }}
            />Выберите файлы
            <ErrorMessage name={photoField.name} render={msg => <span className={styles.error}>{`* ${msg}`}</span>} />
          </label>
        </div>
      </>
  );
}

Photo.propTypes = {
  photoField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string
  }),
  file: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

Photo.defaultProps = {
  photoField: {
    name: 'file'
  },
  file: ''
}

export default memo(Photo);