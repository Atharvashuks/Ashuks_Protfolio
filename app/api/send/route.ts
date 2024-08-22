import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    console.log("email", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtpro.gmail.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank You for Reaching Out!`,
      html: `
     <p>Hello.</p>
     <p>Hope you are doing well</p>

    <p>Thank you for reaching out! I appreciate your message and will connect with you soon.</p>

   <hr>
    <footer style="font-family: Arial, sans-serif; font-size: 12px; color: #555; text-align: left; margin-top: 20px;">
      <p>Best regards,<br>
      <strong>Atharva A Shukla</strong></p>
    
      <p>
        <a href="https://www.linkedin.com/in/your-profile" style="color: #0077b5; text-decoration: none;">LinkedIn</a> | 
        <a href="https://github.com/your-username" style="color: #333; text-decoration: none;">GitHub</a> | 
        <a href="mailto:your.email@example.com" style="color: #d44638; text-decoration: none;">Email</a>
      </p>
    
      <p style="font-size: 10px; color: #999;">© 2024 Atharva A Shukla. All rights reserved.</p>
    </footer>
        `,
    };

    const mailOption2 = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Client Email",
      html: `
        <h3>email: ${email}</h3>
        <p> Subject: ${subject}</p>
        <p> Message: ${message}</p> 
        `,
    };

    try {
      await transporter.sendMail(mailOption);
      await transporter.sendMail(mailOption2);

      return NextResponse.json(
        { message: "Email Sent Successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to Send Email" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
