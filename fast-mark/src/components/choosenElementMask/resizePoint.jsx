import React from 'react';
import { resizePointClassName } from '../../const/classNameConst';
import './resizePoints.css';

export default function ResizePoint({type}) {

    return (
        <>
            <div className={`${resizePointClassName} ${type}-right-buttom-point`}>
            </div>
        </>
    )
}
