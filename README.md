# VRC Component Boilerplate
Victorious React Component - boilerplate for component, which has common styles stripped out into another repo

# Prerequisites
---

Version numbers are provided for reference, but may not need to match exactly.

Front-end:

* **nodejs** ~5.10
* **npm** ~3.8.5

# app
---

* **Run `npm install` to initialize this module.**

* **Make `config.js` file at the root of the src directory. example below.**

```
module.exports = {
    local: {
        apiBase: "http://local.getvictorious.com:8888"
    },
    dev: {
        apiBase: "http://dev.getvictorious.com"
    },
    qa: {
        apiBase: "http://qa.getvictorious.com"
    },
    stage: {
        apiBase: "https://staging.getvictorious.com"
    },
    production: {
        apiBase: "https://api.getvictorious.com"
    }
}


```

The app consists of a node/npm project that builds the application bundle that is ultimately served
to browsers. Dependencies are managed with npm and build processes are exposed through npm scripts.

| Command                                      | Action                                                                               |
| :------------------------------------------- | :----------------------------------------------------------------------------------- |
| ```npm start```                              | Start local dev server (port 3000) using services on remote dev server               |
| ```npm run dev```              | Start local dev server (port 3000) connected to dev api server |
| ```npm run qa```              | Start local dev server (port 3000) connected to qa api server |
| ```npm run stage```              | Start local dev server (port 3000) connected to stage api server |
| ```npm run prod```              | Start local dev server (port 3000) connected to prod api server |
| ```npm run bundle```                         | Compile app bundle with minifcation OFF and debugging output ON                      |
| ```npm run dev_build```  | Compile app bundle with minifcation ON and debugging output OFF (for dev deployment)     |
| ```npm run qa_build```  | Compile app bundle with minifcation ON and debugging output OFF (for qa deployment)     |
| ```npm run stage_build```  | Compile app bundle with minifcation ON and debugging output OFF (for stage deployment)     |
| ```npm run prod_build```  | Compile app bundle with minifcation ON and debugging output OFF (for prod deployment)     |
| ```npm run clean```                          | Remove all build files.                                                              |

NOTE: dev builds are generated automatically once code is committed.

* **default**: Development mode, services running on local api server.

This setting is used by webpack.config.js which controls minification and optimization and by src/config.js which controls
settings used by the front-end app (such as the service base URL).

### Core libraries

This is a single-page application using the following core libraries:

* **[React](http://facebook.github.io/react/index.html)**: Core DOM rendering and manipulation facilities. All web compnoents are
  ES2015+JSX classes deriving from the React.Component class (and some function-based components for simpler widgets).
* **[Redux](https://github.com/reactjs/redux)**: Globally manages application state and state changes.
* **[React-Router](https://github.com/reactjs/react-router)**: Uses browser history API to manage "pages" and transitions between them.
  Browser address bar will update as if this was a traditional site.
* **Miscellaneous**: Other widget components like react-swipe. These can be swapped out or rewritten depending on visual requirements.

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
* **src/pages/**: Contains components that render whole "pages" (everything between header and footer). These components are separated
  out into this folder for clarity.
* **src/components/**: Components that may be reused within multiple pages. Progress bars, spinners, special buttons, header, footer,
  overlays, etc.
* **src/actions/**: All redux actions should live here and should be exported in actions/index.js. Actions initiate application state
  changes, either immediately or after a network call.
* **src/reducers/**: All redux reducers should live here and should be exported in reducers/index.js. Reducers respond to actions and
  produce a new application state based on every action. See Redux and Flux documentation for best practices. In particular, state must
  never be mutated.
* **src/styles/**: All stylesheets live here, using whatever organization makes sense. Recommend separating stylesheets into files
  based on component.
* **src/data/**: Static metadata such as display strings.
