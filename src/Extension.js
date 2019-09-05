/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { Component } from 'react';
import './Extension.css';

import { Route } from "react-router-dom";

import {tableau} from './tableau-extensions-1.latest';

import { withRouter } from 'react-router-dom'
import Viz from './extension_assets/viz';
import Splash from './extension_assets/splash';

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
                    extensionIcons={this.props.extensionIcons} 
                    sheetNames={this.state.config.sheetNames}
                    tableauSettings={this.state.config.tableauSettings}
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
