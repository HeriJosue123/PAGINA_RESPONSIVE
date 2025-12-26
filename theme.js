// ==========================================
// theme.js - CONTROL DEL MODO OSCURO GLOBAL
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Buscamos el interruptor (El botón Neo)
    const toggleInput = document.getElementById('neo-toggle');
    const body = document.body;

    // 2. LEER MEMORIA: Verificamos si el usuario ya había elegido modo oscuro antes
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode'); // Activamos el CSS oscuro
        if(toggleInput) toggleInput.checked = true; // Encendemos el botón visualmente
    }

    // 3. ESCUCHAR CAMBIOS: Si el botón existe en esta página, escuchamos el click
    if (toggleInput) {
        toggleInput.addEventListener('change', () => {
            if (toggleInput.checked) {
                // Si lo activan: pon clase oscura y guarda 'dark'
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); 
            } else {
                // Si lo desactivan: quita clase oscura y guarda 'light'
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light'); 
            }
        });
    }
});