interface NetworkingContactBody {
  name: string
  company: string
  role: string
  interest: string
  message: string
  linkedin: string
  timestamp: string
  source: string
}

interface ContactResponse {
  success: boolean
  message: string
}

export default defineEventHandler(async (event): Promise<ContactResponse> => {
  // Vérification de la méthode HTTP
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Lecture et validation du body
    const body = await readBody<NetworkingContactBody>(event)
    
    // Validation des champs requis
    if (!body.name || !body.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nom et message sont requis'
      })
    }

    // Validation de l'email LinkedIn si fourni
    if (body.linkedin && !body.linkedin.includes('linkedin.com')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'URL LinkedIn invalide'
      })
    }

    // Tentative d'envoi d'email avec nodemailer
    try {
      const nodemailer = await import('nodemailer')
      
      // Configuration SMTP
      const transporter = nodemailer.default.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })

      // Mapping des intérêts pour les templates
      const interestLabels: Record<string, string> = {
        consultation: 'Consultation IA 1-on-1',
        workshop: 'Workshop IA en équipe',
        collaboration: 'Collaboration projet',
        speaking: 'Invitation speaking',
        mentoring: 'Demande de mentoring',
        advisory: 'Advisory/Conseil stratégique',
        hiring: 'Opportunité emploi',
        networking: 'Networking général'
      }

      const roleLabels: Record<string, string> = {
        entrepreneur: 'Entrepreneur',
        cto: 'CTO/Tech Lead',
        developer: 'Développeur',
        investor: 'Investisseur',
        student: 'Étudiant',
        recruiter: 'Recruteur',
        other: 'Autre'
      }

      // Template HTML pour l'email de notification
      const notificationHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
            .networking-type { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1; margin: 20px 0; }
            .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .message-content { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            .priority-high { border-left-color: #ef4444; }
            .priority-medium { border-left-color: #f59e0b; }
            .priority-normal { border-left-color: #10b981; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Nouvelle demande de networking</h1>
              <p>Hub Networking Portfolio - ${new Date(body.timestamp).toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div class="content">
              <div class="networking-type ${getPriorityClass(body.interest)}">
                <h3>📋 Type de demande</h3>
                <p><strong>${interestLabels[body.interest] || body.interest}</strong></p>
                ${body.role ? `<p>Profil: ${roleLabels[body.role] || body.role}</p>` : ''}
              </div>

              <div class="contact-info">
                <h3>👤 Informations contact</h3>
                <p><strong>Nom:</strong> ${body.name}</p>
                ${body.company ? `<p><strong>Entreprise:</strong> ${body.company}</p>` : ''}
                ${body.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${body.linkedin}" target="_blank">${body.linkedin}</a></p>` : ''}
                <p><strong>Source:</strong> ${body.source}</p>
              </div>

              <div class="message-content">
                <h3>💬 Message</h3>
                <p>${body.message.replace(/\n/g, '<br>')}</p>
              </div>

              <div class="networking-type">
                <h3>⚡ Actions recommandées</h3>
                ${getRecommendedActions(body.interest)}
              </div>
            </div>

            <div class="footer">
              <p>Portfolio Networking Hub - Automatiquement généré</p>
              <p>Répondre sous 24h pour maintenir l'engagement optimal</p>
            </div>
          </div>
        </body>
      </html>
      `

      // Template de confirmation pour l'expéditeur
      const confirmationHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: #f0fdf4; padding: 30px; border-radius: 0 0 12px 12px; }
            .next-steps { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
            .social-links { text-align: center; margin: 20px 0; }
            .social-links a { margin: 0 10px; text-decoration: none; color: #6366f1; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Demande reçue avec succès !</h1>
              <p>Merci ${body.name} pour votre intérêt</p>
            </div>
            
            <div class="content">
              <p>Bonjour ${body.name},</p>
              
              <p>Votre demande concernant <strong>${interestLabels[body.interest] || body.interest}</strong> a bien été reçue !</p>
              
              <div class="next-steps">
                <h3>📅 Prochaines étapes</h3>
                <ul>
                  <li><strong>Sous 24h:</strong> Réponse personnalisée par email</li>
                  <li><strong>Si applicable:</strong> Proposition de créneau de discussion</li>
                  <li><strong>Suivi:</strong> Plan d'action adapté à vos besoins</li>
                </ul>
              </div>

              <p>En attendant, n'hésitez pas à:</p>
              <ul>
                <li>Explorer mon <a href="https://raouf-warnier.dev" target="_blank">portfolio complet</a></li>
                <li>Découvrir <strong>Nina AI</strong> directement sur le site</li>
                <li>Consulter ma <a href="https://raouf-warnier.dev/#roadmap" target="_blank">roadmap innovation</a></li>
              </ul>

              <div class="social-links">
                <a href="https://linkedin.com/in/raouf-warnier" target="_blank">LinkedIn</a>
                <a href="https://github.com/raouf-warnier" target="_blank">GitHub</a>
                <a href="https://huggingface.co/raouf-warnier" target="_blank">Hugging Face</a>
              </div>

              <p>Au plaisir d'échanger avec vous !</p>
              <p><strong>Raouf WARNIER</strong><br>
              Ingénieur IA & Data | Créateur de Nina AI<br>
              Inetum-Orange</p>
            </div>
          </div>
        </body>
      </html>
      `

      // Envoi de l'email de notification
      await transporter.sendMail({
        from: `"Portfolio Networking" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `🚀 Networking: ${interestLabels[body.interest] || body.interest} - ${body.name}`,
        html: notificationHTML
      })

      // Envoi de la confirmation à l'expéditeur
      if (body.linkedin && body.linkedin.includes('@')) {
        // Si le champ LinkedIn contient un email
        const email = body.linkedin.includes('@') ? body.linkedin : null
        
        if (email) {
          await transporter.sendMail({
            from: `"Raouf WARNIER" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `✅ Demande reçue - ${interestLabels[body.interest] || body.interest}`,
            html: confirmationHTML
          })
        }
      }

      console.log('✅ Emails networking envoyés avec succès')

    } catch (emailError) {
      console.warn('⚠️ Erreur envoi email, utilisation du fallback:', emailError)
      
      // Fallback: log détaillé pour le développement
      console.log('📊 NETWORKING CONTACT (Fallback):', {
        name: body.name,
        company: body.company,
        role: body.role,
        interest: body.interest,
        message: body.message.substring(0, 100) + '...',
        linkedin: body.linkedin,
        timestamp: body.timestamp,
        source: body.source
      })
    }

    return {
      success: true,
      message: 'Demande envoyée avec succès ! Réponse sous 24h.'
    }

  } catch (error) {
    console.error('❌ Erreur networking contact:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'envoi de votre demande. Veuillez réessayer.'
    })
  }
})

