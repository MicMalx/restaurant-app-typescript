import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import Button from "./Button";

const mock = jest.fn();
const disabledButtonProps = {
    disabled: true,
    clicked: mock,
    btnType: 'Submit' as 'Submit',
};
const enabledButtonProps = {
    disabled: false,
    clicked: mock,
    btnType: 'Submit' as 'Submit',
}
const renderButton = (disabled?: boolean) => render(
    <Button {...(disabled ? disabledButtonProps : enabledButtonProps)}>
        Login
    </Button>
);

it('should render button with text of children prop', () => {
    renderButton();

    const button = screen.getByRole('button', {
        name: /login/i
    });

    expect(button).toBeInTheDocument();
});

describe('prop disabled equals true', () => {
    it('should render disabled button', () => {
        renderButton(true);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
    it('should not dispatch function passed by clicked prop', () => {
        renderButton(true);

        const button = screen.getByRole('button');
        user.click(button);

        expect(mock).not.toHaveBeenCalled();
    })
});

describe('prop disabled equals false', () => {
    it('should render not disabled button', () => {
        renderButton(false);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    })
    it('should dispatch function passed by clicked prop', () => {
        renderButton(false);

        const button = screen.getByRole('button');
        user.click(button);

        expect(mock).toHaveBeenCalled();
    })
})