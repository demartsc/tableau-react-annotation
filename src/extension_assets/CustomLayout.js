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

var RadioCheckList = window.TableauExtension['components']['RadioCheckList'];
var ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];

function CustomLayout(props){
  // Let's use the ExtensionContext to access Tableau settings
  let extensionContext = useContext(ExtensionContext);

  // State and setter of the dropdown input
  let [annotationType, setAnnotationType] = useState(extensionContext.tableauExt.settings.get('annotationType')  || "");
  

  const layoutStyle = {
    paddingLeft: '32px',
    paddingRight: '32px'
  }

  // Callback setter of dropdown input
  function optionSelected(value) {
    setAnnotationType(value)
    props.onOptionSelected('annotationType', value)
    console.log('annotationType', annotationType, value);
  }

  useEffect(() => {
    if (annotationType === "") {
      props.enableNext(false)
    } else {
      props.enableNext(true)
    }
  });
  
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
                    {console.log('checking annotation type', annotationType)}
                    <annotationType
                      x={100}
                      y={150}
                      dy={100}
                      dx={50}
                      color={"#9610ff"}
                      editMode={false}
                      note={{"title":"Annotations :)",
                        "label":"Longer text to show text wrapping",
                        "lineType":"horizontal"}}
                      subject={{"radius":50,"radiusPadding":5}}
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