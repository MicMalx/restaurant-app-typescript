import style from './Backdrop.module.css';

type Props = {
    show: boolean;
    clicked: () => void;
}

const Backdrop = ({show, clicked}: Props) => (
    show ? <div className={style.Backdrop} onClick={clicked}></div> : null
);

export default Backdrop;