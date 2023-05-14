import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

type Props = {
    link: string;
    exact?: boolean;
    children: ReactNode;
}

const NavigationItem = (props: Props) => (
    <li className={styles.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={styles.active}
        >{props.children}</NavLink>
    </li>
);

export default NavigationItem;