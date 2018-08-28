import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../assets/styles/components/slider.css';
import Book from './book';
import SliderItem from './slider-item';


class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
        active: this.props.active,
        direction: ''
    }
    this.rightClick = this.moveRight;
    this.leftClick = this.moveLeft;
  }

  static defaultProps = {
      data: [],
      active: 0
  }

  generateItems() {
      let {active} = this.state,
          items = this.props.data,
          sliderItems = [],
          level;
      console.log(active);
      for (let i = active - 2; i < active + 3; i++) {
          let index = i;
          if (i < 0) {
              index = items.length + i;
          } else if (i >= items.length) {
              index = i % items.length;
          }
          level = active - i;
          sliderItems.push(
            <SliderItem key={`une--b--${index+1}`} level={level}
              item={items.length === 0 ? <div></div> : <Book data={items[index]} dataType='datasets' />} />
          )
      }
      return sliderItems;
  }

  moveLeft = (e) => {
    e.preventDefault();
    let newActive = this.state.active,
        items = this.props.data;
    newActive--;
    this.setState({
        active: newActive < 0 ? items.length - 1 : newActive,
        direction: 'left'
    });
  }

  moveRight = (e) => {
    e.preventDefault();
    let newActive = this.state.active,
        items = this.props.data;
    this.setState({
        active: (newActive + 1) % items.length,
        direction: 'right'
    });
  }

  render() {
    return <ul className="slider">
            <button className="slider__arrow slider__arrow--l" onClick={this.leftClick}></button>
            <ReactCSSTransitionGroup 
              component='div' className='slider__items'
              transitionName={this.state.direction}>
              {this.generateItems()}
            </ReactCSSTransitionGroup>
            <button className="slider__arrow slider__arrow--r" onClick={this.rightClick}></button>
          </ul>;
  }

  // renderSlider() {
    
  //   const {data} = this.props;
  //   return data.map((d, i) => 
  //           <SliderItem key={`une--b--${i+1}`}
  //             level={0}
  //             item={<Book data={d} dataType='datasets' />}/>
  //           ); 
  // }

  // render() {
  //   return <div className="contains-slider">
  //             <ul className="slider">
  //               {this.renderSlider()}
  //             </ul>
  //         </div>;
  // }
}

export default Slider;
