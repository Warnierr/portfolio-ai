import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not configured");
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
        }

        // Send email notification
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const { data, error } = await resend.emails.send({
            from: `Portfolio Contact <${fromEmail}>`,
            to: process.env.CONTACT_EMAIL || "raouf.warnier@gmail.com",
            replyTo: email,
            subject: `Nouveau message de ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                            .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; border-radius: 4px; }
                            .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
                            .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
                            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2 style="margin: 0;">📧 Nouveau message de contact</h2>
                            </div>
                            <div class="content">
                                <div class="info-box">
                                    <div class="label">👤 Nom</div>
                                    <div>${name}</div>
                                </div>
                                
                                <div class="info-box">
                                    <div class="label">✉️ Email</div>
                                    <div><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></div>
                                </div>
                                
                                <div class="message-box">
                                    <div class="label" style="margin-bottom: 10px;">💬 Message</div>
                                    <div style="white-space: pre-wrap;">${message}</div>
                                </div>
                                
                                <div class="footer">
                                    Reçu via le formulaire de contact de kenshu.dev
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        });

        if (error) {
            console.error("RESEND_ERROR:", JSON.stringify(error, null, 2));
            return NextResponse.json({
                error: "Failed to send email",
                details: error.message || "Unknown error"
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (e) {
        console.error("CONTACT_API_ERROR:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
