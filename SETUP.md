# Setup

## Prerequisites

- nodeJs: v18.7.0 (check your version using node -v)
- npm: 8.15.0 (check your version using npm -v)
- homebrew (https://brew.sh/)

## Installing dependencies

```bash
# install and start mongodb
brew tap mongodb/brew

brew install mongodb-community@6.0

brew services start mongodb-community@6.0

# install the typescript dependencies in the project directory
npm i --force
```

## Running locally

```bash
# run the app with hot module reload at http://localhost:5173
npm run dev
```
