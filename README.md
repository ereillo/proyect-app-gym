# GYM APP

## [See the App!](https://gym-app.adaptable.app/)

![App Logo](your-image-logo-path-or-name)

## Description

It is an application, to manage the registration of clients in face-to-face services as in this example activity classes in a gym.
 
## User Stories

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **loged user** - Logged users can see a calendar for the weekly forecast of classes.
- **loged user profile** Logged in users can edit their profile, add photos and remove it from the database
- **loged user suscription** Logged in users can subscribe "fake button" in order to have permission to join a class. 
- **loged user active suscription** Users with an active subscription can see the classes they are enrolled in and unenroll from their personal area.
- **loged user active suscription comments** Users with active suscription can whrite a comment.

- **Teacher user** - Logged teachers can see what clases have this week in the pesonal area.
- **Teacher profile** - Teachers can edit his profile.

- **Admin user** - Logged admin can edit the calendar by assigning classes and teachers to the available hours.
- **Admin user** - Can see a list of all classes of the week with the teachers and the clients.

## Backlog Functionalities

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **Admin user** - Can cancel classes.

-**Calendar** - Actually the calendar is only for one week, we want to implement a full calendar to create as many weeks as you want.

## Technologies used

- **HTML**
- **javaScript**
- **CSS**
- **HandleBars**
- **Node**
- **MongoDB**
- **mongoose**
- **cloudinary**
- **Bcryptjs**
- **express**
- **express-session**
- **Boostrap**


## Models



User model
 
```
name: {
      type: String,
      trim: true,
      required: false,
    },
    surname: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }, 
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: String
    },
    role: {
      type: String,
      enum: ["client", "admin", "teacher"],
      default: "client"
    },
    suscriptionActive: {
      type: Boolean,
      default: false
    }

```

Week model

```
monday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  tuesday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
    at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  wednesday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  thursday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },
  friday: {
    at9: 
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    
    at12: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    at15: 
        {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
      
      at18: {
          type: Schema.Types.ObjectId,
          ref: "Class",
      }
  },

```
Class model 

className: String,
  teacher: 
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  
  capacity: Number,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  weekDay: String,
  classPic: String

```
Comment model

client: String,
note: String

## Links

## Collaborators

[Lucas Navarro](https://github.com/LucasNavarroR)

[Evelio Reillo](https://github.com/ereillo)

### Project

[Repository Link](https://github.com/ereillo/proyect-app-gym)

[Deploy Link](https://gym-app.adaptable.app/)

### Scalidraw

(https://excalidraw.com/#room=47465976393345ad2e24,ap8zc9nZZx5TTsDO0VH0ZA)

### Slides

(https://www.canva.com/design/DAFr4XmsEk0/z4_cgASkNdgPjR_DnO1Qsw/view?utm_content=DAFr4XmsEk0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
