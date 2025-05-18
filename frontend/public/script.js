document.getElementById('formulario-registro').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const nickname = document.getElementById('nickname').value.trim();
  const pass = document.getElementById('password').value.trim();
  const confirm = document.getElementById('confirm').value.trim();
  const msg = document.getElementById('msg');

  if (!email || !nickname || !pass || !confirm) {
    msg.style.color = 'orange';
    msg.textContent = 'Todos los campos son obligatorios 🧐';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msg.style.color = 'red';
    msg.textContent = 'El correo no es válido 📭';
    return;
  }

  if (pass.length < 6) {
    msg.style.color = 'red';
    msg.textContent = 'La contraseña debe tener al menos 6 caracteres 🔐';
    return;
  }

  if (pass !== confirm) {
    msg.style.color = 'red';
    msg.textContent = 'Las contraseñas no coinciden ❌';
    return;
  }

  const data = {
    correo: email,
    nickname: nickname,
    password: pass
  };

  fetch('http://localhost:3000/api/registro', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  if (data.message === '✅ Registro exitoso') {
    msg.style.color = 'green';
    msg.textContent = '¡Registro exitoso! 🎉';
  } else {
    msg.style.color = 'red';
    msg.textContent = 'Hubo un problema al registrar la cuenta. Intenta de nuevo.';
  }
})
.catch(error => {
  console.error('Error al registrar:', error);
  msg.style.color = 'red';
  msg.textContent = 'Hubo un problema al registrar la cuenta. Intenta de nuevo.';
});

});
