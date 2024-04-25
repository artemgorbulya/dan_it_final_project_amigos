import React from 'react';
import {render} from '@testing-library/react';
import Button from "./index";


describe('Testing Button component', () => {
    test('Smoke test of Button component', () => {
        render(<Button/>);
    });

    test('Testing default button attributes', () => {
        const {getByTestId} = render(<Button/>);
        const button = getByTestId('testing-button');
        expect(button.type).toBe('button');
        expect(button.className).toBe('btn');
    });


});

describe('Testing Button component props', () => {
    test('Testing button type prop', () => {
        const type = 'submit';
        const {getByTestId} = render(<Button type={type}/>);
        const button = getByTestId('testing-button');
        expect(button.type).toBe(type);
    });


    test('Testing button class prop', () => {
        const classList = 'btn--small';
        const {getByTestId} = render(<Button classList = {classList}/>);
        const button = getByTestId('testing-button');
        expect(button.className).toBe(classList);
    });

    test('Testing button children prop', () => {
        const text = 'I am button';
        const {getByTestId}  = render(<Button>{text}</Button>);
        const button = getByTestId('testing-button');
        expect(button.innerHTML).toBe('I am button');
    });

    test('Testing button disabled prop', () => {
        const disabled = true;
        const {getByTestId} = render(<Button disabled={disabled}/>);
        const button = getByTestId('testing-button');
        expect(button).toBeDisabled();
    });

});