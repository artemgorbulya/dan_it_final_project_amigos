import * as Yup from 'yup';

const REQUIRED_MSG = 'Поле обязательно для заполнения';

export default [
    Yup.object().shape({
        category: Yup.string().required('Необходимо выбрать категорию')
    }),
    Yup.object().shape({
        city: Yup.object({
            city: Yup.string().required('Необходимо указать город'),
            placeId: Yup.string().required('Необходимо указать город'),
            fullAddress: Yup.string(),
            latLng: Yup.object({
                lat: Yup.number().required().positive(),
                lng: Yup.number().required().positive()
            }),
            bounds: Yup.object()
        }),
        address: Yup.object({
            address: Yup.string(),
            placeId: Yup.string(),
            latLng: Yup.mixed()
        }),
        date: Yup.mixed()
            .required(REQUIRED_MSG)//Yup.array().of(Yup.date().nullable()).length(2, REQUIRED_MSG)
    }),
    Yup.object().shape({
        peopleWanted: Yup.string()
            .required(REQUIRED_MSG),
        title: Yup.string()
            .trim()
            .min(4, `Название события минимум 4 символов`)
            .max(255, `Название события максимум 255 символов`)
            .required(REQUIRED_MSG),
        description: Yup.string()
            .trim()
            .min(10, `Опишите детальнее, минимум 10 символов`)
            .required(REQUIRED_MSG)
    }),
    Yup.object().shape({
        file: Yup.string()
            .required('Вы не добавили фото'),
    })
];