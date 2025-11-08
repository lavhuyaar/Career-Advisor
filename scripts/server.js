import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Ollama backend is running!");
});

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3",
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to contact Ollama" });
  }
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);