# JOBFIT ANALYZER - ATS Resume Scorer

A full-stack web app to analyze and score resumes against job descriptions using AI, with user authentication, history tracking, and a modern React frontend.

GitHub Repo: [https://github.com/Harsha-gella18/JobFit_Analyzer_APSSDC](https://github.com/Harsha-gella18/JobFit_Analyzer_APSSDC)

---

## Features

- User authentication (signup, login, JWT)
- Resume & JD upload (PDF or text)
- AI-powered scoring (Groq LLM)
- History tracking
- Profile management
- Modern UI (React, Tailwind CSS)

---

## 1. Clone the Repository

```sh
git clone https://github.com/Harsha-gella18/JobFit_Analyzer_APSSDC.git
cd JobFit_Analyzer_APSSDC
```

---

## 2. Backend Setup (Django + MySQL)

### a. Install Python

- [Download Python 3.10+](https://www.python.org/downloads/)

### b. Install pip and pipenv (optional, but recommended)

```sh
pip install --upgrade pip
pip install pipenv
```

### c. Create and Configure MySQL Database

1. Start MySQL and open your MySQL shell:

```sh
mysql -u root -p
```

2. Run these SQL commands (replace password as needed):

```sql
CREATE DATABASE ATS_track;
CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'YourStrongPassword';
GRANT ALL PRIVILEGES ON ATS_track.* TO 'django_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### d. Configure Environment Variables

1. Go to the backend folder:

```sh
cd Backend/smart_ats
```

2. Create a `.env` file (if not present) and add the following (replace with your real secrets):

```env
DJANGO_SECRET_KEY=your-django-secret-key
DB_NAME=ATS_track
DB_USER=django_user
DB_PASSWORD=YourStrongPassword
DB_HOST=localhost
DB_PORT=3306

GROQ_API_KEY=your-groq-api-key

AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1
```

> **Note:** Never commit real secrets to public repositories.

### e. Install Python Dependencies

```sh
cd ..
pip install -r requirements.txt
```

### f. Run Migrations

```sh
cd smart_ats
python manage.py makemigrations
python manage.py migrate
```

### g. Create Superuser (optional, for admin panel)

```sh
python manage.py createsuperuser
```

### h. Run the Backend Server

```sh
python manage.py runserver
```

- The API will be available at: [http://localhost:8000/](http://localhost:8000/)

---

## 3. Frontend Setup (React + Vite)

### a. Install Node.js

- [Download Node.js 18+](https://nodejs.org/)

### b. Install Frontend Dependencies

```sh
cd ../../Frontend/resumeats-frontend
npm install
```

### c. Start the Frontend Dev Server

```sh
npm run dev
```

- The app will be available at: [http://localhost:5173/](http://localhost:5173/)

---

## 4. Usage

- Open [http://localhost:5173/](http://localhost:5173/) in your browser.
- **Signup** for a new account.
- **Login** and access the dashboard.
- **Upload** your resume (PDF) and job description (PDF or text).
- **View results** and suggestions.
- **Check history** and your profile from the navigation bar.

---

## 5. Troubleshooting

- **MySQL errors:** Ensure MySQL is running and credentials in `.env` are correct.
- **AWS S3 errors:** Make sure your AWS credentials and bucket exist and are correct.
- **GROQ API errors:** Ensure your API key is valid and you have access.
- **CORS issues:** The backend allows all origins by default.
- **Frontend not connecting:** Check that `API_BASE_URL` in [`src/utils/api.js`](Frontend/resumeats-frontend/src/utils/api.js) matches your backend URL.

---

## 6. Project Structure

```
Backend/
  requirements.txt
  smart_ats/
    .env
    manage.py
    history/
    users/
    smart_ats/
Frontend/
  resumeats-frontend/
    .env
    package.json
    src/
```

---

## 7. API Endpoints

- `POST /api/users/signup/` — Register new user
- `POST /api/users/login/` — Login, returns JWT tokens
- `GET /api/users/profile/` — Get current user profile (JWT required)
- `POST /api/history/resume-score/` — Upload resume/JD and get score (JWT required)
- `GET /api/history/history/` — Get all previous analyses (JWT required)

---

## 8. Contact

For support, open an issue or contact [hgella91@gmail.com](mailto:hgella91@gmail.com).
