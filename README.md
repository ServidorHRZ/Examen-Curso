# Aplicación Web para Examen de Ciberseguridad - Estilo Kali Linux

Esta aplicación web proporciona una plataforma para realizar un examen básico de ciberseguridad con control de tiempo, sistema de login y diferentes tipos de preguntas. El diseño está inspirado en Kali Linux, con colores oscuros, acentos verdes y azules, y elementos de terminal.

## Características

- Sistema de inicio de sesión con múltiples usuarios
- Interfaz con estilo Kali Linux (oscura con acentos verdes y azules)
- Temporizador de 1 hora y 30 minutos para completar el examen
- Tres secciones de preguntas:
  - Preguntas tipo test (14 preguntas)
  - Respuestas cortas y comandos (4 preguntas)
  - Práctica guiada (2 preguntas)
- Navegación entre preguntas
- Guardado automático de respuestas
- **Evaluación automática con IA (Google Gemini)** para preguntas de respuesta abierta
- **Generación de certificado en PDF** con los resultados del examen
- Pantalla de resultados con calificación
- Diseño responsive para dispositivos móviles

## Tecnologías Utilizadas

- HTML5, CSS3, JavaScript
- Google Gemini AI API para evaluación de respuestas
- jsPDF y html2canvas para la generación de certificados en PDF
- Servidor Node.js básico para ejecutar la aplicación

## Credenciales de Acceso

La aplicación incluye múltiples usuarios cargados desde el archivo `users/usuaerios.json`. 
Algunos ejemplos de credenciales que puedes usar:

- Usuario: `admin`, Contraseña: `seguridad2023`
- Usuario: `Andres`, Contraseña: `1724`

Consulta el archivo JSON para ver todos los usuarios disponibles.

## Estructura de Archivos

```
├── index.html           # Página de inicio de sesión
├── examen.html          # Página principal del examen
├── 404.html             # Página de error 404
├── server.js            # Servidor HTTP simple para probar la aplicación
├── css/
│   └── styles.css       # Estilos de la aplicación con tema Kali Linux
├── js/
│   ├── login.js         # Lógica de inicio de sesión
│   ├── examen.js        # Lógica principal del examen
│   └── gemini-api.js    # Integración con la API de Google Gemini
├── users/
│   └── usuaerios.json   # Base de datos de usuarios
└── README.md            # Documentación
```

## Cómo Usar

### Utilizando el servidor Node.js incluido

1. Asegúrate de tener Node.js instalado
2. Ejecuta el servidor con el comando: `node server.js`
3. Abre en tu navegador: `http://localhost:3000`
4. Ingresa tu nombre completo (para el certificado PDF)
5. Inicia sesión con una de las credenciales proporcionadas
6. Completa el examen dentro del tiempo establecido
7. Al finalizar, revisa tus resultados y la evaluación de IA
8. Genera y descarga tu certificado en PDF

### Abriendo los archivos directamente

1. Abre el archivo `index.html` en un navegador web
2. Ingresa tu nombre completo (para el certificado PDF)
3. Inicia sesión con una de las credenciales proporcionadas
4. Completa el examen dentro del tiempo establecido
5. Al finalizar, revisa tus resultados y la evaluación de IA
6. Genera y descarga tu certificado en PDF

## Evaluación con IA (Google Gemini)

Las respuestas a preguntas abiertas son evaluadas automáticamente por Google Gemini, que proporciona:

- Puntuación numérica (0-100%)
- Retroalimentación breve sobre la calidad de la respuesta

La evaluación considera los siguientes criterios:
- Precisión técnica
- Completitud de la respuesta
- Claridad de la explicación

## Notas

- La aplicación utiliza `sessionStorage` para almacenar las respuestas, por lo que se perderán al cerrar el navegador
- El examen tiene un tiempo límite de 1 hora y 30 minutos
- Las respuestas se guardan automáticamente a medida que se ingresan
- El diseño está optimizado para dispositivos móviles y escritorio
- La API key de Google Gemini está incluida en el código con fines demostrativos