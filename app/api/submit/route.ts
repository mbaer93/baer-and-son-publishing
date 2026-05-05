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
    const data = await req.formData()

    const authorName = data.get('authorName') as string
    const email = data.get('email') as string
    const phone = data.get('phone') as string
    const bookTitle = data.get('bookTitle') as string
    const genre = data.get('genre') as string
    const wordCount = data.get('wordCount') as string
    const synopsis = data.get('synopsis') as string
    const howHeard = data.get('howHeard') as string
    const rightsConfirmed = data.get('rightsConfirmed') === 'true'
    const manuscript = data.get('manuscript') as File | null
    const coverArt = data.get('coverArt') as File | null

    if (!authorName || !email || !bookTitle || !synopsis || !manuscript) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let manuscriptPath: string | null = null
    let coverArtPath: string | null = null

    // Upload manuscript
    const manuscriptBytes = await manuscript.arrayBuffer()
    const manuscriptExt = manuscript.name.split('.').pop()
    const manuscriptFilename = `${Date.now()}-${authorName.replace(/\s+/g, '-').toLowerCase()}-manuscript.${manuscriptExt}`

    const { error: mErr } = await supabase.storage
      .from('baer-submissions')
      .upload(`manuscripts/${manuscriptFilename}`, Buffer.from(manuscriptBytes), {
        contentType: manuscript.type,
        upsert: false,
      })

    if (!mErr) {
      manuscriptPath = `manuscripts/${manuscriptFilename}`
    }

    // Upload cover art if provided
    if (coverArt) {
      const coverBytes = await coverArt.arrayBuffer()
      const coverExt = coverArt.name.split('.').pop()
      const coverFilename = `${Date.now()}-${authorName.replace(/\s+/g, '-').toLowerCase()}-cover.${coverExt}`

      const { error: cErr } = await supabase.storage
        .from('baer-submissions')
        .upload(`covers/${coverFilename}`, Buffer.from(coverBytes), {
          contentType: coverArt.type,
          upsert: false,
        })

      if (!cErr) {
        coverArtPath = `covers/${coverFilename}`
      }
    }

    // Insert submission record
    const { data: submission, error: dbErr } = await supabase
      .from('book_submissions')
      .insert({
        author_name: authorName,
        email,
        phone: phone || null,
        book_title: bookTitle,
        genre: genre || null,
        word_count: wordCount || null,
        synopsis,
        manuscript_path: manuscriptPath,
        cover_art_path: coverArtPath,
        how_heard: howHeard || null,
        rights_confirmed: rightsConfirmed,
        status: 'pending',
      })
      .select()
      .single()

    if (dbErr) {
      console.error('DB error:', dbErr)
      // Don't fail the whole submission if DB write fails
    }

    // Send notification email
    try {
      await resend.emails.send({
        from: 'Baer and Son Publishing <onboarding@resend.dev>',
        to: ['matt@socialdrivemedia.com'],
        subject: `New Book Submission: "${bookTitle}" by ${authorName}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1c1c1c;">
            <h1 style="color: #1a3a2e; font-size: 24px;">New Book Submission</h1>
            <hr style="border-color: #c4972a; border-width: 2px; margin: 20px 0;" />
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Author:</td><td>${authorName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold;">Book Title:</td><td><strong>${bookTitle}</strong></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Genre:</td><td>${genre || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Word Count:</td><td>${wordCount || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">How Heard:</td><td>${howHeard || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Manuscript:</td><td>${manuscriptPath ? '✅ Uploaded' : '❌ Upload failed'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Cover Art:</td><td>${coverArtPath ? '✅ Uploaded' : 'Not provided'}</td></tr>
            </table>

            <div style="background: #f0ebe2; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #c4972a;">
              <strong>Synopsis:</strong><br/><br/>
              ${synopsis.replace(/\n/g, '<br/>')}
            </div>

            ${submission ? `<p style="font-size: 12px; color: #6b6b6b;">Submission ID: ${submission.id}</p>` : ''}
            
            <hr style="border-color: #e2d9cc; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6b6b6b;">Files are stored in the Supabase baer-submissions bucket. Reply to this email to reach the author directly.</p>
          </div>
        `,
        replyTo: email,
      })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
      // Don't fail the submission if email fails
    }

    // Send confirmation to author
    try {
      await resend.emails.send({
        from: 'Baer and Son Publishing <onboarding@resend.dev>',
        to: [email],
        subject: `We got it — "${bookTitle}"`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1c1c1c;">
            <h1 style="color: #1a3a2e; font-size: 24px;">We've Got Your Submission</h1>
            <hr style="border-color: #c4972a; border-width: 2px; margin: 20px 0;" />
            
            <p>Hi ${authorName},</p>
            <p>Your submission for <strong>"${bookTitle}"</strong> came through. We review every manuscript personally — you'll hear from us within 5 business days.</p>
            
            <p>We're looking forward to reading it.</p>
            
            <p style="color: #c4972a; font-style: italic; font-size: 18px;">— Baer and Son Publishing</p>
            
            <hr style="border-color: #e2d9cc; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6b6b6b;">Built on family. Built for authors who have something real to say.</p>
          </div>
        `,
      })
    } catch (confirmErr) {
      console.error('Confirmation email error:', confirmErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
