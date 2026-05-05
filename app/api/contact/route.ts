import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await supabase.from('contact_messages').insert({ name, email, message })

    await resend.emails.send({
      from: 'Baer and Son Publishing <onboarding@resend.dev>',
      to: ['matt@socialdrivemedia.com'],
      subject: `Contact form: ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a3a2e;">New Contact Message</h2>
          <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
          <div style="background: #f0ebe2; padding: 16px; border-radius: 6px; border-left: 4px solid #c4972a; margin-top: 16px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
