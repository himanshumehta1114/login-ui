# OTP Based Login

Webapp to demonstrate OTP based authentication.

## 🚀 Getting Started

In the project directory, you can run:

### clone this repository

Run following code to clone this repository

```sh
git clone https://github.com/himanshumehta1114/login-ui.git
```

### Install dependencies

```sh
yarn install
```

### Start development server

```sh
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Deploy build

```sh
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Run `npx serve -s build` to host app on [http://localhost:5000](http://localhost:5000).

## 🐛 Known Issues

#### Mock API

The mock API throws `CORS` error. Therefore, I've mocked the APIs using promises and timeout. I have commented the API code for demontstration purpose.

#### Resend button

The `resend otp` button appears after countdown is over. But it does not perform any action on click.