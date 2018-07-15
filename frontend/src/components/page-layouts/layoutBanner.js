import React from 'react';
import imageUrl from '../../images/banner.jpg';

const style = {
  backgroundImage: 'url('+ imageUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

const LayoutBanner = () => (
  <div>
    <div className="re-page-banner" style={style}>
      <div className="overlay"></div>
      <h1>Layout with banner</h1>
    </div>
  </div>
);

export default LayoutBanner;
