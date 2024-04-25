import {useState} from "react";

export default function useErrorActions() {
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorText, setErrorText] = useState(" ");

    const errorCatch = (error) => {
        // Error 😨
        if (error && error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log("error response", error.response);
            console.log(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);

            setErrorText(error.response.data.message);
            setErrorStatus(true);
        } else if (error && error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            setErrorText(error.request.data.message);
            setErrorStatus(true);
            console.log('Error', error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error);
            setErrorText(error);
            setErrorStatus(true);
        }

        console.log('Error', error.config);

    };

    return {
        errorStatus,
        errorText,
        catchEr: (error) => errorCatch (error),
        closeElement:() => setErrorStatus(false),
    }
}