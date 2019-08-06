import React, { useState, useContext, useEffect } from 'react';

var DropdownSelect = window.TableauExtension['components']['DropdownSelect'];
var ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];

function CustomLayout(props){
  // Let's use the ExtensionContext to access Tableau settings
  let extensionContext = useContext(ExtensionContext);

  // State and setter of the dropdown input
  let [myCustomDropdownField, setMyCustomDropdownField] = useState(extensionContext.tableauExt.settings.get('myCustomDropdownField')  || "");
  

  const layoutStyle = {
    paddingLeft: '32px',
    paddingRight: '32px'
  }

  // Callback setter of dropdown input
  function optionSelected(value) {
    setMyCustomDropdownField(value)
    props.onOptionSelected('myCustomDropdownField', value)
  }

  useEffect(() => {
    if (myCustomDropdownField === "") {
      props.enableNext(false)
    } else {
      props.enableNext(true)
    }
  });
  
  return (
    <div style={layoutStyle}>
      <h1>This is a custom layout</h1>
      <div>Hello {props.data.name}</div>
      <ExtensionContext.Consumer>
        {
          ({tableauExt}) => {
            return (
              <DropdownSelect 
                label="This is a label"
                tooltip="This is a tooltip"
                dropdownList={
                  [
                    {"value": "value1"},
                    {"value": "value2", "disabled": true},
                    { "separator": true },
                    {"value": "value3"},
                    {"value": "value4"}
                  ]
                }
                value={myCustomDropdownField}
                onChange={(e) => {optionSelected(e.target.value)}}
              />
            );
          }
        }
      </ExtensionContext.Consumer>
    </div>
  );
}

export default CustomLayout;