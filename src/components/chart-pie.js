import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie';
import Utils from '../utils/utils';
import theme from './theme';


class PieChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.prepareData(this.props),

            margin: {
                top: 40,
                right: 80,
                bottom: 80,
                left: 80
            },

            startAngle: 100,

            endAngle: -360,

            padAngle: 2,

            innerRadius: 0.25,

            cornerRadius: 4,

            sortByValue: false,

            colors: theme.colorsRange,

            colorBy: 'id',

            borderWidth: 1,

            borderColor: theme.colors.dBrown,

            radialLabel: 'value',

            radialLabelsSkipAngle: 10,

            radialLabelsTextXOffset: 6,

            radialLabelsTextColor: theme.colors.dGray,

            radialLabelsLinkOffset: 0,

            radialLabelsLinkDiagonalLength: 16,

            radialLabelsLinkHorizontalLength: 30,

            radialLabelsLinkStrokeWidth: 5,

            radialLabelsLinkColor: 'inherit',

            sliceLabel: 'id',

            slicesLabelsSkipAngle: 10,

            slicesLabelsTextColor: theme.colors.dGray,

            animate: true,

            motionStiffness: 90,

            motionDamping: 15,

            theme: {
                tooltip: {
                    container: {
                        fontSize: theme.fonts.size
                    }
                },
                labels: {
                    textColor: theme.colors.dGray,
                    fontSize: theme.fonts.size
                },
                sliceLabel: {
                    textColor: theme.colors.dGray,
                    fontSize: theme.fonts.bigSize
                }
            },
            
            defs: theme.defs,

            fill: [
                {
                    match: {
                        id: 'Autrices'
                    },
                    id: 'authorsF'
                },
                {
                    match: {
                        id: 'Auteurs'
                    },
                    id: 'authorsM'
                }
            ],

            legends: [
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    symbolSize: 18,
                    symbolShape: 'circle'
                }
            ],
            
        }
    }

    prepareData = (props) => {
        const percentageF = Utils.calculatePercentageOf(props.authorsF.length, props.authorsM.length + props.authorsF.length),
              data =  [
                {
                  id: 'Autrices',
                  label: 'Autrices',
                  value: isNaN(percentageF) ? 0 : percentageF,
                  color: theme.colors.dBrown,
                  fontSize: '50px'
                },
                {
                  id: 'Auteurs',
                  label: 'Auteurs',
                  value: isNaN(percentageF) ? 100 : 100 - percentageF,
                  color: theme.colors.brown
                },
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
      return <ResponsivePie
            data = {this.state.data}
            margin = {this.state.margin}
            startAngle = {this.state.startAngle}
            endAngle = {this.state.endAngle}
            padAngle = {this.state.padAngle}
            innerRadius = {this.state.innerRadius}
            cornerRadius = {this.state.cornerRadius}
            sortByValue = {this.state.sortByValue}
            colors = {this.state.colors}
            colorBy= {this.state.colorBy}
            borderWidth = {this.state.borderWidth}
            borderColor = {this.state.borderColor}
            radialLabel= {this.state.radialLabel}
            radialLabelsSkipAngle = {this.state.radialLabelsSkipAngle}
            radialLabelsTextXOffset = {this.state.radialLabelsTextXOffset}
            radialLabelsTextColor = {this.state.radialLabelsTextColor}
            radialLabelsLinkOffset = {this.state.radialLabelsLinkOffset}
            radialLabelsLinkDiagonalLength = {this.state.radialLabelsLinkDiagonalLength}
            radialLabelsLinkHorizontalLength = {this.state.radialLabelsLinkHorizontalLength}
            radialLabelsLinkStrokeWidth = {this.state.radialLabelsLinkStrokeWidth}
            radialLabelsLinkColor = {this.state.radialLabelsLinkColor}
            sliceLabel = {this.state.sliceLabel}
            slicesLabelsSkipAngle = {this.state.slicesLabelsSkipAngle}
            slicesLabelsTextColor = {this.state.slicesLabelsTextColor}
            animate = {this.state.animate}
            motionStiffness = {this.state.motionStiffness}
            motionDamping = {this.state.motionDamping}
            theme = {this.state.theme}
            defs = {this.state.defs}
            fill = {this.state.fill}
            legends = {this.state.legends}
        />;
    }
  }
  
  export default PieChart;