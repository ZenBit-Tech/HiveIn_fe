# Get-Job HiveIn
![CICD](https://github.com/ZenBit-Tech/HiveIn_fe/actions/workflows/build-and-deploy.yml/badge.svg)
## Description

Get-Job is a freelancer platform created as an internship project at Zenbit Tech
## 1. Getting Started

### 1.1 Requirements

Before starting, make sure you have an up-to-date release of NodeJS and NPM.

### 1.2 Install instructions

Clone the project and install its dependencies:

```bash
$ cd HiveIn_fe
$ git clone git@github.com:ZenBit-Tech/HiveIn_fe.git
$ npm install
```

### 1.3 Env configuration

Once the dependencies are installed, you can now configure your project by creating a new **.env** file containing your environment variables used for development.

```bash
$ cp .env.example .env
$ nano .env
```

For a standard development configuration, you can leave the default value for variable.

## 2. Launch and discover

In the project directory, you can run

### `npm start --watch`

Runs the app in the development mode.\
[http://localhost:3000](http://localhost:3000) automaticly will open.

The page will reload if you make edits and save file.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## 3. Deployment Information

The website is currently being hosted in a Digital Ocean server.
- Domain: http://getjobhivein.me
