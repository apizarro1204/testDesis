// Espera a que el DOM esté cargado
$(document).ready(function () {
   // Asigna la función sendForm al evento click del botón de votar
   $("#submitButton").on("click", function () {
       if (validateForm()) {
           sendForm();
       }
   });
});

// Función que se ejecuta al enviar el formulario
function sendForm() {
   var formData = $("#votingForm").serialize();

   console.log("formData: ", formData);


   $.ajax({
      type: "POST",
      url: "controllers/submit.php",
      data: formData,
      dataType: 'json', // Espera una respuesta JSON
      success: function (response) {
         // Mostrar las respuestas en la página
         showResponses(response);
      },
      error: function (xhr, status, error) {
         console.log("Error al enviar el formulario:", error);
         alert("Error al enviar el formulario. Consulta la consola para más detalles.");
     }
        });
}

function validateForm() {
 
   //Lista de valores en el formulario
   let alias = $("#alias").val();
   let rut = $("#rut").val();
   let region = $("#region").val();
   let comuna = $("#comuna").val();
   let candidato = $("#candidato").val();
   let checkboxSelected = $("input[name='referencia[]']:checked");

   // Validar Checkbox
   if(checkboxSelected.length < 2) {
      alert("Selecciona al menos dos opciones en 'Como se enteró de nosotros'");
      return false;
   }

   //Validar Alias
    if (alias.length <= 5 || !containsLettersAndNumbers(alias)) {
        alert("El alias debe tener más de 5 caracteres y contener letras y números.");
        return false;
    }

    if (!validaRut(rut)) {
      alert("Favor ingresa un RUT válido y en formato correcto. Ej: 12345678-9");
      return false;
  }



   return true;
}

// Función para mostrar las respuestas en la página
// Función para mostrar las respuestas en la página
function showResponses(response) {
   console.log("Respuesta completa:", response); // Agregado para imprimir la respuesta completa

   let html = "<h2>Respuestas del formulario:</h2>";
   html += "<p><strong>Nombre y Apellido:</strong> " + response.nombreApellido + "</p>";
   html += "<p><strong>Alias:</strong> " + response.alias + "</p>";
   html += "<p><strong>Email:</strong> " + response.email + "</p>";
   html += "<p><strong>RUT:</strong> " + response.rut + "</p>";
   html += "<p><strong>Región:</strong> " + response.region + "</p>";
   html += "<p><strong>Comuna:</strong> " + response.comuna + "</p>";
   html += "<p><strong>Candidato:</strong> " + response.candidato + "</p>";

   // Verificar si 'referencia' está definido antes de intentar unirlo
   if (response.referencia !== undefined) {
      html += "<p><strong>Cómo se enteró de nosotros:</strong> " + response.referencia.join(", ") + "</p>";
   } else {
      html += "<p><strong>Cómo se enteró de nosotros:</strong> No especificado </p>";
   }

   // Insertar el HTML en el elemento con id "respuestas"
   $("#responses").html(html);
}


// Función para validar Alias
function containsLettersAndNumbers(str) {
   return /[a-zA-Z]/.test(str) && /\d/.test(str);
}

// Función para validar el RUT
function validaRut(rutCompleto) {
   if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
       return false;
   var tmp = rutCompleto.split('-');
   var digv = tmp[1];
   var rut = tmp[0];
   if (digv == 'K') digv = 'k';
   return dv(rut) == digv;
}

// Función para calcular el dígito verificador del RUT
function dv(T) {
   var M = 0, S = 1;
   for (; T; T = Math.floor(T / 10))
       S = (S + T % 10 * (9 - M++ % 6)) % 11;
   return S ? S - 1 : 'k';
}
