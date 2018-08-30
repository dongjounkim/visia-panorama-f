import React, { Component } from 'react';
import _ from 'lodash';
import Book from './book';
import Book2 from './book2';
import TravelLabel from './travel-label';
import IndexListDefaultITem from './index-list-default-item';

class IndexListHorizontalScroll extends Component {
  constructor(props) {
      super(props);
  }

  prepareData = (data, dataType) => {
    //   /**
    //    * Make a horizontal, scrollable, 3 rows flex-grid out of N elements
    //    * Each row contains N/3 (approx.) elements
    //    */
    //   const elementsPerRow = Math.ceil(data.length/3);
    //   return _.chunk(data, elementsPerRow);

    /**
     * Make a horizontal, scrollable, 3 rows flex-grid out of N elements
     * Each column contains 3 elements
     */
    
    const size = dataType === 'authorWorks' ? 2 : 3;
    data = dataType === 'authorWorks' ? _.slice(data, 0, 100) : data;
    return _.chunk(data, size);
  }

  render() {
    const dataType = this.props.dataType,
          data = this.prepareData(this.props.data.all, dataType);

    if (dataType === 'datasets') {
        return data.map((col, i) => 
            <div key={`index-list__d__col--${i+1}`} className='col'> 
                    {col.map((d, j) =>
                        <li key={`index-list__d__col--${i+1}--li--${j+1}`}>
                            <Book key={`index-list__col--${i+1}--b--${j+1}`} 
                                data={d} dataType={dataType} />
                        </li>
                    )}
            </div>
        );
    } else if (dataType === 'authors') {
        return data.map((col, i) => 
            <div key={`index-list__a__col--${i+1}`} className='col'>
                {col.map((a, j) =>
                    <IndexListDefaultITem key={`index-list__col--${i+1}--i--${j+1}`} 
                        content={a.pseudonym} type='authors' id={a.id_author} />
                )}
            </div>
            );
    } else if (dataType === 'authorWorks') {
        return data.map((col, i) => 
            <div key={`content-list__aW__col--${i+1}`} className='col'> 
                    {col.map((d, j) =>
                        <li key={`icontent-list__aW__col--${i+1}--li--${j+1}`}>
                            <Book2 key={`index-list__col--${i+1}--b--${j+1}`} data={d} />
                        </li>
                    )}
            </div>
        );
    } else {
        return data.map((col, i) => 
            <div key={`index-list__aD__col--${i+1}`} className='col'> 
                    {col.map((d, j) => {
                        const readIndex = this.props.data.all.findIndex(e => e.dataset_id === d.dataset_id);
                        return <li key={`index-list__col--${i+1}--li--${j+1}`}>
                            <TravelLabel key={`content-list__aW__col--${i+1}--b--${j+1}`} data={d} type={readIndex} />
                        </li>
                    })}
            </div>
        );
    }

  }
}

export default IndexListHorizontalScroll;
