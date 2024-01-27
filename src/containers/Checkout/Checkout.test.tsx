import { screen } from "@testing-library/react";
import { renderWithStore } from "../../utils/test-utils";
import Checkout from "./Checkout";

const orderBuilderInitState = {
    isLoading: false,
    meals: [
        {
            amount: 1,
            description: "lazur cheese, stuffed mushroom, potato pancake, port sauce, pepper, zucchini, onion",
            name: "Beef Steak",
            price: 18,
            type: "mainCourse" as 'mainCourse',
        },
        {
            amount: 2,
            description: "prawns, Cod sirloin, clams",
            name: "Bouillabaisse",
            price: 9,
            type: "soups" as 'soups',
        },
        {
            amount: 0,
            description: "fries, cucumber salad",
            name: "Chicken Breast Nuggets",
            price: 7.5,
            type: "kidsMenu" as 'kidsMenu',
        },
        {
            amount: 0,
            description: "pasta, carrot, parsley",
            name: "Chicken Soup",
            price: 5.5,
            type: "soups" as 'soups',
        },
        {
            amount: 0,
            description: "passion fruit mousse, forest fruits, raspberries, chocolate ground",
            name: "Meringue with Mascarpone Cream",
            price: 7,
            type: "desserts" as 'desserts',
        },
        {
            amount: 0,
            description: "ice cream, whipped cream, mascarpone",
            name: "Pancakes with Apples and Mascarpone",
            price: 9,
            type: "desserts" as 'desserts',
        },
        {
            amount: 0,
            description: "croutons with basil pesto",
            name: "Pepper tomato Cream",
            price: 6.5,
            type: "soups" as 'soups',
        },
        {
            amount: 0,
            description: "potato pancake, broccoli, bacon, chanterelle sauce, onion in tempura, carrots",
            name: "Pork Tenderloin",
            price: 15,
            type: "mainCourse" as 'mainCourse',
        },
        {
            amount: 0,
            description: "beef, tomato, basil",
            name: "Spaghetti Bolognese",
            price: 8,
            type: "kidsMenu" as 'kidsMenu',
        },
        {
            amount: 0,
            description: "ice cream, nut meringue",
            name: "White Chocolate Mousse Covered with Hot Forest Fruits",
            price: 7,
            type: "desserts" as 'desserts',
        }
    ],
    totalPrice: 36,
    error: false,
}


it('should render all elements of MealsList and ContactData components', () => {
    renderWithStore(<Checkout />, ['auth', 'orderBuilder', 'orderSender'], {
        orderBuilder: orderBuilderInitState
    });

    const mealsListLabel = screen.getByText(/order summary/i);
    const meals = screen.getAllByTestId('summary-meal');
    const totalPrice = screen.getByText(/total price/i);

    const contactDataLabel = screen.getByRole('heading', { level: 4 });
    const inputs = screen.getAllByRole('textbox');
    const selectLabel = screen.getByText(/payment method/i);
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button', {
        name: /order/i
    });

    expect(mealsListLabel).toBeInTheDocument();
    expect(meals).toHaveLength(2);
    expect(totalPrice).toBeInTheDocument();
    expect(contactDataLabel).toBeInTheDocument();
    expect(inputs).toHaveLength(3);
    expect(selectLabel).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});