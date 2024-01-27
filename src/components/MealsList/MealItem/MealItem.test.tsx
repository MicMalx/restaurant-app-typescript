import { render, screen, within } from "@testing-library/react";
import MealItem from "./MealItem";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn()
}));

const getMealItemProps = (isSummary: boolean, amount: number) => {
    return {
        name: 'Bouillabaisse',
        ings: 'prawns, Cod sirloin, clams',
        price: 9,
        amount: amount,
        summary: isSummary
    }
}

const renderMealItem = (isSummary: boolean, amount: number) => {
    const mealItemProps = getMealItemProps(isSummary, amount);

    return { 
        mealItemProps: mealItemProps,
        container: render(<MealItem {...mealItemProps} />).container
    };
}

describe('summary prop equals ture', () => {
    describe('amount prop do not equal 0', () => {
        it('should render name, ing, price, amount of meal and 2 buttons', () => {
            const { mealItemProps } = renderMealItem(true, 1);

            const mealName = screen.getByText(mealItemProps.name);
            const mealIngs = screen.getByText(mealItemProps.ings);
            const mealPrice = screen.getByText(`${mealItemProps.price} $`);
            const mealAmount = screen.getByText(`x${mealItemProps.amount}`);
            const buttons = screen.getAllByRole('button');

            expect(mealName).toBeInTheDocument();
            expect(mealIngs).toBeInTheDocument();
            expect(mealPrice).toBeInTheDocument();
            expect(mealAmount).toBeInTheDocument();
            expect(buttons).toHaveLength(2);
        });

        it('should render remove button enabled', () => {
            renderMealItem(true, 1);

            const removeButton = screen.getByRole('button', {
                name: /remove/i
            });
            expect(removeButton).not.toBeDisabled();
        });
    })

    describe('amount prop equals 0', () => {
        it('should not render MealItem element', () => {
            const { container } = renderMealItem(true, 0);
            expect(container).toBeEmptyDOMElement();
        });
    })
});

describe('summary props equals false', () => {
    it('should render name, ing, price of meal and 2 buttons', () => {
            const { mealItemProps } = renderMealItem(false, 1);

            const mealCard = screen.getByTestId('meal-card');
            const mealCardContainers = within(mealCard).getAllByRole('generic');
            const mealName = screen.getByText(mealItemProps.name);
            const mealIngs = screen.getByText(mealItemProps.ings);
            const mealPrice = screen.getByText(`${mealItemProps.price} $`);
            const buttons = screen.getAllByRole('button');

            expect(mealCardContainers).toHaveLength(4);
            expect(mealName).toBeInTheDocument();
            expect(mealIngs).toBeInTheDocument();
            expect(mealPrice).toBeInTheDocument();
            expect(buttons).toHaveLength(2);
    });
    describe('meals amount equals 0', () => {
        it('should render disabled remove button', () => {
            renderMealItem(false, 0);

            const removeButton = screen.getByRole('button', {
                name: /remove/i
            });
            expect(removeButton).toBeDisabled();
        });
    })
    describe('meals amount other than 0', () => {
        it('should render enabled remove button', () => {
            renderMealItem(false, 1);

            const removeButton = screen.getByRole('button', {
                name: /remove/i
            });
            expect(removeButton).not.toBeDisabled();
        })
    })
});


