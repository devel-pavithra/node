const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory database (for demonstration purposes)
const users = [];

// Serve the HTML page for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
   console.log(`Register registration data -Username: ${username},Password: ${password}`);
  // Check if the user already exists
  if (users.find(user => user.username === username)) {
    console.log(`Registration failed for user: ${username} (User already exists)`);
    return res.status(409).json({ message: 'User already exists' });
  }

  // Store the user information in the in-memory database
  users.push({ username, password });
  console.log(`Registered user: ${username}`);
  res.status(201).json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Register login data -Username: ${username},Password: ${password}`);
  const user = users.find(user => user.username === username);

  if (!user || user.password !== password) {
    console.log(`Login failed for user: ${username} (Invalid credentials)`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  console.log(`Login successful for user: ${username}`);
  res.json({ message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
