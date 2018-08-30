import React from 'react';
import '../assets/styles/components/book2.css'; 

const Book2 = (props) => {
    const {data} = props;
    return  <div className="book2">
                <div className="book2__front">
                    <div className="book2__front__cover-back"></div>
                    <div className="book2__front__cover">
                        <img alt={data.title} src={data.img} />
                        <p>
                            <a href={data.url} target='_blank' title={`${data.title}, ${data.date}`}>
                            {data.title}, {data.date}
                            </a>
                        </p>
                    </div>
                </div>
                <div className="book2__back"></div>
                <div className="book2__right"></div>
                <div className="book2__left"></div>
                <div className="book2__top"></div>
                <div className="book2__bottom"></div>
            </div>;

}

export default Book2;