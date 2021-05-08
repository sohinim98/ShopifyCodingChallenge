# ShopifyCodingChallenge
Shopify Web Developer Intern Challenge - Fall 2021

### The following commands are to be run from the 'the-shoppies' directory

# The Shoppies
## Deployed using Firebase at [https://the-shoppies-dbf55.web.app/](https://the-shoppies-dbf55.web.app/)


- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- I used Firebase authentication and Firestore to store the user data (display name, email, profile photo and nominations).
- I used Firebase hosting to deploy the application.

## Bonus features
- Save nomination lists if the user leaves the page/logs out. I considered using cookies, but decided that authenticated log in where we store the user data in a database (Firestore) is what one would do at Shopify.
- Animations for loading and zero states. Note that I have added a debounce of 1000 ms in order to reduce the number of API calls and only make an API call to OMDB once the user is done typing.
I chose the value of 1000 ms because it also showcases the load state animation.
- Authentication (Sign up using email, Sign in using email/Google, the feature to reset password).
- Followed the shopify theme, branding and color palette to create a seamless experience.
- Dark mode/Light mode toggle!

## Design principles and Best practices
- Mobile-first approach.
- Responsive design.
- BEM methodology.
- Latest React Hooks best practices.
- Data privacy - API keys stored in a .env file added to .gitignore (I shall be sharing this file with you along with my submission).


## Available Scripts

In the 'the-shoppies' directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment
- `firebase login`
- `firebase init hosting`
- `specify the build created using yarn build`
- `firebase deploy`

