import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Extension from './Extension';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';

// Custom styling
import './extension_assets/extension.css';
import brandLogo from './extension_assets/a-custom.png';

import stepperConfig from './extension_assets/stepperConfig';
import annotationConfig from './extension_assets/annotationConfig';
import { colors, extensionIcons } from './extension_assets/style'


ReactDOM.render(
  <HashRouter>
    <Extension 
      logo={brandLogo}
      stepperConfig={stepperConfig}
      annotationConfig={annotationConfig}
      colors={colors}
      extensionIcons={extensionIcons}
    />
  </HashRouter>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
