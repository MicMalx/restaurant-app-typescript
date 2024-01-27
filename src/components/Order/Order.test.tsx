import { render, screen } from "@testing-library/react";
import Order from "./Order";

it('should display meals and price', () => {
    const orderProps = {
        meals: [
            {
                amount: 2,
                id: '1',
                name: 'Chicken Soup'
            },
            {
                amount: 1,
                id: '2',
                name: 'Pork Tenderloin'
            }  
        ],
        price: 26
    }
    render(<Order meals={orderProps.meals} price={orderProps.price} />);

    const chickenSoup = screen.getByText('Chicken Soup(2)');
    const porkTendrloin = screen.getByText('Pork Tenderloin(1)');
    const price = screen.getByText('26.00 $');
    

    expect(chickenSoup).toBeInTheDocument();
    expect(porkTendrloin).toBeInTheDocument();
    expect(price).toBeInTheDocument();
})