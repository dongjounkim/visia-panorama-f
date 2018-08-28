//Core
import React, { Component } from 'react';


//Utils
import _ from 'lodash';

//Child Components
import Word from './word';
import WordDesc from './word-desc';

//Styles
import '../assets/styles/components/wordcloud.css';
import Utils from '../utils/utils';

const defaultFontSizeMapper = word => word.value;


class Wordcloud extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      wordDescVisible: false,
    };
  }

  static defaultProps = {
    words: [],
  };

  //Render the wordcloud (list of words, sized and weighted proportionally).
  prepareWordCloud = () => {
    const authors = this.prepareData(); //actual word styling here
    let wordCloud = [];

    authors.forEach(a => {
      wordCloud.push(<Word key={`author--${a.id_author}`} author={a} />);
    })

    return wordCloud;
  }

  prepareData = () => {
    let authors = [],
        nMin = 1,
        nMax = 1;

    //Calculate words list, each word's weight
    this.props.authorsF.forEach(a => {
      const word = {text: a.pseudonym, value: 1, level: 3},
            author = {...a, word: word},
            i = authors.findIndex(_a => _a.pseudonym === a.pseudonym);
      
      //if author doesn't exist, add author to the list, with value =1
      //if author already exists, author's value in the list++
      if (authors.length === 0 || i === -1) {
        authors.push(author);
      } else {
        authors[i].word.value++;
        nMax = authors[i].word.value > nMax ? authors[i].word.value : nMax;
      }
    });

    //First of all, if nMax = nMin, skip
    //Else
    //Determine level (className and according font size, weight)
    //there are 7 level, with the default level == 1 
    if (nMin !== nMax) {
      authors.forEach(a => {
        a.word.level = 1 + ( 
                      6 * ( Math.log(a.word.value) - Math.log(nMin) ) /
                      ( Math.log(nMax) - Math.log(nMin) )
                    );
      });        
    }
    return authors;
  }

  render() {
    return <section className='wordcloud wordcloud__word--4'>
            <div>
              {Utils.intersperse(this.prepareWordCloud(), ', ')}.
            </div>
            <WordDesc show={this.state.wordDescVisible} ></WordDesc>
          </section>;
  }
}

export default Wordcloud;
