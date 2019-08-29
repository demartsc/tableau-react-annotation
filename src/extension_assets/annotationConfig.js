import CustomLayout from './CustomLayout';

export default {
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
            "name": "Color",
            "inputs": [
              {
                "type": "color",
                "label": "Select color",
                "value": "#C123FA",
                "name": "annotationColor",
                "tooltip": "A color string that will be applied to the annotation."
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
          },
          {
            "name": "Note",
            "inputs": [
              {
                "type": "color",
                "label": "Note color",
                "value": "#C123FA",
                "name": "annotationColor",
                "tooltip": "A color string that will be applied to the note, otherwise defaults to annotation."
              },
              {
                "type": "text",
                "label": "Title",
                "placeholder": "Title",
                "value": "",
                "name": "annotationNoteTitle",
                "tooltip": "The title of your annotation"
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
                "type": "radio",
                "name": "Note Orientation",
                "label": "Select the orientation of the note",
                "value": "topBottom",
                "tooltip": "How your note aligns to the annotation",
                "values": [
                  {"value": "topBottom", "text": "Top / Bottom"},
                  {"value": "leftRight", "text": "Left / Right"}
                ]
              },
              {
                "type": "radio",
                "name": "Note Line Type",
                "label": "Select the line type for the note",
                "value": "horizontal",
                "tooltip": "Layout of the line in the annotation  ",
                "values": [
                  {"value": "horizontal", "text": "Horizontal"},
                  {"value": "vertical", "text": "Vertical"}
                ]
              },
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
}