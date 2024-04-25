import React, { memo } from 'react';
import styles from "./DeleteUserGoodbye.module.scss"
import useLogout from "../../../hooks/useLogout";
import {useHistory} from "react-router-dom";



const DeleteUserGoodbye = () => {

    const logOut = useLogout();
    const history = useHistory();

    const redirectDeleteUser=()=>{
        history.push("/");
        logOut();
    };

    setTimeout(redirectDeleteUser,3000);

    return (
        <div className={styles.imgBox}>
            <img className={styles.img} src={"/GoodByeText.png"} alt={""}/>
        </div>
    );
};

export default memo(DeleteUserGoodbye);