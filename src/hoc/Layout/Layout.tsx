import { ReactNode, useState } from 'react';

import style from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

type Props = {
    isAuth: boolean;
    children: ReactNode;
};

const Layout = ({isAuth, children}: Props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return(
        <>
            <Toolbar
                isAuth={isAuth}
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuth={isAuth}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={style.Content}>
                {children}
            </main>
        </>
    );
};

export default Layout;