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

// Lista de simbolos para la sustitución
const simbolos = [
  '¦', '§', '©', 'ª', '«', '¬', '®', '¯', '°', '±',
  '²', '³', '´', 'µ', '¶', '·', '3', '¹', 'º', '»',
  '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å',
  'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï',
  'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '1', 'Ø', 'Ù',
  'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã',
  'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í',
  'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷',
  'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', 'Ϫ', '2',
  '€', '£', '¥', '₽', '₱', '₦', '₩', '₳', '₹', '₭',
  'ϧ', 'Ϧ', 'ϥ', 'Ϥ', 'ϣ', 'Ϣ', 'ϡ', 'Ϡ'
];

// Función para validar que la clave privada contenga letras mayusculas y minusculas, números y carcateres especiales, con longitud de 5
function validarClavePrivada(clave) {

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{5,}$/;
  if (!regex.test(clave)) {
    alert('La clave privada debe tener al menos 5 caracteres, incluir letras mayúsculas y minúsculas, números y caracteres especiales.');
    return;
  }

  return true;
}

// Función para cifrar el mensaje con corrimiento
function corrimientoCaracteres(caracteres, mensaje, clave, desplazamiento) {
  let mensajeCifrado = "";
  const claveLength = clave.length;
  const desplazamientoReal = desplazamiento % claveLength;
  for (let i = 0; i < mensaje.length; i++) {
    let indice = caracteres.indexOf(mensaje[i]);
    // Sustitucion con un simbolo cada 5 caracteres
    if (i % 5 === 0) {
      mensajeCifrado += simbolos[indice];
      continue;
    }
    if (indice !== -1) {
      let nuevoIndice = (indice - desplazamientoReal + caracteres.length) % caracteres.length;
      mensajeCifrado += caracteres[nuevoIndice];
    } else {
      mensajeCifrado += mensaje[i];
    }
  }
  return mensajeCifrado;
}

// Función para decodificar el corrimiento
function corrimientoInversoCaracteres(caracteres, mensaje, clave, desplazamiento) {
  let mensajeDescifrado = "";
  const claveLength = clave.length;
  const desplazamientoReal = desplazamiento % claveLength;
  for (let i = 0; i < mensaje.length; i++) {
    let indice = caracteres.indexOf(mensaje[i]);
    // Decodificar la sustitucion de simbolo a caracteres normales cada 5 caracteres
    if (i % 5 === 0) {
      mensajeDescifrado += caracteres[simbolos.indexOf(mensaje[i])]
      continue;
    }
    if (indice !== -1) {
      let nuevoIndice = (indice + desplazamientoReal + caracteres.length) % caracteres.length;
      mensajeDescifrado += caracteres[nuevoIndice];
    } else {
      mensajeDescifrado += mensaje[i];
    }
  }

  return mensajeDescifrado;
}

// Función para cifrar un mensaje usando la clave privada
function cifrarMensaje(mensaje, clave) {
  if (!mensaje || !clave) {
    alert("Por favor, ingrese un mensaje y una clave.");
    return;
  }

  if (!validarClavePrivada(clave)) {
    return "Clave privada no válida";
  }

  let mensajeCifrado = corrimientoCaracteres(caracteres, mensaje, clave, clave.charCodeAt(0));

  return mensajeCifrado;
}

// Función para descifrar un mensaje usando la clave privada
function descifrarMensaje(mensajeCifrado, clave) {
  if (!mensajeCifrado || !clave) {
    alert("Por favor, ingrese un mensaje cifrado y una clave.");
    return;
  }

  if (!validarClavePrivada(clave)) {
    return "Clave privada no válida";
  }

  let mensajeDescifrado = corrimientoInversoCaracteres(caracteres, mensajeCifrado, clave, clave.charCodeAt(0));

  return mensajeDescifrado;
}

// Prevenir el envío del formulario por defecto
window.addEventListener("submit", e => {
  e.preventDefault()
})

// Event listener para cifrar el mensaje
document.getElementById('cifrarForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const mensaje = document.getElementById('mensaje').value;
  const clave = document.getElementById('clave').value;

  const mensajeCifrado = cifrarMensaje(mensaje, clave);

  document.getElementById('mensajeCifrado').value = mensajeCifrado;
});

// Event listener para descifrar el mensaje
document.getElementById('descifrarForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const mensajeCifrado = document.getElementById('mensajeCifrado').value;
  const clave = document.getElementById('clave').value;

  const mensajeDescifrado = descifrarMensaje(mensajeCifrado, clave);

  document.getElementById('mensajeDescifrado').value = mensajeDescifrado;
});