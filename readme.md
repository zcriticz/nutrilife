<div align="center">
    <img src="https://i.imgur.com/ST79ClL.png" width="100">
    <h1>NutriLife</h1>
</div>

<p align="center">
    <a href="https://github.com/zcriticz/nutrilife/stargazers"><img src="https://img.shields.io/github/stars/zcriticz/nutrilife?colorA=363a4f&colorB=b7bdf8&style=for-the-badge"></a>
    <a href="https://github.com/zcriticz/nutrilife/issues"><img src="https://img.shields.io/github/issues/zcriticz/nutrilife?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
    <a href="https://github.com/zcriticz/nutrilife/contributors"><img src="https://img.shields.io/github/contributors/zcriticz/nutrilife?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
</p>

**NutriLife** is an app that creates personalized diets according to each user's profile, using our business rules and leveraging information through integrated artificial intelligence.

This repository contains the complete solution, development, technologies, and instructions for running and contributing, should you be interested.

## Overview

The project is a modern, robust, scalable, and secure Expo application, divided into two parts:

- **Client**: Interface developed in TypeScript, using React's componentization patterns and consuming a custom API provided by the server.
- **Server**: Hosted Node.js API, responsible for the business logic and managing the operation and behaviors of the artificial intelligence.

Both modules follow a modular architecture, recommended standardization practices as mentioned above, centralized configuration, and use up-to-date JavaScript ecosystem tools.

## Features

- **User registration**: Allows new users to add their personal information for data abstraction.
- **Personalized nutritional profile**: Automatically calculates nutritional needs based on user parameters (age, weight, height, goal, etc.).
- **AI-based diet recommendations**: Suggests intelligent meal plans according to preferences, restrictions, and goals.
- **Food diary**: Daily recording of meals with automatic nutritional analysis.

## Technologies Used

### Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![PNPM](https://img.shields.io/badge/pnpm-22272E?style=for-the-badge&logo=pnpm&logoColor=F69220)](https://pnpm.io/)

### Backend

[![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)

[![PNPM](https://img.shields.io/badge/pnpm-22272E?style=for-the-badge&logo=pnpm&logoColor=F69220)](https://pnpm.io/)

**For more details, like library's used, read the `package.json`**

## Client Specifications

- Modular architecture with reusable components
- Page-based structure
- Centralized service consumption through the "services" layer
- Strict typing with TypeScript
- Direct integration with the routes exposed by the server
- Easy addition of new features and screens
- Standardization with ESLint and Prettier
- Centralized configuration (env, build, among others)

## Server Specifications

- RESTful API structured in controllers and services
- Versioned routes for easy maintenance
- Strict application of lint/format and TypeScript across all layers
- Isolated environment configuration with `.env`

## Prerequisites

- Install [Node.js](https://nodejs.org/en) (version 18 or higher)
- Install pnpm: `npm install -g pnpm`
- [Android Studio](https://developer.android.com/develop?hl=pt-br) is recommended for emulating the app

## Get Starting

.

### Clone the repository

```sh
git clone https://github.com/zcriticz/nutrilife
cd nutrilife
```

---

### Install dependencies

#### Frontend

```sh
cd client
pnpm install
```

#### Backend

```sh
cd ../server
pnpm install
```

---

#### Run the client side

```sh
cd ../client
pnpm expo start
```

#### Run the server side

```sh
cd ../server
pnpm dev
```

> **Edit the `.env` files on both sides as needed for local/remote configuration. Don't forgive this or the API don't work.**

## Build

1. Install the necessaries dependencies

You can install globally in your computer

```
npm install -g eas-cli
```

Or locally

```
pnpm dlx eas-cli
```

2.  Create an account Expo to use **EAS**. You can make this of Expo app or his website. After, login in your account

```
eas login
```

3.  EAS initialize

```
eas init
```

## Code Contribution Standards

- Maintain the standard defined by ESLint and Prettier (automatic execution on commits)
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit conventions
- Add documentation for each new feature (README in the corresponding directory)
- For bug fixes and features, submit descriptive pull requests
- Before contributing, open issues to align on major changes

## Authors:

- **Cristian Santos** - **Fullstack Developer**
  - [GitHub Profile](https://github.com/zcriticz)
- **Mikaias Santos** - **Designer**
  - [GitHub Profile](https://github.com/mikaiassantos)

## License

This project is licensed under the MIT License. See the [license](license) file for more information.
