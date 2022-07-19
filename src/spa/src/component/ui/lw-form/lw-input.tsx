import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

interface ValidationResult {
    valid: boolean,
    message?: string
}

interface LWInputProps extends PropsWithChildren {
    type: 'text' | 'password' | 'email',
    name: string,
    label: string,
    required?: boolean
    placeholder: string,
    pattern?: string,
    value: string,
    setValue: (value: string) => void,
    valid: boolean,
    setValid: (valid: boolean) => void,
    validate: () => ValidationResult
}

const LWInput: React.FC<LWInputProps> = (props) => {
    const didMount = React.useRef(false);
    const [message, setMessage] = useState<string>();

    const revalidate = useCallback(() => {
        const validationResult = props.validate();
        props.setValid(validationResult.valid);
        setMessage(validationResult.message);
    }, [props.value]);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        revalidate();
    }, [props.value]);

    return (
        <div className="my-4">
            <label htmlFor={props.name} className="mb-2">
                {props.label + (props.required ? '*' : '')}
            </label>
            {props.children}
            <input
                className="w-full"
                type={props.type}
                id={props.name}
                name={props.name}
                pattern={props.pattern}
                placeholder={props.placeholder}
                value={props.value}
                onChange={event => props.setValue(event.target.value)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
            />
            {message && (
                <span className="text-xs text-red-500">{message}</span>
            )}
        </div>
    );
}

export default LWInput;

export const EMAIL_REGEX = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
