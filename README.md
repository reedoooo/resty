# API Explorer Application

This project is a simple yet powerful API Explorer built using React, Axios, and Bootstrap. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

The application provides an interactive way to make HTTP requests to different APIs. It currently supports the Pokemon and Yugioh APIs, but it is designed in a way that more APIs can be easily added in the future.

The app allows you to make GET, POST, PUT, and DELETE requests, and it displays the response data. It also maintains a history of the previous requests made during a session, and you can choose any past request to view or resubmit.

The key parts of the application are:

- The `MainApp` component is the entry point of the app. It sets up the application state using the `useReducer` hook and defines functions for making API calls and handling responses.
- `UserInputForm` is a form component that takes user input for the API call parameters.
- `DataDisplay` is a component that displays the response data from the API.
- `PreviousRequests` is a component that shows a history of previous requests made during a session. It allows you to load any past request back into the main display.

## Running the Application

To get started, clone this repository to your local machine.

\`\`\`
git clone <https://github.com/yourusername/API-Explorer.git>
\`\`\`

In the project directory, install the required dependencies:

\`\`\`
npm install
\`\`\`

Then, start the app in development mode:

\`\`\`
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes.

To build the app for production, run:

\`\`\`
npm run build
\`\`\`

This will create a `build` folder with the minified, optimized production build.

## Testing the Application

This app includes a suite of tests to ensure it's working correctly. To run these tests, use:

\`\`\`
npm test
\`\`\`

This will launch the test runner in the interactive watch mode. Refer to the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployment

This application is ready to be deployed! For details on deploying the application, see the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## Code Structure

This application follows best practices for structuring a React app:

- All components are located in the `Components` directory.
- Each component is in its own file.
- CSS and SCSS files are located in their respective component directories or the global `styles` directory.
- Helper functions are located in the `utils` directory.

## Updates and Improvements

In addition to the existing functionalities, several new updates and improvements have been made to the application. Here are the details:

### 1. Auto-Updating URL

When switching between different APIs using the selection menu, the URL input now automatically updates to match the default endpoint for the selected API. This allows for faster and more intuitive usage.

This functionality was achieved by adding a state for `endpointUrl` in the `UserInputForm` component, and updating this state whenever a different API is selected from the dropdown.

### 2. Improved Error Handling for JSON Inputs

The application now features improved error handling for invalid JSON inputs in the Request Body input field. This reduces the chance of errors being caused by malformed JSON. If an invalid JSON input is detected, an error message is logged to the console.

This was implemented by adding a try-catch block around the JSON parsing in the `manageRequestBody` function, which updates the `requestBodyContent` state with the parsed JSON or logs an error if the parsing fails.

### 3. Resetting Radio Buttons on Form Submission

Previously, the method selection (GET, POST, PUT, DELETE) radio buttons remained selected after form submission, which could lead to confusion. They now get reset along with the rest of the form fields when the form is submitted.

This was implemented by adding a new state `selectedMethod` to track which method is currently selected. The `selectedMethod` state is updated whenever a different method is selected, and reset to an empty string in the `handleFormSubmission` function. The `checked` prop of each radio button is controlled by whether `selectedMethod` matches the `id` of the radio button.

These improvements were made in response to user feedback and testing, and they greatly enhance the usability and reliability of the application.

## Learning More

For more information on Create React App, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
