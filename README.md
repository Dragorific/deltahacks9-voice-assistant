# DeltaHacks IX VANCE (Voice Activated Neural-Computation Engine)

A comprehensive, server-side voice assistant that assists with you a variety of tasks, named VANCE. 

###Some of the scenarios that are supported by this app are:
- Productivity by generating code for user and pasting/writing to any connected client
- Educating the user on general trivia, world issues, STEM, among many other subjects
- Smart home interfacing
- Obtaining current weather for a given location

The app was built on **react-native**, and utilized **javascript**, **io-sockets** for http communication, and various APIs to create an AI assistant experience unlike any other.

To build the project locally, you need the latest versions of:
```
npm package manager
node js
android studio
```

To setup the project, you need to install all the npm dependencies for each folder: client, server and vance
```
cd client
npm i

cd server
npm i

cd vance
npm i
```

Once that is complete, either with a connected android or ios device, or a virtual device use:
```
npm run <android|ios>
```
