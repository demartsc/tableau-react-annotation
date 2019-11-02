# Annotate All The (Tableau)Things!
### Layering React Annotation on top of Tableau

## Introduction

![React Annotation in Tableau Image](./docs/D1-Annotations.gif)

This is the tableau extension that allows you to layer [Susie Lu's](https://twitter.com/datatoviz?lang=en) [react-annotation](https://react-annotation.susielu.com/) library on top of Tableau. When you add this to your dashboard (you will likely want to cover your entire dashboard with it) you can leverage the majority of annotation types and options available in [react-annotation](https://react-annotation.susielu.com/) directly within Tableau. We have built a simple configuration UI that you can take advantage of to be able annotate your viz to your heart's delight. 

This extension is supported on **Tableau Desktop >=2018.3** and **Tableau Server**. It works best when deployed directly on to the Tableau Server you are using and the content of the extensions is also viewable on **Tableau Mobile**.

## Env Requirements
Tableau Desktop >= 2018.2 and Tableau Server >= 2018.2

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) along with [StarSchema](https://starschema.com/) & [DataBlick's](https://www.datablick.com/) **Tableau Extension Framework**.

## Quick Start
#### Step 1: Locate Annotate All The (Tableau) Things on the community extensions page

Note: If you want the best experience, you should deploy a compiled version of this code directly to your Tableau Server and point your .trex file to that deployment of the extension. 

#### Step 2: Click ‘Allow’ to permit the extension to run.

![Allow Extension in Desktop Image](./docs/Allow-extension.png)

#### Step 3: Cover your Dashboard with the Extension Object.

## Creating a Tableau Extension via `create-tableau-extension`
The easiest way to create a new Tableau Extension is by using `create-tableau-extension` tool from NPM.

Installation:

```sh
npm install -g create-tableau-extension
or
yarn global add create-tableau-extension
```

Then you simply run `create-tableau-extension` command from your work folder and an interactive terminal will guild you throw the process.

## Available Scripts

In the project directory, you can run: 

### `yarn install`

Installs all the dependencies.

### `yarn start`

Make sure you have a correct name, description and version inside the `package.json` file. 

**Note!** If you try running this project after cloning it, you may have to remove the # from the name before the run.

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Configuration
The main entry point of customization is the `src/extension_assets` folder.

### Creating a custom splash screen

To create a custom splash screen (front screen of your extension) you have to modify the `src/extension_assets/splash/index.js` file. 

Note the `Button` component on the 29th row:
```js
   <Button 
      value="Configure"
      onClick={props.onClick}
      style={buttonStyle}
    />
```
This is the config window laucher. You can change the style and the text value as you want, but let the `onClick` method as it is right now. This callback method tells the Extension to launch the config window.

### Creating the custom viz

To implement your custom vizualization you have to edit the `src/extension_assets/viz/index.js`.

In the file you can see an exaple how to pull data from the dashboard.

### Configuration wizard
Here are the types of available configuration layouts. You can set or configure the configuration steps inside the `src/extension_assets/stepperConfig.js` file. 

There is a `steps` attributes which contains the used layouts in the order. You can have multiple steps from one layout type. 
#### Sheet selector layout
- `"type": "sheet_selector"`

This is a very basic layout which allows to select one or two datasheet.

If you want to use two datasheet you have to set allowMultiSheets property to true.

`"allowMultiSheets": true`

You can overwrite specific labels by setting these values inside the `overwrites` object:
- `add_other_datasheet` - Default: **Add another datasheet**
- `add_sheet` - Default: **Add sheet**
- `revert` - Default: **Revert**

#### Drag and Drop options

- `"type": "drag_and_drop"`

The Drag and Drop screen can be configured via a json-like javascript object. You can find an example under `src/extension_assets/stepperConfig.js`. Feel free to modify it. 

First you have to add columns. The first column should be a `measures` type one. This will contain the field names from the selected sheet.

The following two should be `options` type. They will contain the drop areas. 

You have to configure the `drop_area` as well. Currently we are supporting `single_drop` type only. 

Last thing you have to configure the column render order.

#### Custom viz options 
- `"type": "viz_options"`

You have the opportunity to add custom configuration (e.g.: text inputs, dropdown select). In order to set up this config layout you have to edit the `src/extension_assets/stepperConfig.js` file. You can define option groups. In each group you have to add input fields. We are supporting the following input types:
* Text input - `text`
* Checkbox - `check`
* Radio buttons - `radio`
* Dropdown select - `dropdown`

You can find exaples of each and every type inside the `src/extension_assets/stepperConfig.js` file. 

#### Custom config layout
- `"type": "custom"`

You can define custom config layout as well. In order to create one you have to import the component into the `src/extension_assets/stepperConfig.js` file and define a new step with `custom` type. You have to pass this component to the `component` property. You can define component props under `props` key. 


#### Summary layout
- `"type": "summary"`

There is a overview page for development purposes only called Summary Layout. This view diplays the previously set up options. 

### The `name` property
As you can see in the example config there are `name` attributes specified. This name attribut is goint to be the *key* inside the Tableau Settings object and the selected or given value will be the *value* of this key. 

**Note!** Tableau stores everything as a string. If you need to store complex data structures, like arrays or objects, you have to stringify it first. 

### Custom css syle

You can define custom styling options, like `font-family` by editing `src/extension_assets/extension.css`. 
You can define your own color schemes as well by editing the `src/extension_assets/style.js` file. 

### Custom logo

You are able to use your own brand logo inside the extension. The only thing you have to do is edit the `src/index.js` file, and import your logo like so:
```js
import brandLogo from './extension_assets/logo.png';
```

## Hosting
To create a build version of the extension you have to build it first.

```bash
yarn run build
```

This command will create a new folder called `build` and generates all the necessary files. You can simply upload the files into a server or S3 and put it under a public domain, and you are ready to use it or share it. 

### Hosting under subfolder
If you want to host your extension under a specific subfolder, you have to specify the folder structure in the `package.json` file under the `homepage` key.

```json
{
  "name": "BestExtension",
  "description": "Awesome extension",
  "version": "0.0.1",
  "homepage": "/path/to/subdir",
  "private": true,
  ...
```