import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_API_KEY);
const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "arnauanfruns@gmail.com";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { brand, email, goal } = req.body;

    if (!brand || !email || !goal) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Simulation mode active.");
        return res.json({ success: true, simulated: true });
      }

      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // Note: For custom domains, you need to verify them in Resend
        to: [RECEIVER_EMAIL],
        subject: `Nueva solicitud de auditoría: ${brand}`,
        html: `
          <h1>Nueva solicitud de auditoría de ${brand}</h1>
          <p><strong>Marca:</strong> ${brand}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Objetivo Estratégico:</strong></p>
          <p>${goal}</p>
          <hr />
          <p>Enviado desde el formulario de contacto de Arnau Anfruns Studio.</p>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
