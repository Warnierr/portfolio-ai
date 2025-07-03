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

    // En mode développement, on simule l'envoi
    console.log('📧 [SIMULATION] Message de contact reçu:')
    console.log('👤 Nom:', name)
    console.log('📧 Email:', email)
    console.log('🏢 Entreprise:', company || 'Non spécifiée')
    console.log('📝 Sujet:', getSubjectLabel(subject))
    console.log('💬 Message:', message)
    console.log('📅 Date:', new Date().toLocaleString('fr-FR'))
    console.log('─'.repeat(50))

    // Simulation d'un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'Message reçu ! (Mode développement - email simulé)',
      data: {
        name,
        email,
        company,
        subject: getSubjectLabel(subject),
        message,
        timestamp: new Date().toISOString()
      }
    }

  } catch (error) {
    console.error('Erreur traitement contact:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du traitement du message'
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