import React from 'react';
import SVG from 'react-inlinesvg';
import '../assets/styles/components/scribble.css'; 
import scribbleSVG from '../assets/images/scribble.svg';

const Scribble = (props) => {
    const {data, dataType} = props;
    return  <div className='scribble'>
                <SVG src={scribbleSVG} />
                <SVG src={scribbleSVG} />
            </div>;      
};

export default Scribble;