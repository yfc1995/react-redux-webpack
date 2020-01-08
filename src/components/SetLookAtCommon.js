import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
function SetLookAtCommon(props) {
  function exChange(e, value, ins) {
    props.data[ins] = value;
    props.setLookAtFunction(props.data);
  }
  const ele = props.data.map((item, ins) => {
    return (
      <div key={ins}>
        <Typography data-key={ins} id="discrete-slider" gutterBottom>
          视点{ins}
        </Typography>
        <Slider
          defaultValue={item}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={0.01}
          min={-item - 1}
          max={item + 1}
          data-key={ins}
          onChange={(e, value) => exChange(e, value, ins)}
        />
      </div>
    );
  });
  return <div>{ele}</div>;
}

export default SetLookAtCommon;
