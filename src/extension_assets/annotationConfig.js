import React, { useContext } from 'react';
import CustomLayout from './CustomLayout';

// console.log('tableauExt', window.TableauExtension);
// const annotationType = 'AnnotationCallout';

// console.log('checking annotationType', tableauExt, annotationType);

function testing() {
  const ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];
  const contextValue = useContext(ExtensionContext);
  const annotationType = contextValue.tableauExt.settings.get('annotationType');

  return <React.Fragment config={{
    "config": {
      "steps": [
        {
          "name": "Annotation Types",
          "title": "Annotation Types",
          "type": "custom",
          "component": CustomLayout,
          "props": {
            "key": "value",
            "name": "Abo"
          }
        },
        {
          "name": "Annotation Options",
          "title": "Annotation Options",
          "type": "viz_options",
          "groups": [
            {
              "name": "Color and Dash",
              "inputs": [
                {
                  "type": "color",
                  "label": "Select color",
                  "value": "#C123FA",
                  "name": "annotationColor",
                  "tooltip": "A color string that will be applied to the annotation."
                },
                {
                  "type": "dropdown",
                  "label": "Storke Dasharray",
                  "value": "0",
                  "name": "annotationStrokeDasharray",
                  "tooltip": "The stroke-dasharray attribute is a presentation attribute defining the pattern of dashes and gaps used to paint the outline of the shape.",
                  "values": [
                    {"value": "0", "text": "0"},
                    {"value": "1", "text": "1"},
                    {"value": "2", "text": "2"},
                    {"value": "3", "text": "3"},
                    {"value": "4", "text": "4"},
                    {"value": "5", "text": "5"},
                    {"value": "6", "text": "6"},
                    {"value": "7", "text": "7"},
                    {"value": "8", "text": "8"},
                    {"value": "9", "text": "9"},
                    {"value": "10", "text": "10"}
                  ]
                }
              ]
            },
            {
              "name": "Connector",
              "inputs": [
                {
                  "type": "dropdown",
                  "label": "Type",
                  "name": "connectorType",
                  "value": "line",
                  "tooltip": "what kind of connector",
                  "values": [
                    {"value": "line", "text": "Line"},
                    {"value": "elbow", "text": "Elbow"},
                    {"value": "curve", "text": "Curve"}
                  ]
                },
                {
                  "type": "dropdown",
                  "label": "Curve",
                  "name": "connectorCurveString",
                  "value": "curveCatmullRom",
                  "tooltip": "what kind of curve on the connector",
                  "values": [
                    {"value": "curveCatmullRom", "text": "curveCatmullRom"},
                    {"value": "curveLinear", "text": "curveLinear"},
                    {"value": "curveStep", "text": "curveStep"},
                    {"value": "curveNatural", "text": "curveNatural"}, 
                    {"value": "curveBasis", "text": "curveBasis"}
                  ]
                },
                {
                  "type": "dropdown",
                  "label": "Curve Points",
                  "name": "connectorCurvePoints",
                  "value": "0",
                  "tooltip": "how many breaks in the curve?",
                  "values": [
                    {"value": "0", "text": "0"},
                    {"value": "1", "text": "1"},
                    {"value": "2", "text": "2"},
                    {"value": "3", "text": "3"},
                    {"value": "4", "text": "4"},
                    {"value": "5", "text": "5"}
                  ]
                },
                {
                  "type": "dropdown",
                  "label": "End",
                  "name": "connectorEnd",
                  "value": "none",
                  "tooltip": "what kind of connector",
                  "values": [
                    {"value": "none", "text": "None"},
                    {"value": "dot", "text": "Dot"},
                    {"value": "arrow", "text": "Arrow"}
                  ]
                },
                {
                  "type": "text",
                  "label": "End Scale",
                  "name": "connectorEndScale",
                  "value": "1",
                  "tooltip": "A multiplying factor for sizing the connector end"
                },
              ]
            },
            {
              "name": "Note",
              "inputs": [
                {
                  "type": "text",
                  "label": "Title",
                  "placeholder": "Title",
                  "value": "",
                  "name": "annotationNoteTitle",
                  "tooltip": "The title of your annotation"
                },
                {
                  "type": "color",
                  "label": "Note title color",
                  "value": "#C123FA",
                  "name": "annotationNoteTitleColor",
                  "tooltip": "Color string, inherited from Annotation but can be customized by directly adding to Note as a prop, overrides color property."
                },
                {
                  "type": "text",
                  "label": "Label",
                  "placeholder": "Label",
                  "value": "",
                  "name": "annotationNoteLabel",
                  "tooltip": "The label of your annotation"
                },
                {
                  "type": "color",
                  "label": "Label color",
                  "value": "#C123FA",
                  "name": "annotationNoteLabelColor",
                  "tooltip": "Color string, inherited from Annotation but can be customized by directly adding to Note as a prop, overrides color property."
                },
                {
                  "type": "text",
                  "label": "Note Text Padding",
                  "placeholder": "Padding",
                  "value": "5",
                  "name": "annotationNotePadding",
                  "tooltip": "(Number) Allows for padding of the note within the annotation"
                },
                {
                  "type": "text",
                  "label": "Note Text Wrap",
                  "placeholder": "Characters before wrap",
                  "value": "120",
                  "name": "annotationNoteWrap",
                  "tooltip": "(Number) Allows for you to incease/decrease the text on each line before wrap"
                },
                {
                  "type": "text",
                  "label": "Note Background Padding",
                  "placeholder": "Background Padding",
                  "value": "0",
                  "name": "annotationNoteBgPadding",
                  "tooltip": "(Number) This allows you to add more of a padding to the rectangle behind the text element, only available in version 1.3.0 and higher."
                },
                {
                  "type": "radio",
                  "label": "Select the orientation of the note",
                  "value": "topBottom",
                  "name": "annotationNoteOrientation",
                  "tooltip": "Determines based on the dx, and dy, which direction to orient the Note. Default is set to 'topBottom'",
                  "values": [
                    {"value": "topBottom", "text": "Top / Bottom"},
                    {"value": "leftRight", "text": "Left / Right"}
                  ]
                },
                {
                  "type": "radio",
                  "label": "Select the line type for the note",
                  "value": "horizontal",
                  "tooltip": "Creates a line along the edge of the note text. Please Note if you set this to 'vertical' then orientation is fixed at 'leftRight' and vice versa if it is 'horizontal' then orientation is fixed at 'topBottom'",
                  "name": "annotationNoteLineType",
                  "values": [
                    {"value": "null", "text": "None"},
                    {"value": "horizontal", "text": "Horizontal"},
                    {"value": "vertical", "text": "Vertical"}
                  ]
                },
                {
                  "type": "radio",
                  "label": "Select the alignment for the note",
                  "value": "dynamic",
                  "tooltip": "Should be left 'dynamic' most of the time. When the orientation is set to 'topBottom' or lineType is set to 'horiztonal' you can align the note with 'top', 'bottom', 'middle', or 'dynamic'. When the orientation is set to 'leftRight' or lineType is set to 'vertical' you can align the note with 'left', 'right', 'middle', or 'dynamic'.",
                  "name": "annotationNoteAlign",
                  "values": [
                    {"value": "dynamic", "text": "Dynamic"},
                    {"value": "top", "text": "Top"},
                    {"value": "bottom", "text": "Bottom"},
                    {"value": "middle", "text": "Middle"},
                    {"value": "left", "text": "Left"},
                    {"value": "right", "text": "Right"},
                  ]
                },
                {
                  "type": "radio",
                  "label": "Select the text alignment for the note",
                  "value": "null",
                  "tooltip": "Set the text alignment for text of the note, leverages inline css text-align.",
                  "name": "annotationNoteTextAnchor",
                  "values": [
                    {"value": "null", "text": "None"},
                    {"value": "start", "text": "Start"},
                    {"value": "middle", "text": "Middle"},
                    {"value": "end", "text": "End"}
                  ]
                },
                {
                  "type": "color",
                  "label": "Note color",
                  "value": "#C123FA",
                  "name": "annotationColor",
                  "tooltip": "A color string that will be applied to the note, otherwise defaults to annotation."
                },
              ]
            },
            {
              "name": "Subject",
              "inputs": [
                {
                  "type": "text",
                  "label": "Radius (Callout Circle and Badge Only)",
                  "name": "annotationSubjectRadius",
                  "value": "15",
                  "tooltip": "(Number) Radius of circle",
                  "hide": ['AnnotationBadge', 'AnnotationCalloutCircle'].indexOf(annotationType) >= 0 ? false : true
                },
                {
                  "type": "text",
                  "label": "Radius Padding (Callout Circle Only)",
                  "name": "annotationSubjectRadiusPadding",
                  "value": "0",
                  "tooltip": "(Number) Padding outside of circle, affects spacing between the circle and the start of the connector"
                },
                {
                  "type": "text",
                  "label": "Inner Radius (Callout Circle Only)",
                  "name": "annotationSubjectInnerRadius",
                  "value": "0",
                  "tooltip": "(Number) Inner radius to make a ring annotation"
                },
                {
                  "type": "text",
                  "label": "Outer Radius (Callout Circle Only)",
                  "name": "annotationSubjectOuterRadius",
                  "value": "0",
                  "tooltip": "(Number) Outer radius to make a ring annotation"
                },
                {
                  "type": "text",
                  "label": "Width (Rect and Bracket Only)",
                  "name": "annotationSubjectWidth",
                  "value": "50",
                  "tooltip": "(Number) Width of rect or bracket, accepts negative and positive values"
                },
                {
                  "type": "text",
                  "label": "Height (Rect and Bracket Only)",
                  "name": "annotationSubjectHeight",
                  "value": "50",
                  "tooltip": "(Number) Height of rect or bracket, accepts negative and positive values"
                },
                {
                  "type": "text",
                  "label": "Depth (Bracket Only)",
                  "name": "annotationSubjectDepth",
                  "value": "20",
                  "tooltip": "(Number) How far the bracket pops out from the corners."
                },
                {
                  "type": "dropdown",
                  "label": "Bracket Type (Bracket Only)",
                  "name": "annotationSubjectBracketType",
                  "value": "curly",
                  "tooltip": "Type of bracket (square or curly).",
                  "values": [
                    {"value": "square", "text": "Square"},
                    {"value": "curly", "text": "Curly"}
                  ]
                },
                {
                  "type": "text",
                  "label": "Badge Text",
                  "name": "annotationSubjectBadgeText",
                  "value": "",
                  "tooltip": "Text placed in the center of the badge"
                }
              ]
            },
            {
              "name": "Configuration",
              "inputs": [
                {
                  "type": "dropdown",
                  "label": "Show Controls?",
                  "value": "yes",
                  "name": "annotationShowControls",
                  "tooltip": "Toggle whether to show the icon controls for CRUD operations.",
                  "values": [
                    {"value": "yes", "text": "Yes"},
                    {"value": "no", "text": "No"}
                  ]
                }
              ]
            },
          ],
          "overwrites": {}
        },
        {
          "name": "Summary",
          "title": "Summary",
          "type": "summary",
          "overwrites": {}
        }
      ]
    }
  }}
  />
}
export default testing