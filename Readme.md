# Project 10 Rock the Code 🎸

## Project Description

Project 10 Rock the Code is a web application developed with Node.js that allows users to create and manage events, as well as confirm their attendance. Users can register, log in, recover their passwords, and upload images for their profiles and events.

## Technologies Used 🚀

- **Node.js**
- **Express.js**
- **MongoDB**

## Dependencies 📦

### Main Dependencies

| Package                   | Version      |
| ------------------------- | ------------ |
| bcrypt                    | ^5.1.1       |
| cloudinary                | ^1.41.3      |
| cors                      | ^2.8.5       |
| dotenv                    | ^16.4.5      |
| express                   | ^4.19.2      |
| jsonwebtoken              | ^9.0.2       |
| mongoose                  | ^8.4.0       |
| multer                    | ^1.4.5-lts.1 |
| multer-storage-cloudinary | ^4.0.0       |
| nodemailer                | ^6.9.13      |

### Development Dependencies

| Package | Version |
| ------- | ------- |
| nodemon | ^3.1.0  |

## Scripts 📜

| Command | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| dev     | Runs the application in development mode using nodemon (`nodemon index.js`) |
| start   | Starts the application (`node index.js`)                                    |

## Routes 🚦

### User Routes

- **/api/auth**
  - `POST /register` : Register new user (with avatar)
  - `POST /recovery-password` : Request password recovery
  - `PUT /recovery-password/:token` : Recover password using token
  - `POST /login` : Log in
  - `POST /events` : Create events (requires authentication and allows image upload)
  - `GET /attendees/:_id` : View confirmed attendees for an event (not requires authentication)

### Event Routes

- **/api/events**
  - `GET /` : List events (not requires authentication)
  - `GET /:_id` : Get event details (not requires authentication)
  - `PUT /:_id` : Update event (requires authentication and permissions, allows image upload)

### Attendee Routes

- **/api/attendees**
  - `GET /` : List confirmed attendees (requires authentication)
  - `GET /:_id` : View attendee details (requires authentication)

## Middleware 🔒

- **isAuth** : User authentication validation.
- **authority** : Permissions validation for event updates.
- **deleteImage** : Delete images from Cloudinary.
- **uploadImage** : Upload images to Cloudinary.
- **isConfirmedEvent** : Validate if a user has confirmed attendance to an event.
- **tokenRecoveryPassword** : Validate user's recovery token.

## Data Models 🗂️

### User Model (userModel)

The user model defines the structure of user data in the application, including personal details, roles, and associated events.

| Field    | Type       | Description                       |
| -------- | ---------- | --------------------------------- |
| name     | String     | The first name of the user.       |
| lastName | String     | The last name of the user.        |
| email    | String     | The user's email address, unique. |
| password | String     | The user's password.              |
| roles    | [String]   | The roles assigned to the user.   |
| avatar   | String     | URL to the user's avatar image.   |
| token    | String     | Token for user verification.      |
| events   | [ObjectId] | Events associated with the user.  |

### Event Model (eventModel)

The event model defines the structure of event data, including details about the event and its creator.

| Field       | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| title       | String   | The title of the event.         |
| description | String   | The description of the event.   |
| image       | String   | URL to the event's image.       |
| date        | Date     | The date of the event.          |
| location    | String   | The location of the event.      |
| creator     | ObjectId | The user who created the event. |

### Attendees Model (attendeesModel)

The attendees model defines the relationship between users and events, tracking attendance.

| Field    | Type     | Description                 |
| -------- | -------- | --------------------------- |
| name     | String   | The first name of the user. |
| lastName | String   | The last name of the user.  |
| email    | String   | The user's email address.   |
| eventId  | ObjectId | Reference to the event.     |

## Email Notifications ✉️

- Welcome email after registration.
- Password recovery email.
- Password modification email.
- Event creation email.
- Event attendance confirmation email.

## Author

Work done by ❤️ Daniele Mazzola

[GitHub Repository](https://github.com/danielemazzola/PROYECTO_10)
