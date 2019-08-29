import CustomLayout from './CustomLayout';

export default {
  "config": {
    "steps": [
      {
        "name": "Select Annotation",
        "title": "Select Annotation Type",
        "type": "viz_options", 
        "groups": [
          {
            "name": "Annotation Types",
            "inputs": [
              {
                "type": "radio",
                "name": "selectedAnnotationType",
                "label": "Select an annotation type",
                "value": "label",
                "tooltip": "Select one of the annotations available in react-annotation",
                "values": [
                  {"value": "label", "text": "annotationLabel"},
                  {"value": "callout", "text": "annotationCallout"},
                  {"value": "calloutElbow", "text": "annotationCalloutElbow"},
                  {"value": "calloutCurve", "text": "annotationCalloutCurve"},
                  {"value": "calloutCircle", "text": "annotationCalloutCircle"},
                  {"value": "calloutRect", "text": "annotationCalloutRect"},
                  {"value": "calloutXYThreshold", "text": "annotationXYThreshold"},
                  {"value": "bracket", "text": "annotationBracket"},
                  {"value": "badge", "text": "annotationBadge"}
                ]
              }
            ]
          }
        ],
        "overwrites": {}
      },
      {
        "name": "Custom layout",
        "title": "Custom layout",
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
            "name": "Note",
            "inputs": [
              {
                "type": "dropdown",
                "label": "Line Type",
                "name": "selectedLineType",
                "value": "none",
                "tooltip": "include a line anchor on your annotation",
                "values": [
                  {"value": "none", "text": "None"},
                  {"value": "left", "text": "Left Anchor"},
                  {"value": "top", "text": "Top Anchor"}
                ]
              },
              {
                "type": "dropdown",
                "label": "Alignment",
                "name": "selectedLineAlignment",
                "value": "none",
                "tooltip": "how to align your annotation anchor",
                "values": [
                  {"value": "none", "text": "Default"},
                  {"value": "left", "text": "Left"},
                  {"value": "middle", "text": "Middle"},
                  {"value": "right", "text": "Right"},
                ]
              },
              {
                "type": "color",
                "label": "Select color",
                "value": "#C123FA",
                "name": "aColorThing",
                "tooltip": "This is a tooltip"
              },
              {
                "type": "text",
                "label": "Label 1",
                "placeholder": "Label 1",
                "value": "Test Text Value",
                "name": "selectedName",
                "tooltip": "This is a tooltip"
              },
              {
                "type": "check",
                "text": "Check Item 1",
                "label": "Would you like to check this?",
                "tooltip": "This is a tooltip",
                "name": "checkItem1"
              },
              {
                "type": "radio",
                "name": "selectedRadioOption",
                "label": "Select one option",
                "value": "two",
                "tooltip": "This is a tooltip",
                "values": [
                  {"value": "one", "text": "One"},
                  {"value": "two", "text": "Two"},
                  {"value": "three", "text": "Three"}
                ]
              },
              {
                "type": "dropdown",
                "label": "Label 2",
                "name": "selectedOption",
                "value": "value4",
                "tooltip": "This is a tooltip",
                "values": [
                  {"value": "value1", "text": "Value 1"},
                  {"value": "value2", "disabled": true, "text": "Value 2"},
                  { "separator": true },
                  {"value": "value3", "text": "Value 3"},
                  {"value": "value4", "text": "Value 4"}
                ]
              },
              {
                "type": "dropdown",
                "label": "Label 2",
                "name": "selectedOption",
                "value": "value4",
                "tooltip": "This is a tooltip",
                "values": [
                  {"value": "value1"},
                  {"value": "value2", "disabled": true},
                  { "separator": true },
                  {"value": "value3"},
                  {"value": "value4"}
                ]
              },
              {
                "type": "dropdown",
                "label": "Label 2",
                "name": "selectedOption",
                "value": "value4",
                "tooltip": "This is a tooltip",
                "values": [
                  {"value": "value1"},
                  {"value": "value2", "disabled": true},
                  { "separator": true },
                  {"value": "value3"},
                  {"value": "value4"}
                ]
              },
              {
                "type": "dropdown",
                "label": "Label 2",
                "name": "selectedOption",
                "value": "value4",
                "tooltip": "This is a tooltip",
                "values": [
                  {"value": "value1"},
                  {"value": "value2", "disabled": true},
                  { "separator": true },
                  {"value": "value3"},
                  {"value": "value4"}
                ]
              }
            ]
          }
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
}