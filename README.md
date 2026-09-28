# UniConnect - University Community Platform (HTML/CSS/JavaScript Version)

A modern, university-focused social and community website designed to help students engage with university life. Students can discover events, share experiences, communicate with peers, provide anonymous feedback, and suggest campus improvements.

**This version uses only HTML, CSS, and JavaScript with localStorage for data storage - no server or database required!**

## Features

### Core Features
- **User Authentication**: Registration, login, and logout system using localStorage
- **Student Profiles**: Customizable profiles with bio, course information, and interests
- **Student Feed**: Social feed where students can post captions, like posts, and comment
- **Events & Activities**: Browse and register for upcoming university events (admin can create events)
- **Anonymous Feedback**: Submit concerns and feedback anonymously without revealing identity
- **Campus Ideas**: Submit and vote on creative ideas for improving university life
- **Admin Dashboard**: Admin panel for managing events, reviewing feedback, moderating content, and viewing statistics

### Technical Features
- **No Server Required**: Runs entirely in the browser using localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Pure JavaScript**: No frameworks - vanilla JavaScript for beginner-friendly learning
- **Data Persistence**: All data stored in browser localStorage
- **Session Management**: Browser-based authentication

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (vanilla)
- **Data Storage**: localStorage (browser-based)
- **No Backend**: Pure client-side application
- **No Database**: No MySQL or database server needed
- **No Server**: No Apache, PHP, or XAMPP required

## Project Structure

```
university-community/
├── admin/
│   └── dashboard.html         # Admin dashboard for content moderation
├── css/
│   └── style.css              # Main stylesheet with responsive design
├── images/                    # Placeholder for images
├── js/
│   ├── data.js                # Data management system using localStorage
│   └── main.js                # JavaScript for mobile navigation and interactions
├── index.html                 # Landing page
├── login.html                 # User login page
├── register.html              # User registration page
├── logout.html                # Logout handler
├── feed.html                  # Student feed with posts, likes, comments
├── events.html                # Events listing and registration
├── feedback.html              # Anonymous feedback submission
├── ideas.html                 # Campus ideas with voting system
└── profile.html               # User profile and profile editing
```

## Installation & Setup

### Prerequisites
- Web browser (Chrome, Firefox, Edge, Safari, etc.)
- Text editor (VS Code, Notepad++, etc.)
- **No server or database required!**

### Step 1: Open the Project

1. Open the project folder in VS Code or your preferred text editor
2. Right-click on `index.html`
3. Select "Open with Live Server" (if using VS Code with Live Server extension)
   OR
   Simply double-click `index.html` to open it in your default browser

### Step 2: That's It!

The application will run directly in your browser with no additional setup needed.

**Note**: Data is stored in your browser's localStorage. Clearing your browser data will reset the application.

## Default Credentials

### Admin Account
- **Email**: admin@university.edu
- **Password**: admin123

### Create Student Account
1. Click "Register" on the navigation bar
2. Fill in your details (email, password, name, course, year)
3. Click "Register"
4. Login with your new account

## How to Use Each Feature

### 1. Student Feed
- **View posts**: All posts from students appear in reverse chronological order
- **Create post**: Click "Create a Post", add a caption, then click "Post"
- **Like posts**: Click the heart icon to like/unlike posts
- **Comment**: Click "Comments" to view/add comments on posts

### 2. Events
- **View events**: Browse upcoming events sorted by date
- **Register**: Click "Register" on an event to RSVP (click again to unregister)
- **Create event (Admin only)**: Click "+ Create Event", fill in details, and submit

### 3. Anonymous Feedback
- **Submit feedback**: Choose a category, add a subject and detailed message
- **Your identity is never stored** - feedback is completely anonymous
- **Admin view**: Admins can see all feedback and update status (pending/reviewed/resolved)

### 4. Campus Ideas
- **Submit idea**: Add a title, category, and detailed description
- **Vote**: Click the up arrow to vote for ideas (click again to remove vote)
- **Comment**: Add comments to discuss ideas
- **Popular ideas**: Ideas are sorted by vote count

### 5. Profile
- **View profile**: See your profile picture, name, course, bio, and posts
- **Edit profile**: Click "Edit Profile" to update your information

