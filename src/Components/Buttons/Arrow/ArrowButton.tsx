import React, { FC } from 'react';
import { ShortArrow } from '../../SVG/ShortArrow';
import { ArrowBtnProps, IconButton } from '../';
import { jc } from '../../Helpers';
import './arrowButton.scss';

export const ArrowButton: FC<ArrowBtnProps> = function (props) {
    const { iconSize, buttonSize, direction, style, className = '', ...rest } = props;
    return (
        <IconButton
            buttonSize={buttonSize}
            iconSize={iconSize}
            style={style}
            className={jc('shortArrow_btn', className)}
            {...rest}
        >
            <ShortArrow direction={direction} />
        </IconButton>
    );
};
