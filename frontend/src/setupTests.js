// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';

export const renderWithRouterAndRedux = (
	component,
	store,
	{initialEntries = ["/"], initialIndex = 0, path = "/"} = {},
) => {
	return {
		...render(
			<Provider store={store}>
				<MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
					<Route path={path}>
						{component}
					</Route>
				</MemoryRouter>
			</Provider>),
		store,
	}
}

export const renderWithRedux = (
	component,
	store
) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	}
}

export const renderWithRouter = (
	component,
	{initialEntries = ["/"], initialIndex = 0, path = "/"} = {},
) => {
	return {
		...render(
			<MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
				<Route path={path}>
					{component}
				</Route>
			</MemoryRouter>),
	}
}
