import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import spinner1 from './spinner1.svg';


export default () => (
  <Fragment>
  <img
    src={spinner1}
    style={{ width: '200px', margin: 'auto', display: 'block'}}
    alt='loading...'
  />
</Fragment>
)