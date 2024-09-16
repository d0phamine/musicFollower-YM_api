const express = require("express");
const bcrypt = require("bcryptjs");
// const path = require('path');
const jwt = require("jsonwebtoken");
const Datastore = require("nedb");
const bodyParser = require("body-parser");
const cors = require("cors");

// require("electron-reload")(__dirname, {
// 	electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
// 	hardResetMethod: 'exit',
// 	ignored: /node_modules|[\/\\]\.|users.db/
// });

// Инициализация базы данных
const db = new Datastore({ filename: "/Users/gregorysizov/Documents/db/users.db", autoload: true });

const app = express();

app.use(bodyParser.json(), cors());
// Секретный ключ для JWT (нужно хранить в безопасном месте)
const JWT_SECRET = "your_secret_key";

// Регистрация пользователя
app.post("/api/register", async (req, res) => {
	const { username, password } = req.body;

	// Проверяем, что логин и пароль не пустые
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required", registered: false });
	}

	// Проверяем, существует ли пользователь с таким же логином
	db.findOne({ username }, async (err, user) => {
		if (user) {
			return res.status(400).json({ message: "User already exists", registered: false });
		}

		// Хешируем пароль
		const hashedPassword = await bcrypt.hash(password, 10);

		// Сохраняем пользователя в базу данных
		const newUser = { username, password: hashedPassword };
		db.insert(newUser, (err, createdUser) => {
			if (err) {
				return res
					.status(500)
					.json({ message: "Error registering user" });
			}
			res.status(201).json({
				message: "User registered successfully",
				registered: true,
			});
		});
	});
});

// Аутентификация пользователя
app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;

	// Проверяем, что логин и пароль не пустые
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}

	// Ищем пользователя в базе данных
	db.findOne({ username }, async (err, user) => {
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid username or password" });
		}

		// Проверяем пароль
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(400)
				.json({ message: "Invalid username or password" });
		}

		// Создаем JWT-токен
		const token = jwt.sign(
			{ id: user._id, username: user.username },
			JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res.json({ token:token, success:true, id:user._id, username:user.username });
	});
});

// Пример защищенного маршрута
app.get("/api/protected", (req, res) => {
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ message: "Access denied" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		res.json({ message: "Protected data", user: decoded });
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

