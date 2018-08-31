import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const img404 = './img/Bat-Signal-404.png'

const PageNotfound = () => (
  <div className="container">
    <br />
    <img src={img404} className='responsive-img' />
  </div>
);

export default PageNotfound;
