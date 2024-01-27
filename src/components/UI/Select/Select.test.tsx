import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import Select from "./Select";

const mock = jest.fn();

const SelectProps = {
    options: [
        {value: 'cash', displayValue: 'Cash'},
        {value: 'card', displayValue: 'Card'},
    ],
    value: 'cash',
    changed: mock,
};

it('should render label and select', () => {
    render(<Select {...SelectProps} />);

    const label = screen.getByText(/payment method:/i);
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(2);
});

it('should have value passed via props', () => {
    render(<Select {...SelectProps} />);

    const select = screen.getByRole('combobox');
    
    expect(select).toHaveDisplayValue(SelectProps.options[0].displayValue);
});

it('should dispatch function passed via changed prop', () => {
    render(<Select {...SelectProps} />);

    const select = screen.getByRole('combobox');
    user.selectOptions(select, 'Card');
    expect(mock).toHaveBeenCalled();
})