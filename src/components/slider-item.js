import React, { Component } from 'react';

const SliderItem = (props) => {
    const {level, item} = props;
    return(
        <li className={`slider__item slider__item--level${level}`}>
            {item}
        </li>
    );
}

export default SliderItem;
