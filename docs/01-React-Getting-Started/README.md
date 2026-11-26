In this one we made the package .json, write three commands to install vite and the reactdom , we initiated it useing npm init -y it the y means yes here,(explain each command here) then we also did this in order we put code inside of the vite config file, then we chaned the main.jsx in the src and then we also did change teh App.jsx two time and saw how the dom is actually chaning and that we dont have to refresh he browser , then we created a hearder component inside of the Component folder, then we wrote the header / in the app file and wallah there it was the header, here also i kind of had a doubt that why are we not actually importing ianything in the comopnent file and i was told well, there is nothing needed to be improted, i know silly quesiton right?, well then i was explained how thing are connected like, the flow
User opens localhost:5173


index.html
Contains the root HTML element and loads main.jsx
to
main.jsx
Finds the root element and initializes ReactDOM
to
App.jsx
Main application component
to
Header.jsx and other child components 
Reusable UI components 
to
Browser DOM 
The rendered user interface

you know we wrote this root folder right in the html like
<div id="root"></div>
ever thought why
cause Initially, this element is empty.

We have provided React with a location where it can render the application.
This is our JavaScript entry point for the React application.
ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <App />
);


see so we gave that to the main for the dom and that is why its able to redner all this in that root folder
1. npm install react react-dom
what are we only importing the react dom

2. what is the meaning of different parts of this npm install -D vite @vitejs/plugin-react

3. need and explnation for each of these 

{
  "name": "bridgelabz-react-practice",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "*",
    "react-dom": "*"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "*",
    "vite": "*"
  }
}

4. what is the meaing of type module and why do we have it there in the html
5. what is the meaing of this You should observe lifecycle-related logs.Remember that StrictMode can run an extra setup-and-cleanup cycle in development. That is intentional.The empty dependency array means this effect does not re-run because of changes to component props or state, although StrictMode can perform its extra development checks.