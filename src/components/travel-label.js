import React from 'react';
import '../assets/styles/components/travel-label.css'; 
import travelLabel1 from '../assets/images/travel-label-1.png';
import travelLabel2 from '../assets/images/travel-label-2.png';
import travelLabel3 from '../assets/images/travel-label-3.png';
import travelLabel4 from '../assets/images/travel-label-4.png';
import travelLabel5 from '../assets/images/travel-label-5.png';

const TravelLabel = (props) => {
    const {data, type} = props,
          travelLabels = [travelLabel1, travelLabel2, travelLabel3, travelLabel4, travelLabel5],
          travelLabelType = type%5;
    return  <div className={`travel-label travel-label--${travelLabelType}`}>
                <img alt='' src={travelLabels[travelLabelType]} />
                <a href={`/explore/datasets/${data.dataset_id}`}> {data.name} </a> 
            </div>;

}

export default TravelLabel;