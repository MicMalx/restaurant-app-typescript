import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({isAuth}: {isAuth: boolean}) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Menu</NavigationItem>
        {isAuth ?
            <>
                <NavigationItem link="/orders" exact>Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </> :
            <NavigationItem link="/auth">Login</NavigationItem> 
        }
    </ul>
);

export default NavigationItems;