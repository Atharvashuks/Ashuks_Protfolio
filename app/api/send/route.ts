import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// very small HTML escape helper
const escapeHtml = (str: string) =>
  str.replace(
    /[&<>"']/g,
    m =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[
        m
      ]!)
  )

export async function POST (req: Request) {
  try {
    const body = await req.json()
    const { email, subject, message } = body

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { message: 'Email and message are required' },
        { status: 400 }
      )
    }

    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject || 'Website Contact')
    const safeMessage = escapeHtml(message)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Gmail App Password
      }
    })

    const userMail = {
      from: `"Atharva Shukla" <${process.env.EMAIL_USER}>`,
      to: safeEmail,
      subject: 'Thanks for reaching out!',
      html: `
  <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:24px;">
    <div style="max-width:600px; background:#ffffff; margin:auto; padding:24px; border-radius:8px; border:1px solid #e5e7eb;">
      
      <h2 style="color:#111827;">Hi there 👋</h2>

      <p style="color:#374151; font-size:15px; line-height:1.6;">
        Thank you so much for getting in touch! I really appreciate you taking the time to reach out.
      </p>

      <p style="color:#374151; font-size:15px; line-height:1.6;">
        I’ve received your message and will get back to you as soon as possible.
        In the meantime, feel free to explore my work or connect with me on the platforms below.
      </p>

      <p style="color:#374151; font-size:15px; line-height:1.6;">
        <strong>
          If you’d like to follow up or share anything additional, you can also reach out to me directly at this email address.
          I’m always happy to continue the conversation.
        </strong>
      </p>

      <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;" />

      <p style="margin:0; color:#111827;"><strong>Atharva A. Shukla</strong></p>
      <p style="margin:4px 0 12px; color:#6b7280;">Full Stack Developer</p>

      <p>
        <a href="https://www.linkedin.com/in/atharva-a-shukla-0718b920b/" style="color:#2563eb; text-decoration:none;">LinkedIn</a> •
        <a href="https://github.com/Atharvashuks" style="color:#111827; text-decoration:none;">GitHub</a> •
        <a href="mailto:${
          process.env.EMAIL_USER
        }" style="color:#dc2626; text-decoration:none;">Email</a>
      </p>

      <p style="font-size:12px; color:#9ca3af; margin-top:24px;">
        © ${new Date().getFullYear()} Atharva A. Shukla
      </p>
    </div>
  </div>
`
    }

    const adminMail = {
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `New Contact Message`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New message received</h3>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f3f4f6; padding:12px; border-radius:6px;">
            ${safeMessage.replace(/\n/g, '<br/>')}
          </p>
        </div>
      `
    }

    await transporter.sendMail(userMail)
    await transporter.sendMail(adminMail)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}
