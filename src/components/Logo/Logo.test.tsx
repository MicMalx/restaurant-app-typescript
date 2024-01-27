import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

it('should render logo image', () => {
    render(<Logo />);

    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
});