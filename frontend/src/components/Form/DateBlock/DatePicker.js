import React, { forwardRef, memo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import * as langs from "date-fns/locale";
import Button from "../../Button";
import { langSelectors } from "../../../store/lang";
import "react-datepicker/src/stylesheets/datepicker.scss";
import "./DataPicker.module.scss";

const DatePickerCustom = ({ activeBtn, btnKey, text, field, values, setValue }) => {
    const lang = useSelector(langSelectors.getLangAbbr);
    const start = Array.isArray(values) ? values[0] : null;
    const end = Array.isArray(values) ? values[1] : null;
    const formatStart = values && values[0] ? values[0].toLocaleDateString() : null;
    const formatEnd = values && values[1] ? values[1].toLocaleDateString() : null;

    const valueString = `${formatStart
        ? formatEnd
            ? `${formatStart} - ${formatEnd}`
            : formatStart
        : text}`;

    const handleChange = dates => {
        const [start, end] = dates;

        if (start && end && start.toDateString() === end.toDateString()) {
            setValue(field, {
                key: btnKey,
                value: [start, null]
            });
        } else {
            setValue(field, {
                key: btnKey,
                value: dates
            });
        }
    }

    const DatePickerBtn = forwardRef(({onClick}, ref) => {
        return (
            <Button
                classList={activeBtn === btnKey ? 'btn btn--primary' : 'btn btn--stroke-orange'}
                action={() => onClick()}
            >
                {activeBtn === btnKey && (<i className='icon--check'/>)}
                {valueString}
            </Button>
        )
    });

    return (
        <DatePicker
            selected={start}
            onChange={handleChange}
            customInput={<DatePickerBtn />}
            startDate={start}
            endDate={end}
            selectsRange
            locale={langs[lang]}
            showPopperArrow={false}
            withPortal
        />
    );
}

DatePickerCustom.propTypes = {
    activeBtn: PropTypes.string.isRequired,
    btnKey: PropTypes.string.isRequired,
    text: PropTypes.string,
    field: PropTypes.string.isRequired,
    values: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    setValue: PropTypes.func.isRequired
}

DatePickerCustom.defaultValue = {
    activeBtn: 'date',
    btnKey: 'date',
    field: 'date',
    setValue: () => {}
}

export default memo(DatePickerCustom);