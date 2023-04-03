'use strict';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedalList from './MedalList';

const MediaList = () => {
  const [rowData, setRowData] = useState([]);
  const [errors,setErrors]= useState(false);
  const getMedal = async () => {
      await axios
          .get("https://mocki.io/v1/3d66c1d5-0b9d-4dcc-ab98-d889eb5bb615")
          .then(response => {
           
            setRowData(response.data)
          })
          .catch(function(error) {
            setErrors(true)
          });
      }
      useEffect(() => {
          getMedal()
      },[]);
  return (
      <>
        <MedalList data={rowData} errorsInfo={errors}/>
      </>
  );
};

export default MediaList;
