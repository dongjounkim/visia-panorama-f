import React from 'react';
import '../assets/styles/components/book2.css'; 

const enhancedDiv = () => <div>
        <span className='before'></span>
        <span className='after'></span>
    </div>;

const Book2 = (props) => {
    const {data} = props;
    return  <div className='book2'>
                toto
            </div>;
};

export default Book2;