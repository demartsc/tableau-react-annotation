import React, { useContext, useEffect, useState } from 'react';
import { 
  AnnotationLabel,
  AnnotationCallout,
  AnnotationCalloutElbow,
  AnnotationCalloutCurve,
  AnnotationCalloutCircle,
  AnnotationCalloutRect,
  AnnotationXYThreshold,
  AnnotationBracket,
  AnnotationBadge
} from 'react-annotation';
import TypesUI  from '../components/annotations/Types';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../components/annotations/Theme";

const ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];
const CheckItem = window.TableauExtension['components']['CheckItem'];

const options = {
  ignoreAliases: false,
  ignoreSelection: true,
  maxRows: 0
};

const Annotations = {
  AnnotationLabel: AnnotationLabel,
  AnnotationCallout: AnnotationCallout,
  AnnotationCalloutElbow: AnnotationCalloutElbow,
  AnnotationCalloutCurve: AnnotationCalloutCurve,
  AnnotationCalloutCircle: AnnotationCalloutCircle,
  AnnotationCalloutRect: AnnotationCalloutRect,
  AnnotationXYThreshold: AnnotationXYThreshold,
  AnnotationBracket: AnnotationBracket,
  AnnotationBadge: AnnotationBadge
};
const annotationStarter = [
  {
    type: "AnnotationCalloutRect",
    key: 0,
    id: 0,
    className: 'id-000',
    x: 100,
    y: 70,
    dy: 117,
    dx: 162,
    color: "#9610ff",
    note: {
      "title":"Annotations :)",
      "label":"Longer text to show text wrapping",
      "lineType":"horizontal"
    },
    subject: {
      "width":-50,
      "height":100
    }
  },
  {
    type: "AnnotationCalloutCircle",
    key: 1,
    id: 1,
    className: 'id-001',
    x: 350,
    y: 70,
    dy: 117,
    dx: 162,
    color: "#4682b4",
    note: {
      "title":"Annotations :)",
      "label":"Longer text to show text wrapping",
      "lineType":"horizontal"
    },
    subject: {
      "radius":50,
      "radiusPadding":5
    }
  }
]

