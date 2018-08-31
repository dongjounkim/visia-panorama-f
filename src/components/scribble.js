import React from 'react';
import SVG from 'react-inlinesvg';
import '../assets/styles/components/scribble.css'; 
import scribbleSVG1 from '../assets/images/scribble--1.svg';
import scribbleSVG2 from '../assets/images/scribble--2.svg';

const Scribble = (props) => {
    const {type} = props;
    switch (type) {
        case 1:
            return  <div className='scribble scribble--1'>
                <SVG src={scribbleSVG1} />
                <SVG src={scribbleSVG1} />
            </div>;    
            break;
        case 2:
            return  <div className='scribble scribble--2'>
                <SVG src={scribbleSVG2} />
                {/* <SVG src={scribbleSVG2} /> */}
            </div>; 
        default:
            break;
    }  
};

export default Scribble;