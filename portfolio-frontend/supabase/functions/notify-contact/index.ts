// Supabase Edge Function: notify-contact
// Sends an email notification via Resend when a new contact form submission is received.
//
// Deploy: supabase functions deploy notify-contact
// Set secrets:
//   supabase secrets set RESEND_API_KEY=re_xxxxx
//   supabase secrets set NOTIFY_EMAIL=dikshajain2026@gmail.com

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "dikshajain2026@gmail.com";

interface ContactPayload {
    record: {
        id: string;
        name: string;
        email: string;
        message: string;
        created_at: string;
    };
}

serve(async (req) => {
    try {
        const payload: ContactPayload = await req.json();
        const { name, email, message, created_at } = payload.record;

        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY not set");
            return new Response(JSON.stringify({ error: "Missing API key" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Portfolio Contact <onboarding@resend.dev>",
                to: [NOTIFY_EMAIL],
                subject: `New Contact: ${name}`,
                html: `
                    <h2>New Portfolio Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="border-left: 3px solid #6366f1; padding-left: 12px; color: #555;">
                        ${message}
                    </blockquote>
                    <p style="color: #888; font-size: 12px;">
                        Received at ${new Date(created_at).toLocaleString()}
                    </p>
                `,
            }),
        });

        const result = await emailResponse.json();

        return new Response(JSON.stringify({ success: true, result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error sending notification:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});
