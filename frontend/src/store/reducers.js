import { combineReducers } from "redux";
import { reducer as mapReducer} from "./map";
import { reducer as langReducer } from "./lang";
import { reducer as categoriesReducer} from "./categories";
import { reducer as modalReducer} from "./modal";
import { reducer as userReducer} from "./user";
import { reducer as feedListReducer} from "./feedList"
import { reducer as feedFilterReducer} from "./feedFilter"
import { reducer as eventReducer} from "./event"
import { reducer as socketReducer} from "./socket";
import { reducer as messagesReducer} from "./messages";


export const rootReducer = combineReducers({
    map: mapReducer,
    lang: langReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    user: userReducer,
    feedList: feedListReducer,
    feedFilter: feedFilterReducer,
    event: eventReducer,
    socket: socketReducer,
    messages: messagesReducer,
});

