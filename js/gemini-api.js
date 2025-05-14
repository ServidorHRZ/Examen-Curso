/**
 * Integración con la API de Gemini para evaluación de respuestas
 */

// API Key para Gemini
const GEMINI_API_KEY = 'AIzaSyCiZqCvJrm7he0rSRnZxtbOCTboNMNX0II';
const GEMINI_MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Evalúa una respuesta de texto utilizando la API de Gemini
 * @param {string} question - La pregunta del examen
 * @param {string} userAnswer - La respuesta del usuario
 * @param {string} correctAnswer - La respuesta correcta (solo para preguntas tipo test)
 * @returns {Promise<Object>} - Resultado de la evaluación
 */
async function evaluateWithGemini(question, userAnswer, correctAnswer = null) {
    try {
        // Construir el prompt para Gemini
        let prompt = `Actúa como un evaluador de exámenes de ciberseguridad. Evalúa la siguiente respuesta:
        
Pregunta: ${question}

Respuesta del estudiante: ${userAnswer}`;

        if (correctAnswer) {
            prompt += `\nRespuesta correcta: ${correctAnswer}`;
        }

        prompt += `\n
Para respuestas de texto libre, evalúa en una escala del 0 al 100%, considerando:
- Precisión técnica
- Completitud de la respuesta
- Claridad de la explicación

Proporciona una evaluación breve (máximo 2 frases) y un porcentaje de puntuación.
Responde únicamente en español.
Formato de respuesta: {
  "score": (puntuación numérica entre 0 y 100),
  "feedback": "comentario breve sobre la respuesta"
}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la API de Gemini: ${response.status}`);
        }

        const data = await response.json();
        
        // Extraer la respuesta JSON del texto generado
        const text = data.candidates[0].content.parts[0].text;
        
        try {
            // Intentar extraer el objeto JSON de la respuesta
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0]);
                return {
                    score: Math.min(Math.max(0, result.score), 100), // Asegurar que esté entre 0 y 100
                    feedback: result.feedback || 'Sin comentarios',
                    rawResponse: text
                };
            }
        } catch (error) {
            console.error('Error al parsear la respuesta JSON:', error);
        }

        // Si no se pudo extraer o parsear el JSON, retornar un valor predeterminado
        return {
            score: correctAnswer ? (userAnswer === correctAnswer ? 100 : 0) : 50,
            feedback: 'No se pudo evaluar automáticamente.',
            rawResponse: text
        };
    } catch (error) {
        console.error('Error al evaluar con Gemini:', error);
        return {
            score: correctAnswer ? (userAnswer === correctAnswer ? 100 : 0) : 50,
            feedback: 'Error al evaluar con IA.',
            error: error.message
        };
    }
}

/**
 * Evalúa todas las respuestas abiertas del examen
 * @param {Array} questions - Las preguntas del examen
 * @param {Object} userAnswers - Las respuestas del usuario
 * @returns {Promise<Object>} - Resultados de evaluación para cada pregunta
 */
async function evaluateOpenAnswers(questions, userAnswers) {
    const openQuestions = questions.filter(q => q.type === 'text' || q.type === 'textarea');
    const results = {};
    
    // Mostrar indicador de carga
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-evaluation';
    loadingElement.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Evaluando respuestas con IA...</p>
        <div class="progress-bar">
            <div class="progress" style="width: 0%"></div>
        </div>
    `;
    document.body.appendChild(loadingElement);
    
    try {
        for (let i = 0; i < openQuestions.length; i++) {
            const question = openQuestions[i];
            const userAnswer = userAnswers[question.id] || 'Sin respuesta';
            
            // Actualizar barra de progreso
            const progressPercent = (i / openQuestions.length) * 100;
            loadingElement.querySelector('.progress').style.width = `${progressPercent}%`;
            
            // Evaluar con Gemini
            results[question.id] = await evaluateWithGemini(question.text, userAnswer);
            
            // Pequeña pausa para no sobrecargar la API
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    } finally {
        // Eliminar indicador de carga
        document.body.removeChild(loadingElement);
    }
    
    return results;
}

// Exportar las funciones
window.GeminiAPI = {
    evaluateWithGemini,
    evaluateOpenAnswers
};