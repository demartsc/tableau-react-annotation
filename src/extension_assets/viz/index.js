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
import {
  curveCatmullRom,
  curveLinear,
  curveStep,
  curveNatural, 
  curveBasis
} from 'd3-shape'
import TypesUI  from '../components/annotations/Types';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { muiTheme } from "../components/annotations/Theme";

// icons for toggling view options
//icons
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Edit from '@material-ui/icons/Edit';
// import ControlPoint from '@material-ui/icons/ControlPoint';

const ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];
// const CheckItem = window.TableauExtension['components']['CheckItem'];

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

const Curves = {
  curveCatmullRom: curveCatmullRom,
  curveLinear: curveLinear,
  curveStep: curveStep,
  curveNatural: curveNatural, 
  curveBasis: curveBasis
};

const annotationStarter = [
  {
    "annotationType":"AnnotationCalloutCircle",
    "color":"#4a90e2",
    "key":"c6e564aa-65ea-4edc-8c2d-e6dcd744ffa6-starter",
    "id":"c6e564aa-65ea-4edc-8c2d-e6dcd744ffa6-starter",
    "x":150,
    "y":150,
    "dx":252,
    "dy":-4,
    "connector": {
      "type":"elbow",
      "end":"none",
      "endScale":1
    },
    "note":{
      "title":"Hi! I am a React-Annotation (in Tableau!)",
      "titleColor":"#d0021b",
      "label":"I am a customizable annotation. You can edit me by clicking the pencil, remove me with the trash can or create more of me! Enjoy :)",
      "labelColor":"#4a4a4a",
      "padding":5,
      "wrap":240,
      "bgPadding":0,
      "orientation":"leftRight",
      "lineType":"vertical",
      "align":"dynamic",
      "textAnchor":null
    },
    "subject":{
      "radius":89.95331880577405,
      "radiusPadding":0,
      "innerRadius":75.05382386916237,
      "outerRadius":0
    },
    "editMode":true
  }
]

