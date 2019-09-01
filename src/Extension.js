/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { Component } from 'react';
import './Extension.css';

import { Route } from "react-router-dom";

import {tableau} from './tableau-extensions-1.latest';

import { withRouter } from 'react-router-dom'
import Viz from './extension_assets/viz';
import Splash from './extension_assets/splash';

var Configuration = window.TableauExtension['Configuration'];
var ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];
var SettingsContext = window.TableauExtension['contexts']['SettingsContext'];
const tableauExt = window.tableau.extensions;


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      config: {},
      disableConfig: false,
      settings: {
        logo: props.logo,
        colors: props.colors,
      },
      extensionReady: false
    }

    this.configure = this.configure.bind(this);
  }

  configure () {
    const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '#/configure';
    const popUpOptions = {
      height: 625,
      width: 790,
    };

    tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
      if (closePayload === 'false') {
        this.props.history.push('/viz')
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

  disableConfigureAnnotation = () => {
    this.setState({
      disableConfig: true
    });
  }
  enableConfigureAnnotation = (p, s, e) => {
    console.log('we need to persist the drag results into tableau extension settings');
    console.log('annotation onDragEnd event', p, s, e);
    this.setState({
      disableConfig: false
    });
  }

  configureAnnotation = e => {
    if ( !this.state.disableConfig ) {
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
      console.log('checking state', ExtensionContext);

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
          this.props.history.push('/viz')
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

  componentDidMount () {
    tableauExt.initializeAsync({'configure': this.configure}).then(() => {
      this.setState({
        config: {
          dashboardName: tableauExt.dashboardContent.dashboard.name,
          dashboardSize: tableauExt.dashboardContent.dashboard.size,
          dashboardObjects: tableauExt.dashboardContent.dashboard.objects,
          sheetNames: tableauExt.dashboardContent.dashboard.worksheets,
          tableauSettings: tableauExt.settings.getAll(),
          tableauExt: tableauExt
        },
        extensionReady: true
      })
      console.log('extension state', this.state);
    }, (err) => {
      // Something went wrong in initialization
      console.log('Error while Initializing: ' + err.toString());
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.extensionReady 
          &&
          <SettingsContext.Provider value={this.state.settings}>
            <ExtensionContext.Provider value={this.state.config}>
              <div>
                <Route exact path="/" render={(props) =>
                  <Splash
                    onClick={this.configure}
                    logo={this.props.logo}
                  />}
                />
                <Route exact path="/configure" render={(props) => 
                  <Configuration 
                    extensionIcons={this.props.extensionIcons} 
                    colors={this.props.colors} 
                    stepperConfig={this.props.stepperConfig} 
                    tableauExt={tableauExt}
                    saveAsync={true}
                  />}
                />
                <Route exact path="/annotation" render={(props) => 
                  <Configuration 
                    extensionIcons={this.props.extensionIcons} 
                    colors={this.props.colors} 
                    stepperConfig={this.props.annotationConfig} 
                    tableauExt={tableauExt}
                    saveAsync={true}
                  />} 
                />
                <Route exact path="/viz" render={(props) =>
                  <Viz
                    sheetNames={this.state.config.sheetNames}
                    onConfig={this.configureAnnotation}
                    onConfigDisable={this.disableConfigureAnnotation}
                    onConfigEnable={this.enableConfigureAnnotation}
                  />}
                />
              </div>
            </ExtensionContext.Provider>
          </SettingsContext.Provider>
        }
      </div>
    );
  }
}

export default withRouter(App);
