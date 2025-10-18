# Mock Auth Demo

This folder contains a small client (HTML/CSS/JS) and a mock Node/Express backend for demoing login/signup.

Run locally:

1. Install dependencies (Node.js required):

```powershell
npm install
```

2. Start the mock server:

```powershell
npm start
```

3. Open the app in your browser:

```powershell
Start-Process "http://localhost:3000/main.html"
```

Notes:
- Password eye buttons reveal the password for 2 seconds.
- The server uses a simple in-memory store — restarting the server clears accounts.
- No real security — for demo only.
