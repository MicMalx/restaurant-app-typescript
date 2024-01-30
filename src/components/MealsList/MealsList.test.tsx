import { screen, within } from "@testing-library/react";
import user from '@testing-library/user-event';
import MealsList from "./MealsList";
import { renderWithStore } from "../../utils/test-utils";
import { MenuPart } from "../../containers/OrderBuilder/OrderBuilder";

const createOrderBuilderInitState = (areMealsAddedToOrder = false) => {
    return {
        isLoading: false,
        meals: [
            {
                amount: areMealsAddedToOrder ? 1 : 0,
                description: "lazur cheese, stuffed mushroom, potato pancake, port sauce, pepper, zucchini, onion",
                name: "Beef Steak",
                price: 18,
                type: "mainCourse" as 'mainCourse',
            },
            {
                amount: areMealsAddedToOrder ? 2 : 0,
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
        totalPrice: areMealsAddedToOrder ? 36 : 0,
        error: false,
    };
};

const getMealsListProps = (summary = true, menuPart?: MenuPart) => {
    return {
        menuPart: menuPart,
        summary: summary
    };
};

describe('summary prop equals true', () => {
    it('should not render any meal if amount of all the meals equals 0', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState()
        });

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
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
        });

        const mealsAddedToOrder = screen.getAllByTestId('summary-meal');
        expect(mealsAddedToOrder).toHaveLength(2);
    });
    it('should display appropriate price based on store', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
        });

        const totalPrice = screen.getByText(/total price/i);
        expect(totalPrice).toHaveTextContent(/36.0/);
    });
    it('should update price after adding a meal', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
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
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
        });

        const mealRows = screen.getAllByTestId('summary-meal');
        const beefSteakRemoveButton = within(mealRows[0]).getByRole('button', {
            name: /remove/i
        });

        user.click(beefSteakRemoveButton);

        const totalPrice = screen.getByText(/total price/i);
        expect(totalPrice).toHaveTextContent(/18.0/);
    });
    it('should remove meal row if amount equals 0 after removing', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
        });

        const mealRows = screen.getAllByTestId('summary-meal');
        expect(mealRows).toHaveLength(2);
        const beefSteakRemoveButton = within(mealRows[0]).getByRole('button', {
            name: /remove/i
        });

        user.click(beefSteakRemoveButton);

        const mealRowsAfterRemoving = screen.getAllByTestId('summary-meal');
        expect(mealRowsAfterRemoving).toHaveLength(1);
    });
    it('should update amount of meals in a row after adding a meal', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
        });

        const mealRows = screen.getAllByTestId('summary-meal');
        const beefSteakAmount = within(mealRows[0]).getByText(/x/i);
        
        const beefSteakAddButton = within(mealRows[0]).getByRole('button', {
            name: /add/i
        });
        user.click(beefSteakAddButton);

        expect(beefSteakAmount).toHaveTextContent(/x2/);
    })
    it('should update amount of meals in a row after removing a meal', () => {
        renderWithStore(<MealsList  {...getMealsListProps()} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState(true)
        });

        const mealRows = screen.getAllByTestId('summary-meal');
        const bouillabaisseAmount = within(mealRows[1]).getByText(/x/i);

        
        const bouillabaisseRemoveButton = within(mealRows[1]).getByRole('button', {
            name: /remove/i
        });
        user.click(bouillabaisseRemoveButton);

        expect(bouillabaisseAmount).toHaveTextContent(/x1/);
    })
});

describe('summary prop equals false and menuPart prop has a value', () => {
    it('should render meals of a given part', () => {
        renderWithStore(<MealsList  {...getMealsListProps(false, 'soups')} />, ['orderBuilder'], {
            orderBuilder: createOrderBuilderInitState()
        });

        const soups = screen.getAllByTestId('meal-card');
        expect(soups).toHaveLength(3);
    });
});