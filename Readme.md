# Introduction

Welcome to SunnyDayApp! SunnyDayApp is your go-to application for checking the weather forecast with ease. Whether you're planning your day, a trip, or just curious about the upcoming weather, SunnyDayApp has got you covered.

## Index

- [About](#about)
- [Usage](#usage)
  - [Installation](#installation)
  - [Commands](#commands)
- [Development](#development)
  - [Pre-Requisites](#pre-requisites)
  - [File Structure](#file-structure)
  

## About
SunnyDayApp is a user-friendly weather forecast application designed to provide you with accurate and up-to-date weather information. It offers a simple and intuitive interface, making it easy for users to access the weather forecast for any location.

## Usage
To use SunnyDayApp, follow these installation steps:

### Installation

1. Clone the repository to your local machine: 
```
\$ git clone "https://git.sysgears.com/andriy.berzhavych/sunnydaysapp.git"
```
2. Navigate to the project directory:
```
\$ cd sunnydayapp
```
3. Install dependencies: 
```
\$ cd client 
\$ npm install 
\$ cd server 
\$ npm install 
```


### Commands
1. To run SunnyDayApp client: 
```
\$ cd client 
\$ npm run start
```
2. To run SunnyDayApp server: 
```
\$ cd server 
\$ npm run start:dev 
```

Make sure you have looked to the .env.example file in both client and server and assigned in your .env file in both client and server values for each of the environment variable.


## Development

### Pre-Requisites
Before you start developing for calculator, make sure you have the following tools installed:
1. Node.js
2. Git

### File Structure
.
 * [client](./client)
   * [.expo](./client/.expo)
   * [src](./client/src)
      * [apollo](./client/src/apollo)
      * [app](./client/src/app)
      * [assets](./client/src/assets)
      * [components](./client/src/components)
      * [context](./client/src/context)
      * [hooks](./client/src/hooks)
      * [regex](./client/src/regex)
      * [utils](./client/src/utils)
   * [app.json](./client/app.json)
   * [babel.config.js](./client/babel.config.js)
   * [index.tsx](./client/index.tsx)
   * [package-lock.json](./client/package-lock.json)
   * [package.json](./client/package.json)
   * [metro.config.js](./client/metro.config.js)
   * [tailwind.config.js](./client/tailwind.config.js)
   * [tsconfig.json](./client/tsconfig.json)
 * [server](./server)
   * [src](./server/src)
      * [configs](./server/src/configs)
      * [graphql](./server/src/graphql)
      * [migrations](./server/src/migrations)
      * [modules](./server/src/modules)
        * [app](./server/src/modules/app)
        * [auth](./server/src/modules/auth)
        * [subscriptions](./server/src/modules/subscriptions)
        * [users](./server/src/modules/users)
        * [weather-forecast](./server/src/modules/weather-forecast)
      * [main.ts](./server/src/main.ts)
   * [package-lock.json](./server/package-lock.json)
   * [package.json](./server/package.json)
   * [nest-cli.json](./server/nest-cli.json)
   * [webpack.config.js](./server/tsconfig.build.json)
   * [tsconfig.json](./server/tsconfig.json)
 * [README.md](./Readme.md)