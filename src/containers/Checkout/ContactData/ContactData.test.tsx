import { screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import { renderWithStore } from "../../../utils/test-utils";
import ContactData from "./ContactData";

it('should render heading, 3 inputs, label, select and order button', () => {
    renderWithStore(<ContactData />, ['auth', 'orderBuilder', 'orderSender']);

    const heading = screen.getByRole('heading', { level: 4});
    const inputs = screen.getAllByRole('textbox');
    const label = screen.getByText(/payment method/i);
    const select = screen.getByRole('combobox');
    const orderButton = screen.getByRole('button');

    expect(heading).toBeInTheDocument();
    expect(inputs).toHaveLength(3);
    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(orderButton).toBeInTheDocument();
});

it('should render disabled button when inputs are empty', () => {
    renderWithStore(<ContactData />, ['auth', 'orderBuilder', 'orderSender']);

    const orderButton = screen.getByRole('button');
    expect(orderButton).toBeDisabled();
});

it('should make button disabled/enabled when changing inputs value', () => {
    renderWithStore(<ContactData />, ['auth', 'orderBuilder', 'orderSender']);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
    const orderButton = screen.getByRole('button');
    const select = screen.getByRole('combobox');

    user.click(inputs[0]);
    user.keyboard('test name');
    user.click(inputs[1]);
    user.keyboard('street 1/2');
    user.click(inputs[2]);
    user.keyboard('1234567');
    expect(orderButton).not.toBeDisabled();
    
    user.clear(inputs[0]);
    expect(orderButton).toBeDisabled();
    user.click(inputs[0]);
    user.keyboard('test name');
    expect(orderButton).not.toBeDisabled();

    user.clear(inputs[1]);
    expect(orderButton).toBeDisabled();
    user.click(inputs[1]);
    user.keyboard('street 1/2');
    expect(orderButton).not.toBeDisabled();

    user.click(inputs[2]);
    user.keyboard('{Backspace}');
    expect(orderButton).toBeDisabled();
    user.keyboard('4');
    expect(orderButton).not.toBeDisabled();

    user.selectOptions(select, 'Card');
    expect(orderButton).not.toBeDisabled();
    user.selectOptions(select, 'Cash');
    expect(orderButton).not.toBeDisabled();
});

it('should render enabled button when inputs have correct values', () => {
    renderWithStore(<ContactData />, ['auth', 'orderBuilder', 'orderSender']);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
    const orderButton = screen.getByRole('button');

    user.click(inputs[0]);
    user.keyboard('test name');
    user.click(inputs[1]);
    user.keyboard('street 1/2');
    user.click(inputs[2]);
    user.keyboard('1234567');

    expect(orderButton).not.toBeDisabled();
});