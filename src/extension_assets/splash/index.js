import React from 'react';
import '../styles/SplashScreen.css';

//logos
import dbLogo from './dblogo.png';
import ssLogo from './sslogo.jpg';

var Button = window.TableauExtension['components']['Button'];

const ButtonInput = (props) => (
  <Button kind='filledGreen' onClick={props.onClick} style={props.style} value={props.value}></Button>
);

/**
 * Front logo styling
 */
const logoStyle = {
  position: 'absolute', 
  bottom: 0,
  maxWidth: '100px',
  left: 'calc(50% - 60px)',
  marginBottom: '12px'
}

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

const CustomSplash = (props) => (
  <div className="Splash" style={SplashStyle}>
    <h1>React-Annotation within Tableau</h1>
    <p>Leverage the brilliance of Susie Lu's React-Annotation library, directly within (or on top of) Tableau!</p>
    
    
    {/* Config button. It should have the `onClick={props.onClick}` property and a `value` parameter as well */}
    <ButtonInput 
      value="Configure"
      onClick={props.onClick}
      style={buttonStyle}
    />

    <p style={{paddingTop: "25px"}}>Brought to you by: </p>
    <a href="http://www.datablick.com/" target="_blank" rel="noopener noreferrer">
      <img style={{maxWidth: "100px", paddingBottom: "15px", paddingRight: "10px"}} src={dbLogo} alt="datablick logo"/>
    </a>
    <a href="https://starschema.com/" target="_blank" rel="noopener noreferrer">
      <img style={{maxWidth: "100px", paddingLeft: "10px"}} src={ssLogo} alt="star schema logo" />
    </a>

    <p style={{...logoStyle, marginBottom: "50px", left: 'calc(50% - 32.5px)',}}>Powered by:
      <br/>
      <a 
        href="https://react-annotation.susielu.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "RGB(150, 16, 255)" }}
      >
        React Annotation
      </a><br/>
      Made with <img alt="A picture of a heart" src="img/heart.png" /> by
      <a 
        href="http://www.susielu.com"
        target="_blank"
        rel="noopener noreferrer"
      > Susie Lu</a>
    </p>
  </div>
);

export default CustomSplash;