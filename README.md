# 🎟️ Lotto

**Lotto** is a full-stack lottery application built with **JavaScript**, consisting of a **frontend** (client-side UI) and a **backend** (server-side logic and API).
The project is structured to clearly separate responsibilities and make further development easy.

---

## 🚀 Features

* 🎲 Lottery number generation logic
* 🌐 Frontend user interface
* ⚙️ Backend API for business logic
* 🔁 Communication between frontend and backend
* 📁 Clear and scalable project structure

---

## 🧱 Full Project Structure

```
📦 Lotto
 ┣ 📂 backend
 ┃ ┣ 📂 node_modules        # Backend dependencies
 ┃ ┣ 📂 routes              # API route definitions
 ┃ ┣ 📂 controllers         # Request handling logic
 ┃ ┣ 📂 services            # Business / lotto logic
 ┃ ┣ 📂 models              # Data models (if used)
 ┃ ┣ 📜 index.js             # Backend entry point
 ┃ ┣ 📜 app.js               # App configuration
 ┃ ┣ 📜 package.json         # Backend dependencies & scripts
 ┃ ┗ 📜 package-lock.json
 ┃
 ┣ 📂 frontend
 ┃ ┣ 📂 node_modules        # Frontend dependencies
 ┃ ┣ 📂 public              # Static files
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components        # UI components
 ┃ ┃ ┣ 📂 services          # API calls
 ┃ ┃ ┣ 📂 styles            # CSS files
 ┃ ┃ ┣ 📜 index.js           # Frontend entry point
 ┃ ┃ ┗ 📜 App.js             # Main UI component
 ┃ ┣ 📜 package.json         # Frontend dependencies & scripts
 ┃ ┗ 📜 package-lock.json
 ┃
 ┣ 📜 .gitignore
 ┣ 📜 README.md
```

> Folder names may slightly differ depending on implementation, but this structure reflects the intended architecture.

---

## 🛠️ Requirements

* Node.js (v14 or newer)
* npm or yarn
* Modern web browser

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/jakub728/Lotto.git
cd Lotto
```

2. **Install backend dependencies**

```bash
cd backend
npm install
# or
yarn install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
# or
yarn install
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or
yarn start
```

The backend will run on a local port (e.g. `http://localhost:5000`).

### Start Frontend

```bash
cd frontend
npm start
# or
yarn start
```

The frontend will open in your browser (commonly at `http://localhost:3000`).

---

## 🔌 Frontend ↔ Backend Communication

The frontend communicates with the backend API to:

* Generate lottery numbers
* Retrieve results
* Display data to the user

Example API endpoints:

```
GET /api/lotto
POST /api/lotto/check
```

(Adjust endpoints to match your implementation.)

---

## 🧠 Future Improvements

* Add database support
* User authentication
* History of draws
* UI animations for number drawing
* Unit and integration tests

---

## 🧪 Testing

Tests are not included by default but can be added using:

* Jest
* Mocha
* Supertest (backend)
* React Testing Library (frontend)

---

## 📄 License

No license file is currently included.
Add a `LICENSE` file to define usage rights (e.g. MIT).

---

## 📬 Contact

If you have questions, ideas, or improvements — feel free to open an issue or submit a pull request.

Happy coding! 🚀
