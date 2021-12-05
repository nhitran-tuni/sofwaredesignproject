# This is Software Design project of group MNST
1. Nghia Duc Hong H292119
2. Duy Anh Vu H294381
3. Tran Thuy Phuong Nhi H291937
4. The Anh Nguyen H292126

# Demo
We have deployed a version to the Internet so that you can use without installing anything. We highly recommend to use the application on PCs and Laptops.  
You can also use the application on smart phones and tablets as well (Remember to use the application in landscape mode for better view :D ).  
The link to our application is https://software-design.herokuapp.com/

# Prerequisite
This section is related to running the applcation locally.  
The application requires NodeJS and a browser to operate. The latest version of Node can be found [here](https://nodejs.org/en/download/). Currently, Node version 14.x should be all good.
Minimal version requirements:
- NodeJS >= 11.0.0 (check: `node --version`)
- Chrome >= 69 or Firefox >= 62 or Edge >= 79  

Now, let's install the required packages.
1. Locate your terminal's directory to `frontend` folder and execute `npm install`
2. Locate your terminal's directory to `backend` folder and execute `npm install`
3. Locate your terminal's directory to the root folder of the project and also execute `npm install`

# How to run
To run the application locally, from the main project folder, run this script from your terminal
```
npm run start-dev
```
A web page will be automatically opened on your main browser.

# Language and framework used:
Both frontend and backend sides are developed using JavaScript. Below are the frameworks and libraries used in the project:  
**Frontend**
- ReactJS for building the UI in general
- Material-UI for the premade basic components
- DevExtreme Reactive for the charts
- d3 for time formating
- axios for HTTP request
- html-to-image and file-saver to save graph as PNG

**Backend**
- ExpressJS for building the server
- axios for HTTP request
- MomentJS for time handling
- Mongoose for communication with database
- XML2JS and XML2JS-XPath for parsing XML response

# Folder structure:
Note that the below structure does not contain all files and folder. It contains only the most important directories. For example, styling files .css and .ignore files are not included.
(Updated: April 16th 2021)
```
.
├── package.json                            --> Information about project, including packages and scripts,...
├── frontend                                --> UI folder
│   ├── public                              --> contains metadata and root HTML where the app renders to
│   ├── src                                 --> source code folder
│   │   ├── components                      --> UI components folder
│   │   │   ├── date-time                   --> Date and Time picker components
│   │   │   │   ├── MultiDateTimePicker.js  --> Multiple time and date pickers component
│   │   │   ├── wrapper                     --> Folder for decorators/wrappers
│   │   │   │   ├── withDataSource.js       --> Decorator to abstract out the data fetch function for graph containers
│   │   │   ├── save-data-components        --> Folder for components relate to SaveDataContainer
│   │   │   │   ├── DropDownList.js         --> A drop-down list that shows saved items
│   │   │   │   ├── FormDialog.js           --> A form dialog for user to set name and description for the item to be saved
│   │   │   ├── AlertBar.js                 --> Notification banner with text and severity (error, warning,...)
│   │   │   ├── AverageTemperatureButton.js --> A button and a dialog to display average, average max/min temperature in a month
│   │   │   ├── CheckList.js                --> Multi-select check list component (checkboxes)
│   │   │   ├── CombineGraphContainer.js    --> Container component for combine chart
│   │   │   ├── DataChart.js                --> Main chart component
│   │   │   ├── GraphItem.js                --> A container which contains a checklist and a chart, to be cloned multiple times
│   │   │   ├── LoadingIndicator.js         --> Rotating indicator when the data is loading
│   │   │   ├── PowerGraphContainer.js      --> Container component for power chart
│   │   │   ├── TabPanel.js                 --> Layout for a tab page
│   │   │   ├── TooltipContent.js           --> Tooltip component for the chart
│   │   │   ├── WeatherGraphContainer.js    --> Container component for weather chart
│   │   ├── images                          --> local images for UI
│   │   ├── services                        --> HTTP request handlers
│   │   │   ├── Api.js                      --> API functions to communicate with backend
│   │   ├── utils                           --> Utilities folder
│   │   │   ├── constants.js                --> constant definitions
│   │   │   ├── helpers.js                  --> supporting view logic and miscellaneous functions
│   │   ├── App.js                          --> Main application file
│   │   ├── index.js                        --> entry file for the application
│   ├── package.json                        --> Information about UI, including packages and scripts,...
├── backend                                 --> Backend folder
│   ├── controller                          --> Contains controllers
│   │   ├── combine.js                      --> Controller for /api/combine endpoint that route to other controllers and combine return data
│   │   ├── fingrid.js                      --> Controller for /api/fingrid endpoint that handle Fingrid data
│   │   ├── fmi.js                          --> Controller for /api/fmi endpoint that handle FMI data
│   │   ├── save.js                         --> Controller for /save endpoint that handle saving data
│   ├── models                              --> Database schema folder
│   │   ├── preference.js                   --> Model for a saved preference
│   ├── utils                               --> Utilities folder
│   │   ├── constants.js                    --> Constant definitions
│   │   ├── helpers.js                      --> Support functions, such as aggregate function and time separator
│   │   ├── middleware.js                   --> Middlewares for the backend
│   ├── app.js                              --> Main backend file
│   ├── index.js                            --> Entry point for server
│   ├── package.json                        --> Information about server, including packages and scripts,...
├── documentation                           --> Project documentations
│   ├── Images                              --> diagrams for documentation
│   ├── Swagger_documentation               --> API model for communication between frontend and backend
│   ├── Software-Design-Documentation.pdf   --> Docs file
```
