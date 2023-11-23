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

   $.ajax({
      type: "POST",
      url: "controllers/submit.php",
      data: formData,
      dataType: 'text', // Cambiado a esperar una respuesta de tipo texto
      success: function (response) {
         // Imprimir la respuesta en la consola para verificar
         console.log("Respuesta del servidor:", response);

         // Puedes eliminar esta parte si no necesitas procesar la respuesta de alguna manera
         try {
            var jsonResponse = JSON.parse(response);
            if (jsonResponse.error) {
               console.error("Error en el servidor:", jsonResponse.error);
            } else {
               console.log("Los datos se han ingresado correctamente.");
            }
         } catch (e) {
            console.error("Error al procesar la respuesta JSON:", e);
         }
      },
      error: function (xhr, status, error) {
         console.log("Error al enviar el formulario:", error);
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
