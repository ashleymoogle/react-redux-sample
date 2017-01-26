const inquirer = require('inquirer');
const shell = require('shelljs')

//PUT THEM IN REVERSE ORDER BECAUSE OF THE INVERSED WHILE LATER

const DEV = false;

const react = [
    "react-dom",
    "react-i18next",
    "react-router-redux",
    "react-router",
    "react-redux",
    "redux",
    "axios",
    "i18next-xhr-backend",
    "i18next",
    "react"
]

const reactDev = [
    "react-test-renderer",
    "babel-jest",
    "jest",
    "eslint-plugin-react"
]

inquirer.prompt(
    [
        /* Pass your questions in here */
        {
            type: "list",
            name: "js",
            message: "What to install ?",
            choices: [
                "react",
            ]
        }
    ])
    .then((answers) => {
        let libs, libsDev, cmd = "", cmdDev = "", pkg = "", pkgDev = ""
        libs = react
        libsDev = reactDev

        //Do we want to write in our package.json ?
        if (!DEV){
            pkg = "-S "
            pkgDev = "-D "
        }

        //install dependencies
        let i = libs.length-1
        while(i >= 0){
            //Fucking yarn crash with shelljs, fallback on npm
            if(i === libs.length -1)
                cmd += `npm i ${pkg}`
            cmd += libs[i] + " "
            i--
        }

        //install devDependencies
        let j = libsDev.length-1
        while(j >= 0){
            //Fucking yarn crash with shelljs, fallback on npm
            if(j === libsDev.length -1)
                cmdDev += `npm i ${pkgDev}`
            cmdDev += libsDev[j] + " "
            j--
        }
        console.log(cmd)
        shell.exec(cmd)
        console.log(cmdDev)
        shell.exec(cmdDev)
        shell.exec('mv '+ answers.js +' src')
    }
);