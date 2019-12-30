import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function SetLookAt(props) {
  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        left
      </Typography>
      <Slider
        defaultValue={-1.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.leftChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        right
      </Typography>
      <Slider
        defaultValue={1.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.rightChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        top
      </Typography>
      <Slider
        defaultValue={-1.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.topChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        bottom
      </Typography>
      <Slider
        defaultValue={1.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.bottomChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        near
      </Typography>
      <Slider
        defaultValue={0.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.nearChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        far
      </Typography>
      <Slider
        defaultValue={1.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={5}
        onChange={props.farChange}
      />
    </div>
  );
}

export default SetLookAt;
