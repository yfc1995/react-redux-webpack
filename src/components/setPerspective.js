import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
export default function SerPerspective(props) {
  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        顶面与底面的夹角
      </Typography>
      <Slider
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={360}
        onChange={props.changeFov}
      />
      <Typography id="discrete-slider" gutterBottom>
        近裁面长宽比
      </Typography>
      <Slider
        defaultValue={1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        min={0.1}
        max={10}
        onChange={props.changeAspect}
      />
      <Typography id="discrete-slider" gutterBottom>
        近裁面的位置
      </Typography>
      <Slider
        defaultValue={1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={100}
        onChange={props.changeNear}
      />
      <Typography id="discrete-slider" gutterBottom>
        远裁面的位置
      </Typography>
      <Slider
        defaultValue={100}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={200}
        onChange={props.changeFar}
      />
    </div>
  );
}
