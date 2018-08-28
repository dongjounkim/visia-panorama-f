import React, { Component } from 'react';
import _ from 'lodash';
import Book from './book';
import Book2 from './book2';

class IndexListHorizontalScroll extends Component {
  constructor(props) {
      super(props);
  }

  prepareData = (data) => {
    //   /**
    //    * Make a horizontal, scrollable, 3 rows flex-grid out of N elements
    //    * Each row contains N/3 (approx.) elements
    //    */
    //   const elementsPerRow = Math.ceil(data.length/3);
    //   return _.chunk(data, elementsPerRow);

    //   /**
    //    * Make a horizontal, scrollable, 3 rows flex-grid out of N elements
    //    * Each column contains 3 elements
    //    */
      return _.chunk(data, 3);
  }

  render() {
    const data = this.prepareData(this.props.data.all),
          dataType = this.props.dataType;
    console.log(data);
    if (dataType === 'datasets') {
        return data.map((col, i) => 
            <div key={`index-list__col--${i+1}`} className='col'> 
                    {col.map((d, j) =>
                        <li key={`index-list__col--${i+1}--li--${j+1}`}>
                            <Book key={`index-list__col--${i+1}--b--${j+1}`} 
                                data={d} dataType={dataType} />
                        </li>
                    )}
            </div>
        );
    } else if (dataType === 'authors') {
        return data.map((col, i) => 
            <div key={`index-list__col--${i+1}`} className='col'>
                {col.map(a =>
                    <li key={a.id_authors}> 
                        <a href={`/explore/${this.props.dataType}/${a.id_author}`}> {a.pseudonym} </a> 
                    </li>
                )}
            </div>
            );
    } else {
        return data.map((col, i) => 
            <div key={`index-list__col--${i+1}`} className='col'> 
                    {col.map((d, j) =>
                        <li key={`index-list__col--${i+1}--li--${j+1}`}>
                            <Book2 key={`index-list__col--${i+1}--b--${j+1}`} data={d} />
                        </li>
                    )}
            </div>
        );
    }

  }
}

export default IndexListHorizontalScroll;