const Viz = (props) => {
  const tableauExt = window.tableau.extensions;
  const contextValue = useContext(ExtensionContext);

  const [disableConfig, setDisableConfig] = useState(false);
  const [dragState, setDragState] = useState(null);
  const [annotationState, setAnnotationState] = useState(annotationStarter);

  const extensionName = window.name;
  const extensionParent = window.parent;
  const extensionZoneId = window.name.substring(window.name.lastIndexOf("_")+1)
  // console.log('window', window.TableauExtension['components'], window, extensionName, extensionParent, extensionZoneId, contextValue.config);
  console.log('window', window.TableauExtension);

  const configureAnnotation = e => {
    console.log('checking disable config and drag state', disableConfig, dragState);
    if ( !disableConfig && dragState) {
      e.persist();
      const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '#/annotation';
      const popUpOptions = {
        height: 700,
        width: 800,
      };

      // next need to figure out drag functions (if we enable edit mode)
      // let annotationsArray = this.state.tableauSettings.clickAnnotations ? JSON.parse(this.state.tableauSettings.clickAnnotations) : []; 

      // now we check whether the annotation is new or exists
      // let existingAnnotation = _.find(annotationsArray, (o) => { return o.annotationID === d.id });
      console.log('checking state', props.tableauSettings);

      /*
      // if this has something we have an existing annotation that we have to set to temp tableau settings
      if ( existingAnnotation ) {
        // update the settings
        if (TableauSettings.ShouldUse) {
          TableauSettings.updateAndSave({
            annotationType: existingAnnotation.type,
            annotationColor: existingAnnotation.color, 
            annotationComment: existingAnnotation.label,
            annotationPadding: existingAnnotation.padding,
            annotationStrokeWidth: existingAnnotation.strokeWidth
          }, settings => {
            console.log('update and save', settings);
            this.setState({
                tableauSettings: settings,
            });
          });    
        } else {
          tableauExt.settings.set("annotationType", existingAnnotation.type);
          tableauExt.settings.set("annotationColor", existingAnnotation.color);
          tableauExt.settings.set("annotationComment", existingAnnotation.label);
          tableauExt.settings.set("annotationPadding", existingAnnotation.padding);
          tableauExt.settings.set("annotationStrokeWidth", existingAnnotation.strokeWidth);
          tableauExt.settings.saveAsync().then(() => {
            console.log('direct save', tableauExt.settings.getAll());
            this.setState({
                tableauSettings: tableauExt.settings.getAll()
              })
          });
        }
      }
      */

      tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
        if (closePayload === 'false') {
          props.history.push('/viz')
        }
      }).catch((error) => {
        // One expected error condition is when the popup is closed by the user (meaning the user
        // clicks the 'X' in the top right of the dialog).  This can be checked for like so:
        switch(error.errorCode) {
          case window.tableau.ErrorCodes.DialogClosedByUser:
            // log("closed by user")
            break;
          default:
            console.error(error.message);
        }
      });
    }
  };

  // this goes across iframe to parent and triggers a CORS error
  // extensionParent.document.getElementById("tabZoneId" + extensionZoneId).style.pointerEvents = 'none');


  // annotation callbacks from hierarchy example
  /*
  editAnnotationCallBack = () => {
    console.log('edit annotations enabled');
    if ((this.state.tableauSettings || {}).clickAnnotations) {
      const newAnnotations = JSON.parse(this.state.tableauSettings.clickAnnotations);
      newAnnotations.map(d => {
        d.editMode = !d.editMode
      })

      console.log('editable annotations', newAnnotations);

      if (TableauSettings.ShouldUse) {
        TableauSettings.updateAndSave({
          // ['is' + field]: true,
          clickAnnotations: JSON.stringify(newAnnotations),
        }, settings => {
          this.setState({
            tableauSettings: settings,
          });
        });
    
      } else {
        tableauExt.settings.set('clickAnnotations', JSON.stringify(newAnnotations));
        tableauExt.settings.saveAsync().then(() => {
          this.setState({
            tableauSettings: tableauExt.settings.getAll()
          });
        });
      }
    }
  }

  annotationDragCallBack = annotationInfo => {
    if ((this.state.tableauSettings || {}).clickAnnotations) {
      const newAnnotations = JSON.parse(this.state.tableauSettings.clickAnnotations);
      newAnnotations.map(d => {
        if (annotationInfo.originalSettings.annotationID === d.annotationID) {
          d.dx = annotationInfo.updatedSettings.dx;
          d.dy = annotationInfo.updatedSettings.dy;
          d.radius = annotationInfo.updatedSettings.radius;
          d.height = annotationInfo.updatedSettings.height;
          d.width = annotationInfo.updatedSettings.width;
        }
      })
      
      console.log('annotation drag ended', annotationInfo, newAnnotations);
      if (TableauSettings.ShouldUse) {
        TableauSettings.updateAndSave({
          clickAnnotations: JSON.stringify(newAnnotations),
        }, settings => {
          this.setState({
            tableauSettings: settings,
          });
        });
    
      } else {
        tableauExt.settings.set('clickAnnotations', JSON.stringify(newAnnotations));
        tableauExt.settings.saveAsync().then(() => {
          this.setState({
            tableauSettings: tableauExt.settings.getAll()
          });
        });
      }
    }
  }
  */

  // this function and effect calls get summary data when something changes
  // const getSummaryData = () => {
  //   let sheetObject = contextValue.sheetNames.find(worksheet => worksheet.name === contextValue.tableauSettings.selectedSheet1);

  //   //working here on pulling out summmary data
  //   //may want to limit to a single row when getting column names
  //   sheetObject.getSummaryDataAsync(options).then(data => {
  //     // Use data
  //     console.log(data);
  //   })
  // }

  // useEffect(() => {
  //   // Get summary data when tableauSettings are available
  //   if (Object.keys(contextValue.tableauSettings).length > 0) {
  //     getSummaryData()
  //   }
  // });

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div>
        <React.Fragment>
          {/* <TypesUI /> */}
          <CheckItem
            isChecked={disableConfig}
            text={`Toggle SVG onClick()`}
            onChange={() => setDisableConfig(!disableConfig)}
          >
            Toggle Add Annotations
          </CheckItem>
          <br/>
          <svg
            height={1000}
            width={1000}
            onClick={(e) => configureAnnotation(e)}
          >
            {annotationState.map((note, i) => {
              const NoteType = Annotations[note.type];
              return (
                <NoteType
                  events={{
                    // we can use this event to handle when the annotation is clicked
                    // and then when clicked we can update the annotation vs create a new one
                    onClick: (props, state, event) => {
                      console.log('annotation onClick event', props, state, event)
                    }
                  }}
                  onDragStart={() => setDragState(i)}
                  onDragEnd={(dragProps) => {
                    const { events, onDrag, onDragEnd, onDragStart, ...noFunctionProps} = dragProps;
                    const newNoteState = {...note, ...noFunctionProps}
                    const newAnnotationState = annotationState.filter(n => { console.log('checking drag state', dragState); return n.id !== dragState })
                    newAnnotationState.splice(dragState, 0, newNoteState);
                    setAnnotationState(newAnnotationState);
                    setDragState(null);
                    console.log('dragProps', annotationState, dragProps, newNoteState, newAnnotationState);
                  }}
                  editMode={true}
                  {...note}
                />
              );
            })}
          </svg>
        </React.Fragment>
      </div>
    </MuiThemeProvider>
  )
};

export default Viz;