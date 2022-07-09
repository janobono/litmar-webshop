import React, { forwardRef, HTMLProps } from 'react'
import { cls } from '../../../util';

interface TooltipProps extends HTMLProps<HTMLDivElement> {
    label: string
}

const classes = 'absolute flex flex-col items-center hidden mb-6 group-hover:flex';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            label,
            className,
            children
        }, ref
    ) => (
        <div
            ref={ref}
            className="relative flex flex-col items-center group"
        >
            {children}
            <div className={cls(`${classes} ${className}`)}>
                <span
                    className="relative p-2 z-10 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 whitespace-nowrap"
                >{label}
                </span>
            </div>
        </div>
    ));

Tooltip.displayName = 'Tooltip';

export default Tooltip;
