import {render} from "@testing-library/react";
import createFormattedDate from "../../../utils/dateFormat";
import Message from "./index";

describe('Testing Message component', () => {
	it('smoke test', () => {
		render(<Message />);
	});

	it('should render correctly', () => {
		const props = {
			text: "text",
			isMine: true,
			date: 1615398641,
		}
		const {getByText} = render(<Message {...props} />);
		getByText(/text/);
		getByText(createFormattedDate(1615398641));
	});
});