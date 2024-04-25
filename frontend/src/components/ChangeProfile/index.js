import React, { memo } from 'react';
import GeneralChangeProfile from "./GeneralChangeProfile";
import {Route,Redirect, Switch} from "react-router-dom";
import ChangePassword from "./ChangePassword";
import DeleteUser from "./DeleteUser";
import DeleteUserGoodbye from "./DeleteUserGoodbye";


const ChangeProfile = () => {
    return (
        <div>

            <Switch>
                <Route exact path={"/home/profile/changeUser/general"} component={GeneralChangeProfile}/>
                <Route exact path={"/home/profile/changeUser/password"} component={ChangePassword} />
                <Route exact path={"/home/profile/changeUser/delete-user"} component={DeleteUser} />
                <Route exact path={"/home/profile/goodbye"} component={DeleteUserGoodbye}/>
                <Redirect from={"/home/profile"}  to={"/home/profile/changeUser/general"}/>
            </Switch>
        </div>
    );
};
export default memo(ChangeProfile);