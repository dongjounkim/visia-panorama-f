import React, { Component } from 'react';
import _ from 'lodash';
import { ResponsiveLine } from '@nivo/line';
import theme from './theme';


class LineChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.prepareData(this.props),

            margin: {
                'top': 50,
                'right': 110,
                'bottom': 50,
                'left': 60
            },

            minY: 'auto',

            stacked: true,

            curve: 'natural',

            axisBottom: {
                'orient': 'bottom',
                'tickSize': 5,
                'tickPadding': 5,
                'tickRotation': 0,
                'legend': 'Année',
                'legendOffset': 36,
                'legendPosition': 'center'
            },

            axisLeft: {
                'orient': 'left',
                'tickSize': 5,
                'tickPadding': 5,
                'tickRotation': 0,
                'legend': 'No',
                'legendOffset': -40,
                'legendPosition': 'center'
            },

            dotSize: 10,

            dotColor: 'inherit:darker(0.3)',

            dotBorderWidth: 2,

            dotBorderColor: '#ffffff',

            enableDotLabel: true,

            dotLabel: 'y',

            dotLabelYOffset: -12,

            enableArea: true,

            areaOpacity: 0.05,

            animate: true,

            motionStiffness: 90,

            motionDamping: 15,

            legends: [
                {
                    'anchor': 'bottom-right',
                    'direction': 'column',
                    'translateX': 100,
                    'itemWidth': 80,
                    'itemHeight': 20,
                    'symbolSize': 12,
                    'symbolShape': 'circle'
                }
            ]
        }
    }

    prepareData = (props) => {
        let data = [],
                dataF = [],
                dataM = [],
                years = _.uniq(_.map(props.data, 'year')).reverse(),
                authorsF = _.uniq(_.map(props.authorsF, 'id_author')),
                authorsM = _.uniq(_.map(props.authorsM, 'id_author'));
            
            years.forEach(year => {
                let _authors = _.map(_.filter(props.data, ['year', year]), 'author_id_FK'),
                    _authorsF = _.filter(_authors, (a) => _.includes(authorsF, a)),
                    _authorsM = _.filter(_authors, (a) => _.includes(authorsM, a));
                
                dataF.push({x: year, y: _authorsF.length});
                dataM.push({x: year, y: _authorsM.length});
            });

            data = [
                {
                    'id': 'Autrices',
                    'color': theme.colors.dBrown,
                    'data': dataF
                },
                {
                    'id': 'Auteurs',
                    'color': theme.colors.brown,
                    'data': dataM
                }
            ];
        
        return data;
    }

    componentWillReceiveProps(newProps) {
        this.setState(((prevState, newProps) => {
            const data = this.prepareData(newProps);
            return {data: data};
        }));
    }
    

    render() {
      return <ResponsiveLine
            data = {this.state.data}
            margin = {this.state.margin}
            minY = {this.state.minY}
            stacked = {this.state.stacked}
            curve = {this.state.curve}
            axisBottom = {this.state.axisBottom}
            axisLeft = {this.state.axisLeft}
            dotSize = {this.state.dotSize}
            dotColor = {this.state.dotColor}
            dotBorderWidth = {this.state.dotBorderWidth}
            dotBorderColor = {this.state.dotBorderColor}
            enableDotLabel = {this.state.enableDotLabel}
            dotLabel = {this.state.dotLabel}
            dotLabelYOffset = {this.state.dotLabelYOffset}
            enableArea = {this.state.enableArea}
            areaOpacity = {this.state.areaOpacity}
            animate = {this.state.animate}
            motionStiffness = {this.state.motionStiffness}
            motionDamping = {this.state.motionDamping}
            legends = {this.state.legend}
        />;
    }
  }
  
  export default LineChart;