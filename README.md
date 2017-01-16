## Starter Kit for quick prototyping with your favorite framework :)
All included : from package download with yarn to build with webpack 2.
You can choose your framework between React and Angular. A sample app in avaliable for each one with all basic needs : routes, structure, translations, flux...
With a few commands you're ready to code with all the latest stuff without all the hassle of configuring everything.
Enjoy :)

*Inquirer doesnt work very well with git bash terminals on windows. Consider using powershell.

*If your node is not up to date and yarn asks you a recent version, edit the scripts in package.json by adding --ignore-engines after each yarn command.

####Start with
```
npm run super-install
```

It's going to install yarn (global) and some packages, including a ton of webpack stuff.

Choose between React or Angular and let it install a full set of useful libs for your chosen framework !

*On Git bash windows, the arrows do indeed work, you just don't see it :(

```
yarn run build
```
for production build

```
yarn start
```
to init server AND watch (with hot module replacement)

```
yarn run watch
```
to watch code

##TODO :
- Better and more powerful Workers
- Css modules
- Ui toolkit
- Better install, especially on windows


#Changelog :
##0.5.0
- Service worker that caches bundles and the framework (for both angular and react). Change the const version every time you want to tinker with it (so it can regenerate cache). Useful for an offline app !

##0.4.1
- Karma : Use *yarn test* on angular to use karma-webpack. Every test must be named *.spec.js ( *-spec.js for react-jest) and placed in __tests __
Tests can be written in ES6 using mocha/chai/chai-as-promised and they run on PhantomJS. An example is available in the __tests __ folder.
- Babel presets set to latest

##0.4.0
- Mochajs, Chai and Chai-as-promised added with two examples in the /test folder

##0.3.0
- Angular app redone : now has one component and css. This provide a good idea of a possible architecture for a component based angular app.
- More optimize plugins added to webpack, especially for production (uglify, commonchunk...)
- vendor.bundle.js generated by webpack from duplicate code, yay !

##0.2.1
- Jest added for react testing

##0.2.0
- Webpack 2
- App react upgraded : css included and one more component with a few examples to help you start
- reverted to npm install from yarn add because of unknown and disturbing error (watch you package.json in case libs are not registered in dependencies. You can find them in consts in interactive.js)
