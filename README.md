
# Bike Service Application

Description:

This is an application developed in React with Node.js as a server, which helps bike service owners track each booking made by customers. The application provides features such as login, signup, listing services (where the admin can create, edit, and delete services), a cart page (where the admin can see all orders and customers can track their bookings and service statuses), and a history page. When an order is delivered and paid, it is saved on the completed order page(AdminOrder.jsx && UserOrder.jsx).  


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**DataBase:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/arunkumarp23062003/bike-service-application.git
```

Go to the project directory

**FrontEnd**

```bash
  cd bike-service-application/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Open a new terminal for server to run

**BackEnd**

```bash
    cd bike-service-application/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Environment Variables

To run this project, you will need to use this credentials to login as owner.

`ADMIN_LOGIN_EMAIL : arunkumar.2001021@srec.ac.in`

`ADMIN_CREDENTIALS : 12345678`


To run this project as a user please create a account using a valid email and authenticate it with otp send to your email.
