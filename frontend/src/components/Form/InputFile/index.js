import React, {memo} from "react";
import PropTypes from "prop-types";

const InputFile = ({ display, onChange}) => (
    <input
        type='file'
        accept='image/*'
        style={!display && { display: 'none'}}
        onChange={onChange}
    />
)

InputFile.propTypes = {
    display: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

InputFile.defaultProps = {
    display: true,
    onChange: () => {}
}

export default memo(InputFile);

