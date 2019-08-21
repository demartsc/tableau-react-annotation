import React, { useContext, useEffect } from 'react';
import { AnnotationCalloutCircle } from 'react-annotation';
import TypesUI  from '../components/annotations/Types';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../components/annotations/Theme";

var ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];

const options = {
  ignoreAliases: false,
  ignoreSelection: true,
  maxRows: 0
};

const Viz = (props) => {
  const contextValue = useContext(ExtensionContext);

  const extensionName = window.name;
  const extensionParent = window.parent;
  console.log(window, extensionName, extensionParent);

  const getSummaryData = () => {
    let sheetObject = contextValue.sheetNames.find(worksheet => worksheet.name === contextValue.tableauSettings.selectedSheet1);

    //working here on pulling out summmary data
    //may want to limit to a single row when getting column names
    sheetObject.getSummaryDataAsync(options).then(data => {
      // Use data
      console.log(data);
    })
  }

  useEffect(() => {
    // Get summary data when tableauSettings are available
    if (Object.keys(contextValue.tableauSettings).length > 0) {
      getSummaryData()
    }
  });

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div>
        <ExtensionContext.Consumer>
          {
            ({tableauExt}) => {
              return (
                <React.Fragment>
                  {/* <TypesUI /> */}
                  <svg
                      height={300}
                      width={600}
                    >
                      <AnnotationCalloutCircle
                        x={100}
                        y={100}
                        dy={117}
                        dx={162}
                        color={"#9610ff"}
                        editMode={true}
                        note={{"title":"Annotations :)",
                          "label":"Longer text to show text wrapping",
                          "lineType":"horizontal"}}
                        subject={{"radius":50,"radiusPadding":5}}
                      />
                    </svg>
                  </React.Fragment>
                );
              }
            }              
        </ExtensionContext.Consumer>
      </div>
    </MuiThemeProvider>
  )
};

export default Viz;