# Introduction

Welcome to SunnyDayApp! SunnyDayApp is your go-to application for checking the weather forecast with ease. Whether you're planning your day, a trip, or just curious about the upcoming weather, SunnyDayApp has got you covered.

## Index

- [About](#about)
- [Usage](#usage)
  - [Installation](#installation)
  - [Commands](#commands)
- [Building Docker Containers](#building-docker-containers)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
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
\$ cd web 
\$ npm install 
\$ cd mobile 
\$ npm install 
\$ cd server 
\$ npm install 
```


### Commands
1. To run SunnyDayApp mobile: 
```
\$ cd mobile
\$ npm run start
```
2. To run SunnyDayApp web: 
```
\$ cd web
\$ npm run dev
```
3. To run SunnyDayApp server: 
```
\$ cd server 
\$ npm run start:dev 
```

Make sure you have looked to the .env.example file in both client and server and assigned in your .env file in both client and server values for each of the environment variable.

## Building Docker Containers

- Pre-Requisites
1. Docker Desktop installed on your machine.

### Development Mode

Steps to Build Docker Container in Development Mode using docker-compose:
1. Navigate to the project directory: 
```
\$ cd sunnydaysapp
```

2. Navigate to the docker directory: 
```
\$ cd docker
```

3. Set Execute Permissions: You need to set the execute permissions on the script file. You can do this using the chmod command:
```
chmod +x ./up_fullstack_dev.sh
```

4. Build and run docker containers by running up_fullstack_dev.sh file: 
```
\$ ./up_fullstack_dev.sh
```

### Production Mode

1. Navigate to the project directory: 
```
\$ cd sunnydaysapp
```

2. Navigate to the docker directory: 
```
\$ cd docker
```

3. Set Execute Permissions: You need to set the execute permissions on the script file. You can do this using the chmod command:
```
chmod +x ./up_fullstack_prod.sh
```

4. Build and run docker containers by running up_fullstack_prod.sh file: 
```
\$ ./up_fullstack_prod.sh
```


## Development

### Pre-Requisites
Before you start developing for sunnydaysapp, make sure you have the following tools installed:
1. Node.js
2. Git

### File Structure
 * [docker](./docker)
   * [scripts](./docker/scripts)
   * [docker-compose-dev.yml](./docker/docker-compose-dev.yml)
   * [docker-compose-prod.yml](./docker/docker-compose-prod.yml)
 * [mobile](./web)
   * [.expo](./mobile/.expo)
   * [src](./mobile/src)
      * [app](./mobile/src/app)
      * [assets](./mobile/src/assets)
      * [components](./mobile/src/components)
      * [context](./mobile/src/context)
      * [core](./mobile/src/core)
      * [graphql](./mobile/src/graphql)
      * [hooks](./mobile/src/hooks)
      * [layouts](./mobile/src/layouts)
      * [regex](./mobile/src/regex)
      * [shared](./mobile/src/shared)
   * [app.json](./mobile/app.json)
   * [babel.config.js](./mobile/babel.config.js)
   * [index.tsx](./mobile/index.tsx)
   * [package-lock.json](./mobile/package-lock.json)
   * [package.json](./mobile/package.json)
   * [metro.config.js](./mobile/metro.config.js)
   * [tailwind.config.js](./mobile/tailwind.config.js)
   * [tsconfig.json](./mobile/tsconfig.json)
 * [server](./server)
   * [src](./server/src)
      * [modules](./server/src/modules)
        * [auth](./server/src/modules/auth)
        * [cities](./server/src/modules/cities)
        * [city-search](./server/src/modules/city-search)
        * [config](./server/src/modules/config)
        * [database](./server/src/modules/database)
        * [features](./server/src/modules/features)
        * [graphql](./server/src/modules/graphql)
        * [redis](./server/src/modules/redis)
        * [subscriptions](./server/src/modules/subscriptions)
        * [users](./server/src/modules/users)
        * [weather-forecast](./server/src/modules/weather-forecast)
        * [weather-management](./server/src/modules/weather-management)
      * [shared](./server/src/shared)
        * [constants](./server/src/shared/constants)
        * [pagination](./server/src/shared/pagination/)
        * [regex](./server/src/shared/regex)
        * [types](./server/src/shared/types)
        * [utils](./server/src/shared/utils)
        * [index.ts](./server/src/shared/index)
      * [app.module.ts](./server/src/app.module.ts)
      * [main.ts](./server/src/main.ts)
   * [package-lock.json](./server/package-lock.json)
   * [package.json](./server/package.json)
   * [nest-cli.json](./server/nest-cli.json)
   * [Dockrfile](./server/Dockerfile)
   * [webpack.config.js](./server/tsconfig.build.json)
   * [tsconfig.json](./server/tsconfig.json)
 * [web](./web)
   * [.next](./web/.next)
   * [public](./web/public)
   * [src](./web/src)
      * [app](./web/src/app)
      * [components](./web/src/components)
      * [context](./web/src/context)
      * [core](./web/src/core)
      * [graphql](./web/src/graphql)
      * [hooks](./web/src/hooks)
      * [layouts](./web/src/layouts)
      * [middlewares](./web/src/middlewares)
      * [regex](./web/src/regex)
      * [services](./web/src/services)
      * [shared](./web/src/shared)
   * [package-lock.json](./web/package-lock.json)
   * [package.json](./web/package.json)
   * [next.config.mjs](./web/next.config.mjs)
   * [Dockrfile](./web/Dockerfile)
   * [tailwind.config.js](./web/tailwind.config.js)
   * [tsconfig.json](./web/tsconfig.json)
 * [README.md](./Readme.md)