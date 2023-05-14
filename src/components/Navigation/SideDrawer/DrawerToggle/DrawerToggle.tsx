import style from './DrawerToggle.module.css';

const DrawerToggle = ({clicked}: {clicked: () => void}) => (
    <div 
        className={style.DrawerToggle}
        onClick={clicked}
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;