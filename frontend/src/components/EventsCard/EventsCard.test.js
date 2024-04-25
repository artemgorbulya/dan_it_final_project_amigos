import EventsCard from "./index";
import {renderWithRouterAndRedux} from "../../setupTests";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { parsePeopleWanted } from "../../utils/parsePeopleWanted";
import { Link } from "react-router-dom";

jest.mock("../EventsTypeButton/index.js", () => ({id}) => <span>Category: {id}</span>)
jest.mock("../DropdownList/index.js", () => () => <span>Dropdown</span>)

const mockedStore = configureStore([thunk]);
const initialState = {}

const props = {
	id: 1, 
	userId: 1, 
	name: "Oleg", 
	age: 22, 
	createDate: 1615398641, 
	image: "img-url", 
	userpick: "userpick-url", 
	title: "Event", 
	address: "Address", 
	dateStart: 1618002000, 
	dateEnd: 1618866000, 
	text: "Event desc", 
	peopleWanted: "girl", 
	category: 4, 
	modalCard: false, 
	isSubscribed: false, 
	buttonAction: () => {},
}

describe('Testing EventsCard component', () => {
	it('smoke test', () => {
		const store = mockedStore(initialState);
		renderWithRouterAndRedux(<EventsCard {...props} />, store);
	});
	
	it('should render correctly', () => {
		const store = mockedStore(initialState);
		const {getByText, container} = renderWithRouterAndRedux(<EventsCard {...props} />, store);
		getByText(props.address);
		getByText(parsePeopleWanted(props.peopleWanted));
		getByText(props.text);
		getByText(props.title);
		expect(container.querySelectorAll("a")).toHaveLength(2);
	});

	it('should render Dropdown correctly (isSubscribed)', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<EventsCard {...props} isSubscribed />, store);
		getByText(/Dropdown/);
	});

	it('should render Dropdown correctly (modalCard)', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<EventsCard {...props} modalCard />, store);
		getByText(/Dropdown/);
	});

	it('should test types of buttons - Return to responses', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<EventsCard {...props} modalCard />, store);
		getByText(/Вернуться к откликам/);
	});

	it('should test types of buttons - Request sent', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<EventsCard {...props} isSubscribed />, store);
		getByText(/запрос отправлен/);
	});

	it('should test types of buttons - Go together', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<EventsCard {...props} />, store);
		getByText(/пойти вместе/);
	});

	it('should show Links if userID was passed', () => {
		const store = mockedStore(initialState);
		const {container} = renderWithRouterAndRedux(<EventsCard {...props} userId="" />, store);
		expect(container.querySelectorAll("a")).toHaveLength(0);
	});
});