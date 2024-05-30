# 🎸 Proyecto 10 Rock the Code

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB

## 📦 Dependencies

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

## 🛠️ Development Dependencies

| Package | Version |
| ------- | ------- |
| nodemon | ^3.1.0  |

## 📜 Scripts

| Command | Description                      |
| ------- | -------------------------------- |
| dev     | Run the application with nodemon |
| start   | Start the application            |

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

📍 Routes
User Routes
Method Endpoint Description
POST /api/auth/register Create a new user
POST /api/auth/recovery-password Recover password
PUT /api/auth/recovery-password/
Update password with token
POST /api/auth/login Login
POST /api/auth/events Create event (requires auth)
GET /api/auth/attendees/:\_id Get attendees of event (requires auth)
Event Routes
Method Endpoint Description
GET /api/events List events (requires auth)
GET /api/events/:\_id Get event details (requires auth)
PUT /api/events/:\_id Update event (requires auth)
Attendees Routes
Method Endpoint Description
GET /api/attendees List confirmed attendees (requires auth)
GET /api/attendees/:\_id Get attendee details (requires auth)
🛡️ Middleware
isAuth: Validate if user is logged in.
authority: Validate if the user is the event creator or an admin before updating event info.
deleteImage: Delete images in Cloudinary.
uploadImage: Upload images to Cloudinary.
isConfirmedEvent: Validate if a user has confirmed attendance to an event.
tokenRecoveryPassword: Validate if the user token exists for password recovery.
🗃️ Models
User Model
name: String, required
lastName: String, required
email: String, required, unique
password: String, required
roles: Array of String, default: ['user']
avatar: String, default URL provided
token: String
events: Array of ObjectId, references Event
Event Model
title: String, required
description: String, required
image: String, default URL provided
date: Date, required
location: String, required
creator: ObjectId, references User
Attendees Model
userId: ObjectId, references User
eventId: ObjectId, references Event
📧 Email Notifications
Welcome email after registration
Password recovery email
Password modification email
Event creation email
Event attendance confirmation email
Made with ❤️ by Daniele Mazzola
GitHub Repository
