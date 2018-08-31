import React, { Component } from 'react';
import '../assets/styles/components/dataset-overview.css';
import Scribble from './scribble';


class DatasetOverview extends Component {

  static defaultProps = {
    pseudonym: ''
  }

  render() {
    const {name, desc} = this.props; 
    return  <section className='dataset-overview'>
                <Scribble type={2} />
                <figure></figure>
                {name && <h1>{name}</h1>}
                {desc && <p>{desc}</p>}
            </section>;
  }
}

export default DatasetOverview;
