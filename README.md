# BookManagementWebApp

![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/atefhares/CrowdFunding-Web-App/blob/master/LICENSE)
![GitHub contributors](https://img.shields.io/github/contributors/SamarGooda/BookManagementWebApp)

<img src="https://cdn.worldvectorlogo.com/logos/mongodb.svg" width="100" height="50"> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="100" height="50"> <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="200" height="50">

A Web application helps you explore books by Cateogry and/or Author. also you can signup and have your own book-shelves.

## Getting started:
<details>
  <summary>click me!</summary>
  
  ### To run the server
  - install `nodejs v13+` and `npm` on your system
  - install `nodemon` //maybe you should use sude here!
      ```
      npm i -g nodemon 
      ```
  - go to `/server` and run the follwing to install the dependcies:
     ```
     npm i
     ```
  - then run the follwing:
    ```
    npm i
    nodemon start
    ```
  ### To build the client
   - install [jekyll](https://jekyllrb.com/) gem 
   - go to `/client` and run the follwing:
     ```
     jekyll build
     ```
     
   ### To add new admin
   - go to /server/admin_scripts
   - run the script as follows:
     ```
     node admin_manage.js add email=[ADMIN_EMAIL] password=[ADMIN_PASSWORD]
     ```
</details>


## 
This project is created by students of [ITI](http://iti.gov.eg/) - intake @ 40
