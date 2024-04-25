import React from "react";
import Modal from "./index";
import Button from "../Button";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {renderWithRedux} from "../../setupTests";

const mockedStore = configureStore([thunk]);
const storeObj = {
	modal: {
		isModalOpen: false,
		isBurgerMenuOpen: false,
		isAlertOpen: false,
	}
}

describe('Testing Modal component', () => {
	test('Smoke test of Modal component', () => {
		const store = mockedStore(storeObj);
		renderWithRedux(<Modal />, store)
	});

	test('Testing modal title prop', () => {
		const title = 'Modal title';
		const store = mockedStore(storeObj);
		const {getByText} = renderWithRedux(<Modal title={title} />, store)
		getByText(title);
	});

	test('Testing modal text children prop', () => {
		const text = 'Modal text';
		const store = mockedStore(storeObj);
		const {getByText} = renderWithRedux(<Modal>{text}</Modal>, store);
		getByText(text);
	});

	test('Testing modal children prop', () => {
		const store = mockedStore(storeObj);
		renderWithRedux(<Modal>Hello <div>Smile</div></Modal>, store);
		const childrenContainer = document.getElementsByClassName('modal__text')[0];
		expect(childrenContainer.innerHTML).toBe('Hello <div>Smile</div>');
	});

	test('Testing modal without actions content', () => {
		const store = mockedStore(storeObj);
		renderWithRedux(<Modal />, store);
		const buttonsContainer = document.getElementsByClassName('modal__actions');
		expect(buttonsContainer).toHaveLength(0);
	});

	test('Testing modal actions content', () => {
		const store = mockedStore(storeObj);
		renderWithRedux(<Modal actions={[<Button key={1}>Да</Button>,<Button key={2}>Отмена</Button>]}/>, store);
		const buttonsContainer = document.getElementsByClassName('modal__actions')[0];
		const buttonsArr = buttonsContainer.getElementsByTagName('button');
		expect(buttonsArr).toHaveLength(2);
		expect(buttonsArr[0].textContent).toEqual("Да");
		expect(buttonsArr[1].textContent).toEqual("Отмена");
	});
});


