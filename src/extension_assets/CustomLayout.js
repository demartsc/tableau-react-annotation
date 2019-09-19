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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "radius": 50
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
      "labelColor": "#4a4a4a",
      "lineType": "horizontal",
      "padding":5,
      "wrap":240,  
    },
    "subject": {
      "height": 100,
      "width": 80
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
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
      "title": "Hi! I am a 'Line Only' Annotation",
      "titleColor": "#d0021b",
      "label": "Use me for when you only want a line connecting your point and note with a line on it",
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
    setAnnotationType(value)
    props.onOptionSelected('annotationType', value);
    console.log('annotationType', annotationType, value);
  }

  useEffect(() => {
    console.log('checking effect', props);
    if (annotationType === "") {
      props.enableNext(false)
    } else {
      props.enableNext(true)
    }
  }, [annotationType]);

  const Annotation = Annotations[annotationType];
  console.log('checking annotation in custom', annotationType, Annotations, Annotation);
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
                        {"value": "AnnotationLabel", "text": "annotationLabel"},
                        {"value": "AnnotationCallout", "text": "annotationCallout"},
                        {"value": "AnnotationCalloutElbow", "text": "annotationCalloutElbow"},
                        {"value": "AnnotationCalloutCurve", "text": "annotationCalloutCurve"},
                        {"value": "AnnotationCalloutCircle", "text": "annotationCalloutCircle"},
                        {"value": "AnnotationCalloutRect", "text": "annotationCalloutRect"},
                        {"value": "AnnotationXYThreshold", "text": "annotationXYThreshold"},
                        {"value": "AnnotationBracket", "text": "annotationBracket"},
                        {"value": "AnnotationBadge", "text": "annotationBadge"}
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