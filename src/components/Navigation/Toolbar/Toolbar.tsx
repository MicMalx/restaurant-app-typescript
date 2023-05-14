import style from './Toolbar.module.css';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

type Props = {
    isAuth: boolean;
    drawerToggleClicked: () => void;
};

const Toolbar = (props: Props) => (
    <header className={style.Toolbar} >
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo />
        <nav className={style.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default Toolbar;
