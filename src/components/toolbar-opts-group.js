import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import posed from 'react'
import anime from 'animejs';
import ToolbarOptsElement from './toolbar-opts-element';
import Utils from '../utils/utils';

// Trigger an event on the actual opts group after the exit animation completes
// to let the transitiongroup know that it can be removed from the DOM
const ANIMATION_DONE_EVENT = 'animation::done',
      triggerAnimationDoneEvent = node => node.dispatchEvent(new Event(ANIMATION_DONE_EVENT));

// Cache current animation so that it can be interrupted if necessary
let currentAnimation = null;
const clearCurrentAnimation = () => currentAnimation && currentAnimation.pause();

//Animations
const verticalAnimationIn = (optsGroup, done) => {
    clearCurrentAnimation();
    const opts = optsGroup.querySelectorAll('button');
    currentAnimation = anime({
        targets: opts,
        duration: 500,
        delay: function(t, i, c) {
            return i*80;
        },
        easing: [0.1,1,0.3,1],
        rotate: function(t, i,c) { 
            return [0,-10*(c-i-1) - 15 + 'deg']; 
        },
        opacity: {
            value: 1,
            duration: 10,
            delay: function(t, i, c) {
                return i*80 + 10;
            },
            easing: 'linear'
        }
    });
};



class ToolbarOptsGroup extends Component { 

  constructor(props) {
      super(props);

      this.optsRefs = [];
      
      this.state = {
          className: 'toolbar__group__opts',
          optsRefs: [],
      }
  }

  static defaultProps = {
      visible: false,
      opts: [],
  }

  renderOpts = () => {
    const {opts} = this.props;
    return opts.map((o, i) => 
        <ToolbarOptsElement
            key={`group--${Utils.generateString()}--opt--${i}`}
            id={`group--${Utils.generateString()}--opt--${i}`}
            opt={o}
        />
    );
  }

  render() {
    const {opts} = this.props;
    // return  <div 
    //             ref={this.ref}
    //             className={this.state.className}>
    //             {this.renderOpts()}
    //         </div>;
    return <TransitionGroup 
            component='div' 
            className={this.state.className}
            appear
            addEndListener={(node, done) => node.addEventListener(ANIMATION_DONE_EVENT, done)}
            onEnter={verticalAnimationIn}
            in={true}>
            {
                opts.map((o, i) => 
                <Transition 
                    key={`group--${Utils.generateString()}--opt--${i}`}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit>
                        <ToolbarOptsElement
                            id={`group--${Utils.generateString()}--opt--${i}`}
                            opt={o}/>
                </Transition>)
            }
        </TransitionGroup>;
  }
}

export default ToolbarOptsGroup;
