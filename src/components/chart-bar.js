import React, { Component } from 'react';
import _ from 'lodash';
import { ResponsiveBar } from '@nivo/bar';
import Utils from '../utils/utils';
import ChartSwitchMode from './chart-switch-mode';
import theme from './theme';


class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intervalModes: [],

            layout: this.props.layout,

            data: this.prepareData(this.props),

            keys: [
                'Auteurs',
                'Autrices',
            ],
            
            indexBy: 'years',

            margin: {
                top: 50,
                right: 100,
                bottom: 50,
                left: 100
            },

            padding: 0.3,

            colors: 'nivo',

            colorBy: 'id',

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

            borderColor: theme.colors.white,

            axisBottom: {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: this.props.layout === 'vertical' ? 'Année(s)' : '%',
                legendPosition: 'center',
                legendOffset: 50
            },

            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: this.props.layout === 'vertical' ? '%' : 'Année(s)',
                legendPosition: 'center',
                legendOffset: -80
            },

            labelSkipWidth: 12,

            labelSkipHeight: 12,

            labelTextColor: theme.colors.dGray,

            animate: true,

            motionStiffness: 90,

            motionDamping: 15,

            legends: [
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 140,
                    itemWidth: 120,
                    itemHeight: 20,
                    itemsSpacing: 2,
                    symbolSize: 16,
                    symbolShape: 'circle'
                }
            ],

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
        }
    }

    prepareData = (props, intervalMode = null) => {
        let data = [],
            years = Utils.pluckThenUniq(props.data, 'year'), //All years included in the dataset (unique)
            authorsF = Utils.pluckThenUniq(props.authorsF, 'id_author'), //Female Authors id (unique)
            authorsM = Utils.pluckThenUniq(props.authorsM, 'id_author'); //Male Authors id (unique)
        
        //Decide appropriate years interval
        years = this.makeYearsInteval(years, intervalMode);

        /**
         * For each year/interval (which corresponds to one bar), prepare data values
         * (1) Select all data corncerns by the current year, then pluck its author_id_FK 
         *     to make the array of all the authors concerned by the current year
         * (2) Select all the female/male authors concerned by the current year
        **/
        years.forEach(groupY => {
            let _authors = Utils.pluckThenUniq(
                            Utils.filterMultipleByProperty(props.data, 'year', groupY.years), 
                            'author_id_FK'
                           ), // (1),
                _authorsF = _authors.filter(a => authorsF.includes(a)), // (2)
                _authorsM = _authors.filter(a => authorsM.includes(a)), // (3)
                percentageF = Utils.calculatePercentageOf(_authorsF.length, _authorsM.length + _authorsF.length),
                d = {
                    'years': groupY.interval,
                    'Autrices': props.layout === 'vertical' ? _authorsF.length : percentageF,
                    'AutricesColor': theme.colors.dBrown,
                    'Auteurs': props.layout === 'vertical' ? _authorsM.length : 100 - percentageF,
                    'AuteursColor': theme.colors.brown,
                };

            data.push(d);
        });

        return data;
    }

    makeYearsInteval = (years, intervalMode = null) => {
        let interval = [],
            intervalSize;

        /**
         * Sort years in ascending order (>> to <<) 
         * (so that if group years by an interval of X, proceed from the most recent year)
         * (for instance, from 1980 to 2018, group by an interval of 10, start from 2018 
         *  we'll have [2018-2009], [2008-1998], [1997-1988], [1987-1980])
         */
        years = years.sort().reverse(); 
        intervalSize = intervalMode ? intervalMode : years.length <= 10 ? 1 : years.length <= 20 ? 5 : 10;

        if (intervalSize === 1) {
            years.forEach(y => interval.push({interval: y, years: y}));
        } else {
            _.chunk(years, intervalSize) //Group years by an interval of intervalSize
                .forEach(group => interval.push({
                    interval: `${group[group.length-1]}-${group[0]}`, 
                    years: group
                }));
        }

        return interval; 
        //Because bars from the chart is in LIFO order, 
        //the highest years needs to be come at last so it can be on top
    }

    deduceIntervalMode = (data) => {
        let intervalModes = [],
            mainInterval,
            dataSample;
        
        /**
         * If data.length = 0, no data, no interval modes (return empty intervalMode)
         * If Data sample (data.reverse()[0]) exists: 
         *     if it contains '-' (as in (XXXX-YYYY)) then it's an interval > 1
         *     else its interval is 1 (each year)
         *     data.reverse()[0] because LIFO
        **/

        if (data.length > 0) {
            dataSample = data[0];
            mainInterval = Math.abs(eval(dataSample.years)) + 1;
            intervalModes = mainInterval === 10 ? [1, 5, 10] : mainInterval === 5 ? [1, 5] : [1];
        }

        return intervalModes;
    }

    updateState = (intervalMode = null) => {
        this.setState(((prevState, newProps) => {
            const data = this.prepareData(newProps, intervalMode),
                  /** 
                   *  updateState is called when the chart is initialized with fresh data
                   *  (componentWillReceiveProps), when the chart mode is switched
                   *  (handleSwitchMode), or when the chart type is switched (the old chart)
                   *  will be unmounted and the new chart is mounted (componentWillMount)
                   * 
                   *  this.state.intervalModes INITS when the chart is
                   *  initialized with fresh data (which means when the intervalMode === null,
                   *  or updateState accepts no params, or updateState is called in 
                   *  componentWillReceiveProps)
                   * 
                   *  it DO NOT CHANGE afterwards (which means when updateState is called
                   *  in handleSwitchMode), so it's pratically means that it keeps its state
                   *  (from the prevState)
                   * 
                   *  in the 3rd case, it's a little bit complicated, since componentWillMount will
                   *  also get called when the char is intialized, so yeah it's complicated.
                  **/
                 intervalModes = intervalMode ? prevState.intervalModes : this.deduceIntervalMode(data);

            return {
                intervalModes: intervalModes,
                layout: newProps.layout,
                data: data,
                axisBottom: _.set(prevState.axisBottom, 'legend', this.props.layout === 'vertical' ? 'Année(s)' : '%'),
                axisLeft: _.set(prevState.axisLeft, 'legend', this.props.layout === 'vertical' ? '%' : 'Année(s)')
            };
        }));
    }

    handleSwitchMode = (mode) => {
        this.updateState(mode);
    }

    componentWillReceiveProps() {
        this.updateState();
    }

    componentWillMount() {
        this.updateState(0);
    }

    render() {
        console.log(this.state.intervalModes);
      return [
          <ResponsiveBar
            key = 'barChart'
            layout = {this.state.layout}
            data = {this.state.data}
            keys = {this.state.keys}
            indexBy = {this.state.indexBy}
            margin = {this.state.margin}
            padding = {this.state.padding}
            colors = {this.state.colors}
            colorBy = {this.state.colorBy}
            defs = {this.state.defs}
            fill = {this.state.fill}
            borderColor = {this.state.borderColor}
            axisBottom = {this.state.axisBottom}
            axisLeft = {this.state.axisLeft}
            labelSkipWidth = {this.state.labelSkipWidth}
            labelSkipHeight = {this.state.labelSkipHeight}
            labelTextColor = {this.state.labelTextColor}
            animate = {this.state.animate}
            motionStiffness = {this.state.motionStiffness}
            motionDamping = {this.state.motionDamping}
            legends = {this.state.legends}
            theme = {this.state.theme}
        />,
        <ChartSwitchMode 
            key = 'barChartSwitchMode'
            type = 'bar' 
            mode = {this.state.intervalModes} 
            handleSwitchMode = {this.handleSwitchMode} 
        />];
    }
  }
  
  export default BarChart;