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
  textAlign: 'center',
  overflow: 'hidden'
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