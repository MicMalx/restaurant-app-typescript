import { ChangeEvent } from 'react';
import style from './Select.module.css';

type Props = {
    changed: (event: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    options: {value:string, displayValue: string}[]
}

const select = (props: Props) => {

    return (
        <div className={style.Input}>
            <label className={style.Label}>Payment Method: </label>
            <select
                className={style.InputElement}
                value={props.value} 
                onChange={props.changed}>
                {props.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default select;