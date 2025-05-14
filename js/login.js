document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    let usuarios = [];
    
    // Cargar usuarios desde el archivo JSON
    fetch('users/usuaerios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de usuarios');
            }
            return response.json();
        })
        .then(data => {
            usuarios = data.usuarios;
            console.log('Usuarios cargados correctamente');
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
            // Cargar usuario de respaldo en caso de error
            usuarios = [
                {
                    usuario: "admin",
                    contrasena: "seguridad2023"
                },
                {
                    usuario: "Mr.Robot",
                    contrasena: "01010"
                }
            ];
        });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!nombreCompleto) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Debes ingresar tu nombre completo.';
            return;
        }
        
        // Verificar si el usuario existe
        const usuarioValido = usuarios.find(u => u.usuario === username && u.contrasena === password);
        
        if (usuarioValido) {
            // Guardar información de la sesión
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('nombreUsuario', usuarioValido.usuario);
            sessionStorage.setItem('nombreCompleto', nombreCompleto);
            sessionStorage.setItem('startTime', Date.now().toString());
            
            // Redireccionar al examen
            window.location.href = 'examen.html';
        } else {
            // Mostrar mensaje de error
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.';
            
            // Limpiar el campo de contraseña
            document.getElementById('password').value = '';
        }
    });
}); 