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
                  {"value": "null", "text": "none"},
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
                "name": "annotationNoteTextAlign",
                "values": [
                  {"value": "null", "text": "None"},
                  {"value": "left", "text": "Left"},
                  {"value": "right", "text": "Right"},
                  {"value": "center", "text": "Center"},
                  {"value": "justify", "text": "Justify"},
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