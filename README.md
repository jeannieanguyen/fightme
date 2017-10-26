# The Quacken
The Quacken is a boilerplate web application, meant to be a starting point for Victorious projects.  It is built using React for UI/views, Redux for state management, and Redux-Observable/RxJS to handle async actions (Thunk is also available if required).  The project is organized following the [Ducks Modular](https://github.com/alexnm/re-ducks) pattern, which provides a consistent way for redux components to interface with the rest of the app.

# Prerequisites
---

Version numbers are provided for reference, but may not need to match exactly.

Front-end:

* **nodejs** ~6.2
* **npm** ~3.8.9

# app
---

* **Run `npm install` to initialize this module and install dependencies.**
* **Run `npm start` to start a local dev server on port 3000.**

The app consists of a node/npm project that builds the application bundle that is ultimately served
to browsers. Dependencies are managed with npm and build processes are exposed through npm scripts.

| Command                                      | Action                                                                               |
| :------------------------------------------- | :----------------------------------------------------------------------------------- |
| ```npm start```                              | Start local dev server (port 3000) using services on remote dev server               |
| ```npm run dev```              | Start local dev server (port 3000) connected to dev api server |
| ```npm run bundle```                         | Compile app bundle with minifcation OFF and debugging output ON                      |
| ```npm run dev_build```  | Compile app bundle with minifcation ON and debugging output OFF (for dev deployment)     |
| ```npm run prod_build```  | Compile app bundle with minifcation ON and debugging output OFF (for prod deployment)     |
| ```npm run clean```                          | Remove all build files.                                                              |
| ```npm test```                          | Run test suite, generate code coverage report                                  |
| ```npm run tdd```                          | Run test suite in watch mode, will rerun on every save.               |
| ```npm run lint```                          | Run linter on project.               |
| ```npm run spawn_duck```                          | Creates a new duck folder with boilerplate. See below for details|
| ```npm run spawn_view```                          | Creates a react component file with boilerplate. See below for details|


NOTE: dev builds are generated automatically once code is committed.

* **default**: Development mode, services running on local api server.

This setting is used by webpack.config.js which controls minification and optimization and by src/config.js which controls
settings used by the front-end app (such as the service base URL).

### Core libraries

This is a single-page application using the following core libraries:

* **[React](http://facebook.github.io/react/index.html)**: Core DOM rendering and manipulation facilities. All web components are
  ES2017+JSX classes deriving from the React.Component class (and some function-based components for simpler widgets).
* **[Redux](https://github.com/reactjs/redux)**: Globally manages application state and state changes.
* **[React-Router](https://github.com/reactjs/react-router)**: Uses browser history API to manage "pages" and transitions between them.
  Browser address bar will update as if this was a traditional site.
* **Miscellaneous**: Other widget components like react-swipe. These can be swapped out or rewritten depending on visual requirements.

### Test Suite

This project has a starter test suite that consists of the following libraries/utilities:

- Mocha/Chai for running tests and making assertions
- Enzyme for easy React shallow rendering/syntax
- Sinon for mocks, stubs and spies
- Istanbul/NYC for code coverage reports

### Code Style

This project adheres to the [Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/react), for JavaScript and React, with certain exceptions outlined in the [Victorious Javascript Style Guide](https://github.com/Victorious/javascript).

### Stylesheets

Webpack has been configured to understand and translate SCSS/SASS stylesheets. Hot reloading has been enabled on the development
server, so styles can be updated without reloading or losing your place in the app. The main entry point for styles is src/styles/styles.scss.
Every other file included by this file will be bundled.

Note that styles are not linked from index.html, but rather they are referenced by src/app.js. Webpack recognizes the .scss
file extension and includes the styles as a dependency automatically using the SASS loader. Configuration of the loader is
controlled by webpack.config.js.

### Static content/assets

Files should be placed in the src/content/ folder under an appropriate sub-folder (e.g., content/fonts/, content/img/, etc.). When
linking to static files (either from HTML/JSX or from stylesheets) always use an absolute path: /content/img/foo.png. Without the
leading slash, the content may not be referenced properly when deployed to production.

### Spawning boilerplate
Spawn scripts simply copy `ducks/template` or `views/pages/template` into a new file so you can develop new redux or react modules with less boilerplate. 

#### Spawn Duck

`spawn_duck` can be used with a single argument which is the name of the new folder under ducks. If you do not specify an argument, you will be prompted to enter a name after. 

The following command will create actions epics, reducers, selectors, tests and type templates in `src/ducks/my_new_folder_name`.
 
```
npm run spawn_duck my_new_folder_name
```
**NOTE : Do not forget to add your new duck to the ducks/index file**

#### Spawn View

`spawn_view` does not take an argument. Instead, when run, it will prompt you first for the desired folder name under pages/views. This can be a new or existing folder. The script will then prompt you for the full filename including the '.js' extension.

**CAUTION : If the file already exists, it will be overridden.**
 
```
npm run spawn_view
```

### Key source files and folders

* **src/index.js**: Main entry point for the app. Renders the app into a div with id="root". This file sets up React, Redux, and
  any middleware libraries used, such as react-router.
* **src/routes.js**: All routes are specified here. To avoid conflicts, never use routes beginning with /api/ or /content/. All
  page-level components are referenced from this file. Routes have several optional attributes; see comments in routes.js for details.
* **src/config.js**: Environment-specific configuration settings available to the app at run-time. The top-level key in this file is
  chosen by the WEBPACK\_ENV environment variable when the app is compiled.
* **src/app.js**: The main app component renders the header, footer, page content (based on the selected route) and any global
  components such as error message boxes. The content to be displayed is passed from the router to this component via the "children"
  property.
* **src/ducks/**: Redux components, organized by feature. Each duck has its own actions, epics, reducers, selectors, tests, and types file that are exported through an index file.
* **src/views/**: React views/templates.
* **src/styles/**: All stylesheets live here, using whatever organization makes sense. Recommend separating stylesheets into files
  based on component.
