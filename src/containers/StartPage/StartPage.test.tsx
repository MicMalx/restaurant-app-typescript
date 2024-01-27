import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartPage from "./StartPage";
import { renderWithStore } from "../../utils/test-utils";

describe('store purchased value equals false', () => {
    it('should render heading and list of meal types', () => {
        renderWithStore(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>,
            ['orderSender']
        );

        const menuHeading = screen.getByRole('heading');
        const foodImages = screen.getAllByRole('img');
        expect(menuHeading).toHaveTextContent('MENU');
        expect(foodImages).toHaveLength(4);
    });
});

describe('store purchased value equals true', () => {
    it('should render 2 headings and list of meal types', () => {
        renderWithStore(
            <MemoryRouter>
                <StartPage />
            </MemoryRouter>,
            ['orderSender'], {
            orderSender: {
                isLoading: false,
                purchased: true,
                error: false
            }
        });
        
        const purchasedHeading = screen.getByRole('heading', { level: 2});
        const menuHeading = screen.getByRole('heading', { level: 1 });
        const foodImages = screen.getAllByRole('img');
        expect(purchasedHeading).toHaveTextContent('Your order has been made successfully.');
        expect(menuHeading).toHaveTextContent('MENU');
        expect(foodImages).toHaveLength(4);
    })
});
