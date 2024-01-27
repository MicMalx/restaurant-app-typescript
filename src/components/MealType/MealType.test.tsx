import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Soup from '../../assets/Images/Soup.jpg';
import MealType from "./MealType";

const MealTypeProps = {
    url: "/soups",
    imgSrc: Soup,
    label: "Soups"
};

it('should render link and img with label given in props', () => {
    render(
        <MemoryRouter>
            <MealType {...MealTypeProps} />
        </MemoryRouter>
    );

    const link = screen.getByRole('link');
    const image = within(link).getByRole('img');
    const label = within(link).getByText(MealTypeProps.label);

    expect(link).toHaveAttribute('href', MealTypeProps.url);
    expect(image).toBeInTheDocument();
    expect(label).toBeInTheDocument();
});