const Viz = (props) => {
  const tableauExt = window.tableau.extensions;
  const contextValue = useContext(ExtensionContext);
  const annotationProps = JSON.parse((props.tableauSettings || {}).annotationData || "[]" !== "[]" ? (props.tableauSettings || {}).annotationData : JSON.stringify(annotationStarter)); // annotationStarter

  const [disableConfig, setDisableConfig] = useState(contextValue.tableauExt.settings.get('disableConfig') === "true");
  const [editMode, setEditMode] = useState(contextValue.tableauExt.settings.get('editMode') === "true");
  const [iconViewState, setIconViewState] = useState(true);

  const [dragState, setDragState] = useState(null);
  const [dragPoints, setDragPoints] = useState(null);
  const [dragXY, setDragXY] = useState(null);

  console.log('checking initial props', props, annotationProps, contextValue.tableauExt.settings.get('editMode')); 

  const extensionName = window.name;
  const extensionParent = window.parent;
  const extensionZoneId = window.name.substring(window.name.lastIndexOf("_")+1)
  // console.log('window', window.TableauExtension['components'], window, extensionName, extensionParent, extensionZoneId, contextValue.config);
  // console.log('window', window.TableauExtension, annotationProps);

  const toggleVisibility = annotationID => {
    const existingAnnotation = _.find(annotationProps, (o) => { return o.id === annotationID });
    existingAnnotation.visibiity = ( existingAnnotation.visibiity || "yes" ) === "yes" ? "no" : "yes";
    const newAnnotationState = annotationProps.filter(o => { return o.id !== existingAnnotation.id });
    newAnnotationState.splice(existingAnnotation.id, 0, existingAnnotation);
       // save to tableau settings
    contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationState));
    // set config state to false so that the config window will show
    contextValue.tableauExt.settings.saveAsync().then(() => {
      // done we can close and move on
      props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
      console.log('toggle', annotationID, existingAnnotation);
    });
  }

  const deleteAnnotation = annotationID => {
    const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '/#/deleteAnnotation';
    const popUpOptions = {
      height: 250,
      width: 350,
    };

    // we need to write the selected annotation to settings so we can get it in the modal callback
    contextValue.tableauExt.settings.set('configState', false);
    contextValue.tableauExt.settings.set('annotationToDelete', annotationID);
    contextValue.tableauExt.settings.saveAsync().then(() => {
      // console.log('checking delete annotation', annotationID, popUpUrl);
      tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
        if (closePayload === 'false') {
          contextValue.tableauExt.settings.set('configState', true);
          contextValue.tableauExt.settings.saveAsync().then(() => {
            // done we can close and move on
            props.history.push('/viz');
            props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
            // console.log('checking props', props, props.history);
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
  };

  const annotationDragCallback = (dragProps, note, hXw) => {
    // fix placement of note or annotation if it is off screen
    console.log('we are in annotation drag end callback', dragProps, note, hXw);
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
    const subjectProps = (({width, height, radius, radiusPadding, innerRadius, outerRadius, depth, type, text, fill, fillOpacity}) => ({width, height, radius, radiusPadding, innerRadius, outerRadius, depth, type, text, fill, fillOpacity}))(noFunctionProps);
    let connectorProps = {};
    if ( noFunctionProps.points ) { connectorProps = (({points}) => ({points}))(noFunctionProps); }
    const { width, height, radius, radiusPadding, innerRadius, outerRadius, depth, type, text, fill, fillOpacity, points, ...noSubjectProps} = noFunctionProps;
    const newNoteState = {...note, ...noSubjectProps, subject: {...subjectProps}, connector: {...note.connector, ...connectorProps}};
    const newAnnotationState = annotationProps.filter(n => { return n.id !== dragState });
    newAnnotationState.push(newNoteState);
    
    // save to tableau settings
    console.log('drag ended - we are going to stringify', note, noSubjectProps, noFunctionProps, newAnnotationState, JSON.stringify(newAnnotationState));
    contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationState));
    contextValue.tableauExt.settings.saveAsync().then(() => {
      props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
      setDragState(null);
      setDragPoints(null);
      setDragXY(null);
      console.log('dragProps', contextValue.tableauExt.settings.getAll(), dragState, props.tableauSettings);
    });
  }

  const configureAnnotation = (e, typ) => {
    console.log('checking disable config and drag state', disableConfig, dragState);
    e.persist();
    const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '/#/annotation';
    const popUpOptions = {
      height: 700,
      width: 800,
    };
    if ( (disableConfig || typ !== "new") && !dragState ) {
      // now we check whether the annotation is new or exists
      let existingAnnotation;
      if ( typ !== "new" ) {
        existingAnnotation = _.find(annotationProps, (o) => { return o.id === e.target.id.replace('edit-button-','') });

        // now if we have an annotation found we will pre-populate the settings linked to the config
        if ( existingAnnotation ) { 
          
          // set config state to false so that the config window will show
          console.log('turning config off', contextValue.tableauExt.settings.get('configState')
            , (existingAnnotation.subject || {}).radius || "15"
            , (existingAnnotation.subject || {}).width
            , existingAnnotation.subject
            , existingAnnotation
            ,  false
          );
          contextValue.tableauExt.settings.set('configState', false);

          // first screen is annotation type
          contextValue.tableauExt.settings.set('annotationType', existingAnnotation.annotationType);

          // screen 2a is annotation color
          contextValue.tableauExt.settings.set('annotationColor', existingAnnotation.color);
          contextValue.tableauExt.settings.set('annotationStrokeWidth', existingAnnotation.strokeWidth || '1');
          contextValue.tableauExt.settings.set('annotationStrokeDasharray', existingAnnotation.dashArray || '0');
          contextValue.tableauExt.settings.set('annotationVisibility', existingAnnotation.visibility || 'yes');
          
          // screen 2b is connector props
          contextValue.tableauExt.settings.set('connectorType', (existingAnnotation.connector || {}).type || "line");
          contextValue.tableauExt.settings.set('connectorCurveString', (existingAnnotation.connector || {}).curveString || "curveCatmullRom");
          if ( !((( existingAnnotation.connector || {}).points) instanceof Array) ) {
            contextValue.tableauExt.settings.set('connectorCurvePoints', (existingAnnotation.connector || {}).points || "0");
          }
          contextValue.tableauExt.settings.set('connectorEnd', (existingAnnotation.connector || {}).end || "none");
          contextValue.tableauExt.settings.set('connectorEndScale', (existingAnnotation.connector || {}).endScale || "0");
          contextValue.tableauExt.settings.set('connectorDisable', (existingAnnotation.connector || {}).disable || "no");

          // screen 2c is note props
          contextValue.tableauExt.settings.set('annotationNoteTitle', (existingAnnotation.note || {}).title || "");
          contextValue.tableauExt.settings.set('annotationNoteTitleColor', (existingAnnotation.note || {}).titleColor || existingAnnotation.color);

          contextValue.tableauExt.settings.set('annotationNoteLabel', (existingAnnotation.note || {}).label || "");
          contextValue.tableauExt.settings.set('annotationNoteLabelColor', (existingAnnotation.note || {}).labelColor || existingAnnotation.color);

          contextValue.tableauExt.settings.set('annotationNotePadding', (existingAnnotation.note || {}).padding || "5");
          contextValue.tableauExt.settings.set('annotationNoteWrap', (existingAnnotation.note || {}).wrap || "120");
          contextValue.tableauExt.settings.set('annotationNoteBgPadding', (existingAnnotation.note || {}).bgPadding || "0");

          // note alignment props
          contextValue.tableauExt.settings.set('annotationNoteOrientation', (existingAnnotation.note || {}).orientation || "topBottom");
          contextValue.tableauExt.settings.set('annotationNoteLineType', (existingAnnotation.note || {}).lineType || "null");
          contextValue.tableauExt.settings.set('annotationNoteAlign', (existingAnnotation.note || {}).align || "dynamic");
          contextValue.tableauExt.settings.set('annotationNoteTextAnchor', (existingAnnotation.note || {}).textAnchor || "null");
          contextValue.tableauExt.settings.set('annotationNoteDisable', (existingAnnotation.note || {}).disable || "no");
          
          // subject props
          contextValue.tableauExt.settings.set('annotationSubjectFill', (existingAnnotation.subject || {}).fill || "#FFF");
          contextValue.tableauExt.settings.set('annotationSubjectFillOpacity', (existingAnnotation.subject || {}).fillOpacity || "0");
          contextValue.tableauExt.settings.set('annotationSubjectRadius', (existingAnnotation.subject || {}).radius || "0");
          contextValue.tableauExt.settings.set('annotationSubjectRadiusPadding', (existingAnnotation.subject || {}).radiusPadding || "0");
          contextValue.tableauExt.settings.set('annotationSubjectInnerRadius', (existingAnnotation.subject || {}).innerRadius || "0");
          contextValue.tableauExt.settings.set('annotationSubjectOuterRadius', (existingAnnotation.subject || {}).outerRadius || "0");

          contextValue.tableauExt.settings.set('annotationSubjectWidth', (existingAnnotation.subject || {}).width || "0");
          contextValue.tableauExt.settings.set('annotationSubjectHeight', (existingAnnotation.subject || {}).height || "0");
          contextValue.tableauExt.settings.set('annotationSubjectDepth', (existingAnnotation.subject || {}).depth || "0");

          contextValue.tableauExt.settings.set('annotationSubjectBracketType', (existingAnnotation.subject || {}).type || "curly");
          contextValue.tableauExt.settings.set('annotationSubjectBadgeText', (existingAnnotation.subject || {}).text || "");
          contextValue.tableauExt.settings.set('annotationSubjectDisable', (existingAnnotation.subject || {}).disable || "no");

          contextValue.tableauExt.settings.saveAsync().then(() => {
            console.log('existing annotations writter to settings', props.tableauSettings);
            tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
              if (closePayload === 'false') {
                // we can now write the updates back to the annotation array and persist to tableau
                existingAnnotation.annotationType = contextValue.tableauExt.settings.get('annotationType');
                existingAnnotation.color = contextValue.tableauExt.settings.get('annotationColor');
                existingAnnotation.strokeWidth = contextValue.tableauExt.settings.get('annotationStrokeWidth');
                existingAnnotation.dashArray = contextValue.tableauExt.settings.get('annotationStrokeDasharray');
                existingAnnotation.visibility = contextValue.tableauExt.settings.get('annotationVisibility');

                // there might be a better way
                if ( !existingAnnotation.connector ) { existingAnnotation.connector = {}; }
                existingAnnotation.connector.type = contextValue.tableauExt.settings.get('connectorType');
                existingAnnotation.connector.curveString = contextValue.tableauExt.settings.get('connectorCurveString');
                if ( !((( existingAnnotation.connector || {}).points) instanceof Array) || ((( existingAnnotation.connector || {}).points) instanceof Array && existingAnnotation.connector.points.length !== parseFloat(contextValue.tableauExt.settings.get('connectorCurvePoints')))) {
                  existingAnnotation.connector.points = parseFloat(contextValue.tableauExt.settings.get('connectorCurvePoints'));
                }
                existingAnnotation.connector.end = contextValue.tableauExt.settings.get('connectorEnd');
                existingAnnotation.connector.endScale = parseFloat(contextValue.tableauExt.settings.get('connectorEndScale'));
                existingAnnotation.connector.disable = contextValue.tableauExt.settings.get('connectorDisable');

                // update the note if we got new settings
                if ( !existingAnnotation.note ) { existingAnnotation.note = {}; }
                existingAnnotation.note.title = contextValue.tableauExt.settings.get('annotationNoteTitle');
                existingAnnotation.note.titleColor = contextValue.tableauExt.settings.get('annotationNoteTitleColor');
                existingAnnotation.note.label = contextValue.tableauExt.settings.get('annotationNoteLabel');
                existingAnnotation.note.labelColor = contextValue.tableauExt.settings.get('annotationNoteLabelColor');

                existingAnnotation.note.padding = parseFloat(contextValue.tableauExt.settings.get('annotationNotePadding'));
                existingAnnotation.note.wrap = parseFloat(contextValue.tableauExt.settings.get('annotationNoteWrap'));
                existingAnnotation.note.bgPadding = parseFloat(contextValue.tableauExt.settings.get('annotationNoteBgPadding'));
                
                existingAnnotation.note.orientation = contextValue.tableauExt.settings.get('annotationNoteOrientation');
                existingAnnotation.note.lineType = contextValue.tableauExt.settings.get('annotationNoteLineType') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteLineType');
                existingAnnotation.note.align = contextValue.tableauExt.settings.get('annotationNoteAlign');
                existingAnnotation.note.textAnchor = contextValue.tableauExt.settings.get('annotationNoteTextAnchor') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteTextAnchor');
                existingAnnotation.note.disable = contextValue.tableauExt.settings.get('annotationNoteDisable');
                
                // update the subject if we got new settings
                if ( !existingAnnotation.subject ) { existingAnnotation.subject = {}; }                
                existingAnnotation.subject.fill = contextValue.tableauExt.settings.get('annotationSubjectFill');
                existingAnnotation.subject.fillOpacity = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectFillOpacity'));      
                existingAnnotation.subject.radius = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadius'));
                existingAnnotation.subject.radiusPadding = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadiusPadding'));
                existingAnnotation.subject.innerRadius = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectInnerRadius'));
                existingAnnotation.subject.outerRadius = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectOuterRadius'));

                existingAnnotation.subject.width = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectWidth'));
                existingAnnotation.subject.height = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectHeight'));
                existingAnnotation.subject.depth = parseFloat(contextValue.tableauExt.settings.get('annotationSubjectDepth'));

                existingAnnotation.subject.type = contextValue.tableauExt.settings.get('annotationSubjectBracketType');
                existingAnnotation.subject.text = contextValue.tableauExt.settings.get('annotationSubjectBadgeText');
                existingAnnotation.subject.disable = contextValue.tableauExt.settings.get('annotationSubjectDisable');

                // this should be equal to existingAnnotation which is now updates
                // const newNoteState = {...note, ...noFunctionProps, ...{subject: subjectProps}}
                const newAnnotationState = annotationProps.filter(n => { return n.id !== existingAnnotation.id });
                newAnnotationState.splice(existingAnnotation.id, 0, existingAnnotation);
                console.log('do we get existing annotation', existingAnnotation, existingAnnotation.color, props.tableauSettings.annotationColor, props.tableauExt.settings.get('annotationColor'));

                
                // save to tableau settings
                contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationState));

                // set config state to false so that the config window will show
                console.log('turning config on', contextValue.tableauExt.settings.get('configState'), true, popUpUrl);
                contextValue.tableauExt.settings.set('configState', true);
                contextValue.tableauExt.settings.saveAsync().then(() => {
                  // done we can close and move on
                  props.history.push('/viz');
                  props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
                  console.log('checking props', props, props.history);
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

        // set config state to false so that the config window will show
        console.log('turning config off', contextValue.tableauExt.settings.get('configState'), false);
        contextValue.tableauExt.settings.set('configState', false);
        contextValue.tableauExt.settings.set('configNewAnnotation', true);
        contextValue.tableauExt.settings.saveAsync().then(() => {

          tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
            if (closePayload === 'false') {
              const newAnnotationArray = annotationProps;
              const newAnnotationId = uuid.v4();
              newAnnotationArray.push({
                // we can now write the updates back to the annotation array and persist to tableau
                annotationType: contextValue.tableauExt.settings.get('annotationType'),
                color: contextValue.tableauExt.settings.get('annotationColor'),
                strokeWidth: contextValue.tableauExt.settings.get('annotationStrokeWidth'),
                dashArray: contextValue.tableauExt.settings.get('annotationStrokeDasharray'),
                visibility: contextValue.tableauExt.settings.get('annotationVisibility'),
                key: newAnnotationId, 
                id: newAnnotationId,
                x: e.clientX,
                y: e.clientY,
                dx: contextValue.tableauExt.settings.get('annotationType') === 'AnnotationBracket' ? 0 : 100,
                dy: contextValue.tableauExt.settings.get('annotationType') === 'AnnotationBracket' ? 0 : 100,
                connector: {
                  type: contextValue.tableauExt.settings.get('connectorType'),
                  curveString: contextValue.tableauExt.settings.get('connectorCurveString'),
                  points: parseFloat(contextValue.tableauExt.settings.get('connectorCurvePoints')),
                  end: contextValue.tableauExt.settings.get('connectorEnd'),
                  endScale: parseFloat(contextValue.tableauExt.settings.get('connectorEndScale')),
                  disable: contextValue.tableauExt.settings.get('connectorDisable')
                },
                note: { 
                  title: contextValue.tableauExt.settings.get('annotationNoteTitle'), 
                  titleColor: contextValue.tableauExt.settings.get('annotationNoteTitleColor'),
                  label: contextValue.tableauExt.settings.get('annotationNoteLabel'),
                  labelColor: contextValue.tableauExt.settings.get('annotationNoteLabelColor'), 
                  padding: parseFloat(contextValue.tableauExt.settings.get('annotationNotePadding')),
                  wrap: parseFloat(contextValue.tableauExt.settings.get('annotationNoteWrap')),
                  bgPadding: parseFloat(contextValue.tableauExt.settings.get('annotationNoteBgPadding')),
                  orientation: contextValue.tableauExt.settings.get('annotationNoteOrientation'),
                  lineType: contextValue.tableauExt.settings.get('annotationNoteLineType') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteLineType'),
                  align: contextValue.tableauExt.settings.get('annotationNoteAlign'),
                  textAnchor: contextValue.tableauExt.settings.get('annotationNoteTextAnchor') === "null" ? null : contextValue.tableauExt.settings.get('annotationNoteTextAnchor'),
                  disable: contextValue.tableauExt.settings.get('annotationNoteDisable')
                },
                subject: {
                  fill: contextValue.tableauExt.settings.get('annotationSubjectFill'),
                  fillOpacity: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectFillOpacity')),
                  radius: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadius')),
                  radiusPadding: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectRadiusPadding')),
                  innerRadius: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectInnerRadius')),
                  outerRadius: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectOuterRadius')),
                  width: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectWidth')),
                  height: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectHeight')),
                  depth: parseFloat(contextValue.tableauExt.settings.get('annotationSubjectDepth')),
                  type: contextValue.tableauExt.settings.get('annotationSubjectBracketType'),
                  text: contextValue.tableauExt.settings.get('annotationSubjectBadgeText'),
                  disable: contextValue.tableauExt.settings.get('annotationSubjectDisable')
                }    
              });
              
              // save to tableau settings
              contextValue.tableauExt.settings.set('annotationData', JSON.stringify(newAnnotationArray));
              
              // set config state to false so that the config window will show
              console.log('turning config on', contextValue.tableauExt.settings.get('configState'), true);
              contextValue.tableauExt.settings.set('configState', true);
              contextValue.tableauExt.settings.set('configNewAnnotation', false);
              contextValue.tableauExt.settings.saveAsync().then(() => {
                // done we can close and move on
                props.history.push('/viz')
                props.updateTableauSettings(contextValue.tableauExt.settings.getAll());
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
  // const options = {
  //   ignoreAliases: false,
  //   ignoreSelection: true,
  //   maxRows: 0
  // };

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
  //   if ( props.tableauSettings.annotationShowControls === "no" ) {
  //     if ( editMode ) setEditMode(false);
  //   }
  // });

  let iconJSX;
  if ( iconViewState && props.tableauSettings.annotationShowControls === "yes" ) {
    iconJSX =
      <div
        style={{
          top: '5px',
          position: "absolute",
          zIndex: 999,
          pointerEvents: 'auto'
        }} 
        className="annotation-controls"
      >
        <Grid container justify="center">
          <Grid item xs={6}>
            <Tooltip title={`Toggle Add Annotation Mode`} placement="right">
              <IconButton onClick={() => {
                contextValue.tableauExt.settings.set('disableConfig', !disableConfig);
                contextValue.tableauExt.settings.saveAsync().then(() => {
                  setDisableConfig(!disableConfig)
                });
              }}>
                  <LibraryAdd
                    color={disableConfig ? "secondary" : "action"}
                  />
              </IconButton>
            </Tooltip>
            <br />
            <Tooltip title={`Toggle Edit Mode`} placement="right">
              <IconButton onClick={() => {
                contextValue.tableauExt.settings.set('editMode', !editMode);
                contextValue.tableauExt.settings.saveAsync().then(() => {
                  setEditMode(!editMode)
                });
              }}>
                  <Edit
                    color={editMode ? "secondary" : "action"}
                  />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    }

    if ( props.tableauSettings.annotationShowControls === "no" ) {
      // if we are not showing controls, don't enable edit mode
      if ( editMode ) setEditMode(false);
    }


  return (
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        {/* <TypesUI /> */}
      <div 
        className="Annotation-Div"
        onMouseEnter={() => { setIconViewState(true)}}
        onMouseLeave={() => {setIconViewState(false)}}
        style={{
          display: "block", 
          background: editMode ? 'rgba(255,255,255,0.4)' : 'none transparent',
          // pointerEvents: editMode ? 'auto' : 'none',
          width: 'inherit',
          height: 'inherit'
        }}
      >
        {iconJSX}
        <svg
          id={`tableau-react-annotation-layer`}
          height={'100%'}
          width={'100%'}
          style={{
            position: 'relative',
            cursor: disableConfig ? "copy" : "default"
          }}
          onClick={e => configureAnnotation(e,'new')}
        >
          {annotationProps.map(note => {
            const NoteType = Annotations[note.annotationType];
            const disableArray = [];
            if ( note.connector.disable === "yes" ) disableArray.push('connector');
            if ( note.note.disable === "yes" ) disableArray.push('note');
            if ( note.subject.disable === "yes" ) disableArray.push('subject');
            note.connector.curve = note.connector.type === "curve" ? Curves[note.connector.curveString] || curveCatmullRom : null;
            console.log('checking note', note, disableArray);
            return (
              <React.Fragment key={`fragment-${note.id}`}>
                {((note.visibiity || "yes") === "yes" || editMode) && 
                <NoteType
                  key={`annotation-${note.id}`}
                  className={`annotation-text-anchor-${(note.note || {}).textAnchor || 'none'} annotation-dash-${note.dashArray} annotation-stroke-${note.strokeWidth}`}
                  events={{
                    // we can use this event to handle when the annotation is clicked
                    // and then when clicked we can update the annotation vs create a new one
                    onClick: (props, state, event) => {
                      console.log('annotation onClick event', props, state, event);
                    }
                  }}
                  onDragStart={() => setDragState(note.id)}
                  onDrag={(dragProps) => { 
                    setDragPoints({[note.id]:  dragProps.points});
                    setDragXY({[note.id]: [dragProps.x, dragProps.y, dragProps.dx, dragProps.dy]})
                    console.log('dragging', dragProps, dragPoints, dragXY);  
                  }}
                  onDragEnd={(dragProps) => { 
                    const hXw = [document.getElementById('tableau-react-annotation-layer').parentNode.clientHeight, document.getElementById('tableau-react-annotation-layer').parentNode.clientWidth];
                    annotationDragCallback(dragProps, note, hXw);
                  }}
                  {...note}
                  editMode={editMode}
                  connector={{...note.connector, points: dragPoints && dragPoints instanceof Object && dragPoints[note.id] ? dragPoints[note.id] : note.connector.points || 0 }}
                  x={dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][0] : note.x}
                  y={dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][1] : note.y}
                  dx={dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][2] : note.dx}
                  dy={dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][3] : note.dy}
                  disable={disableArray}
                />
                }
                { // edit icon obtained from material ui
                  editMode && 
                  <React.Fragment>
                    <svg 
                      viewBox="0 0 24 24"
                      key={`edit-button-${note.id}`}
                      id={`edit-button-${note.id}`}
                      fill={note.color || "#767676"}
                      width="18"
                      height="18"
                      x={note.x+15+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][0] - note.x : 0)}
                      y={note.y-11+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][1] - note.y : 0)}
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
                      x={note.x-32+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][0] - note.x : 0)}
                      y={note.y-10+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][1] - note.y : 0)}
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
                    { (note.visibiity || "yes") === "yes" &&
                      <svg
                        viewBox="0 0 24 24"
                        key={`visibility-button-${note.id}`}
                        id={`visibility-button-${note.id}`}
                        fill={note.color || "#767676"}
                        width="18"
                        height="18"
                        x={note.x-10+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][0] - note.x : 0)}
                        y={note.y+15+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][1] - note.y : 0)}
                        >
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        <rect 
                          id={`visibility-button-${note.id}`} 
                          style={{
                            cursor: 'pointer',
                            stroke: '#fff',
                            fill: '#fff',
                            fillOpacity: 0,
                            strokeOpacity: 0
                          }} 
                          width="24" height="24" 
                          onClick={e => {
                            console.log('you clicked on visibiity toggle', e.target.id,  e.target.id.replace('visibility-button-',''));
                            toggleVisibility(e.target.id.replace('visibility-button-',''));
                          }}                        
                        />
                      </svg>
                    }
                    { (note.visibiity || "yes") === "no" &&
                      <svg
                      viewBox="0 0 24 24"
                      key={`no-visibility-button-${note.id}`}
                      id={`no-visibility-button-${note.id}`}
                      fill={ "#dc004e" }
                      width="18"
                      height="18"
                      x={note.x-10+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][0] - note.x : 0)}
                      y={note.y+15+(dragXY && dragXY instanceof Object && dragXY[note.id] ? dragXY[note.id][1] - note.y : 0)}
                    >
                      <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      <rect 
                          id={`no-visibility-button-${note.id}`} 
                          style={{
                            cursor: 'pointer',
                            stroke: '#fff',
                            fill: '#fff',
                            fillOpacity: 0,
                            strokeOpacity: 0
                          }} 
                          width="24" height="24" 
                          onClick={e => {
                            console.log('you clicked on visibiity toggle', e.target.id,  e.target.id.replace('no-visibility-button-',''));
                            toggleVisibility(e.target.id.replace('no-visibility-button-',''));
                          }}                        
                        />
                    </svg>
                    }
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