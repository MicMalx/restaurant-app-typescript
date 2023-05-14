import style from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

type Props = {
    isAuth: boolean;
    open: boolean;
    closed: () => void;
}

const SideDrawer = (props: Props) => {
    let attachedStyles = [style.SideDrawer, style.Close];
    if (props.open) {
        attachedStyles = [style.SideDrawer, style.Open];
    }
    return(
        <>
            <Backdrop 
                show={props.open}
                clicked={props.closed}
            />
            <div 
                className={attachedStyles.join(' ')} 
                onClick={props.closed}
            >
                <div className={style.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;