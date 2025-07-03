// Import dynamique pour éviter les erreurs SSR
let nodemailer: any = null

async function getNodemailer() {
  if (!nodemailer) {
    try {
      nodemailer = await import('nodemailer' as any)
      return nodemailer.default || nodemailer
    } catch (error) {
      console.error('Erreur lors du chargement de nodemailer:', error)
      throw new Error('Module nodemailer non disponible')
    }
  }
  return nodemailer.default || nodemailer
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    
    // Validation des données
    const { name, email, company, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tous les champs obligatoires doivent être remplis'
      })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Format d\'email invalide'
      })
    }

    // Configuration du transporteur email
    const nodemailerModule = await getNodemailer()
    const transporter = nodemailerModule.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Template d'email professionnel
    const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px;">💌 Nouveau message via Portfolio</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Demande de contact reçue</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1e293b; margin-top: 0;">📋 Détails du contact</h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>👤 Nom:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
          ${company ? `<p style="margin: 8px 0;"><strong>🏢 Entreprise:</strong> ${company}</p>` : ''}
          <p style="margin: 8px 0;"><strong>📝 Sujet:</strong> ${getSubjectLabel(subject)}</p>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #475569;">💬 Message:</h3>
          <p style="line-height: 1.6; color: #64748b; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
          <p style="margin: 0; color: #94a3b8; font-size: 14px; text-align: center;">
            📅 Reçu le ${new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #64748b; font-size: 14px;">
          🤖 Envoyé automatiquement depuis le portfolio de Raouf WARNIER
        </p>
      </div>
    </div>
    `

    // Envoi de l'email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'raouf.warnier@exemple.com',
      replyTo: email,
      subject: `💼 [Portfolio] ${getSubjectLabel(subject)} - ${name}`,
      html: emailTemplate
    }

    await transporter.sendMail(mailOptions)

    // Email de confirmation à l'expéditeur
    const confirmationTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px;">✅ Message bien reçu !</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Merci pour votre message</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <p style="color: #1e293b; font-size: 16px; line-height: 1.6;">
          Bonjour <strong>${name}</strong>,
        </p>
        
        <p style="color: #475569; line-height: 1.6;">
          Merci d'avoir pris le temps de me contacter via mon portfolio. 
          J'ai bien reçu votre message concernant "<strong>${getSubjectLabel(subject)}</strong>" 
          et je vous répondrai dans les plus brefs délais.
        </p>
        
        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #0c4a6e;">
            <strong>⏱️ Délai de réponse habituel :</strong> 24-48 heures<br>
            <strong>🚀 Pour les projets urgents :</strong> Mentionnez-le dans votre message
          </p>
        </div>
        
        <p style="color: #475569; line-height: 1.6;">
          En attendant, n'hésitez pas à explorer mes projets sur 
          <a href="https://github.com/@raouf-warnier" style="color: #667eea;">GitHub</a> 
          ou à découvrir <strong>Nina AI</strong>, mon agent intelligent en développement.
        </p>
        
        <p style="color: #1e293b; margin-bottom: 0;">
          À très bientôt !<br>
          <strong>Raouf WARNIER</strong><br>
          <span style="color: #667eea;">Ingénieur IA & Data - Créateur de Nina AI</span>
        </p>
      </div>
    </div>
    `

    const confirmationOptions = {
      from: `"Raouf WARNIER" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✅ Confirmation de réception - Portfolio Raouf WARNIER',
      html: confirmationTemplate
    }

    await transporter.sendMail(confirmationOptions)

    return {
      success: true,
      message: 'Message envoyé avec succès !'
    }

  } catch (error) {
    console.error('Erreur envoi email:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'envoi du message'
    })
  }
})

function getSubjectLabel(subject: string): string {
  const subjects: Record<string, string> = {
    'ai-project': '🤖 Projet IA / Nina AI',
    'data-engineering': '📊 Ingénierie de données',
    'devops': '⚙️ DevOps & Automatisation',
    'web-development': '🌐 Développement web',
    'consultation': '💡 Consultation technique',
    'collaboration': '🤝 Collaboration',
    'other': '📝 Autre'
  }
  
  return subjects[subject] || '📝 Demande générale'
} 