import React, { memo, useMemo, FC } from 'react';
import { jc } from '../Helpers';
import './icon.scss';
import { IconProps, ExtCSSProps, Size } from '../Buttons';
import { ObjectMap } from '../ITable';

const sizes: ObjectMap<Size, ReturnType<any>> = {
    xxs: '8px',
    xs: '12px',
    s: '16px',
    m: '24px',
    l: '32px',
};

export const Icon: FC<IconProps> = memo(({ children, className = '', iconSize, style }) => {
    const classNames = useMemo(() => jc('icon', className), [className]);
    const styles: ExtCSSProps = { ['--icon-size']: sizes[iconSize as Size], ...style };

    return (
        <span className={classNames} role='presentation' style={styles}>
            {children}
        </span>
    );
});
