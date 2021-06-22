# It-s-a-Match

This is a MERN stack application which aims at finding perfect match for your pet.

## Getting Started

### Prerequisites

MongoDB  
Node  
npm

### Cloning the Repo

Clone the repo via following command

```bash
git clone https://github.com/16sweetyjain/It-s-a-match.git
```

### Configuration

Move to client/frontend directory

```bash
#Install client side dependencies
 npm install
```

Move to client/frontend/backend

```bash
#Install server side dependencies
npm install
```

### .env file

Create a .env file under client/frontend/backend and specify the following values-

<strong>PORT</strong> - port at which server runs  
<strong>token</strong> - secret token used for password encryption  
<strong>DATABASE</strong> - URL of the Mongodb Database created using MongoDB Atlas

## Running the application

Move to client/frontend/

```bash
npm start
```

The application will run in the browser at localhost:3000

## Features

Create a profile of your pet.  
Find appropriate matches for your pet.  
Send friend requests to other pets to get in touch.  
Send a meet request to a pet who is your friend.  
Protected frontend routes.  
Input validations.  
Error Handling.  
Token based Authentication.  
Filtering out matches on the basis of % match.

## Future Enhancements

Optimize location specification for meet(e.g., locations within a particular radius to be available for meet).  
Create filters for different pets (e.g., customized search of pets based on their breed, residence etc..).

## Additional Dependencies

Materialize css  
Bcrypt.js (for password hashing)  
React-Materialize
