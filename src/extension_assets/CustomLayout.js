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

import React, { useState, useContext, useEffect } from 'react';
import { 
  AnnotationLabel,
  AnnotationCallout,
  AnnotationCalloutElbow,
  AnnotationCalloutCurve,
  AnnotationCalloutCircle,
  AnnotationCalloutRect,
  AnnotationXYThreshold,
  AnnotationBracket,
  AnnotationBadge
} from 'react-annotation';

const RadioCheckList = window.TableauExtension['components']['RadioCheckList'];
const ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];
const Annotations = {
  AnnotationLabel: AnnotationLabel,
  AnnotationCallout: AnnotationCallout,
  AnnotationCalloutElbow: AnnotationCalloutElbow,
  AnnotationCalloutCurve: AnnotationCalloutCurve,
  AnnotationCalloutCircle: AnnotationCalloutCircle,
  AnnotationCalloutRect: AnnotationCalloutRect,
  AnnotationXYThreshold: AnnotationXYThreshold,
  AnnotationBracket: AnnotationBracket,
  AnnotationBadge: AnnotationBadge
};
const AnnotationProps = {
  AnnotationLabel: {
    "annotationType":"AnnotationLabel",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":50,"y":80,"dx":100,"dy":100,
    "connector": {
      "type":"line",
    },
    "note": { 
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note",
      "labelColor": "#4a4a4a",
      "padding":5,
      "wrap":240,
      "align": 'left'
    },
    "subject": {},
    "dashArray":"0"
  }, 
  AnnotationCallout: {
    "annotationType":"AnnotationCallout",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":50,"y":80,"dx":120,"dy":100,
    "connector": {
      "type":"line",
    },
    "note": { 
      "title": "Hi! I am a 'Line Text with Line' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you want a line connecting your point and note with a line border on it",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {},
    "dashArray":"0"
  },
  AnnotationCalloutElbow: {
    "annotationType":"AnnotationCalloutElbow",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":50,"y":80,"dx":120,"dy":50,
    "connector": {
      "type":"elbow",
    },
    "note": { 
      "title": "Hi! I am a 'Line, Text and Fixed Angle' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you want a line connecting your point with a fixed angle and note with a line",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {},
    "dashArray":"0"
  },
  AnnotationCalloutCurve: {
    "annotationType":"AnnotationCalloutCurve",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":50,"y":80,"dx":120,"dy":100,
    "connector": {
      "type":"curve",
      "points": 4
    },
    "note": { 
      "title": "Hi! I am a 'Curved Line and Text' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you want a curved line connecting your point and note with a line on it",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {},
    "dashArray":"0"
  },
  AnnotationCalloutCircle: {
    "annotationType":"AnnotationCalloutCircle",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":80,"y":100,"dx":120,"dy":100,
    "connector": {
      "type":"elbow"
    },
    "note": { 
      "title": "Hi! I am a Circle Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you want a circle to focus users on the area you are annotating",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "radius": 50,
      "fill": "#4a90e2",
      "fillOpacity": .15
    },
    "dashArray":"0"
  },
  AnnotationCalloutRect: {
    "annotationType":"AnnotationCalloutRect",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":80,"y":50,"dx":120,"dy":150,
    "connector": {
      "type":"line"
    },
    "note": { 
      "title": "Hi! I am a Rectangle Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you want a rectangle to focus users on the area you are annotating",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "height": 100,
      "width": 80, 
      "fill": "#4a90e2",
      "fillOpacity": .25
    },
    "dashArray":"0"
  },
  AnnotationXYThreshold: {
    "annotationType":"AnnotationXYThreshold",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":80,"y":100,"dx":120,"dy":80,
    "connector": {
      "type":"elbow"
    },
    "note": { 
      "title": "Hi! I am a Treshold Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a threshold line across the container with a note.",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "x1": 0,
      "x2": 1000
    },
    "dashArray":"0"
  },
  AnnotationBracket: {
    "annotationType":"AnnotationBracket",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":90,"y":100,"dx":40,"dy":0,
    "connector": {
      "type":"elbow"
    },
    "note": { 
      "title": "Hi! I am a Bracket Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want to call out an area of your content with a bracket and a note.",
      "labelColor": "#4a4a4a",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "depth": 35,
      "height": 125
    },
    "dashArray":"0"
  },
  AnnotationBadge: {
    "annotationType":"AnnotationBadge",
    "color":"#4a90e2",
    "key":"demo-annotation",
    "id":"demo-annotation",
    "x":90,"y":100,"dx":20,"dy":0,
    "connector": {
      "type":"elbow"
    },
    "note": { 
      "title": "Hi! I am a Badge Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you want a bright callout to a specific point on your content.",
      "labelColor": "#4a4a4a",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "radius": 15,
      "height": 125, 
      "text": "Hi!"
    },
    "dashArray":"0"
  }
}


const CustomLayout = props => {
  // Let's use the ExtensionContext to access Tableau settings
  let extensionContext = useContext(ExtensionContext);

  // State and setter of the dropdown input
  let [annotationType, setAnnotationType] = useState(extensionContext.tableauExt.settings.get('annotationType')  || "AnnotationLabel");
  

  const layoutStyle = {
    paddingLeft: '32px',
    paddingRight: '32px'
  }

  // Callback setter of dropdown input
  const optionSelected = value => {
    // first based on the type selected we default some of the options to keep the annotations clean
    // first we go through and replace the subject related stuff based on the type of annotation
    // subject props
    extensionContext.tableauExt.settings.set('annotationSubjectRadius', ( ['AnnotationBadge', 'AnnotationCalloutCircle'].indexOf(value) >= 0 ? "25" : "0" ));
    extensionContext.tableauExt.settings.set('annotationSubjectRadiusPadding', "0");
    extensionContext.tableauExt.settings.set('annotationSubjectInnerRadius', "0");
    extensionContext.tableauExt.settings.set('annotationSubjectOuterRadius', "0");

    extensionContext.tableauExt.settings.set('annotationSubjectWidth', ( ['AnnotationCalloutRect'].indexOf(value) >= 0 ? "80" : "0" ));
    extensionContext.tableauExt.settings.set('annotationSubjectHeight', ( ['AnnotationCalloutRect', 'AnnotationBracket'].indexOf(value) >= 0 ? "100" : "0" ));
    extensionContext.tableauExt.settings.set('annotationSubjectDepth', ( ['AnnotationBracket'].indexOf(value) >= 0 ? "25" : "0" ));

    extensionContext.tableauExt.settings.set('annotationSubjectBracketType', "square" );
    extensionContext.tableauExt.settings.set('annotationSubjectBadgeText', "");

    if ( extensionContext.tableauExt.settings.get('configNewAnnotation') === "true" ) {
      // console.log('checking configNewAnnotation', extensionContext.tableauExt.settings.get('configNewAnnotation'), extensionContext.tableauExt.settings.get('configNewAnnotation') === "true");
      // new annotation, revert descriptions
      extensionContext.tableauExt.settings.set('annotationNoteTitle', "A New Annotation!");
      extensionContext.tableauExt.settings.set('annotationNoteLabel', "You should update this with the content you want. Click my pencil to edit me!");
    }

    extensionContext.tableauExt.settings.saveAsync().then(() => {
      setAnnotationType(value)
      props.onOptionSelected('annotationType', value);
      // console.log('annotationType', annotationType, value, extensionContext.tableauExt.settings.getAll());
    });
  }

  useEffect(() => {
    // console.log('checking effect', props);
    if (annotationType === "") {
      props.enableNext(false)
    } else {
      props.enableNext(true)
    }
  }, [annotationType]);

  const Annotation = Annotations[annotationType];
  // console.log('checking annotation in custom', annotationType, Annotations, Annotation);
  return (
    <div style={layoutStyle}>
      <h1>Select an Annotation Type</h1>
      <ExtensionContext.Consumer>
        {
          ({tableauExt}) => {
            return (
              <React.Fragment>
                <div style={{height: "300px", width: "30%", display: "inline-block"}}>
                  <RadioCheckList 
                    label="Select an annotation type"
                    tooltip="Select one of the annotations available in react-annotation"
                    radioList={
                      [
                        {"value": "AnnotationLabel", "text": "Line and Text"},
                        {"value": "AnnotationCallout", "text": "Line and Text with Line"},
                        {"value": "AnnotationCalloutElbow", "text": "Line and Text with Fixed Angle Line"},
                        {"value": "AnnotationCalloutCurve", "text": "Line and Text with 'Curved' Line"},
                        {"value": "AnnotationCalloutCircle", "text": "Circle, Line and Text"},
                        {"value": "AnnotationCalloutRect", "text": "Rectangle, Line and Text"},
                        {"value": "AnnotationXYThreshold", "text": "Threshold, Line and Text"},
                        {"value": "AnnotationBracket", "text": "Bracket annotation"},
                        {"value": "AnnotationBadge", "text": "Badge annotation"}
                      ]
                    }
                    value={annotationType}
                    onChange={(e) => {optionSelected(e.target.value)}}
                  />
                </div>
                <div style={{height: "300px", width: "70%", display: "inline-block"}}>
                  <svg height="100%" width="100%">
                    <Annotation
                      { ...AnnotationProps[annotationType]}
                    />
                  </svg>
                </div>
              </React.Fragment>
              );
          }
        }
      </ExtensionContext.Consumer>
    </div>
  );
}

export default CustomLayout;