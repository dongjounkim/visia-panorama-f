import React, { Component } from 'react';
import _ from 'lodash';
import { ResponsiveWaffle } from '@nivo/waffle';
import Utils from '../utils/utils';
import theme from './theme';


class WaffleChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.prepareData(this.props),

            total: 100,

            rows: 10,

            columns: 10,

            margin: {
                top: 40,
                right: 40,
                bottom: 40,
                left: 40
            },

            theme: {
                tooltip: {
                    container: {
                        fontSize: theme.fonts.size
                    }
                },
                labels: {
                    textColor: theme.colors.dGray
                }
            },

            colorBy: 'id',

            borderColor: theme.colors.dBrown,

            animate: true,

            motionStiffness: 90,

            motionDamping: 11
        }
    }

    prepareData(props) {
        const c_authorsF = Utils.calculatePercentageOf(props.authorsF.length, props.data.length, 10),
              c_authorsM = Utils.calculatePercentageOf(props.authorsM.length, props.data.length, 10),
              c_authorsNA = 100 - c_authorsF - c_authorsM,
              data = [
                {
                  id: 'Auteurs',
                  label: 'Auteurs',
                  value: isNaN(c_authorsM) ? 0 : c_authorsM,
                  color: theme.colors.brown
                },
                {
                  id: 'Autrices',
                  label: 'Autrices',
                  value: isNaN(c_authorsF) ? 0 : c_authorsF,
                  color: theme.colors.dBrown
                },
                {
                  id: 'NA',
                  label: 'NA',
                  value: isNaN(c_authorsNA) ? 0 : c_authorsNA,
                  color: theme.colors.lBrown
                }
              ];
        
        return data;
    }
    
    updateState = () => {
        this.setState(((prevState, newProps) => {
            const data = this.prepareData(newProps);
            
            return {
                data: data,
                total: newProps.data.length
            };
        }));
    }

    componentWillReceiveProps(newProps) {
        this.updateState();
    }

    render() {
      return <ResponsiveWaffle
            data = {this.state.data}
            total = {this.state.total}
            rows = {this.state.rows}
            columns = {this.state.columns}
            margin = {this.state.margin}
            theme = {this.state.theme}
            colorBy = {this.state.colorBy}
            borderColor = {this.state.borderColor}
            animate = {this.state.animate}
            motionStiffness = {this.state.motionStiffness}
            motionDamping = {this.state.motionDamping}
        />;
    }
  }
  
  export default WaffleChart;