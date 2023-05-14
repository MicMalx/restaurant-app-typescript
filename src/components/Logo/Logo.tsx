import restaurantLogo from '../../assets/Images/logo.png';
import { useStyles } from './Logo.styles';

const Logo = () => {
    const classes = useStyles();

    return (
        <div className={classes.logo}>
            <img className={classes.img} src={restaurantLogo} alt="Restaurant" />
        </div>
    );
};

export default Logo;