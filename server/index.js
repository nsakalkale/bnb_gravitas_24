const express = require("express");
const { MongoClient } = require("mongodb");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// MongoDB connection
const uri =
  "mongodb+srv://nsakalkale:Nimish%4027072004@bnb.cpxcu.mongodb.net/BNB?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("BNB");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

// Encryption function
function encrypt(text) {
  const algorithm = "aes-256-ctr";
  const secretKey = process.env.ENCRYPTION_KEY;
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

// Decryption function
function decrypt(text) {
  const algorithm = "aes-256-ctr";
  const secretKey = process.env.ENCRYPTION_KEY;
  const [ivHex, encryptedHex] = text.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(ivHex, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
}

app.post("/api/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  // Server-side validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Not Registered" });
    }
    if (user && password != user.password) {
      return res.setMaxListeners(401).json({ error: "Invalid Password" });
    }

    // You can use encryptedUserId if needed for further logic
    // const encryptedUserId = encrypt(user._id.toString());

    return res.json({ message: "Login Successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
