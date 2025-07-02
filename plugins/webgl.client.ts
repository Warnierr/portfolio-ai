import * as THREE from 'three'

export default defineNuxtPlugin(() => {
  if (process.client) {
    return {
      provide: {
        webgl: {
          createParticleSystem,
          createInteractiveBackground,
          createFloatingGeometry
        }
      }
    }
  }
})

// Système de particules interactives
function createParticleSystem(container: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // Géométrie des particules
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    // Positions aléatoires
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    // Couleurs dégradées
    const hue = Math.random() * 0.1 + 0.65 // Bleu-violet
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // Tailles variées
    sizes[i] = Math.random() * 3 + 1
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // Shader pour les particules
  const vertexShader = `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  const fragmentShader = `
    varying vec3 vColor;
    
    void main() {
      float distance = length(gl_PointCoord - vec2(0.5));
      if (distance > 0.5) discard;
      
      float alpha = 1.0 - distance * 2.0;
      gl_FragColor = vec4(vColor, alpha * 0.8);
    }
  `

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  camera.position.z = 5

  // Variables pour l'interaction souris
  const mouse = new THREE.Vector2()
  const target = new THREE.Vector2()

  // Gestion de la souris
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  })

  // Animation
  function animate() {
    requestAnimationFrame(animate)

    // Interpolation fluide de la souris
    target.x += (mouse.x - target.x) * 0.02
    target.y += (mouse.y - target.y) * 0.02

    // Rotation des particules
    particles.rotation.x += 0.001
    particles.rotation.y += 0.002

    // Effet de la souris sur les particules
    const positions = particles.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const mouseInfluence = 0.1
      positions[i3] += (target.x * mouseInfluence - positions[i3]) * 0.01
      positions[i3 + 1] += (target.y * mouseInfluence - positions[i3 + 1]) * 0.01
    }
    particles.geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
  }

  animate()

  // Redimensionnement
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { scene, camera, renderer, particles }
}

// Arrière-plan interactif avec formes géométriques
function createInteractiveBackground(container: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // Création de formes géométriques flottantes
  const geometries = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.ConeGeometry(0.3, 0.8, 8),
    new THREE.OctahedronGeometry(0.4)
  ]

  const materials = [
    new THREE.MeshBasicMaterial({ 
      color: 0x6366f1, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    }),
    new THREE.MeshBasicMaterial({ 
      color: 0x8b5cf6, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    }),
    new THREE.MeshBasicMaterial({ 
      color: 0x06b6d4, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    })
  ]

  const meshes: THREE.Mesh[] = []

  for (let i = 0; i < 15; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)]
    const material = materials[Math.floor(Math.random() * materials.length)]
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10

    mesh.rotation.x = Math.random() * Math.PI
    mesh.rotation.y = Math.random() * Math.PI

    scene.add(mesh)
    meshes.push(mesh)
  }

  camera.position.z = 5

  // Animation
  function animate() {
    requestAnimationFrame(animate)

    meshes.forEach((mesh, index) => {
      mesh.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1)
      mesh.rotation.y += 0.015 * (index % 3 === 0 ? 1 : -1)
      
      // Mouvement flottant
      mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
      mesh.position.x += Math.cos(Date.now() * 0.0015 + index) * 0.001
    })

    renderer.render(scene, camera)
  }

  animate()

  // Redimensionnement
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { scene, camera, renderer, meshes }
}

// Géométrie flottante pour sections spécifiques
function createFloatingGeometry(container: HTMLElement, options = {}) {
  const defaults = {
    particleCount: 50,
    colors: [0x6366f1, 0x8b5cf6, 0x06b6d4],
    size: 0.1,
    speed: 0.5
  }
  
  const config = { ...defaults, ...options }
  
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // Création des particules flottantes
  const particles: THREE.Mesh[] = []
  
  for (let i = 0; i < config.particleCount; i++) {
    const geometry = new THREE.SphereGeometry(config.size, 8, 8)
    const material = new THREE.MeshBasicMaterial({
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      transparent: true,
      opacity: 0.6
    })
    
    const particle = new THREE.Mesh(geometry, material)
    
    particle.position.x = (Math.random() - 0.5) * 5
    particle.position.y = (Math.random() - 0.5) * 5
    particle.position.z = (Math.random() - 0.5) * 5
    
    scene.add(particle)
    particles.push(particle)
  }

  camera.position.z = 3

  // Animation
  function animate() {
    requestAnimationFrame(animate)

    particles.forEach((particle, index) => {
      particle.position.y += Math.sin(Date.now() * 0.001 * config.speed + index) * 0.01
      particle.position.x += Math.cos(Date.now() * 0.0008 * config.speed + index) * 0.005
      particle.rotation.x += 0.01
      particle.rotation.y += 0.01
    })

    renderer.render(scene, camera)
  }

  animate()

  return { scene, camera, renderer, particles }
} 