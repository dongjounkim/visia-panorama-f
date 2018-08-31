import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import './App.css';
import DatasetContent from '../containers/exploration/dataset/dataset-content/dataset-content';
import DatasetIndex from '../containers/exploration/dataset/dataset-index/dataset-index';
import AuthorIndex from '../containers/exploration/author/author-index/author-index';
import AuthorContent from '../containers/exploration/author/author-content/author-content';
import Embark from '../containers/embark/embark';

class App extends Component {
  render() {
    return (
      <Router basename={'/histoires-autrices'}>
          <Switch>
            <Route path={`/`} component={Embark} />

            <Route exact path={`/explore/datasets`} component={DatasetIndex} />
          <Route path={`/explore/datasets/:id`} component={DatasetContent} />

            <Route exact path={`/explore/authors`} component={AuthorIndex} />
            <Route path={`/explore/authors/:id`} component={AuthorContent} />
          </Switch>
      </Router>
    );
  }
}

export default App;
