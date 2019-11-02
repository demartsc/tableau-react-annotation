// Copyright (c) 2019 Chris DeMartini
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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
  display: 'inline-block',
  background: 'rgba(255,255,255,.25)'
  // position: 'absolute', 
  // bottom: 0,
  // maxWidth: '300px',
  // left: 'calc(50% - 60px)',
  // marginBottom: '12px'
}

/**
 * Config button custom styling
 */
const buttonStyle = {}

/**
 * Wrapper custom styling
 */
const SplashStyle = {
  textAlign: 'center', 
  overflow: 'hidden',
  background: 'rgb(255,255,255,1)'
}

const CustomSplash = (props) => (
  <div className="Splash" style={SplashStyle}>
    <h1>Annotate All The (Tableau) Things!</h1>
    <h4>React-Annotation within Tableau</h4>
    <p>Leverage the brilliance of Susie Lu's React-Annotation library, directly within (or on top of) Tableau!</p>
    
    
    {/* Config button. It should have the `onClick={props.onClick}` property and a `value` parameter as well */}
    <ButtonInput 
      value="Let's Annotate Things!"
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

    <div style={{ width: '100%', textAlign: 'center'}}>
      <p style={{...logoStyle}}>Powered by:
        <br/>
        <a 
          href="https://react-annotation.susielu.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "RGB(150, 16, 255)" }}
        >
          React Annotation
        </a>{" "}
        Made with <img alt="A heart" src="img/heart.png" /> by
        <a 
          href="http://www.susielu.com"
          target="_blank"
          rel="noopener noreferrer"
        > Susie Lu</a>
      </p>
    </div>
  </div>
);

export default CustomSplash;