import React, {useState, useEffect, memo} from 'react';
import Button from '../Button';

const ScrollTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > window.innerHeight) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= window.innerHeight) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);

        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        }
    }, [showScroll]);

    return (
        <>
            {showScroll && (
                <Button action={scrollTop} classList='btn scrollTop'>
                    <i className='icon--arrow-angle-up' />
                </Button>
            )}
        </>
    );
}

export default memo(ScrollTop);