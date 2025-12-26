// Clave para guardar la sesión
const SESSION_KEY = 'miwebzapatos_session';

// 1. OBTENER DATOS
function getSession(){
  try{
    // Usamos localStorage si quieres que la sesión dure aunque cierren el navegador
    // Si prefieres que se borre al cerrar la pestaña, usa sessionStorage
    return JSON.parse(localStorage.getItem(SESSION_KEY)); 
  } catch(e){
    return null;
  }
}

// 2. PROTEGER PÁGINAS (EL PORTERO ARREGLADO)
function requireAuth(){
  // Obtenemos la ruta actual (ej: /login.html)
  const path = window.location.pathname;
  
  // SI ya estamos en login o registro, NO hacemos nada (dejamos pasar)
  if(path.includes('login.html') || path.includes('registro.html')){
    return; 
  }

  const user = getSession();
  
  // Si NO hay usuario y NO estamos en login, entonces sí mandamos al login
  if(!user){
    window.location.href = 'login.html';
  }
}

// 3. GUARDAR SESIÓN (Al loguearse)
function saveSession(data){
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

// 4. CERRAR SESIÓN
function logout(){
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

// 5. REDIRECCIÓN INVERSA (Opcional pero recomendado)
// Si ya estoy logueado e intento entrar a login.html, mándame al perfil
function redirectIfAuth(){
  const user = getSession();
  const path = window.location.pathname;
  
  if(user && (path.includes('login.html') || path.includes('registro.html'))){
    window.location.href = 'perfil.html';
  }
}