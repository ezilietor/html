// ============================================================================
// Datos del perfil — edita este archivo para actualizar el contenido del
// sitio (nombre, bio, skills, educación, certificaciones). Cada texto
// visible tiene versión "es" y "en".
// ============================================================================

export const profile = {
  name: 'Ezequiel Jiménez Rodríguez',
  role: {
    es: 'Tecnólogo en Seguridad Informática',
    en: 'Information Security Technologist',
  },
  location: 'Santo Domingo, República Dominicana',
  email: 'ezequiel23jimenezz@gmail.com',
  tagline: {
    es: 'Aprendiendo a proteger sistemas, redes y datos — documentando el camino en código y en video.',
    en: 'Learning to protect systems, networks, and data — documenting the journey in code and on video.',
  },
  bio: {
    es: 'Estudiante de Tecnología en Seguridad Informática con conocimientos sólidos en administración de servidores Linux, redes de datos, bases de datos SQL y ciberseguridad. Apasionado por la protección de sistemas e infraestructuras digitales, con formación práctica en pentesting y certificaciones reconocidas en el área. Orientado al aprendizaje continuo y al desarrollo profesional en el sector IT.',
    en: 'Information Security Technology student with solid knowledge of Linux server administration, data networks, SQL databases, and cybersecurity. Passionate about protecting digital systems and infrastructure, with hands-on training in pentesting and recognized certifications in the field. Focused on continuous learning and professional growth in IT.',
  },
  social: {
    github: 'https://github.com/ezilietor',
    youtube: 'https://www.youtube.com/@ezilietor',
    linkedin: 'https://www.linkedin.com/in/ezequiel-jimenez-rodriguez-905435336',
  },
};

export const skills = [
  { es: 'Administración de Servidores Linux', en: 'Linux Server Administration' },
  { es: 'Redes de Datos (CCNA)', en: 'Data Networks (CCNA)' },
  { es: 'Ciberseguridad y Pentesting', en: 'Cybersecurity & Pentesting' },
  { es: 'SQL Server', en: 'SQL Server' },
  { es: 'Programación en C++', en: 'C++ Programming' },
  { es: 'Seguridad Informática', en: 'Information Security' },
];

export const languages = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  { name: { es: 'Inglés', en: 'English' }, level: { es: 'Conversacional B+', en: 'Conversational B+' } },
];

export const education = [
  {
    degree: { es: 'Tecnólogo en Seguridad Informática', en: 'Information Security Technologist (degree)' },
    institution: 'Instituto Tecnológico de las Américas (ITLA)',
    status: { es: 'En curso', en: 'In progress' },
  },
  {
    degree: { es: 'Bachillerato (Educación Secundaria)', en: 'High School Diploma' },
    institution: 'Liceo Escuela Nuestra Señora del Carmen',
    status: { es: 'Graduado', en: 'Graduate' },
  },
];

// "más" de LinkedIn: certificaciones y cursos.
export const certifications = [
  {
    title: { es: 'Introducción al Pentesting', en: 'Introduction to Pentesting' },
    issuer: 'DragonJAR',
  },
  {
    title: { es: 'Advanced English Immersion Program', en: 'Advanced English Immersion Program' },
    issuer: 'Clases Flix',
  },
  {
    title: { es: 'Ciberseguridad Intermedio', en: 'Intermediate Cybersecurity' },
    issuer: 'INDOTEL',
  },
  {
    title: { es: 'Inglés B1', en: 'English B1' },
    issuer: 'Clases Flix',
  },
  {
    title: { es: 'C++ Essentials 1', en: 'C++ Essentials 1' },
    issuer: 'Cisco Networking Academy',
  },
];
