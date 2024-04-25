import React, { memo } from 'react';
import Header from "../../components/Header";
import DownloaderFiles from "../../components/DownloaderFiles";

const AddUserPhoto = () => {
    return (
        <div>
            <Header/>
            <DownloaderFiles/>
        </div>
    );
};

export default memo(AddUserPhoto);