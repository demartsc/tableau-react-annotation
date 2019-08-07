import React, { useContext, useEffect } from 'react';
import { AnnotationCalloutCircle } from 'react-annotation';

var ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];

const options = {
  ignoreAliases: false,
  ignoreSelection: true,
  maxRows: 0
};

const Viz = (props) => {
  const contextValue = useContext(ExtensionContext);

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
    <div>
      <ExtensionContext.Consumer>
        {
          ({tableauExt}) => {
            return (
              <React.Fragment>
                <div>
                  <h2>Viz</h2>
                  <p>Now you can use <i>contextValue.tableauSettings</i> to retrieve the saved configuration.</p>
                </div>
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
  )
};

export default Viz;