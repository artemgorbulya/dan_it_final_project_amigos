import React, {memo, useState} from 'react';
import RadioButton from "../RadioButton";
import styles from "./SexRadio.module.scss"
import FormError from "../FormError";
import PropTypes from "prop-types";


const menImg = <svg xmlns="http://www.w3.org/2000/svg" width="24.597" height="36" viewBox="0 0 24.597 36">  <path id="Path_1075" data-name="Path 1075" d="M105.687,31.856V35.25a.75.75,0,0,1-1.5,0V31.856a4.839,4.839,0,0,0-4.842-4.842,3.833,3.833,0,0,1-3.3-1.851.75.75,0,1,1,1.281-.78,2.343,2.343,0,0,0,2.016,1.132,6.338,6.338,0,0,1,6.342,6.342Zm-10.472-5.9a.751.751,0,0,1-.573.892,5.887,5.887,0,0,1-1.251.135h0a5.88,5.88,0,0,1-3.223-.96,3.9,3.9,0,0,1-2.652,1.144.661.661,0,0,1-.117-.007,4.848,4.848,0,0,0-4.808,4.842V35.25a.75.75,0,0,1-1.5,0V32.006a6.349,6.349,0,0,1,6.342-6.342,2.356,2.356,0,0,0,2.357-2.35V23.25a8.157,8.157,0,0,1-4.564-6.924,2.586,2.586,0,0,1-1.885-2.488v-3.11c-.033-1.533.195-5.4,3.019-8.123a9.833,9.833,0,0,1,7-2.6,14.5,14.5,0,0,1,6.157,1.427.752.752,0,0,1,.326,1.048,8.235,8.235,0,0,1,4.818,3.572l.013.02a.79.79,0,0,1,.147.55.751.751,0,0,1-.214.468,3.768,3.768,0,0,0-1.091,2.661v4.092a.75.75,0,1,1-1.5,0V9.745a5.219,5.219,0,0,1,1.127-3.267,6.816,6.816,0,0,0-4.8-2.765L97.283,3.6a.751.751,0,0,1-.206-1.439l.107-.044A12.687,12.687,0,0,0,93.339,1.5c-4.109,0-8.5,2.423-8.5,9.225v3.117a1.079,1.079,0,0,0,.375.816V11.046A4.354,4.354,0,0,1,89.564,6.7h7.649a4.354,4.354,0,0,1,4.349,4.349v4.912a8.037,8.037,0,0,1-2.436,5.767A8.111,8.111,0,0,1,91.257,23.8,3.806,3.806,0,0,1,91,24.78a4.384,4.384,0,0,0,3.322.607.749.749,0,0,1,.892.573Zm-1.826-3.375a6.682,6.682,0,0,0,6.674-6.674V11.046A2.853,2.853,0,0,0,97.213,8.2H89.564a2.853,2.853,0,0,0-2.85,2.85v4.866A6.682,6.682,0,0,0,93.388,22.586Zm6.074,10.189h-1.8a.75.75,0,0,0,0,1.5h1.8a.75.75,0,0,0,0-1.5Z" transform="translate(-81.09 0)"/></svg>;
const womenImg = <svg width="28.969" viewBox="0 0 28.969 36"><path id="Path_1076" data-name="Path 1076" d="M52.937,36a.751.751,0,0,1-.75-.75V32.006a6.35,6.35,0,0,1,6.343-6.343,2.357,2.357,0,0,0,2.357-2.351v-.068A8.2,8.2,0,0,1,57.045,19.3a.75.75,0,1,1,1.365-.622,6.677,6.677,0,0,0,12.753-2.765V12.841a4.656,4.656,0,0,0-4.65-4.65H64.454a3.669,3.669,0,0,0-3.4,2.077,3.3,3.3,0,0,0-.229,1.286,6.779,6.779,0,0,1-.1,1.031c-.328,1.766-1.655,3.373-3.946,4.778a.75.75,0,1,1-.784-1.279c1.913-1.173,3.008-2.443,3.255-3.773a5.741,5.741,0,0,0,.075-.836,4.6,4.6,0,0,1,.348-1.8,5.183,5.183,0,0,1,4.781-2.988h2.059a6.157,6.157,0,0,1,6.15,6.15v.018c0,3.1,0,3.113,0,3.117A8.156,8.156,0,0,1,62.356,23.8a3.824,3.824,0,0,1-1.833,2.811,13.2,13.2,0,0,0,7.99,2.695,13.846,13.846,0,0,0,3.707-.514.75.75,0,0,1,.4,1.445,15.341,15.341,0,0,1-4.11.569h0a14.856,14.856,0,0,1-9.706-3.653c-.1.007-.187.01-.277.01a4.849,4.849,0,0,0-4.843,4.843V35.25A.751.751,0,0,1,52.937,36Zm23.1,0a.751.751,0,0,1-.75-.75V32.006a4.849,4.849,0,0,0-4.843-4.843,3.833,3.833,0,0,1-3.3-1.852.75.75,0,1,1,1.281-.78,2.344,2.344,0,0,0,2.017,1.132,6.34,6.34,0,0,1,6.343,6.343V35.25A.751.751,0,0,1,76.038,36ZM52.1,28.341a.746.746,0,0,1-.525-.214,2.92,2.92,0,0,1-.234-3.933l.166-.206a1.062,1.062,0,0,0,.055-1.267l-1.123-1.665A2.553,2.553,0,0,1,50.58,18l1.166-1.435a1.065,1.065,0,0,0,.2-.979l-.687-2.279a2.565,2.565,0,0,1,1.038-2.878L53.667,9.5a1.076,1.076,0,0,0,.446-1.179l-.445-1.6a3.338,3.338,0,0,1,.4-2.686,3.435,3.435,0,0,1,2.337-1.535l2.264-.374a1.14,1.14,0,0,0,.615-.31L60.382.752a2.665,2.665,0,0,1,3.71,0l.5.491a1.144,1.144,0,0,0,.806.325,1.163,1.163,0,0,0,.569-.148,2.659,2.659,0,0,1,1.3-.342,2.631,2.631,0,0,1,2.586,2.089l.042.209a2.028,2.028,0,0,0,1.923,1.608l.6.025A2.65,2.65,0,0,1,74.46,6.1a2.573,2.573,0,0,1,.4,2.212,1.1,1.1,0,0,0,.455,1.2l1.349.908a2.587,2.587,0,0,1,1.047,2.9l-.679,2.252a1.087,1.087,0,0,0,.2,1l1.148,1.413a2.576,2.576,0,0,1,.138,3.081l-1.1,1.638A1.084,1.084,0,0,0,77.475,24l.045.056a3.025,3.025,0,0,1,.694,1.353.75.75,0,0,1-.573.893.749.749,0,0,1-.893-.573,1.582,1.582,0,0,0-.39-.723l-.052-.064a2.577,2.577,0,0,1-.132-3.074l1.1-1.638a1.084,1.084,0,0,0-.059-1.3l-1.148-1.413a2.585,2.585,0,0,1-.472-2.378l.679-2.252a1.094,1.094,0,0,0-.448-1.226l-1.349-.908A2.6,2.6,0,0,1,73.418,7.91a1.081,1.081,0,0,0-.171-.929,1.157,1.157,0,0,0-.894-.472l-.6-.025a3.525,3.525,0,0,1-3.33-2.812l-.042-.209a1.126,1.126,0,0,0-1.112-.886,1.147,1.147,0,0,0-.569.15,2.66,2.66,0,0,1-1.3.34,2.639,2.639,0,0,1-1.858-.752l-.5-.491a1.159,1.159,0,0,0-1.611,0L60.337,2.9a2.632,2.632,0,0,1-1.42.718l-2.264.374a1.94,1.94,0,0,0-1.32.865,1.806,1.806,0,0,0-.22,1.473l.445,1.6A2.574,2.574,0,0,1,54.5,10.749l-1.374.925a1.072,1.072,0,0,0-.439,1.2l.687,2.279a2.564,2.564,0,0,1-.468,2.358l-1.166,1.435a1.062,1.062,0,0,0-.058,1.27l1.123,1.665a2.555,2.555,0,0,1-.131,3.047l-.166.206a1.425,1.425,0,0,0,.116,1.919.751.751,0,0,1-.525,1.286Z" transform="translate(-50.001)"/></svg>


const SexRadio = (props) => {

    const [sexError, setSexError]=useState('');
    const [ touchedError,setTouchedError]=useState('');

    const setMySexError=(meta)=>{
        setSexError(meta.error);
        setTouchedError(meta.touched);
    };


    return (
        <div className={styles.box}>
            <label className={styles.sexRadio__label}>{props.label}
                <div className={styles.sexRadio}>
                    <RadioButton setBlockError={setMySexError} id="radio-1" name="sex" value="male" text="Мужской" imgButton={menImg} className="formRadioBtn"/>
                    <RadioButton setBlockError={setMySexError} id="radio-2" name="sex" value="female" text="Женский" imgButton={womenImg} className="formRadioBtn"/>
                </div>
            </label>
            {sexError && touchedError && <FormError error={sexError}/>}
        </div>
    );
};

SexRadio.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
};

SexRadio.defaultProps = {
    className: 'sexRadio',
    label: '',
};

export default memo(SexRadio);