import { screen } from "@testing-library/react";
import Orders from "./Orders";
import { renderWithStore } from "../../utils/test-utils";
import { setupServer } from 'msw/node'
import { rest } from "msw";

const handlers = [
    rest.get("https://friendly-frog-slippers.cyclic.app/api/orders/user", (req, res, ctx) => {
        return res(ctx.json({
            orders: [
                {
                    "_id": "644fa03a23c8fc3ee0966e20",
                    "name": "Kubuś Puchatek",
                    "address": "Kubisia Puchatka 13/4",
                    "phoneNumber": "32412412",
                    "paymentMethod": "card",
                    "price": 26,
                    "meals": [
                        {
                            "name": "Chicken Soup",
                            "amount": 2,
                            "_id": "644fa03a23c8fc3ee0966e21",
                            "id": "644fa03a23c8fc3ee0966e21"
                        },
                        {
                            "name": "Pork Tenderloin",
                            "amount": 1,
                            "_id": "644fa03a23c8fc3ee0966e22",
                            "id": "644fa03a23c8fc3ee0966e22"
                        }
                    ],
                    "purchaserId": "64090076ede78315fa2a7c07",
                    "__v": 0,
                    "id": "644fa03a23c8fc3ee0966e20"
                },
                {
                    "_id": "645418daa0afe7f97bd153a7",
                    "name": "ergesdf",
                    "address": "egsrgesr",
                    "phoneNumber": "346326346",
                    "paymentMethod": "card",
                    "price": 18,
                    "meals": [
                        {
                            "name": "Bouillabaisse",
                            "amount": 2,
                            "_id": "645418daa0afe7f97bd153a8",
                            "id": "645418daa0afe7f97bd153a8"
                        }
                    ],
                    "purchaserId": "64090076ede78315fa2a7c07",
                    "__v": 0,
                    "id": "645418daa0afe7f97bd153a7"
                },
            ]
        }))
    })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

it('should display 2 order tabs', async () => {
    renderWithStore(<Orders />, ['auth']);

    const mealsTabs = await screen.findAllByText(/meals/i);
    expect(mealsTabs).toHaveLength(2);
});