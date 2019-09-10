import React from 'react';
import '../styles/SplashScreen.css';

var Button = window.TableauExtension['components']['Button'];

const ButtonInput = (props) => (
  <Button kind='filledGreen' onClick={props.onClick} style={props.style} value={props.value}></Button>
);

/**
 * Config button custom styling
 */
const buttonStyle = {}

/**
 * Wrapper custom styling
 */
const SplashStyle = {
  textAlign: 'center'
}

const annotationDelete = (props) => (
  <div className="Splash" style={SplashStyle}>
    <h1>Are you sure?</h1>
    <p>Please confirm that you want to actually delete this annotation, you will not be able to recover it!</p>
    
    {/* Config button. It should have the `onClick={props.onClick}` property and a `value` parameter as well */}
    <ButtonInput 
      value="Confirm Delete Annotation"
      onClick={props.onClick}
      style={buttonStyle}
    />
  </div>
);

export default annotationDelete;