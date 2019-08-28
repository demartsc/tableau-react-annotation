import CustomLayout from './CustomLayout';

export default {
  "config": {
    "steps": [
      {
        "name": "Select Type",
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
        "name": "Viz Options",
        "title": "Viz Options",
        "type": "viz_options",
        "groups": [
          {
            "name": "Group 1",
            "inputs": [
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