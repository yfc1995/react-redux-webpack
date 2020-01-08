import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
function SetLookAtBig(props) {
  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        视点x
      </Typography>
      <Slider
        defaultValue={0.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.exChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        视点y
      </Typography>
      <Slider
        defaultValue={0.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.eyChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        视点z
      </Typography>
      <Slider
        defaultValue={5}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        min={-11}
        max={5}
        onChange={props.ezChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        目标点x
      </Typography>
      <Slider
        defaultValue={0.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.pxChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        目标点y
      </Typography>
      <Slider
        defaultValue={0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.pyChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        目标点z
      </Typography>
      <Slider
        defaultValue={-1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        min={-11}
        max={5}
        onChange={props.pzChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        正方向x
      </Typography>
      <Slider
        defaultValue={0.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.dxChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        正方向y
      </Typography>
      <Slider
        defaultValue={1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={-1}
        max={1}
        onChange={props.dyChange}
      />
      <Typography id="discrete-slider" gutterBottom>
        正方向z
      </Typography>
      <Slider
        defaultValue={0.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        min={-11}
        max={5}
        onChange={props.dzChange}
      />
    </div>
  );
}

export default SetLookAtBig;
