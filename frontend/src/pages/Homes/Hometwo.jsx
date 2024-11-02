import React from 'react';
import Homein from './Homein';
import '../../styles/Hometwo.css'; // New CSS file for styling Hometwo component

function Hometwo({ datas }) {
  return (
    <div className="res-grid-container">
      {datas.map((item) => (
        <Homein item={item} key={item._id} />
      ))}
    </div>
  );
}

export default Hometwo;
