import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import Input from "./Input";

const mock = jest.fn(event => {});

const renderEmailInput = (value: string, invalid = false, touched = false) => {
    const EmailInputProps = {
        value: value,
        invalid: invalid,
        touched: touched,
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Adress'
        },
        changed: mock,
    };
    render(<Input {...EmailInputProps} />);
    return EmailInputProps;
}

it('should render input of type(email) given in props', () => {
    renderEmailInput('test');

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    
});
it('should have value passed in props', () => {
    const EmailInputProps = renderEmailInput('test');

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(EmailInputProps.value );
});
it('should have a placeholder', () => {
    const EmailInputProps = renderEmailInput('');

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', EmailInputProps.elementConfig.placeholder);
});
it('should have invalid className for invalid prop', () => {
    renderEmailInput('test', true, true);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('Invalid');
});
it('should dispatch function passed via prop changed when typing', () => {
    renderEmailInput('test');

    const input = screen.getByRole('textbox');
    user.click(input);
    user.keyboard('s');

    expect(mock).toHaveBeenCalled();
});