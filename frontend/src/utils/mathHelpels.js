export const getAge = (birthday) => Math.floor((new Date().getTime() - birthday) / 1000 / 3600 / 24 / 365);