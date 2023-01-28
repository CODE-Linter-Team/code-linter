# Setup

tested on a MacBook Air (M1, 2020) running macOS Monterey version 12.1 on 23.12.2022

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

## Setting up the environment

- copy the contents from `.env.example` to `.env` and change the placeholder values

### Generating google credentials

if you are not part of the CODE Linter team or want to test the app with a different google organization, you will want to

- navigate to https://console.cloud.google.com/apis/credentials
- create a project if you haven't already
- click '+ CREATE CREDENTIALS' at the top of the screen
- click 'OAuth client ID'
- select 'Web application' for 'Application type'
- add the same url you put for PUBLIC_SERVICE_URL in your `.env` (i.e. 'http://127.0.0.1:5173') to 'Authorized JavaScript origins'
- add the same url plus '/auth/callback/google' (i.e. 'http://127.0.0.1:5173/auth/callback/google') to 'Authorized redirect URIs'
- click 'SAVE'
- copy 'Your Client ID' and 'Your Client Secret' from the resulting popup window into your `.env` file

## Running locally

```bash
# run the app with hot module reload at http://127.0.0.1:5173
npm run dev
```