// Fonctions utilitaires
function getPriorityClass(interest: string): string {
  const highPriority = ['consultation', 'collaboration', 'advisory', 'speaking']
  const mediumPriority = ['workshop', 'mentoring', 'hiring']
  
  if (highPriority.includes(interest)) return 'priority-high'
  if (mediumPriority.includes(interest)) return 'priority-medium'
  return 'priority-normal'
}

function getRecommendedActions(interest: string): string {
  const actions: Record<string, string> = {
    consultation: `
      <ul>
        <li>📞 Planifier appel de qualification (15 min)</li>
        <li>📋 Préparer questionnaire besoins</li>
        <li>📅 Proposer créneaux Calendly</li>
        <li>📑 Envoyer resources préparatoires</li>
      </ul>
    `,
    workshop: `
      <ul>
        <li>📊 Évaluer taille équipe et niveau</li>
        <li>🎯 Définir objectifs d'apprentissage</li>
        <li>📅 Proposer format et durée</li>
        <li>💰 Établir devis personnalisé</li>
      </ul>
    `,
    collaboration: `
      <ul>
        <li>🤝 Call découverte du projet</li>
        <li>📋 Analyser fit technique</li>
        <li>⚖️ Définir modalités partenariat</li>
        <li>📝 Rédiger MOU si pertinent</li>
      </ul>
    `,
    speaking: `
      <ul>
        <li>🎤 Confirmer format intervention</li>
        <li>👥 Analyser profil audience</li>
        <li>📑 Proposer sujets/abstracts</li>
        <li>💼 Négocier conditions</li>
      </ul>
    `,
    mentoring: `
      <ul>
        <li>👤 Évaluer profil et objectifs</li>
        <li>⏰ Définir fréquence et format</li>
        <li>🎯 Établir plan de mentoring</li>
        <li>📊 Critères de sélection</li>
      </ul>
    `,
    advisory: `
      <ul>
        <li>🏢 Due diligence startup</li>
        <li>📈 Analyser traction et équipe</li>
        <li>💡 Évaluer fit expertise</li>
        <li>💰 Négocier termes advisory</li>
      </ul>
    `,
    hiring: `
      <ul>
        <li>📋 Analyser fiche de poste</li>
        <li>🏢 Rechercher l'entreprise</li>
        <li>💬 Call informationnel RH</li>
        <li>🤔 Évaluer intérêt mutuel</li>
      </ul>
    `,
    networking: `
      <ul>
        <li>☕ Proposer coffee chat</li>
        <li>🌐 Identifier synergies</li>
        <li>🤝 Présenter réseau si pertinent</li>
        <li>📱 Maintenir contact long terme</li>
      </ul>
    `
  }

  return actions[interest] || actions.networking
} 