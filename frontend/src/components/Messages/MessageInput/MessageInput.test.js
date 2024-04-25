import React from "react";
import {fireEvent, render} from "@testing-library/react";
import MessageInput from "./index";
import userEvent from "@testing-library/user-event";

jest.mock("formik", () => {
	return {
		useField: () => ([{}]),
	}
})

const props = {
	name: "input-name", 
	placeholder: "type here", 
	onChange: jest.fn(), 
	onBlur: jest.fn(),
}

describe('Testing messageInput component', () => {
	it('smoke test', () => {
		render(<MessageInput />);
	});
	
	it('should render correctly', () => {
		const {getByPlaceholderText} = render(<MessageInput {...props} />);
		getByPlaceholderText(props.placeholder);
	});
	
	it('should type symbols correctly', () => {
		const {getByDisplayValue, getByPlaceholderText} = render(<MessageInput {...props} />);
		userEvent.type(getByPlaceholderText(props.placeholder), "aaa");
		getByDisplayValue("aaa");
	});

	it('should call onChange function', () => {
		const {getByPlaceholderText} = render(<MessageInput {...props} />);
		userEvent.type(getByPlaceholderText(props.placeholder), "aaa");
		expect(props.onChange).toHaveBeenCalledTimes(3);
	});

	it('should call onBlur function', () => {
		const {getByPlaceholderText} = render(<MessageInput {...props} />);
		fireEvent.blur(getByPlaceholderText(props.placeholder));
		expect(props.onBlur).toHaveBeenCalled();
	});
})

