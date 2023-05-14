import { ReactNode } from 'react';
import style from './Button.module.css';

type Props = {
  disabled?: boolean;
  clicked?: () => void;
  btnType: 'Submit' | 'Success';
  children: ReactNode;
}

const Button = (props: Props) => (
    <button 
      disabled={props.disabled}
      className={[style.Button, style[props.btnType]].join(' ')}
      onClick={props.clicked}      
    >{props.children}</button>
);

export default Button;