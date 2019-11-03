// Copyright (c) 2019 Chris DeMartini
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

  deleteAnnotation = () => {
    // remove annotation from array
    const annotationToDelete = this.state.config.tableauExt.settings.get('annotationToDelete');
    const annotationArray = JSON.parse(this.state.config.tableauExt.settings.get('annotationData'));
    const newAnnotationArray = _.filter(annotationArray,(o) => { console.log('checking object', o.id, annotationToDelete); return o.id !== annotationToDelete });
    console.log('we are deleting an annotation', annotationToDelete, newAnnotationArray);

    // set new array back to settings
    this.state.config.tableauExt.settings.set('annotationData',JSON.stringify(newAnnotationArray));
    this.state.config.tableauExt.settings.set('annotationToDelete','');
    this.state.config.tableauExt.settings.saveAsync().then(()=>{
      // update internal settings with new tableau settings
      this.state.config.tableauExt.ui.closeDialog("false");
    });
  }

  configure = () => {
    // this will bring up the viz
    if ( this.state.config.tableauExt.settings.get('configState') === "true" ) {
      this.state.config.tableauExt.settings.set('configState', 'false');
      // if we are in pass through mode we need to revert if configured
      // this is really our only escape from pass through mode
      if ( this.state.config.tableauExt.settings.get('annotationPassThroughMode') === "yes" ) {
        const extensionParent = window.parent;
        const extensionZoneId = window.name.substring(window.name.lastIndexOf("_")+1)
        const extensionParentDiv = extensionParent.document.getElementById(`tabZoneId${extensionZoneId}`);
        extensionParentDiv.style.pointerEvents = "auto";
        window.document.body.style.pointerEvents = "auto";
        this.state.config.tableauExt.settings.set('annotationPassThroughMode', 'no');
      }
      this.state.config.tableauExt.settings.set('annotationPassThroughMode', 'no');
      this.state.config.tableauExt.settings.set('annotationShowControls', 'yes');
      this.state.config.tableauExt.settings.saveAsync().then(()=>{
        this.props.history.push('/')
      });
    } else {
      this.state.config.tableauExt.settings.set('configState', 'true');
      this.state.config.tableauExt.settings.saveAsync().then(()=>{
        this.props.history.push('/viz')
      });  
    }

    // may be better to render a config box so that it will display if user clicks config

    // const popUpUrl = window.location.origin + process.env.PUBLIC_URL + '#/configure';
    // const popUpOptions = {
    //   height: 625,
    //   width: 790,
    // };

    // tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
    //   if (closePayload === 'false') {
    //     this.props.history.push('/viz')
    //   }
    // }).catch((error) => {
    //   // One expected error condition is when the popup is closed by the user (meaning the user
    //   // clicks the 'X' in the top right of the dialog).  This can be checked for like so:
    //   switch(error.errorCode) {
    //     case window.tableau.ErrorCodes.DialogClosedByUser:
    //       // log("closed by user")
    //       break;
    //     default:
    //       console.error(error.message);
    //   }
    // });
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
      if ( this.state.config.tableauExt.settings.get('configState') === 'true' ) {
        console.log('we are mounting now', this.state.config.tableauExt.settings.get('configState'));
        this.props.history.push('/viz');
      }
    }, (err) => {
      // Something went wrong in initialization
      console.log('Error while Initializing: ' + err.toString());
    });
  }

  render() {
    console.log('checking state', this.state);
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
                    history={this.props.history}
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
