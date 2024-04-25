import React, { memo } from 'react';
import styles from './AnotherUserProfile.module.scss';
import MyProfileLang from '../MyProfileLang';
import Slider from '../Slider';
import PropTypes from 'prop-types';

const AnotherUserProfile = ({user}) => {
    const {languages, about} = user;

    const userLanguage = languages.map((item, index)=>
        <MyProfileLang key={index}>{item}</MyProfileLang>
    );

    return (
        <>
            <Slider user={user} />
            <div className={styles.aboutWrapper}>
                {about && <>
                            <div className={styles.title}>обо мне</div>
                            <div className={styles.text}>{about}</div>
                          </>
                }
                {!!languages.length && <>
                                         <div className={styles.langTitle}>языки</div>
                                         <div className={styles.languageWrapper}>
                                             {userLanguage}
                                         </div>
                                     </>}
            </div>
        </>
    )
};

AnotherUserProfile.propTypes = {
    user: PropTypes.shape({
       languages: PropTypes.array,
       about: PropTypes.string,
    }).isRequired
};

AnotherUserProfile.defaultProps = {
  user: {
    languages: [],
    about: '',
  }

};

export default memo(AnotherUserProfile);