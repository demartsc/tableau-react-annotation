// Copyright (c) 2021 Chris DeMartini
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
        "name": "Extension Configuration",
        "title": "Configuration Options",
        "type": "viz_options",
        "groups": [
          {
            "name": "Configuration",
            "inputs": [
              {
                "type": "dropdown",
                "label": "Show Controls?",
                "value": "yes",
                "name": "annotationShowControls",
                "tooltip": "Toggle whether to show the icon controls for CRUD operations. The only way to re-enable them is to re-configure the extension.",
                "values": [
                  {"value": "yes", "text": "Yes"},
                  {"value": "no", "text": "No"}
                ]
              },
              {
                "type": "dropdown",
                "label": "Click Through Mode (Caution!)",
                "value": "no",
                "name": "annotationPassThroughMode",
                "tooltip": "Proceed with Caution! This will cause our extension to be completely pass through to mouse/keyboard interactions. NOTE: the only way to re-enable interaction is to re-configure the extension.",
                "values": [
                  {"value": "no", "text": "No"},
                  {"value": "yes", "text": "Yes"}
                ]
              }
            ]
          },
        ],
        "overwrites": {}
      }
    ]
  }
}