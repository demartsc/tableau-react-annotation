/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { Component } from 'react';
import './Extension.css';

import { Route } from "react-router-dom";
import _ from 'lodash';

import {tableau} from './tableau-extensions-1.latest';

import { withRouter } from 'react-router-dom'
import Viz from './extension_assets/viz';
import Splash from './extension_assets/splash';
import DeleteAnnotation from './extension_assets/annotationDelete';

const Configuration = window.TableauExtension['Configuration'];
const ExtensionContext = window.TableauExtension['contexts']['ExtensionContext'];
const SettingsContext = window.TableauExtension['contexts']['SettingsContext'];
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

  }

  deleteAnnotation = annotationID => {
    // remove annotation from array
    const newAnnotationArray = _.remove(JSON.parse(this.state.config.tableauExt.settings.get('annotationData'),(o) => { return o.id === annotationID }));
    console.log('we are deleting an annotation', annotationID, newAnnotationArray);

    // set new array back to settings
    this.state.config.tableauExt.settings.set('annotationData',JSON.stringify(newAnnotationArray));
    this.state.config.tableauExt.settings.saveAsync().then(()=>{
      // update internal settings with new tableau settings
      this.updateTableauSettings(this.state.config.tableauExt.settings.getAll());
    });
  }

  configure = () => {
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

  updateTableauSettings = (newSettings) => {
    this.setState({
      config: {
        ...this.state.config,
        tableauSettings: newSettings
      }
    });
  }

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
    }, (err) => {
      // Something went wrong in initialization
      console.log('Error while Initializing: ' + err.toString());
    });
  }

  render() {
    console.log('checking state', this.state, this.props.extensionIcons);
    return (
      <div className="App">
        {
          this.state.extensionReady 
          &&
          <SettingsContext.Provider value={this.state.settings}>
            <ExtensionContext.Provider value={this.state.config}>
              <React.Fragment>
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
                <Route exact path="/deleteAnnotation" render={(props) => 
                  <DeleteAnnotation
                    onClick={this.deleteAnnotation}
                    logo={this.props.logo}
                  />}
              />
                <Route exact path="/viz" render={(props) =>
                  <Viz
                    extensionIcons={this.props.extensionIcons} 
                    sheetNames={this.state.config.sheetNames}
                    tableauSettings={this.state.config.tableauSettings}
                    tableauExt={this.state.config.tableauExt}
                    updateTableauSettings={this.updateTableauSettings}
                    deleteAnnotation={this.deleteAnnotation}
                  />}
                />
              </React.Fragment>
            </ExtensionContext.Provider>
          </SettingsContext.Provider>
        }
      </div>
    );
  }
}

export default withRouter(App);
