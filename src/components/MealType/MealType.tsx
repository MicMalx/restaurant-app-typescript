import { NavLink } from 'react-router-dom';

import style from './MealType.module.css';

type Props = {
    url: string;
    imgSrc: string;
    label: string;
}

const MealType = ({url, imgSrc, label}: Props) => (
    <NavLink to={url}>
    <div className={style.MealType}>
        <img src={imgSrc} alt={label} />
        <div className={style.Label}><b>{label}</b></div>
    </div>
    </NavLink>
);

export default MealType;