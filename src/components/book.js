import React from 'react';
import '../assets/styles/components/book.css'; 
import {Link} from 'react-router-dom';

const Book = (props) => {
    const {data, dataType} = props;
    if (data) {
        return  <div className={`book book--${data.cat==='Éducation' ? 'edu' : (data.cat==='Édition' ? 'edi' : 'default')} ${data.data === 0 ? 'disabled' : ''}`}>
            <div className='book__cover--f'>
                <div className='book__title'>
                    <div></div>
                    <p>{data.name}</p>
                </div>
                <div></div>
            </div>
            <div className='book__pages'>
                <div></div>
                <div className='book__content'>
                    <Link to={`explore/${dataType}/${data.dataset_id}`}> {data.name} </Link> 
                </div>
                <div className='book__tag'></div>
                <div></div>
                <div></div>
            </div>
            <div className='book__cover--b'>
                <div></div>
                <div></div>
            </div>
            <div className='book__spine'>
                <div></div>
                <div></div>
            </div>
        </div>;
    } else {
        return <div/>;
    }
};

export default Book;