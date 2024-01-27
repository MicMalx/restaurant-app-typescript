import { screen, within } from "@testing-library/react";
import user from '@testing-library/user-event';
import MealsList from "./MealsList";
import { Meal } from "../../store/reducers/orderBuilder";
import { renderWithStore } from "../../utils/test-utils";
import { MenuPart } from "../../containers/OrderBuilder/OrderBuilder";

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

const getMealsListProps = (isOrderEmpty = true, summary = true, menuPart?: MenuPart) => {
    return {
        menuPart: menuPart,
        meals: [
            {
                amount: isOrderEmpty ? 0 : 1,
                description: "lazur cheese, stuffed mushroom, potato pancake, port sauce, pepper, zucchini, onion",
                name: "Beef Steak",
                price: 18,
                type: "mainCourse" as 'mainCourse',
            },
            {
                amount: isOrderEmpty ? 0 : 2,
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
        ] as Meal[],
        summary: summary
    };
};

describe('summary prop equals true', () => {
    it('should not render any meal if amount of all the meals equals 0', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder']);

        const meals = screen.queryAllByTestId('summary-meal');
        expect(meals).toHaveLength(0);
    });
    it('should render label and total price', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder']);

        const label = screen.getByText(/order summary/i);
        const totalPrice = screen.getByText(/total price/i);
        expect(label).toBeInTheDocument();
        expect(totalPrice).toBeInTheDocument();
    });
    it('should render rows for meals which amount is other than 0', () => {
        renderWithStore(<MealsList  {...getMealsListProps(false)} />, ['orderBuilder']);

        const mealsAddedToOrder = screen.getAllByTestId('summary-meal');
        expect(mealsAddedToOrder).toHaveLength(2);
    });
    it('should display appropriate price based on store', () => {
        renderWithStore(<MealsList  {...getMealsListProps(false)} />, ['orderBuilder'], {
            orderBuilder: orderBuilderInitState
        });

        const totalPrice = screen.getByText(/total price/i);
        expect(totalPrice).toHaveTextContent(/36.0/);
    });
    it('should update price after adding a meal', () => {
        renderWithStore(<MealsList  {...getMealsListProps(false)} />, ['orderBuilder'], {
            orderBuilder: orderBuilderInitState
        });

        const mealRows = screen.getAllByTestId('summary-meal');
        const beefSteakAddButton = within(mealRows[0]).getByRole('button', {
            name: /add/i
        });

        user.click(beefSteakAddButton);

        const totalPrice = screen.getByText(/total price/i);
        expect(totalPrice).toHaveTextContent(/54.0/);
    });
    it('should update price after removing a meal', () => {
        renderWithStore(<MealsList  {...getMealsListProps(false)} />, ['orderBuilder'], {
            orderBuilder: orderBuilderInitState
        });

        const mealRows = screen.getAllByTestId('summary-meal');
        const beefSteakRemoveButton = within(mealRows[0]).getByRole('button', {
            name: /remove/i
        });

        user.click(beefSteakRemoveButton);

        const totalPrice = screen.getByText(/total price/i);
        expect(totalPrice).toHaveTextContent(/18.0/);
    })
});

describe('summary prop equals false and menuPart prop has a value', () => {
    it('should render meals of a given part', () => {
        renderWithStore(<MealsList  {...getMealsListProps(true, false, 'soups')} />, ['orderBuilder']);

        const soups = screen.getAllByTestId('meal-card');
        expect(soups).toHaveLength(3);
    });
});