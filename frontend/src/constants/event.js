export const createFormData = {
    formId: 'createEventForm',
    steps: [
        {
            title: 'Категория',
            iconClass: 'icon--star-circle'
        },
        {
            title: 'Место и дата',
            iconClass: 'icon--calendar-circle'
        },
        {
            title: 'Описание',
            iconClass: 'icon--text-circle'
        },
        {
            title: 'Фото',
            iconClass: 'icon--camera-circle'
        }
    ],
    formFields: {
        category: {
            name: 'category',
            label: 'Выберите категорию:'
        },
        city: {
            name: 'city',
            label: 'Выберите место',
            placeholder: 'Укажите город'
        },
        address: {
            name: 'address',
            label: 'Выберите адрес',
            placeholder: 'Укажите адрес'
        },
        date: {
            name: 'date',
            label: 'Выберите дату'
        },
        peopleWanted: {
            name: 'peopleWanted',
            label: 'Кого вы ищете?',
            options: [
                {value: 'boy',  label: 'Парень'},
                {value: 'girl',  label: 'Девушка'},
                {value: 'company',  label: 'Компания'},
                {value: 'no matter',  label: 'Всё равно'}
            ],
            placeholder: 'Укажите кого вы ищете'
        },
        title : {
            name: 'title',
            label: 'Название (2-3 слова)',
            placeholder: 'Название события (2-3 слова)'
        },
        description: {
            name: 'description',
            label: 'Описание',
            placeholder: 'Добавьте описание события'
        },
        file: {
            name: 'file',
            label: ''
        }
    }
};

export const formInitialValues = {
    category: '',
    city: {
        city: '',
        fullAddress: '',
        placeId: '',
        latLng: null,
        bounds: null
    },
    address: {
        address: '',
        placeId: '',
        latLng: null
    },
    date: {
        key: 'any',
        value: null
    },
    peopleWanted: '',
    title: '',
    description: '',
    file: '',
};