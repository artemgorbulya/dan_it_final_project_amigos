import {format, isToday, isYesterday} from "date-fns";
import russianLocale from "date-fns/locale/ru";

const createFormattedDate = (timestamp) => {
	return timestamp ? 
		isYesterday(timestamp) ? 
		format(timestamp, "вчера, kk:mm") :
		isToday(timestamp) ? 
			format(timestamp, "kk:mm"):
			format(timestamp, "LLLL d, kk:mm", {locale: russianLocale}) : "";
}

export default createFormattedDate;