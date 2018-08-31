import React, { Component } from 'react';
import _ from 'lodash';
import { ResponsiveBubble } from '@nivo/circle-packing';
import Utils from '../utils/utils';
import theme from './theme';


class BubbleChart extends Component {
    constructor(props) {
        super(props);

        this.src = '';

        this.state = {
            data: this.prepareData(this.props),

            margin: {
                top: 30,
                right: 30,
                bottom: 30,
                left: 30
            },

            identity: 'name',

            value: 'value',

            colors: theme.colorsRange,

            colorBy: 'depth',

            padding: 32,

            enableLabel: false,

            borderWidth: 0.5,

            borderColor: theme.colors.dBrown,

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
                },
                {
                  match: {
                    id: 'NA'
                  },
                  id: 'authorsNA'
                },
                {
                  match: {
                    depth: 0,
                  },
                  id: 'bubbleChartDepth0'
                },
                {
                  match: {
                    depth: 2,
                  },
                  id: 'bubbleChartDepth2'
                }
            ],

            animate: true,

            motionStiffness: 90,

            motionDamping: 12,

            isZoomable: false,

            tooltip: ({ id, value, index, indexValue, color, data }) => {
              this.src = data.src ? data.src : '';
              return <div>
                      <p><strong style={{color: data.color}}>
                        {id}{data.author ? '.' : ` : ${value}`}
                      </strong></p>
                      {data.author && <p>{data.author}</p>}
                      {data.src && <p>Cliquez pour accédez à la source !</p>}
                    </div>;
            },

            onClick: () => {
              if (this.src) {
                window.open(this.src, '_blank').focus();
              }
            }
          
        }
    }

    prepareData = (props) => {
      let data = {};

      if (props.name) {
        const authorsF = Utils.pluckThenUniq(props.authorsF, 'id_author'),  //Female Authors id (unique)
              authorsM = Utils.pluckThenUniq(props.authorsM, 'id_author'), //Male Authors id (uniqe)
              authorsNA = _.difference(Utils.pluckThenUniq(props.data, 'author_id_FK'), _.union(authorsF, authorsM)), //NA Authors id (unique) (is equal to the difference of (1) array of all ID, (2) union array of authorsF and authorsM)
              c_authorsF = this.prepareChartChildrenOf(authorsF, props.data, 'hsl(41%, 70%, 50%)'),
              c_authorsM = this.prepareChartChildrenOf(authorsM, props.data, 'hsl(141%, 70%, 50%)'),
              c_authorsNA = this.prepareChartChildrenOf(authorsNA, props.data, 'hsl(241%, 70%, 50%)');

        data = {
          name: props.name,
          color: theme.colors.skin,
          children: [
            {
              name: 'Autrices',
              color: theme.colors.dBrown,
              children: c_authorsF
            },
            {
              name: 'Auteurs',
              color: theme.colors.brown,
              children: c_authorsM
            },
            {
              name: 'NA',
              color: theme.colors.brown,
              children: c_authorsNA
            },
          ]
        };

      } else {
        data = {name: '', color: theme.colors.gray, value: 1};
      }

      return data;
    }

    prepareChartChildrenOf(array, rawData, childrenColor, childrenValue =1) {
      /** 
        (1) Filter, from the array of all data, data which concerns Female authors
        (2) Iterate though the filtered array to make children (the array of data FOR THE CHART)
        (3) Check if children contains data with the same name (since some data may has the same name, but different author/source)
              [name: 'name1', occurences: [i1, i2, i3,...],
               name: 'name2', occurences: [i1, i2, i3,...]
               ...]
        (4) Modify data with same name if needed (so the chart works)
      */

     let children = [];

     console.log(rawData);

     rawData.filter(d => array.includes(d.author_id_FK)) // (1)
            .forEach(d => { // (2)
                children.push({
                  name: d.details,
                  color: childrenColor,
                  value: childrenValue,
                  author: d.author ? d.author.pseudonym : '',
                  src: d.src
                });                    
            });

      // (3)
      Utils.pluckThenUniq(children, 'name')
            .map(d => { return {name: d, occurences: Utils.findEveryIndexes(children.map(c => c.name), d) } })
            //(4)
            .forEach(d => {
             if (d.occurences.length > 1) d.occurences.forEach((o, i) => children[o].name = d.name + ` (${i+1})`);  
            });

      return children;
    }

    componentWillReceiveProps(newProps) {
        this.setState(((prevState, newProps) => {
          const data = this.prepareData(newProps);
          return {data: data};
        }));
      }

    render() {
      return <ResponsiveBubble
          root = {this.state.data}
          margin = {this.state.margin}
          identity = {this.state.identity}
          value = {this.state.value}
          colors = {this.state.colors}
          colorBy = {this.state.colorBy}
          padding = {this.state.padding}
          enableLabel = {this.state.enableLabel}
          borderWidth = {this.state.borderWidth}
          borderColor = {this.state.borderColor}
          defs =  {this.state.defs}
          fill = {this.state.fill}
          animate = {this.state.animate}
          motionStiffness = {this.state.motionStiffness}
          motionDamping = {this.state.motionDamping}
          isZoomable = {this.state.isZoomable}
          onClick = {this.state.onClick}
          tooltip = {this.state.tooltip}
      />;
    }
  }
  
  export default BubbleChart;