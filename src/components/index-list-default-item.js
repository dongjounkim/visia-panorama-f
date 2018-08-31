import React from 'react';

const IndexListDefaultITem = (props) => {
    const {content, id, type} = props;
    return  <li className='index-list__default-item'> 
                <a href={`./explore/${type}/${id}`}> {content} </a> 
            </li>;

}

export default IndexListDefaultITem;