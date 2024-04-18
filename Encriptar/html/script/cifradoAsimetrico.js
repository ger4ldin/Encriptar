
// Función para cifrar un mensaje utilizando una clave pública
function cifrar(mensaje, clavePublica) {
  // Lista de caracteres normales
  const caracteres = [
    '“', '”', ' ', '!', '"', '#', '$', '%', '&', "'",
    '(', ')', '*', '+', ',', '-', '.', '/', '0', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', ':', ';',
    '<', '=', '>', '¿', '?', '@', 'A', 'Á', 'B', 'C',
    'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K',
    'L', 'M', 'N', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T',
    'U', 'Ú', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']',
    '^', '_', '`', 'a', 'á', 'b', 'c', 'd', 'e', 'é',
    'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n',
    'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'v',
    'w', 'x', 'y', 'z', '{', '|', '}', '~'
  ];

  // Cifrado por transposición por clave pública
  let mensajeCifrado = '';
  for (let i = 0; i < mensaje.length; i++) {
    const char = mensaje[i];
    const index = caracteres.indexOf(char);
    //Suma una cantidad a cada carácter de la clave pública y calcula la media de esas sumas
    const newIndex = (index + 
        (Math.round((
          (parseInt(clavePublica[4]) ?? 0)+
          (parseInt(clavePublica[5]) ?? 0)+
          (parseInt(clavePublica[6]) ?? 0)+
          (parseInt(clavePublica[7]) ?? 0)+
          (parseInt(clavePublica[8]) ?? 0)+
          (parseInt(clavePublica[9]) ?? 0)+
          (parseInt(clavePublica[17]) ??0)+
          2
        ) / 5))
      ) % caracteres.length;
    //Suma el promedio a la potencia 2 de 5 a la base 10, y redondear al número entero más cercano.
    mensajeCifrado += caracteres[newIndex];
  }

  return mensajeCifrado;
}

// Función para descifrar un mensaje utilizando una clave privada
function descifrar(mensajeCifrado, clavePrivada) {
  // Lista de caracteres
  const caracteres = [
    '“', '”', ' ', '!', '"', '#', '$', '%', '&', "'",
    '(', ')', '*', '+', ',', '-', '.', '/', '0', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', ':', ';',
    '<', '=', '>', '¿', '?', '@', 'A', 'Á', 'B', 'C',
    'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K',
    'L', 'M', 'N', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T',
    'U', 'Ú', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']',
    '^', '_', '`', 'a', 'á', 'b', 'c', 'd', 'e', 'é',
    'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n',
    'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'v',
    'w', 'x', 'y', 'z', '{', '|', '}', '~'
  ];

  // Descifrado por transposición, calcula un nuevo índice para el carácter descifrado, utilizando la clave privada
  let mensajeDescifrado = '';
  for (let i = 0; i < mensajeCifrado.length; i++) {
    const char = mensajeCifrado[i];
    const index = caracteres.indexOf(char);
    //Resta una cantidad a cada carácter en la clave privada
    let newIndex = index - ((parseInt(clavePrivada[2]) ?? 0) + (parseInt(clavePrivada[3]) ?? 0) -1);
    if (newIndex < 0) {
      newIndex += caracteres.length;
    }
    mensajeDescifrado += caracteres[newIndex];
  }

  return mensajeDescifrado;
}

// Evento 'submit' del formulario de cifrado
document.getElementById('cifrarForm').addEventListener('submit', function (event) {
  // Evita el comportamiento predeterminado del formulario (envío de datos)
  event.preventDefault();

  const clavePublica = document.getElementById('clavePublica').value;
  const clavePrivada = document.getElementById('clavePrivada').value;
  const mensaje = document.getElementById('mensaje').value;

  // Validar longitud de la clave pública (CURP)
  if (clavePublica.length!== 18) {
    alert('La clave pública (CURP) debe tener 18 caracteres.');
    return;
  }

  // Validar clave privada (longitud de 5 caracteres, con letras minúsculas y mayúsculas, muenros y caracteres especiales)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,}$/;
  if (!regex.test(clavePrivada)) {
    alert('La clave privada debe tener al menos 5 caracteres, incluir letras mayúsculas y minúsculas, números y caracteres especiales.');
    return;
  }
  
  const mensajeCifrado = cifrar(mensaje, clavePublica);

  document.getElementById('mensajeCifrado').value = mensajeCifrado;
});

// Evento 'submit' del formulario de descifrado
document.getElementById('descifrarForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const clavePrivada = document.getElementById('clavePrivada2').value;
  const mensajeCifrado = document.getElementById('mensajeCifrado2').value;


  // Validar clave privada (longitud de 5 caracteres, con letras minúsculas y mayúsculas, muenros y caracteres especiales)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,}$/;
  if (!regex.test(clavePrivada)) {
    alert('La clave privada debe tener al menos 5 caracteres, incluir letras mayúsculas y minúsculas, números y caracteres especiales.');
    return;
  }
  
  const mensajeDescifrado = descifrar(mensajeCifrado, clavePrivada);
  
  document.getElementById('mensajeDescifrado').value = mensajeDescifrado;
});






