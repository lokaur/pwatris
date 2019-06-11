import React from 'react';

import './ControlsHelp.scss';

const ControlsHelp = () => (
  <div id='help' className='column'>
    <p id='ctrls'>Controls:</p>
    <p>Left:&ensp;&larr; or A</p>
    <p>Right:&ensp;&rarr; or D</p>
    <p>Down:&ensp;&darr; or S</p>
    <p>Rotate:&ensp;&uarr; or W or SPACE</p>
    <p>Start:&ensp;ENTER</p>
  </div>
);

export default ControlsHelp;