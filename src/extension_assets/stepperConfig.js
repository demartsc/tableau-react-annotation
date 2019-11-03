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

export default {
  "config": {
    "steps": [
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