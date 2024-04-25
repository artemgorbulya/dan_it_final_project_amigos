import React, {memo, useState} from 'react';
import styles from "./FormError.module.scss"
import  "../../scss/base/base.scss";
import TextFormError from "../TextFormError";
import PropTypes from 'prop-types';

const FormError = ({error}) => {
    const [textVisible, setTextVisible]=useState(false);

    const visible = () =>{
        setTextVisible(!textVisible);
    };

    return (
        <div className={styles.formError}>
            {textVisible && <TextFormError error={error}/>}
            <div className={styles.errorSvg} onClick={visible} >
                <svg id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" >
                    <ellipse id="_Ellipse_" data-name="&lt;Ellipse&gt;" className="cls-1" cx="24" cy="44.18" rx="8.48"
                             ry="1.82"/>
                    <path className="cls-2"
                          d="M25.4,2.5H22.6c-1.86,0-3.34,1.18-3.23,2.57L21,26.32c.09,1.18,1.4,2.11,3,2.11s2.88-.93,3-2.11L28.63,5.07C28.74,3.68,27.26,2.5,25.4,2.5Z"/>
                    <path id="_Path_" data-name="&lt;Path&gt;" className="cls-3"
                          d="M19.56,7.48a3.31,3.31,0,0,1,3-1.6h2.8a3.31,3.31,0,0,1,3,1.6l.19-2.41c.11-1.39-1.37-2.57-3.23-2.57H22.6c-1.86,0-3.34,1.18-3.23,2.57Z"/>
                    <path className="cls-4"
                          d="M25.4,2.5H22.6c-1.86,0-3.34,1.18-3.23,2.57L21,26.32c.09,1.18,1.4,2.11,3,2.11s2.88-.93,3-2.11L28.63,5.07C28.74,3.68,27.26,2.5,25.4,2.5Z"/>
                    <circle id="_Path_2" data-name="&lt;Path&gt;" className="cls-2" cx="24" cy="35.24" r="3.65"/>
                    <path id="_Path_3" data-name="&lt;Path&gt;" className="cls-3"
                          d="M24,33.93A3.58,3.58,0,0,1,27.57,36a3.94,3.94,0,0,0,.08-.77,3.65,3.65,0,1,0-7.3,0,3.94,3.94,0,0,0,.08.77A3.58,3.58,0,0,1,24,33.93Z"/>
                    <circle id="_Path_4" data-name="&lt;Path&gt;" className="cls-4" cx="24" cy="35.24" r="3.65"/>
                </svg>
            </div>

        </div>
    );
};

FormError.propTypes = {
    error: PropTypes.string,
};

FormError.defaultProps = {
    error:'',
};

export default memo(FormError);