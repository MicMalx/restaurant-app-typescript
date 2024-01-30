import { screen, within } from "@testing-library/react";
import OrderBuilder from "./OrderBuilder";
import { renderWithStore } from "../../utils/test-utils";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import user from "@testing-library/user-event";

const handlers = [
    rest.get("https://friendly-frog-slippers.cyclic.app/api/meals", (req, res, ctx) => {
        return res(ctx.json({
            meals: [
                {
                    "_id": "63b9eec073dcb310ec04629b",
                    "description": "prawns, Cod sirloin, clams",
                    "name": "Bouillabaisse",
                    "price": 9,
                    "type": "soups",
                    "id": "63b9eec073dcb310ec04629b"
                },
                {
                    "_id": "63d6de6b461a64c130a79519",
                    "description": "pasta, carrot, parsley",
                    "name": "Chicken Soup",
                    "price": 5.5,
                    "type": "soups",
                    "id": "63d6de6b461a64c130a79519"
                },
            ]
        }))
    })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

it('should render 2 meal cards, order summary and button to proceed the order', async () => {
    renderWithStore(<OrderBuilder menuPart='soups' />, ['auth', 'orderBuilder']);

    await screen.findByText(/bouillabaisse/i);
    const mealCards = screen.getAllByTestId('meal-card');
    const orderSummary = screen.getByText(/order summary/i);
    const proceedButton = screen.getByRole('button', {
        name: /login to order/i
    })
    expect(mealCards).toHaveLength(2);
    expect(orderSummary).toBeInTheDocument();
    expect(proceedButton).toBeInTheDocument();
});

it('should render a row in meal summary after adding a meal', async () => {
    renderWithStore(<OrderBuilder menuPart='soups' />, ['auth', 'orderBuilder']);

    await screen.findByText(/bouillabaisse/i);
    let mealSummaryRow = screen.queryByTestId('summary-meal');
    expect(mealSummaryRow).toBeNull();

    const mealCards = screen.getAllByTestId('meal-card');
    const addButton = within(mealCards[0]).getByRole('button', {
        name: /add/i
    });
    
    user.click(addButton);

    mealSummaryRow = screen.getByTestId('summary-meal');
    expect(mealSummaryRow).toBeInTheDocument();
})