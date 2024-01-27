import { screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import Auth from "./Auth";
import { renderWithStore } from "../../utils/test-utils";

it('should render 2 inputs and 2 buttons', () => {
    renderWithStore(<Auth />, ['auth', 'orderBuilder']);

    const emailInput = screen.getByPlaceholderText(/mail adress/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const loginButton = screen.getByRole('button', {
        name: /login/i
    });
    const switchButton = screen.getByRole('button', {
        name: /switch to signup/i
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(switchButton).toBeInTheDocument();
});

it('should change button labels after clicking the switch button', () => {
    renderWithStore(<Auth />, ['auth', 'orderBuilder']);

    const loginButton = screen.getByRole('button', {
        name: /login/i
    });
    const switchButton = screen.getByRole('button', {
        name: /switch to signup/i
    });

    user.click(switchButton);
    expect(loginButton).toHaveTextContent(/signup/i);
    expect(switchButton).toHaveTextContent(/switch to login/i);
    user.click(switchButton);
    expect(loginButton).toHaveTextContent(/login/i);
    expect(switchButton).toHaveTextContent(/switch to signup/i);
});