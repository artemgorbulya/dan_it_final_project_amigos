import React from 'react';
import {render} from '@testing-library/react';
import Stepper from './index';

describe('Testing Stepper component', () => {
  test('Smoke test of Stepper component', () => {
    render(<Stepper />);
  });

  test('Testing default Stepper props', () => {
    const {getByTestId} = render(<Stepper />);
    expect(getByTestId('stepper')).toBeEmptyDOMElement();
    expect(getByTestId('stepper')).not.toHaveClass('eventStep--active');
  });
});

describe('Testing Stepper component props', () => {
  const testSteps = [
    {
      title: 'First step',
      iconClass: 'star'
    },
    {
      title: 'Second step',
      iconClass: 'calendar'
    }
  ];

  test('Testing Stepper steps prop', () => {
    const {getByText, getByTestId} = render(<Stepper steps={testSteps}/>);
    expect(getByText(testSteps[1].title)).toBeInTheDocument();
    expect(getByTestId('stepper').firstChild).toHaveClass('eventStep--active');
    expect(getByTestId('stepper').childElementCount).toBe(2);
  });

  test('Testing Stepper active prop', () => {
    const {getByTestId} = render(<Stepper steps={testSteps} active={1} />);
    expect(getByTestId('stepper').lastChild).toHaveClass('eventStep--active');
  });
});