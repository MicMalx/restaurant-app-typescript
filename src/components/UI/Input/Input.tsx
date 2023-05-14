import { ChangeEvent } from 'react';

import style from './Input.module.css';

type Props = {
    value: string;
    invalid: boolean;
    touched: boolean;
    elementConfig: {
        type: string,
        placeholder: string
    }
    changed: (event: ChangeEvent<HTMLInputElement>) => void;
};

const input = (props: Props) => {
    const inputStyles = [style.InputElement];
    if (props.invalid && props.touched) {
        inputStyles.push(style.Invalid)
    }

    const inputElement = <input
        className={inputStyles.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
    />;

    return (
        <div className={style.Input}>
            {inputElement}
        </div>
    );
}

export default input;