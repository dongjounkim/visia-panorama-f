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

    this.ref = React.createRef();
  
    this.state = {
      wordDescVisible: false,
    };
  }

  static defaultProps = {
    words: [],
  };

  componentDidMount() {
  }

  //calibrate wordlcloud
  componentDidUpdate() {
    let node = this.ref.current,
        container = node.querySelector('.wordcloud__container'),
        nodeHeight = node.clientHeight,
        containerHeight = node.scrollHeight;
    if (containerHeight > nodeHeight) {
      let children = Array.from(container.children);
      const proportion = containerHeight/nodeHeight,
            lineHeight = window.getComputedStyle(node, null).getPropertyValue('line-height'),
            newLineHeight = parseFloat(lineHeight)/proportion-6;
      node.style.lineHeight = `${newLineHeight}px`;
      node.style.top = '20px';
      children.forEach(c => {
        const fontSize = window.getComputedStyle(c, null).getPropertyValue('font-size');
        c.style.fontSize = `calc(${fontSize} / ${proportion})`;
      })
    }
  }

  //Render the wordcloud (list of words, sized and weighted proportionally).
  prepareWordCloud = () => {
    const authors = this.prepareData(); //actual word styling here
    let wordCloud = [];

    authors.forEach((a, i) => {
      wordCloud.push(<Word key={`author--${a.id_author}`} author={a} />);
      i !== authors.length-1 && wordCloud.push(<span key={`word--${a.id_author}`}>{', '}</span>);
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
    return <section ref={this.ref} className='wordcloud wordcloud__word--4'>
            <div className='wordcloud__container'>
              {this.prepareWordCloud()}
              <span>.</span>
            </div>
            <WordDesc show={this.state.wordDescVisible} ></WordDesc>
          </section>;
  }
}

export default Wordcloud;
