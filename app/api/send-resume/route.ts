import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Fetch resume from your blob storage
    // Replace this URL with your actual resume blob URL
    const resumeUrl = process.env.RESUME_BLOB_URL || 'YOUR_RESUME_BLOB_URL'
    
    let resumeBuffer: Buffer
    let resumeFilename = 'resume.pdf'
    
    try {
      const resumeResponse = await fetch(resumeUrl)
      if (!resumeResponse.ok) {
        throw new Error('Failed to fetch resume')
      }
      const arrayBuffer = await resumeResponse.arrayBuffer()
      resumeBuffer = Buffer.from(arrayBuffer)
      
      // Extract filename from URL if possible
      const urlParts = resumeUrl.split('/')
      const lastPart = urlParts[urlParts.length - 1]
      if (lastPart && lastPart.includes('.')) {
        resumeFilename = lastPart
      }
    } catch (error) {
      console.error('Error fetching resume:', error)
      return NextResponse.json(
        { error: 'Failed to retrieve resume' },
        { status: 500 }
      )
    }

    // Send email with resume attachment
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
      to: [email],
      subject: 'Resume - Aymen Krifa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Thank you for your interest!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for requesting my resume. Please find it attached to this email.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions or would like to discuss potential opportunities, 
            feel free to reach out to me directly.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Best regards,<br>
              Aymen Krifa
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: resumeFilename,
          content: resumeBuffer,
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Resume sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
