//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFauxDom from 'react-faux-dom';
import { select } from 'd3-selection';
import cloud from 'd3-cloud';

//Utils
import _ from 'lodash';

//Child Components
import Word from './word';

//Styles
import '../assets/styles/components/wordcloud.css';
import Utils from '../utils/utils';

const defaultFontSizeMapper = word => word.value;

const onWordClickEvent = (wordIndex, data) => {
  console.log(data[wordIndex]);
};

const onWordHoverEvent = (wordIndex, data) => {
  console.log(data[wordIndex]);
};

class Wordcloud extends Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    font: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    fontSizeMapper: PropTypes.func,
    onWordClick: PropTypes.func,
    onWordHover: PropTypes.func,
  }

  static defaultProps = {
    width: '100%',
    height: '100%',
    padding: 5,
    font: 'serif',
    fontSizeMapper: defaultFontSizeMapper,
    fill: '#000',
    rotate: 0,
    onWordClick: onWordClickEvent,
    onWordHover: onWordHoverEvent
  }

  prepareWordCloud = () => {
    const authors = this.prepareData(),
          { width, height, padding, fill, font, fontSizeMapper, rotate, onWordClick, onWordHover } = this.props;

    // Remove Old Words (if there does has old words)
    select(this.wordCloud).selectAll('*').remove();


    // Render new words based on the data
    const layout = cloud()
      // .size([width, height])
      .font(font)
      .words(authors.map(a => a.word))
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .on('end', words => {
        // Get computed W and H
        let w = width, h = height;
        if (this.wordCloud.getBoundingClientRect()) {
          w = this.wordCloud.getBoundingClientRect().width;
          h = this.wordCloud.getBoundingClientRect().height;
        } else {}

        select(this.wordCloud)
          .append('svg')
          .attr('width', w)
          .attr('height', h)
          .append('g')
          .attr('transform', `translate(${isNaN(w) ? 100 : w/4}, ${isNaN(h) ? 100 : h/4})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size*0.9}rem`)
          .style('font-weight', d => {
            let weight;
            if (d.size >= 1 && d.size <= 3) {
              weight = 400;
            } else if (d.size >= 3 && d.size <= 5) {
              weight = 600;
            } else if (d.size >= 5 && d.size <= 7) {
              weight = 700;
            } else if (d.size >= 7 && d.size <= 9) {
              weight = 800;
            } else {
              weight = 800;
            }
            return weight;
          })
          .attr('text-anchor', 'middle')
          .attr('transform',
            (d, i) => {
              console.log(d);
              const tX = -5*d.x,
                    tY = -10*d.y;
              return `translate(${[0, (i+1)*20]})rotate(${d.rotate})`;
            }
          )
          .text(d => d.text)
          .on('click', (d, i) => onWordClick(i, authors))
          .on('mouseover', (d, i) => onWordHover(i, authors))
      });


    layout.start();
  }

  prepareData = () => {
    let authors = [];

    this.props.authorsF.forEach(a => {
      const word = {text: a.pseudonym, value: 1},
            author = {...a, word: word},
            i = authors.findIndex(_a => _a.pseudonym === a.pseudonym);
      
      if (authors.length === 0 || i === -1) {
        authors.push(author);
      } else {
        authors[i].word.value++;
      }

    });

    return authors;
  }

  componentWillMount() {
    this.wordCloud = ReactFauxDom.createElement('div');
    this.wordCloud.setAttribute('class', 'wordcloud');
  }

  render() {
    this.prepareWordCloud();

    return <section className='authors'>
            {this.wordCloud.toReact()}
          </section>;
  }
}

export default Wordcloud;
