import {getYear} from "date-fns";

export const dates = [
    {value: 1,  label: '01'},
    {value: 2,  label: '02'},
    {value: 3,  label: '03'},
    {value: 4,  label: '04'},
    {value: 5,  label: '05'},
    {value: 6,  label: '06'},
    {value: 7,  label: '07'},
    {value: 8,  label: '08'},
    {value: 9,  label: '09'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'},
    {value: 13, label: '13'},
    {value: 14, label: '14'},
    {value: 15, label: '15'},
    {value: 16, label: '16'},
    {value: 17, label: '17'},
    {value: 18, label: '18'},
    {value: 19, label: '19'},
    {value: 20, label: '20'},
    {value: 21, label: '21'},
    {value: 22, label: '22'},
    {value: 23, label: '23'},
    {value: 24, label: '24'},
    {value: 25, label: '25'},
    {value: 26, label: '26'},
    {value: 27, label: '27'},
    {value: 28, label: '28'},
    {value: 29, label: '29'},
    {value: 30, label: '30'},
    {value: 31, label: '31'}
];

export const months=[
    {value: 0,  label: "Январь"},
    {value: 1,  label: "Февраль"},
    {value: 2,  label: "Март"},
    {value: 3,  label: "Апрель"},
    {value: 4,  label: "Май"},
    {value: 5,  label: "Июнь"},
    {value: 6,  label: "Июль"},
    {value: 7,  label: "Август"},
    {value: 8,  label: "Сентябрь"},
    {value: 9,  label: "Октябрь"},
    {value: 10, label: "Ноябрь"},
    {value: 11, label: "Декабрь"},
];

export const years =()=>{
    const endYear = getYear(new Date()) - 16;
    const startYear = getYear(new Date()) - 100;
    const myYears = [];
    for (let i = startYear; i < endYear; i++) {
        myYears.push({
            value: i,
            label: i,
        });

    }
    return(myYears);

};