### 6. Admin Dashboard
- **Access**: Only available to admin users
- **Statistics**: View total users, posts, events, feedback, and ideas
- **Manage content**: Delete posts and events
- **Review feedback**: Mark feedback as reviewed or resolved
- **URL**: Open `admin/dashboard.html` in your browser

## Data Storage Overview

The application uses localStorage to store all data. The data structure includes:

### Users
- Stores student account information
- Includes profile picture, course, year of study, bio, interests
- `isAdmin` flag for admin privileges

### Posts
- Student feed posts with captions
- Linked to users via userId

### Events
- University events with title, description, date, time, location
- Created by admin users

### Feedback
- Anonymous feedback submissions
- No userId - completely anonymous
- Categories: facilities, transport, food, classrooms, services, activities, safety, other

### Ideas
- Campus improvement ideas submitted by students
- Includes vote count and category

### Comments
- Comments on both posts and ideas
- Linked to users, posts, and ideas

### Likes
- Tracks which users liked which posts
- Prevents duplicate likes

### Event Registrations
- Tracks which users registered for which events
- Prevents duplicate registrations

### Idea Votes
- Tracks which users voted for which ideas
- Prevents duplicate votes

## Security Features

- **Password Storage**: Passwords are stored in localStorage (for demo purposes - in production, use a real backend with proper hashing)
- **XSS Protection**: User input is sanitized when displayed
- **Admin Protection**: Admin pages check for admin privileges before access
- **Session Management**: Browser-based authentication using localStorage

**Important Note**: This is a demonstration/educational project. For production use, you should implement a proper backend with secure password hashing, SQL injection prevention, and proper session management.

## Customization

### Change Colors
Edit `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... more colors */
}
```

### Add New Admin
Open browser DevTools (F12), go to Console, and run:
```javascript
const users = JSON.parse(localStorage.getItem('users'));
const user = users.find(u => u.email === 'user@example.com');
user.isAdmin = true;
localStorage.setItem('users', JSON.stringify(users));
```

### Reset All Data
To clear all data and start fresh:
```javascript
localStorage.clear();
location.reload();
```

## Troubleshooting

### Data Not Persisting
- Ensure you're not in private/incognito mode
- Check that localStorage is enabled in your browser
- Clear browser cache and try again

### Changes Not Showing
- Refresh the page after making changes
- Check browser console for JavaScript errors
- Ensure `js/data.js` is loaded before other scripts

### Admin Dashboard Not Accessible
- Ensure you're logged in as admin (admin@university.edu / admin123)
- Check that the user has `isAdmin: true` in localStorage
- Try logging out and logging back in

### Page Not Loading
- Ensure all files are in the correct folder structure
- Check that `js/data.js` and `js/main.js` are present
- Verify file paths in HTML are correct

## Future Improvements

Potential features to add as you advance:

1. **Real-time notifications** for likes, comments, and event updates
2. **Email notifications** for event registrations and feedback responses
3. **Advanced search** for posts, events, and ideas
4. **Private messaging** between students
5. **Event calendar view** with monthly/weekly layouts
6. **Polls and surveys** for student opinions
7. **Study group formation** and coordination
8. **Campus map integration** for event locations
9. **File sharing** for study materials
10. **Analytics dashboard** for student engagement metrics

## Learning Outcomes

This project teaches:
- Frontend development (HTML, CSS, JavaScript)
- Client-side data management with localStorage
- User authentication without a backend
- CRUD operations (Create, Read, Update, Delete) in JavaScript
- Form validation and security
- Responsive web design
- Project organization and structure
- JavaScript object manipulation and data structures

## Differences from PHP/MySQL Version

This HTML/CSS/JavaScript version is designed for beginners who want to:
- Learn without setting up a server
- Understand frontend concepts first
- Build a fully functional prototype quickly
- Deploy easily (just upload files to any hosting)

**Limitations:**
- Data is stored in browser localStorage (clearing browser data resets the app)
- Not suitable for production (no real backend security)
- No real file uploads (images would need a backend)
- Passwords are stored in plain text (for demo only)

**To move to production:**
- Implement a PHP/MySQL backend
- Add proper password hashing
- Add file upload handling
- Implement real session management

## License

This is an educational project. Feel free to modify and use it for learning purposes.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the code comments
3. Open browser DevTools (F12) to check for JavaScript errors
4. Ensure all files are in the correct folder structure

---

**Built with ❤️ for university students**
#   U N I _ S I T E S  
 