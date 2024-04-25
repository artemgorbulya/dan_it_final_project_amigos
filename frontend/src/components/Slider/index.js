import React, { memo } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './styles.css';
import styles from './Slider.module.scss';
import {getAge} from "../../utils/mathHelpels";
import {userSelectors} from "../../store/user";
import {useSelector} from "react-redux";

const Slider = ({ user, changeUser, changePhoto }) => {
  const profileOwner = useSelector(userSelectors.getDataUser);
  const isOwnerProfile = user._id === profileOwner._id;
  const age = getAge(user.birthday);
  const name = user.firstName;
  const location = `${user.city}, ${user.country}`;

  const props = {
    autoplay: false,
    easing: 'ease',
    indicators: user.photos.length > 1 ? () => (<li className={styles.dot} />) : false,
    arrows: user.photos.length > 1
  };

  return (
    <div className={styles.sliderContainer}>
      <Fade {...props}>
        {user.photos.map((photo, i) => (
            <div className={styles.slideWrap} style={{backgroundImage: `url(${user.photos[i].photoURL})`}} key={i}>
              <div className={styles.slideImage} style={{backgroundImage: `url(${user.photos[i].photoURL})`}}>
                <div className={styles.info}>
                  <div className={styles.name} >{name}, {age}</div>
                  <div>
                    <i className= {`icon--map-marker ${styles.icon}`}/>
                    <span className={styles.location}>{location}</span>
                  </div>
                </div>

                { isOwnerProfile &&  <div className={styles.iconsWrap}>
                                          <div className={styles.iconBox} onClick={changePhoto}>
                                              <i className='icon--camera' />
                                          </div>
                                          <div className={styles.iconBox} onClick={changeUser}>
                                              <i className='icon--edit-sqaure' />
                                          </div>
                                      </div>
                }
              </div>
            </div>
        ))}
      </Fade>
    </div>
  )
}

export default memo(Slider);