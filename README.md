# 📝 TaskVault
TaskVault is a full-stack task management web app that helps you stay productive with a clean, modern interface. Switch between light and dark themes, filter tasks, and manage your to-dos with ease.

🔗 **Live Demo:** [https://task-vault-2.onrender.com](https://task-vault-2.onrender.com)

---

## 🚀 Features
- 🌗 **Light & Dark Mode** toggle
- ✅ Add tasks with `title`, `description`, and `deadline`
- 🔍 Filter by `All`, `Active`, or `Completed`
- ❌ Delete tasks with one click
- 📦 Backend authentication with JWT
- 🌐 Deployed on **Render**

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Lucide Icons
- Axios

### Backend
- Django + Django Rest Framework
- PostgreSQL
- JWT Authentication

---

## 🌍 Environment Variables

### Frontend (`.env`)
VITE_API_URL=https://your-backend-url.onrender.com

### Backend (`.env` or Render settings)
DJANGO_SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=your-render-postgres-url
ALLOWED_HOSTS=task-vault-2.onrender.com

---

## 🧪 Run Locally

### Backend
git clone https://github.com/yourusername/taskvault-backend.git
cd taskvault-backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend
git clone https://github.com/yourusername/taskvault-frontend.git
cd taskvault-frontend
npm install
npm run dev

📷 UI Preview
![image](https://github.com/user-attachments/assets/f97a58a8-f42d-4d51-8b0d-e1cee29cec50)


✨ Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📜 License
This project is licensed under the MIT License.
