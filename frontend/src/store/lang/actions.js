import types from "./types";

const setLangAbbr = (langAbbr) => ({
    type: types.SET_LANG,
    payload: langAbbr
});

const setLangName = (langName) => ({
    type: types.SET_LANG_NAME,
    payload: langName
});

export default {
    setLangAbbr,
    setLangName
}