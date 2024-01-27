import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationItem from "./NavigationItem";

it('should render list item with link inside it', () => {
    const NavigationItemProps = {
        link: '/',
        children: 'Menu'
    };
    render(
        <MemoryRouter>
            <NavigationItem link={NavigationItemProps.link}>
                {NavigationItemProps.children}
            </NavigationItem>
        </MemoryRouter>
    );

    const listItem = screen.getByRole('listitem');
    const link = within(listItem).getByRole('link');
    expect(listItem).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', NavigationItemProps.link);
    expect(link).toHaveTextContent(NavigationItemProps.children);
});
