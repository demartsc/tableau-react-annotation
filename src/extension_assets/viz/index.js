import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import uuid from 'uuid';
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
import { relative } from 'upath';

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
    annotationType: "AnnotationCalloutRect",
    key: 0,
    id: 0,
    x: 100,
    y: 70,
    dy: 117,
    dx: 162,
    color: "#9610ff",
    width:-50,
    height:100,
    note: {
        "title":"Annotations :)",
        "label":"Longer text to show text wrapping",
        "lineType":"horizontal"
      },
  },
  {
    annotationType: "AnnotationCalloutCircle",
    key: 1,
    id: 1,
    x: 350,
    y: 70,
    dy: 117,
    dx: 162,
    color: "#4682b4",
    radius: 50,
    radiusPadding: 5,
    note: {
      "title":"Annotations :)",
      "label":"Longer text to show text wrapping",
      "lineType":"horizontal"
    },
  }
]

const Viz = (props) => {
  console.log('checking initial props', props);
  const tableauExt = window.tableau.extensions;
  const contextValue = useContext(ExtensionContext);
  const annotationProps = JSON.parse((props.tableauSettings || {}).annotationData || JSON.stringify(annotationStarter)); // annotationStarter

  const [disableConfig, setDisableConfig] = useState(false);
  const [dragState, setDragState] = useState(null);
  const [editMode, setEditMode] = useState(true);


  const extensionName = window.name;
  const extensionParent = window.parent;
  const extensionZoneId = window.name.substring(window.name.lastIndexOf("_")+1)
  // console.log('window', window.TableauExtension['components'], window, extensionName, extensionParent, extensionZoneId, contextValue.config);
  console.log('window', window.TableauExtension, annotationProps);

  const deleteAnnotation = annotationID => {
    console.log('checking delete annotation', annotationID);
    const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '#/deleteAnnotation';
    const popUpOptions = {
      height: 250,
      width: 350,
    };


    tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
      if (closePayload === 'false') {
        console.log('checking inner delete annotation', annotationID);
        props.deleteAnnotation(annotationID);
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
  };

  const annotationDragCallback = (dragProps, note, hXw) => {
    // fix placement of note or annotation if it is off screen
    if ( dragProps.x < 0 ) { dragProps.x = 10 }
    if ( dragProps.y < 0 ) { dragProps.y = 10 }
    if ( dragProps.x > hXw[1] ) { dragProps.x = hXw[1]-10 }
    if ( dragProps.y > hXw[0] ) { dragProps.y = hXw[0]-10 }
    if ( dragProps.x + dragProps.dx < 0 ) { dragProps.dx = 50 }
    if ( dragProps.y + dragProps.dy < 0 ) { dragProps.dy = 50 }
    if ( dragProps.x + dragProps.dx > hXw[1] ) { dragProps.dx = 50 }
    if ( dragProps.y + dragProps.dy  > hXw[0] ) { dragProps.dy = 50 }

    // update the array object
    const { className, events, onDrag, onDragEnd, onDragStart, children, ...noFunctionProps} = dragProps;
    const subjectProps = (({width, height, radius, radiusPadding, innerRadius, outerRadius, depth, type}) => ({width, height, radius, radiusPadding, innerRadius, outerRadius, depth, type}))(dragProps);
    const newNoteState = {...note, ...noFunctionProps, ...{subject: subjectProps}}
    const newAnnotationState = annotationProps.filter(n => { return n.id !== dragState });
    newAnnotationState.push(newNoteState);
    
    // save to tableau settings
    console.log('drag ended - we are going to stringify', newAnnotationState, JSON.stringify(newAnnotationState));
    contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationState));
    contextValue.tableauExt.settings.saveAsync().then(() => {
      props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
      setDragState(null);
      console.log('dragProps', contextValue.tableauExt.settings.getAll(), dragState, props.tableauSettings);
    });
  }

  const configureAnnotation = (e, typ) => {
    console.log('checking disable config and drag state', disableConfig, dragState);
    if ( (disableConfig || typ !== "new") && !dragState ) {
      e.persist();
      const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '#/annotation';
      const popUpOptions = {
        height: 700,
        width: 800,
      };

      // now we check whether the annotation is new or exists
      let existingAnnotation;
      if ( typ !== "new" ) {
        existingAnnotation = _.find(annotationProps, (o) => { return o.id === e.target.id.replace('edit-button-','') });

        // now if we have an annotation found we will pre-populate the settings linked to the config
        if ( existingAnnotation ) { 
          // first screen is annotation type
          contextValue.tableauExt.settings.set('annotationType', existingAnnotation.annotationType);

          // screen 2a is annotation color
          contextValue.tableauExt.settings.set('annotationColor', existingAnnotation.color);

          // screen 2b is connector props
          contextValue.tableauExt.settings.set('connectorType', (existingAnnotation.connector || {}).type || "line");
          contextValue.tableauExt.settings.set('connectorEnd', (existingAnnotation.connector || {}).end || "none");
          contextValue.tableauExt.settings.set('connectorEndScale', (existingAnnotation.connector || {}).endScale || "1");

          // screen 2c is note props
          contextValue.tableauExt.settings.set('annotationNoteTitle', (existingAnnotation.note || {}).title || "");
          contextValue.tableauExt.settings.set('annotationNoteTitleColor', (existingAnnotation.note || {}).titleColor || existingAnnotation.color);

          contextValue.tableauExt.settings.set('annotationNoteLabel', (existingAnnotation.note || {}).label || "");
          contextValue.tableauExt.settings.set('annotationNoteLabelColor', (existingAnnotation.note || {}).labelColor || existingAnnotation.color);

          contextValue.tableauExt.settings.set('annotationNotePadding', (existingAnnotation.note || {}).padding || "5");
          contextValue.tableauExt.settings.set('annotationNoteBgPadding', (existingAnnotation.note || {}).bgPadding || "0");

          // note alignment props
          contextValue.tableauExt.settings.set('annotationNoteOrientation', (existingAnnotation.note || {}).orientation || "topBottom");
          contextValue.tableauExt.settings.set('annotationNoteLineType', (existingAnnotation.note || {}).lineType || "null");
          contextValue.tableauExt.settings.set('annotationNoteAlign', (existingAnnotation.note || {}).align || "dynamic");
          contextValue.tableauExt.settings.set('annotationNoteTextAlign', (existingAnnotation.note || {}).textAlign || "null");
          
          // subject props
          contextValue.tableauExt.settings.set('annotationSubjectRadius', (existingAnnotation.subject || {}).radius || "15");
          contextValue.tableauExt.settings.set('annotationSubjectRadiusPadding', (existingAnnotation.subject || {}).radiusPadding || "0");
          contextValue.tableauExt.settings.set('annotationSubjectInnerRadius', (existingAnnotation.subject || {}).innerRadius || "0");
          contextValue.tableauExt.settings.set('annotationSubjectOuterRadius', (existingAnnotation.subject || {}).outerRadius || "0");

          contextValue.tableauExt.settings.set('annotationSubjectWidth', (existingAnnotation.subject || {}).width || "50");
          contextValue.tableauExt.settings.set('annotationSubjectHeight', (existingAnnotation.subject || {}).height || "50");
          contextValue.tableauExt.settings.set('annotationSubjectDepth', (existingAnnotation.subject || {}).depth || "20");

          contextValue.tableauExt.settings.set('annotationSubjectBracketType', (existingAnnotation.subject || {}).type || "curly");
          contextValue.tableauExt.settings.set('annotationSubjectBadgeText', (existingAnnotation.subject || {}).text || "");

          contextValue.tableauExt.settings.saveAsync().then(() => {
            console.log('existing annotations writter to settings', props.tableauSettings);
            tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
              if (closePayload === 'false') {
                // we can now write the updates back to the annotation array and persist to tableau
                existingAnnotation.annotationType = contextValue.tableauExt.settings.get('annotationType');
                existingAnnotation.color = contextValue.tableauExt.settings.get('annotationColor');

                // there might be a better way
                if ( !existingAnnotation.connector ) { existingAnnotation.connector = {}; }
                existingAnnotation.connector.type = contextValue.tableauExt.settings.get('connectorType');
                existingAnnotation.connector.end = contextValue.tableauExt.settings.get('connectorEnd');
                existingAnnotation.connector.endScale = parseFloat(contextValue.tableauExt.settings.get('connectorEndScale'));

                // update the note if we got new settings
                if ( !existingAnnotation.note ) { existingAnnotation.note = {}; }
                existingAnnotation.note.title = contextValue.tableauExt.settings.get('annotationNoteTitle');
                existingAnnotation.note.titleColor = contextValue.tableauExt.settings.get('annotationNoteTitleColor');
                existingAnnotation.note.label = contextValue.tableauExt.settings.get('annotationNoteLabel');
                existingAnnotation.note.labelColor = contextValue.tableauExt.settings.get('annotationNoteLabelColor');

                existingAnnotation.note.padding = parseFloat(contextValue.tableauExt.settings.get('annotationNotePadding'));
                existingAnnotation.note.bgPadding = parseFloat(contextValue.tableauExt.settings.get('annotationNoteBgPadding'));
                
                existingAnnotation.note.orientation = contextValue.tableauExt.settings.get('annotationNoteOrientation');
                existingAnnotation.note.lineType = contextValue.tableauExt.settings.get('annotationNoteLineType') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteLineType');
                existingAnnotation.note.align = contextValue.tableauExt.settings.get('annotationNoteAlign');
                existingAnnotation.note.textAlign = contextValue.tableauExt.settings.get('annotationNoteTextAlign') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteTextAlign');
                
                // update the subject if we got new settings
                if ( !existingAnnotation.subject ) { existingAnnotation.subject = {}; }
                existingAnnotation.subject.radius = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadius'));
                existingAnnotation.subject.radiusPadding = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadiusPadding'));
                existingAnnotation.subject.innerRadius = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectInnerRadius'));
                existingAnnotation.subject.outerRadius = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectOuterRadius'));

                existingAnnotation.subject.width = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectWidth'));
                existingAnnotation.subject.height = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectHeight'));
                existingAnnotation.subject.depth = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectDepth'));

                existingAnnotation.subject.type = contextValue.tableauExt.settings.get('annotationSubjectBracketType');
                existingAnnotation.subject.text = contextValue.tableauExt.settings.get('annotationSubjectBadgeText');

                // this should be equal to existingAnnotation which is now updates
                // const newNoteState = {...note, ...noFunctionProps, ...{subject: subjectProps}}
                const newAnnotationState = annotationProps.filter(n => { return n.id !== existingAnnotation.id });
                newAnnotationState.splice(existingAnnotation.id, 0, existingAnnotation);
                console.log('do we get existing annotation', existingAnnotation, existingAnnotation.color, props.tableauSettings.annotationColor, props.tableauExt.settings.get('annotationColor'));

                
                // save to tableau settings
                contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationState));
                contextValue.tableauExt.settings.saveAsync().then(() => {
                  // done we can close and move on
                  props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
                  console.log('checking props', props, props.history);
                  // (props.history || []).push('/viz')
                  props.history.push('/viz');
                });
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
          });

        }
      } else {
        tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
          if (closePayload === 'false') {
            const newAnnotationArray = annotationProps;
            const newAnnotationId = uuid.v4();
            newAnnotationArray.push({
              // we can now write the updates back to the annotation array and persist to tableau
              annotationType: contextValue.tableauExt.settings.get('annotationType'),
              color: contextValue.tableauExt.settings.get('annotationColor'),
              key: newAnnotationId, 
              id: newAnnotationId,
              x: e.clientX,
              y: e.clientY,
              dx: 50,
              dy: 50,
              connector: {
                type: contextValue.tableauExt.settings.get('connectorType'),
                end: contextValue.tableauExt.settings.get('connectorEnd'),
                endScale: parseFloat(contextValue.tableauExt.settings.get('connectorEndScale'))
              },
              note: { 
                title: contextValue.tableauExt.settings.get('annotationNoteTitle'), 
                titleColor: contextValue.tableauExt.settings.get('annotationNoteTitleColor'),
                label: contextValue.tableauExt.settings.get('annotationNoteLabel'),
                labelColor: contextValue.tableauExt.settings.get('annotationNoteLabelColor'), 
                padding: parseFloat(contextValue.tableauExt.settings.get('annotationNotePadding')),
                bgPadding: parseFloat(contextValue.tableauExt.settings.get('annotationNoteBgPadding')),
                orientation: contextValue.tableauExt.settings.get('annotationNoteOrientation'),
                lineType: contextValue.tableauExt.settings.get('annotationNoteLineType') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteLineType'),
                align: contextValue.tableauExt.settings.get('annotationNoteAlign'),
                textAlign: contextValue.tableauExt.settings.get('annotationNoteTextAlign') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteTextAlign')
              },
              subject: {
                radius: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadius')),
                radiusPadding: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadiusPadding')),
                innerRadius: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectInnerRadius')),
                outerRadius: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectOuterRadius')),
                width: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectWidth')),
                height: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectHeight')),
                depth: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectDepth')),
                type: contextValue.tableauExt.settings.get('annotationSubjectBracketType'),
                text: contextValue.tableauExt.settings.get('annotationSubjectBadgeText')
              }    
            });
            // save to tableau settings
            contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationArray));
            contextValue.tableauExt.settings.saveAsync().then(() => {
              // done we can close and move on
              props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
              props.history.push('/viz')
            });
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
    }
  };

  // this goes across iframe to parent and triggers a CORS error
  // extensionParent.document.getElementById("tabZoneId" + extensionZoneId).style.pointerEvents = 'none');

  /*
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
        {/* <TypesUI /> */}
        <div 
          className="Annotation-Div"
          style={{
            display: "block", 
            backgroundColor: 'none transparent',
            width: 'inherit',
            height: 'inherit'
          }}>
            <div 
              className="Annotation-Controls"
              style={{
                height: '5%'
              }}
            >
              <CheckItem
                isChecked={disableConfig}
                text={`Toggle SVG onClick()`}
                onChange={() => setDisableConfig(!disableConfig)}
              >
                Toggle Add Annotations
              </CheckItem>
              <CheckItem
                isChecked={editMode}
                text={`Toggle Edit Mode`}
                onChange={() => setEditMode(!editMode)}
              >
                Toggle Edit Mode
              </CheckItem>
            </div>
        <br/>
        <svg
          id={'tableau-react-annotation-layer'}
          height={'95%'}
          width={'100%'}
          style={{
            position: relative,
            cursor: disableConfig ? "copy" : "default"
          }}
          onClick={e => configureAnnotation(e,'new')}
        >
          {annotationProps.map(note => {
            const NoteType = Annotations[note.annotationType];
            return (
              <React.Fragment key={`fragment-${note.id}`}>
                <NoteType
                  events={{
                    // we can use this event to handle when the annotation is clicked
                    // and then when clicked we can update the annotation vs create a new one
                    onClick: (props, state, event) => {
                      console.log('annotation onClick event', props, state, event);
                    }
                  }}
                  onDragStart={() => setDragState(note.id)}
                  onDragEnd={(dragProps) => { 
                    const hXw = [document.getElementById('tableau-react-annotation-layer').parentNode.clientHeight, document.getElementById('tableau-react-annotation-layer').parentNode.clientWidth];
                    annotationDragCallback(dragProps, note, hXw);
                  }}
                  {...note}
                  connector={{
                    "type": "elbow", 
                    "end": "dot"
                  }}
                  editMode={editMode}
                  x={note.x < 0 ? 10 : note.x}
                  y={note.y < 0 ? 10 : note.y}
                />
                { // edit icon obtained from material ui
                  editMode && <React.Fragment>
                  <svg 
                    viewBox="0 0 24 24"
                    key={`edit-button-${note.id}`}
                    id={`edit-button-${note.id}`}
                    fill={note.color || "#767676"}
                    width="18"
                    height="18"
                    x={note.x+15}
                    y={note.y-11}
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <rect 
                      id={`edit-button-${note.id}`}
                      style={{
                        cursor: 'pointer',
                        stroke: '#fff',
                        fill: '#fff',
                        fillOpacity: 0,
                        strokeOpacity: 0
                      }} 
                      width="24" height="24" 
                      onClick={e => {
                        configureAnnotation(e,'edit');
                        console.log('you clicked on edit', e, e.target, Number(e.target.id.replace('edit-button-','')));
                      }}
                    />      
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    key={`delete-button-${note.id}`}
                    id={`delete-button-${note.id}`}
                    fill={note.color || "#767676"}
                    width="18"
                    height="18"
                    x={note.x-32}
                    y={note.y-10}
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <rect 
                      id={`delete-button-${note.id}`} 
                      style={{
                        cursor: 'pointer',
                        stroke: '#fff',
                        fill: '#fff',
                        fillOpacity: 0,
                        strokeOpacity: 0
                      }} 
                      width="24" height="24" 
                      onClick={e => {
                        console.log('you clicked on delete', e.target.id,  e.target.id.replace('delete-button-',''));
                        deleteAnnotation(e.target.id.replace('delete-button-',''));
                      }}                        
                    />
                  </svg>
                  </React.Fragment>
                }
              </React.Fragment>
            );
          })}
        </svg>
      </div>
    </MuiThemeProvider>
  )
};

export default Viz;