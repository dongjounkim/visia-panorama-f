import React from 'react';
import { Link } from 'react-router-dom';

const IndexListDefaultITem = (props) => {
    const {content, id, type} = props;
    return  <li className='index-list__default-item'> 
                <Link href={`explore/${type}/${id}`}> {content} </Link> 
            </li>;

}

export default IndexListDefaultITem;