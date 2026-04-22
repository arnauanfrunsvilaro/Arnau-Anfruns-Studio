import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "arnauanfruns@gmail.com";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { brand, email, goal } = req.body;

  if (!brand || !email || !goal) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "RESEND_API_KEY is not set" });
    }

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
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
      return res.status(500).json({ 
        error: "Error de Resend: " + (error.message || "Fallo en el envío"),
        details: error 
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
