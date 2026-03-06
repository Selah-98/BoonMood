# Boon Mood 

Boon Mood is a simple mood tracking and journaling application built with React.js.  
It allows users to record their daily emotions, reflect on their mood patterns, and visualize how they have been feeling over time.

The app focuses on simplicity, reflection, and emotional awareness by combining journaling with mood statistics and a calendar-based view.

---

##  Features

- User authentication (Sign up / Log in)
- Guest mode for quick use
- Create mood journal entries
- Edit and delete past entries
- Calendar view to visualize moods by date
- Mood statistics (e.g. how many days a user felt a certain emotion)
- Customizable theme colors based on mood
- Light mode and dark mode support
- Date and time selection for each entry

---

##  Mood Colors

Each mood has its own pastel theme color:

| Mood | Color |
|-----|------|
| Happy | Pastel Green |
| Sad | Sky Pastel Blue |
| Angry | Pastel Red |
| Other / Mixed | Pastel Lavender |

These colors help users visually understand emotional trends.

---

##  Technologies Used

- React.js (JavaScript)
- CSS
- Supabase (Authentication + Database)
- React Hooks
- Local State Management

---

##  Authentication

Authentication is handled using **Supabase**.

Users can:
- Create an account
- Log in
- Log out
- Use the app as a guest

Supabase stores:
- User accounts
- Mood entries
- Timestamps
- Mood statistics

---

##  Mood Calendar

The calendar allows users to:

- View moods by date
- Track emotional patterns
- Click a day to view or edit entries

---

##  Mood Statistics

Boon Mood also tracks emotional trends such as:

- How many days a user felt happy
- How many days they felt sad
- Mood distribution over time

This helps users better understand their emotional habits.

---

##  How to Run the App

### 1 Install Dependencies

Open the project folder and run:


npm install


---

### 2 Start the Development Server

Run:


npm start


or if using Vite:


npm run dev


The app will start locally.

---

### 3 Open the App

Visit:


http://localhost:3000


or


http://localhost:5173


depending on your setup.

---

## ⚙ Supabase Setup

1. Create a project on Supabase
2. Create a table for mood entries
3. Enable authentication
4. Add your Supabase URL and API key to your project

Example `.env` file:


VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here


---

## Future Improvements

Possible features for future versions:

- Mood graphs and charts
- Daily reminders
- Private encrypted journal entries
- Mobile app version
- Export mood history

---

## Author

**Divine Ilunga**

Full Stack Developer

GitHub  
https://github.com/Selah-98

Email  
divineilunga011@gmail.com

---

## 📄 License

This project is open-source and available for learning and personal use.
