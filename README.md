# **Authentication Example Web Application**

This is a simple web application that supports three types of authentication:

1. **Form-based Authentication**
2. **HTTP Digest Authentication**
3. **Google OAuth Authentication**

The app is built using **Node.js**, **Express**, and **Passport.js**, and can be easily deployed using **Docker**.

## **Setup Instructions**

### **1. Clone the Repository**

Clone this repository to your local machine using Git:

    git clone <repository-url>
    cd auth-app

### **2. Build and Run the App using Docker**
Ensure you have Docker and Docker Compose installed, then run:

    docker-compose up --build

The application will be available at `http://localhost:3000`.

---

# **Authentication Methods**

## **1. Form-based Authentication**

- Visit: `http://localhost:3000/login.html`  
- Enter the following credentials:  
  - **Username:** `testuser`  
  - **Password:** `password`  
- Upon successful login, you should see an alert saying _"Login successful"_ and be redirected to `/profile`.

---

## **2. HTTP Digest Authentication**

- Visit: `http://localhost:3000/auth/digest`  
- When prompted for credentials, use:  
  - **Username:** `testuser`  
  - **Password:** `password`  
- Upon successful authentication, you will see a message confirming the authentication.

---

## **3. Google OAuth Authentication**

- Visit: `http://localhost:3000/auth/google`  
- You will be redirected to the Google login page.  
- Log in using your Google account.  
- Upon successful authentication, you will be redirected to `/profile`.

---

# **Routes Overview**

| **Route**              | **Method** | **Description**                                   |
|------------------------|------------|---------------------------------------------------|
| `/`                    | GET        | Homepage with links to all authentication methods |
| `/login`               | POST       | Form-based login (username & password)            |
| `/auth/digest`         | GET        | HTTP Digest authentication                        |
| `/auth/google`         | GET        | Google OAuth authentication (redirect to Google)  |
| `/auth/google/callback`| GET        | Callback URL for Google OAuth                     |
| `/profile`             | GET        | Profile page (accessible only after login)        |
| `/logout`              | GET        | Logout and redirect to the homepage               |

---

# **Environment Variables**

The following environment variables are required for Google OAuth authentication:

- **GOOGLE_CLIENT_ID**: Your Google OAuth Client ID  
- **GOOGLE_CLIENT_SECRET**: Your Google OAuth Client Secret  

You can set these variables in `docker-compose.yml`: