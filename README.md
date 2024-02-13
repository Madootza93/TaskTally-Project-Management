# TaskTally

## Description
TaskTally is a React and Firebase project where users can create projects for individual and group tasks and keep track of them. This application allows for efficient project management and collaboration among team members.

## Installation

To get started with TaskTally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Madootza93/TaskTally-Project-Management.git 

```

2. Navigate to the project's directory:
```bash
   cd TaskTally
```
 

3. Install the necessary node modules:
```bash
    npm install
```

4. Set up Firebase:
- Create a Firebase account: If you don't already have one, sign up for a free account at https://firebase.google.com.
- Create a Firebase project: Once logged in to Firebase, create a new project for TaskTally.
- Set up Firebase authentication: In the Firebase console, navigate to the "Authentication" section and set up authentication methods: email/password.
- Set up Firebase Firestore: Firestore is used for storing data in TaskTally. In the Firebase console, navigate to the "Firestore Database" section and set up a Firestore database  for your project.
- Set up Firebase storage: Firebase Storage is used for storing user-uploaded files in TaskTally. In the Firebase console, navigate to the "Storage" section and set up Firebase Storage for your project.
- Get Firebase configuration: In the Firebase console, go to project settings, and under the "General" tab, you will find your Firebase SDK configuration. Copy this configuration as you will need it later.

5. Configure TaskTally with Firebase:
- In the TaskTally project directory, create a .env file.
- Add the Firebase configuration obtained in the previous step to your .env file. It should look something like this:
REACT_APP_API_KEY=your-api-key

REACT_APP_AUTH_DOMAIN=your-auth-domain

REACT_APP_PROJECT_ID=your-project-id

REACT_APP_STORAGE_BUCKET=your-storage-bucket

REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id

REACT_APP_APP_ID=your-app-id


6. Start the project on your local development server:
```bash
   npm start
```




