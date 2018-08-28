import React from 'react';

const Word = (props) => {
    const {id_author, pseudonym, date_of_birth, date_of_death, word} = props.author;
    return  <a href={`/explore/heroines/${id_author}`} 
               className={`wordcloud__word wordcloud__word--${word.level}`}>
              {pseudonym}
            </a>;
};

export default Word;