document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Verificar si el hack fue activado
    const hackActivated = sessionStorage.getItem('hackExamActivated') === 'true';
    const bypassActivated = sessionStorage.getItem('bypassActivated') === 'true';
    const injectedScore = sessionStorage.getItem('injectedScore');

    // Mostrar una notificación si se activó el hack
    if (hackActivated || bypassActivated) {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'hack-notification';
        notificationDiv.innerHTML = `
            <i class="fas fa-shield-alt"></i>
            <span>Modo Hacker activado</span>
            <button id="closeNotification"><i class="fas fa-times"></i></button>
        `;
        document.body.appendChild(notificationDiv);
        
        // Cerrar notificación
        document.getElementById('closeNotification').addEventListener('click', function() {
            notificationDiv.style.display = 'none';
        });
        
        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            notificationDiv.style.opacity = '0';
            setTimeout(() => {
                notificationDiv.style.display = 'none';
            }, 500);
        }, 5000);
    }

    // Si el hack del examen está activado, ir directamente a los resultados
    if (hackActivated) {
        setTimeout(() => {
            submitExam();
        }, 1000);
    }

    // Mostrar el nombre completo del estudiante
    const nombreCompletoElement = document.getElementById('nombreCompleto');
    if (nombreCompletoElement) {
        nombreCompletoElement.textContent = sessionStorage.getItem('nombreCompleto') || 'Estudiante';
    }

    // Referencias a elementos DOM
    const timerElement = document.getElementById('timer');
    const examContent = document.getElementById('examContent');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitExamButton = document.getElementById('submitExam');

    // Configuración del examen
    const examDuration = 90 * 60 * 1000; // 1 hora y 30 minutos en milisegundos
    let currentSection = 0;
    let currentQuestion = 0;
    let startTime = parseInt(sessionStorage.getItem('startTime') || Date.now().toString());
    let userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '{}');
    
    // Temporizador del examen
    function updateTimer() {
        const now = Date.now();
        const elapsed = now - startTime;
        const remaining = examDuration - elapsed;
        
        if (remaining <= 0) {
            // Tiempo terminado, enviar el examen automáticamente
            clearInterval(timerInterval);
            timerElement.textContent = 'Tiempo terminado';
            submitExam();
            return;
        }
        
        // Formatear el tiempo restante en HH:MM:SS
        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        
        timerElement.textContent = `Tiempo restante: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Actualizar inmediatamente al cargar

    // Definición del examen
    const examSections = [
        {
            title: "SECCIÓN A – PREGUNTAS TIPO TEST",
            questions: [
                {
                    id: "q1",
                    text: "1. ¿Cuál de los siguientes tipos de hackers actúa con fines legales y éticos?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Black Hat" },
                        { value: "B", text: "B) Grey Hat" },
                        { value: "C", text: "C) White Hat" },
                        { value: "D", text: "D) Script Kiddie" }
                    ]
                },
                {
                    id: "q2",
                    text: "2. ¿Qué significa el término \"phishing\"?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Un ataque por fuerza bruta" },
                        { value: "B", text: "B) Un tipo de escaneo de puertos" },
                        { value: "C", text: "C) Un intento de engaño mediante ingeniería social" },
                        { value: "D", text: "D) Un error de configuración del servidor" }
                    ]
                },
                {
                    id: "q3",
                    text: "3. ¿Cuál es una técnica de ingeniería social?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Sniffing" },
                        { value: "B", text: "B) Vishing" },
                        { value: "C", text: "C) Spoofing DNS" },
                        { value: "D", text: "D) SQL Injection" }
                    ]
                },
                {
                    id: "q4",
                    text: "4. ¿Qué herramienta se utiliza para escanear puertos en una red?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Burp Suite" },
                        { value: "B", text: "B) Nikto" },
                        { value: "C", text: "C) Nmap" },
                        { value: "D", text: "D) Wireshark" }
                    ]
                },
                {
                    id: "q5",
                    text: "5. ¿Qué significa XSS?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Cross Site Scanning" },
                        { value: "B", text: "B) Cross Script Switching" },
                        { value: "C", text: "C) Cross Site Scripting" },
                        { value: "D", text: "D) Extra Secure Session" }
                    ]
                },
                {
                    id: "q6",
                    text: "6. ¿Cuál es un ataque Man in the Middle (MITM)?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Phishing por WhatsApp" },
                        { value: "B", text: "B) Interceptar comunicación entre dos dispositivos" },
                        { value: "C", text: "C) Inyectar código JavaScript en el navegador" },
                        { value: "D", text: "D) Analizar código fuente en GitHub" }
                    ]
                },
                {
                    id: "q7",
                    text: "7. ¿Cuál de las siguientes es una técnica OSINT?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) SQL Injection" },
                        { value: "B", text: "B) Google Dorks" },
                        { value: "C", text: "C) Escaneo ARP" },
                        { value: "D", text: "D) Ransomware" }
                    ]
                },
                {
                    id: "q8",
                    text: "8. ¿Qué hace un firewall?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Detecta vulnerabilidades en servidores" },
                        { value: "B", text: "B) Protege redes permitiendo o bloqueando tráfico" },
                        { value: "C", text: "C) Cifra contraseñas" },
                        { value: "D", text: "D) Aumenta la velocidad de red" }
                    ]
                },
                {
                    id: "q9",
                    text: "9. ¿Cuál es una vulnerabilidad de inyección de comandos en la web?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) LFI" },
                        { value: "B", text: "B) ARP Spoofing" },
                        { value: "C", text: "C) DNS Poisoning" },
                        { value: "D", text: "D) MITM" }
                    ]
                },
                {
                    id: "q10",
                    text: "10. ¿Qué herramienta permite capturar tráfico en red?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Nmap" },
                        { value: "B", text: "B) Wireshark" },
                        { value: "C", text: "C) Maltego" },
                        { value: "D", text: "D) ZAP" }
                    ]
                },
                {
                    id: "q11",
                    text: "11. ¿Qué tipo de malware cifra tus archivos y pide rescate?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Spyware" },
                        { value: "B", text: "B) Troyano" },
                        { value: "C", text: "C) Ransomware" },
                        { value: "D", text: "D) Keylogger" }
                    ]
                },
                {
                    id: "q12",
                    text: "12. ¿Cuál es el objetivo del hardening?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Hacer ataques más eficaces" },
                        { value: "B", text: "B) Cifrar contraseñas" },
                        { value: "C", text: "C) Fortalecer seguridad de sistemas" },
                        { value: "D", text: "D) Capturar tráfico de red" }
                    ]
                },
                {
                    id: "q13",
                    text: "13. ¿Qué fase del pentesting incluye la recopilación de información pública?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Post-explotación" },
                        { value: "B", text: "B) Escaneo" },
                        { value: "C", text: "C) Reconocimiento" },
                        { value: "D", text: "D) Explotación" }
                    ]
                },
                {
                    id: "q14",
                    text: "14. ¿Cuál es el objetivo de un IDS?",
                    type: "radio",
                    options: [
                        { value: "A", text: "A) Instalar exploits" },
                        { value: "B", text: "B) Detectar intrusos en la red" },
                        { value: "C", text: "C) Encriptar datos" },
                        { value: "D", text: "D) Crear páginas web" }
                    ]
                }
            ]
        },
        {
            title: "SECCIÓN B – RESPUESTAS CORTAS Y COMANDOS",
            questions: [
                {
                    id: "q15",
                    text: "15. Escribe el comando básico en Nmap para escanear puertos abiertos de una IP:",
                    type: "text"
                },
                {
                    id: "q16",
                    text: "16. ¿Qué comando usarías en Linux para ver las interfaces de red disponibles?",
                    type: "text"
                },
                {
                    id: "q17",
                    text: "17. Enumera dos técnicas de escalamiento de privilegios:",
                    type: "textarea"
                },
                {
                    id: "q18",
                    text: "18. Describe brevemente qué es una vulnerabilidad CSRF y cómo se explota.",
                    type: "textarea"
                }
            ]
        },
        {
            title: "SECCIÓN C – PRÁCTICA GUIADA",
            questions: [
                {
                    id: "q19",
                    text: "19. Escenario: Se te entrega una máquina vulnerable de laboratorio (por ejemplo, DVWA o TryHackMe).<br><br>Objetivo: Encuentra una vulnerabilidad sencilla (como XSS o SQLi), explótala y sube una imagen de evidencia o explica los pasos con comandos utilizados.",
                    type: "textarea",
                    description: "Vulnerabilidad detectada:<br>Herramientas usadas:<br>Paso a paso del ataque:"
                },
                {
                    id: "q20",
                    text: "20. Ataque basado en psicología social (Redacción)<br><br>Caso: El usuario \"javier.contabilidad@empresa.com\" trabaja en el área contable. En redes sociales muestra que odia el software contable actual y publica memes en horario de oficina. Tu objetivo es hacer un ataque socialmente dirigido.",
                    type: "textarea",
                    description: "¿Qué fase usarías del pentesting?<br>¿Qué vector de ataque usarías (phishing, pretexting, baiting...)?<br>Redacta un mensaje que pueda ser efectivo para este usuario:<br>¿Qué datos podrías obtener con éxito si cae?"
                }
            ]
        }
    ];

    // Renderizar la pregunta actual
    function renderQuestion() {
        const section = examSections[currentSection];
        const question = section.questions[currentQuestion];
        
        let html = '';
        
        // Si es la primera pregunta de la sección, mostrar el título de la sección
        if (currentQuestion === 0) {
            html += `<h2 class="section-title">${section.title}</h2>`;
        }
        
        html += `<div class="question" id="${question.id}">
            <p>${question.text}</p>`;
            
        if (question.type === 'radio') {
            html += '<div class="options">';
            for (const option of question.options) {
                const checked = userAnswers[question.id] === option.value ? 'checked' : '';
                html += `
                    <label>
                        <input type="radio" name="${question.id}" value="${option.value}" ${checked}>
                        ${option.text}
                    </label>`;
            }
            html += '</div>';
        } else if (question.type === 'text') {
            const value = userAnswers[question.id] || '';
            // Agregar clase command-question para las preguntas de comandos (q15 y q16)
            html += `<div class="command-question">
                <input type="text" id="${question.id}-input" value="${value}" placeholder="Escribe aquí el comando...">
            </div>`;
        } else if (question.type === 'textarea') {
            const value = userAnswers[question.id] || '';
            if (question.description) {
                html += `<p class="description">${question.description}</p>`;
            }
            html += `<textarea id="${question.id}-textarea">${value}</textarea>`;
        }
        
        html += '</div>';
        
        examContent.innerHTML = html;
        
        // Actualizar los botones de navegación
        updateNavigationButtons();
        
        // Añadir event listeners a los inputs
        attachInputListeners();
    }
    
    // Actualizar estado de los botones de navegación
    function updateNavigationButtons() {
        // Botón anterior
        prevButton.disabled = currentSection === 0 && currentQuestion === 0;
        
        // Botón siguiente y finalizar
        const isLastQuestion = currentSection === examSections.length - 1 && 
                              currentQuestion === examSections[currentSection].questions.length - 1;
        
        if (isLastQuestion) {
            nextButton.style.display = 'none';
            submitExamButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitExamButton.style.display = 'none';
        }
    }
    
    // Añadir event listeners a los inputs para guardar respuestas
    function attachInputListeners() {
        const section = examSections[currentSection];
        const question = section.questions[currentQuestion];
        
        if (question.type === 'radio') {
            const radioButtons = document.querySelectorAll(`input[name="${question.id}"]`);
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    userAnswers[question.id] = this.value;
                    saveAnswers();
                });
            });
        } else if (question.type === 'text') {
            const input = document.getElementById(`${question.id}-input`);
            if (input) {
                input.addEventListener('input', function() {
                    userAnswers[question.id] = this.value;
                    saveAnswers();
                });
                // Focus en el input para comodidad del usuario
                setTimeout(() => {
                    input.focus();
                }, 100);
            }
        } else if (question.type === 'textarea') {
            const textarea = document.getElementById(`${question.id}-textarea`);
            if (textarea) {
                textarea.addEventListener('input', function() {
                    userAnswers[question.id] = this.value;
                    saveAnswers();
                });
            }
        }
    }
    
    // Guardar respuestas en sessionStorage
    function saveAnswers() {
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }
    
    // Navegar a la pregunta anterior
    function goToPreviousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
        } else if (currentSection > 0) {
            currentSection--;
            currentQuestion = examSections[currentSection].questions.length - 1;
        }
        renderQuestion();
    }
    
    // Navegar a la siguiente pregunta
    function goToNextQuestion() {
        if (currentQuestion < examSections[currentSection].questions.length - 1) {
            currentQuestion++;
        } else if (currentSection < examSections.length - 1) {
            currentSection++;
            currentQuestion = 0;
        }
        renderQuestion();
    }
    
    // Enviar el examen
    async function submitExam() {
        // Detener el temporizador
        clearInterval(timerInterval);
        
        // Calcular puntaje (solo para preguntas de opción múltiple)
        let correctAnswers = 0;
        let totalMultipleChoice = 0;
        
        // Respuestas correctas para la sección A (preguntas tipo test)
        const correctOptions = {
            q1: "C", // White Hat
            q2: "C", // Un intento de engaño mediante ingeniería social
            q3: "B", // Vishing
            q4: "C", // Nmap
            q5: "C", // Cross Site Scripting
            q6: "B", // Interceptar comunicación entre dos dispositivos
            q7: "B", // Google Dorks
            q8: "B", // Protege redes permitiendo o bloqueando tráfico
            q9: "A", // LFI
            q10: "B", // Wireshark
            q11: "C", // Ransomware
            q12: "C", // Fortalecer seguridad de sistemas
            q13: "C", // Reconocimiento
            q14: "B"  // Detectar intrusos en la red
        };
        
        // Obtener preguntas abiertas para evaluación con IA
        const openQuestions = [];
        for (const section of examSections) {
            for (const question of section.questions) {
                if (question.type === 'text' || question.type === 'textarea') {
                    openQuestions.push(question);
                }
            }
        }

        // Contar respuestas correctas de opción múltiple
        for (const [questionId, correctAnswer] of Object.entries(correctOptions)) {
            totalMultipleChoice++;
            if (userAnswers[questionId] === correctAnswer) {
                correctAnswers++;
            }
        }
        
        // Calcular porcentaje (solo para preguntas de opción múltiple)
        const mcScore = (correctAnswers / totalMultipleChoice) * 100;
        
        // Evaluar respuestas abiertas con IA
        let iaEvaluations = {};
        
        // Si se ha activado el hack o se ha inyectado una puntuación, omitir la evaluación real
        if (hackActivated || injectedScore) {
            // Crear evaluaciones falsas con puntuaciones perfectas
            for (const question of openQuestions) {
                iaEvaluations[question.id] = {
                    score: injectedScore ? parseFloat(injectedScore) : 100,
                    feedback: "Respuesta excelente y completa."
                };
            }
        } else {
            try {
                if (window.GeminiAPI && openQuestions.length > 0) {
                    // Añadir todas las preguntas para evaluación
                    const allOpenQuestions = [];
                    for (const section of examSections) {
                        for (const question of section.questions) {
                            if (question.type === 'text' || question.type === 'textarea') {
                                allOpenQuestions.push(question);
                            }
                        }
                    }
                    
                    iaEvaluations = await window.GeminiAPI.evaluateOpenAnswers(allOpenQuestions, userAnswers);
                }
            } catch (error) {
                console.error('Error evaluando con IA:', error);
                iaEvaluations = {};
            }
        }
        
        // Calcular puntuación promedio de respuestas abiertas
        let totalOpenScore = 0;
        let countOpenAnswers = 0;
        
        for (const [questionId, evaluation] of Object.entries(iaEvaluations)) {
            if (evaluation && typeof evaluation.score === 'number') {
                totalOpenScore += evaluation.score;
                countOpenAnswers++;
            }
        }
        
        const openScore = countOpenAnswers > 0 ? totalOpenScore / countOpenAnswers : 0;
        
        // Calcular puntuación total (60% opción múltiple, 40% respuestas abiertas)
        let totalScore = (mcScore * 0.6) + (openScore * 0.4);
        
        // Si hay una puntuación inyectada, usarla
        if (injectedScore) {
            totalScore = parseFloat(injectedScore);
        }
        
        // Mostrar resultados
        let resultsHTML = `
            <h2 class="section-title">RESULTADOS DEL EXAMEN</h2>
            <div class="results">
                <p><strong>Preguntas de opción múltiple:</strong> ${correctAnswers} de ${totalMultipleChoice} correctas (${mcScore.toFixed(2)}%)</p>
                <p><strong>Respuestas abiertas (evaluadas por IA):</strong> ${openScore.toFixed(2)}%</p>
                <p><strong>Puntuación final:</strong> ${totalScore.toFixed(2)}%</p>
                <p><strong>Tiempo utilizado:</strong> ${formatTimeUsed()}</p>
                <h3>Respuestas:</h3>
                <div class="answers-summary">`;
        
        // Mostrar todas las respuestas
        for (const section of examSections) {
            resultsHTML += `<h4>${section.title}</h4>`;
            
            for (const question of section.questions) {
                resultsHTML += `<div class="answer-item">
                    <p><strong>${question.text.split('.')[0]}.</strong> `;
                
                if (question.type === 'radio') {
                    const userAnswer = userAnswers[question.id] || 'Sin respuesta';
                    const option = question.options.find(opt => opt.value === userAnswer);
                    const optionText = option ? option.text.substring(3) : 'Sin respuesta';
                    
                    const isCorrect = correctOptions[question.id] === userAnswer;
                    const colorClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
                    
                    resultsHTML += `<span class="${colorClass}">Tu respuesta: ${optionText}</span>`;
                    
                    if (!isCorrect && correctOptions[question.id]) {
                        const correctOption = question.options.find(opt => opt.value === correctOptions[question.id]);
                        const correctText = correctOption ? correctOption.text.substring(3) : '';
                        resultsHTML += `<br><span class="correct-answer">Respuesta correcta: ${correctText}</span>`;
                    }
                } else {
                    resultsHTML += `<span>Tu respuesta:</span><br>
                        <div class="user-text-answer">${userAnswers[question.id] || 'Sin respuesta'}</div>`;
                    
                    // Mostrar evaluación de IA si existe
                    if (iaEvaluations[question.id]) {
                        const evaluation = iaEvaluations[question.id];
                        resultsHTML += `
                            <div class="ai-feedback">
                                <span class="ai-score">${evaluation.score.toFixed(0)}%</span>
                                ${evaluation.feedback}
                            </div>
                        `;
                    }
                }
                
                resultsHTML += `</p></div>`;
            }
        }
        
        resultsHTML += `</div>
            <button id="generatePDF" class="pdf-button"><i class="fas fa-file-pdf"></i> Generar Certificado PDF</button>
            <button id="restartExam" class="btn-submit" style="margin-top: 15px;">Volver a Inicio</button>
        </div>`;
        
        // Mostrar resultados
        examContent.innerHTML = resultsHTML;
        
        // Ocultar navegación
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        submitExamButton.style.display = 'none';
        
        // Añadir estilo para respuestas correctas/incorrectas
        const style = document.createElement('style');
        style.textContent = `
            .correct-answer { color: #32b232; }
            .incorrect-answer { color: #ff5555; }
            .user-text-answer { 
                background-color: #333; 
                padding: 10px; 
                border-radius: 3px; 
                margin: 5px 0 15px;
                white-space: pre-wrap;
                border-left: 3px solid #00b3b3;
            }
            .answers-summary {
                max-height: 400px;
                overflow-y: auto;
                padding-right: 10px;
            }
            .answer-item {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #444;
            }
        `;
        document.head.appendChild(style);
        
        // Evento para generar PDF
        document.getElementById('generatePDF').addEventListener('click', function() {
            generateCertificatePDF(totalScore.toFixed(2));
        });
        
        // Evento para volver a iniciar
        document.getElementById('restartExam').addEventListener('click', function() {
            // Limpiar datos del examen
            sessionStorage.removeItem('userAnswers');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('startTime');
            
            // Volver a la página de inicio
            window.location.href = 'index.html';
        });
    }
    
    // Función para generar certificado en PDF
    function generateCertificatePDF(score) {
        // Crear el certificado en HTML
        const certificateDiv = document.createElement('div');
        certificateDiv.className = 'certificate';
        certificateDiv.style.display = 'block'; // Cambio de 'none' a 'block' para que sea visible
        certificateDiv.style.position = 'fixed';
        certificateDiv.style.top = '0';
        certificateDiv.style.left = '0';
        certificateDiv.style.width = '800px';
        certificateDiv.style.height = 'auto';
        certificateDiv.style.zIndex = '-1000'; // Escondido pero renderizado
        
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('es-ES', {
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        });
        
        // Estado de aprobación (aprueba con 70% o más)
        const aprobado = parseFloat(score) >= 70;
        const estadoTexto = aprobado ? "APROBADO" : "NO APROBADO";
        const colorEstado = aprobado ? "#32b232" : "#ff5555";
        
        certificateDiv.innerHTML = `
            <div class="certificate-header">
                <img src="https://raw.githubusercontent.com/kalilinux/kali-artwork/master/logos/kali-logo-2015-only-dragon.png" alt="Kali Linux" style="width: 120px; height: auto;">
                <h2 style="margin-top: 10px; color: #333; font-size: 28px;">Elite Programmers Global</h2>
            </div>
            <h1 class="certificate-title">CERTIFICADO DE EXAMEN<br><span style="color: ${colorEstado}; display: block; margin-top: 8px;">${estadoTexto}</span></h1>
            <div class="certificate-student" style="color: ${colorEstado}; font-size: 32px; margin: 25px 0; font-family: 'Arial', sans-serif; text-shadow: 1px 1px 3px rgba(0,0,0,0.2);">
                ${sessionStorage.getItem('nombreCompleto') || 'Estudiante'}
            </div>
            <p class="certificate-description" style="font-size: 18px; line-height: 1.6; margin: 20px 10% 30px; color: #333; font-family: 'Arial', sans-serif;">
                Ha completado satisfactoriamente el examen básico de 
                ciberseguridad demostrando conocimientos en seguridad 
                informática, técnicas de pentesting, y fundamentos de 
                protección de sistemas.
            </p>
            <div class="certificate-score" style="font-size: 26px; font-weight: bold; color: ${colorEstado}; margin: 30px 0; padding: 15px 30px; border: 2px solid ${colorEstado}; display: inline-block; border-radius: 8px; background-color: rgba(${colorEstado === '#32b232' ? '50, 178, 50, 0.1' : '255, 85, 85, 0.1'});">
                Puntuación final: ${score}%
            </div>
            <div class="certificate-date" style="margin-top: 40px; font-size: 16px; color: #555; font-family: 'Arial', sans-serif;">
                Fecha: ${formattedDate}
            </div>
            <div class="certificate-footer" style="margin-top: 50px; display: flex; justify-content: space-around;">
                <div class="certificate-signature" style="text-align: center; width: 40%;">
                    <div class="signature-line" style="width: 80%; height: 1px; background-color: #000; margin: 0 auto 10px;"></div>
                    <p style="margin: 0; font-size: 18px; font-weight: bold;">Andres Hincapie Ruiz</p>
                    <p style="margin: 5px 0 0; font-size: 14px; color: #555;">Instructor</p>
                </div>
                <div class="certificate-signature" style="text-align: center; width: 40%;">
                    <div class="signature-line" style="width: 80%; height: 1px; background-color: #000; margin: 0 auto 10px;"></div>
                    <p style="margin: 0; font-size: 18px; font-weight: bold;">Andres Hincapie Ruiz</p>
                    <p style="margin: 5px 0 0; font-size: 14px; color: #555;">Director del Programa</p>
                </div>
            </div>
            <div class="certificate-seal" style="position: absolute; right: 30px; bottom: 30px; width: 130px; height: 130px; border: 3px solid ${colorEstado}; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: rotate(-15deg); color: ${colorEstado}; font-weight: bold; font-size: 14px; text-align: center; background-color: rgba(${colorEstado === '#32b232' ? '50, 178, 50, 0.1' : '255, 85, 85, 0.1'});">
                CERTIFICADO<br>OFICIAL<br>ELITE PROGRAMMERS
            </div>
        `;
        
        document.body.appendChild(certificateDiv);
        
        // Usar jsPDF y html2canvas para generar el PDF
        const { jsPDF } = window.jspdf;
        
        // Esperar a que el div se renderice completamente
        setTimeout(() => {
            html2canvas(certificateDiv, {
                scale: 2, // Aumentar la escala para mejor calidad
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
                logging: false, // Desactivar logs para evitar spam
                onclone: function(clonedDoc) {
                    const clonedElement = clonedDoc.querySelector('.certificate');
                    // Asegurarse de que el elemento clonado sea visible
                    clonedElement.style.display = 'block';
                    clonedElement.style.position = 'relative';
                    clonedElement.style.width = '800px';
                    clonedElement.style.height = 'auto';
                    clonedElement.style.opacity = '1';
                    
                    // Aplicar bordes verdes más visibles
                    clonedElement.style.border = `15px solid ${colorEstado}`;
                    clonedElement.style.boxSizing = 'border-box';
                    clonedElement.style.padding = '40px';
                    clonedElement.style.backgroundColor = '#fff';
                }
            }).then(canvas => {
                try {
                    // Crear PDF con orientación horizontal (landscape)
                    const pdf = new jsPDF('landscape', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    
                    // Ajustar la imagen al tamaño de la página
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    
                    // Calcular la relación de aspecto y escala
                    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight) * 0.95; // 0.95 para dejar un margen
                    
                    // Calcular dimensiones finales
                    const imgWidth = canvasWidth * ratio;
                    const imgHeight = canvasHeight * ratio;
                    
                    // Centrar la imagen
                    const x = (pdfWidth - imgWidth) / 2;
                    const y = (pdfHeight - imgHeight) / 2;
                    
                    // Convertir el canvas a imagen
                    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                    
                    // Añadir la imagen al PDF
                    pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
                    
                    // Guardar PDF
                    const nombreArchivo = `Certificado_${(sessionStorage.getItem('nombreCompleto') || 'Estudiante').replace(/\s+/g, '_')}.pdf`;
                    pdf.save(nombreArchivo);
                    
                    // Mostrar ventana emergente personalizada en lugar de alert
                    showCustomModal('¡Certificado generado con éxito!', 'El certificado se ha descargado correctamente.');
                    
                } catch (error) {
                    console.error('Error al generar el PDF:', error);
                    showCustomModal('Error', 'No se pudo generar el certificado: ' + error.message);
                } finally {
                    // Limpiar
                    document.body.removeChild(certificateDiv);
                }
            }).catch(error => {
                console.error('Error con html2canvas:', error);
                showCustomModal('Error', 'Error al capturar el certificado: ' + error.message);
                document.body.removeChild(certificateDiv);
            });
        }, 1000); // Esperar 1000ms para asegurar que se renderiza correctamente
    }
    
    // Función para mostrar una ventana modal personalizada
    function showCustomModal(titulo, mensaje) {
        // Crear el contenedor de la modal
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '9999';
        
        // Crear la ventana modal
        const modalWindow = document.createElement('div');
        modalWindow.className = 'modal-window';
        modalWindow.style.backgroundColor = '#212121';
        modalWindow.style.padding = '25px';
        modalWindow.style.borderRadius = '5px';
        modalWindow.style.width = '400px';
        modalWindow.style.maxWidth = '90%';
        modalWindow.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        modalWindow.style.border = '1px solid #32b232';
        modalWindow.style.textAlign = 'center';
        
        // Contenido de la modal
        modalWindow.innerHTML = `
            <h3 style="color: #32b232; margin-bottom: 15px; font-size: 20px;">${titulo}</h3>
            <p style="color: #c8c8c8; margin-bottom: 20px;">${mensaje}</p>
            <button class="modal-close-btn" style="background-color: #32b232; color: #000; border: none; padding: 10px 20px; border-radius: 3px; cursor: pointer; font-weight: bold;">Aceptar</button>
        `;
        
        // Añadir la ventana al overlay
        modalOverlay.appendChild(modalWindow);
        
        // Añadir al documento
        document.body.appendChild(modalOverlay);
        
        // Añadir evento al botón de cerrar
        modalWindow.querySelector('.modal-close-btn').addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
    }
    
    // Formatear tiempo utilizado
    function formatTimeUsed() {
        const now = Date.now();
        const elapsed = now - startTime;
        
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Event listeners para botones de navegación
    prevButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', goToNextQuestion);
    submitExamButton.addEventListener('click', submitExam);
    
    // Renderizar la primera pregunta al cargar
    renderQuestion();
});

// Agregar estilos para la notificación de hackeo
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .hack-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(255, 85, 85, 0.9);
            color: #fff;
            padding: 10px 15px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.5s ease;
            transition: opacity 0.5s ease;
        }
        
        .hack-notification i {
            font-size: 18px;
        }
        
        .hack-notification button {
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            margin-left: 10px;
            opacity: 0.7;
        }
        
        .hack-notification button:hover {
            opacity: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}); 
