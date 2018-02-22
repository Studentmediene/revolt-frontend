# kapina-frontend
Frontend for radiorevolt.no

[![Build Status](https://travis-ci.org/Studentmediene/kapina-frontend.svg?branch=master)](https://travis-ci.org/Studentmediene/kapina-frontend)

## Setup

This project requires [Node](https://nodejs.org/en/download/ "Node download") v8.1.0+ and npm v5.3.0. npm comes bundled with Node.

To install all dependencies run
```
npm install
```

Then serve the webapp by running
```
npm start
```

To get content for the webpage (not just the skeleton) follow the readme at [github.com/Studentmediene/kapina-backend](https://github.com/Studentmediene/kapina-backend).

It's also possible to use the production backend directly by starting the project with `PRODUCTION_API=true` like this:

`PRODUCTION_API=true npm start`

## Branch naming
All branches must be named `<type>/<JIRA id>-<description>`
* See below for different `<type>`s available
* `<JIRA id>` Corresponding issue ID on the JIRA project page
* `<description>` Short description of the issue, use dash (-) as spaces

Example: `feat/023-refactor-store-page`

### Branch types
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, npm, Travis)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests
