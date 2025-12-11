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

- **Onboarding Experience**: Welcome screen with interactive carousel showcasing app features
- **User Authentication**: Complete registration and login system with JWT (JSON Web Tokens)
- **User Registration**: Allows new users to create accounts with email and password
- **Personalized Data Collection**: Collects detailed user information:
  - Personal data (name, age, weight, height, gender)
  - Physical activity level (none, light, moderate, heavy)
  - Goal (hypertrophy, definition, weight loss)
- **AI-Powered Nutrition Plans**: Generates personalized nutrition plans using Google Gemini AI (Gemini 2.5 Flash)
- **Nutrition Plan Management**:
  - Create personalized nutrition plans
  - List all plans created by the user
  - Detailed view of each plan with meals, macronutrients, and recommendations
- **Persistent Storage**: Local storage of tokens and user data with AsyncStorage
- **Offline-First Architecture**: Intelligent request caching with React Query

## Technologies Used

### Frontend

[![React](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![PNPM](https://img.shields.io/badge/pnpm-22272E?style=for-the-badge&logo=pnpm&logoColor=F69220)](https://pnpm.io/)

**Main libraries:**

- **React Navigation**: Navigation between screens (Stack Navigator)
- **Zustand**: Global state management (authentication and user data)
- **React Query (TanStack Query)**: API data caching and synchronization
- **React Hook Form + Zod**: Form validation with TypeScript
- **Axios**: HTTP client with interceptors for authentication
- **AsyncStorage**: Persistent local storage
- **React Native Swiper**: Carousel component for onboarding

### Backend

[![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)

[![Fastify](https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)

[![PNPM](https://img.shields.io/badge/pnpm-22272E?style=for-the-badge&logo=pnpm&logoColor=F69220)](https://pnpm.io/)

**Main libraries:**

- **Fastify**: Fast and efficient web framework
- **Google Generative AI**: Integration with Gemini AI for nutrition plan generation
- **Better SQLite3**: High-performance SQLite database
- **JWT (JSON Web Tokens)**: Authentication and authorization
- **Bcrypt**: Password hashing for security
- **CORS**: Cross-Origin Resource Sharing configuration

**For more details about the libraries used, check the `package.json` files**

## Client Specifications

- **Modular Architecture**: Reusable components organized by functionality
- **Screen-Based Structure**: Screen-based structure (Welcome, Login, Register, Submit, Create, Nutrition, NutritionList)
- **State Management**:
  - Zustand for global state (authentication and user data)
  - React Query for API data caching and synchronization
- **Form Validation**: Robust validation with React Hook Form and Zod
- **Type Safety**: Strict typing with TypeScript throughout the application
- **API Integration**: Centralized HTTP client with interceptors for automatic authentication
- **Navigation**: Typed navigation with React Navigation (Stack Navigator)
- **Error Handling**: Network and authentication error handling
- **Loading States**: Loading states and visual feedback
- **Code Quality**: Standardization with ESLint and Prettier
- **Configuration**: Centralized configuration (env, build, etc.)

## Server Specifications

- **RESTful API**: REST API structured in controllers and services
- **Architecture Pattern**: Separation of concerns (Controllers → Services → Database)
- **Authentication**: JWT middleware for route protection
- **Database**: SQLite with better-sqlite3 for local storage
- **AI Integration**: Integration with Google Gemini AI (Gemini 2.5 Flash) for nutrition plan generation
- **Error Handling**: Centralized error handling with descriptive messages
- **Security**:
  - Password hashing with bcrypt
  - JWT authentication
  - Input data validation
- **Type Safety**: Strict typing with TypeScript across all layers
- **Code Quality**: Rigorous application of lint/format and TypeScript
- **Configuration**: Isolated environment configuration with `.env`
- **Routes**: Organized routes protected by authentication when necessary

### API Routes

**Public Routes:**

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login existing user

**Protected Routes (require JWT authentication):**

- `GET /auth/me` - Get authenticated user data
- `POST /nutrition/create` - Create new nutrition plan
- `GET /nutrition/list` - List all user plans
- `GET /nutrition/:planId` - Get details of a specific plan

## Prerequisites

- Install [Node.js](https://nodejs.org/en) (version 18 or higher)
- Install pnpm: `npm install -g pnpm`
- [Android Studio](https://developer.android.com/develop?hl=pt-br) is recommended for emulating the app

## Getting Started

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

> **⚠️ Important: Configure the `.env` files on both sides (client and server) as needed for local/remote configuration. Without this, the API will not work.**

### Environment Configuration

#### Server (.env)

```env
DATABASE_URL=file:./dev.db
JWT_SECRET=your-jwt-secret-key-here
API_KEY=your-google-gemini-api-key-here
```

#### Client

The client automatically detects the API base URL depending on the platform:

- **Android Emulator**: `http://10.0.2.2:3333`
- **iOS Simulator**: `http://localhost:3333`
- **Physical Device**: Configure the local IP in the `src/services/api.ts` file

## Build

### Build Preparation

1. **Install EAS CLI**

You can install it globally on your computer:

```sh
npm install -g eas-cli
```

Or use it locally:

```sh
pnpm dlx eas-cli
```

2. **Create Expo Account**

Create an Expo account to use **EAS Build**. You can do this through the Expo app or website. Then, log in to your account:

```sh
eas login
```

3. **Initialize EAS**

```sh
cd client
eas init
```

### Database Structure

The server uses SQLite with the following tables:

- **users**: Stores user information (id, email, password, name, createdAt, updatedAt)
- **nutrition_plans**: Stores created nutrition plans (id, userId, data, createdAt, updatedAt)

The database is created automatically on the first server run.

## Project Structure

```
nutrilife/
├── client/                 # React Native Application (Expo)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── screens/        # Application screens
│   │   ├── routes/         # Navigation configuration
│   │   ├── services/       # API services
│   │   ├── store/          # State management (Zustand)
│   │   ├── styles/         # Global styles
│   │   └── types/          # TypeScript types
│   └── assets/             # Images and resources
│
└── server/                 # Node.js API (Fastify)
    ├── src/
    │   ├── controllers/    # Route controllers
    │   ├── services/       # Business logic
    │   ├── middleware/     # Middlewares (auth, etc.)
    │   ├── lib/            # Utilities (database, etc.)
    │   ├── routes.ts       # Route definitions
    │   └── server.ts       # Server configuration
    └── dev.db              # SQLite database
```

## Code Contribution Standards

- **Code Style**: Maintain the standard defined by ESLint and Prettier (automatic execution on commits)
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/) for commit conventions
- **Documentation**: Add documentation for each new feature (README in the corresponding directory)
- **Pull Requests**: For bug fixes and features, submit descriptive pull requests
- **Issues**: Before contributing, open issues to align on major changes
- **TypeScript**: Maintain strict typing throughout the code
- **Testing**: Add tests when appropriate (future)

## Authors:

- **Cristian Santos** - **Fullstack Developer**
  - [GitHub Profile](https://github.com/zcriticz)
- **Mikaias Santos** - **Designer**
  - [GitHub Profile](https://github.com/mikaiassantos)

## License

This project is licensed under the MIT License. See the [license](license) file for more information.
