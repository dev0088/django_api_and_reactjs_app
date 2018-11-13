import React from 'react';
import Slider from 'material-ui/Slider';

/**
 * The `defaultValue` property sets the initial position of the slider.
 * The slider appearance changes when not at the starting position.
 */
const SliderSimple = () => (
  <div>
    <Slider />
    <Slider defaultValue={0.5} step={0.10} />
    <Slider defaultValue={0.5} disabled={true} />
  </div>
);

export default SliderSimple;
