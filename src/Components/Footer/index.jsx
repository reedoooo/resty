// import React from 'react';

import './Footer.scss'

function Footer (props) {
  return <footer data-testid="footer">&copy; 2023 | Author: {props.author}</footer>;
}

export default Footer;