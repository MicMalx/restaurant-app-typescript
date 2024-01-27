import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationItems from './NavigationItems';

describe('when user is signed in', () => {
    it('should render links to home page, orders page and logout page', () => {
        render(
            <MemoryRouter>
                <NavigationItems isAuth={true} />
            </MemoryRouter>
        );

        const links = screen.getAllByRole('link');
        const homeLink = screen.getByRole('link', {
            name: /menu/i
        });
        const ordersLink = screen.getByRole('link', {
            name: /orders/i
        });
        const logoutLink = screen.getByRole('link', {
            name: /logout/i
        });

        expect(links).toHaveLength(3);
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
        expect(ordersLink).toBeInTheDocument();
        expect(ordersLink).toHaveAttribute('href', '/orders');
        expect(logoutLink).toBeInTheDocument();
        expect(logoutLink).toHaveAttribute('href', '/logout');
    })
});

describe('when user is not signed in', () => {
    it('should render links to home page and auth page', () => {
        render(
            <MemoryRouter>
                <NavigationItems isAuth={false} />
            </MemoryRouter>
        );

        const links = screen.getAllByRole('link');
        const homeLink = screen.getByRole('link', {
            name: /menu/i
        });
        const authLink = screen.getByRole('link', {
            name: /login/i
        });

        expect(links).toHaveLength(2);
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
        expect(authLink).toBeInTheDocument();
        expect(authLink).toHaveAttribute('href', '/auth')
    })
})