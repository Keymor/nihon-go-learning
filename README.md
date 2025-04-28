# Project: Nihon-Go — Japanese Learning Platform

Nihon-Go is a modern, full-stack Japanese learning web application where users can practice Hiragana, Katakana, Kanji, vocabulary, and track their lesson progress interactively.
Built with a focus on beautiful design, secure authentication, and real-time user progress management.

(Backend part: https://github.com/Keymor/nihon-go-learning-API)
Site link: https://nihongo-learning.up.railway.app/

## Key Features

### <ins>Backend Features</ins>:

- Secure Server built with Node.js + Express.
- MongoDB + Mongoose for flexible database management.
- Bcrypt for hashing passwords.
- JWT for protected API routes.
- Environment Management using dotenv.

### <ins>Frontend Features</ins>:

Responsive Design:
Fully mobile-optimized, looks great on iPhone and Android.

Modern UI/UX:
- Soft colors, rounded cards, Japanese-style minimalism.
- Progress bars and completed lesson indicators.

### <ins>User Authentication</ins>

-Register: New users can create an account securely with hashed passwords.
- Login: Existing users can log in using email and password.
- JWT Authentication: Sessions are protected by secure JSON Web Tokens (JWT).
- Authorization: Certain pages and features are accessible only when logged in.

### <ins>Learning Content</ins>

<ins>Lessons Dashboard</ins>:
- View available lessons (example: grammar, vocabulary, kanji practice).
- Track how many lessons are completed (e.g., 4/10).

<ins>Cards-Based Learning</ins>:
- Vocabulary and Kanji are presented using interactive cards.
- Quick and clean design for practicing and reviewing material.

<ins>Kanji Explorer</ins>:
- Browse and study Kanji characters.
- Track progress for learned Kanji.

<ins>Vocabulary Lists</ins>:
- Study essential Japanese words.
- Each word is stored in user progress after being learned.

### <ins>User Progress Tracking</ins>

<ins>Save Lessons Completed</ins>:
- When a user finishes a lesson, it updates their profile automatically.

<ins>Save Vocabulary and Kanji Progress</ins>:
- Words and Kanji studied are stored per user.
- Users can continue exactly where they left off next time they log in.

## Future plans:

- Voice for spelling.
- Daily Streaks, Quizzes, Achievements like "First 50 Kanji mastered!" to make it even more fun.
- Social login (Google/Facebook).
