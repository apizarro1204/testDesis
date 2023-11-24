// Espera a que el DOM esté cargado
$(document).ready(function () {
   //Carga las regiones
   loadRegions();
   // Asigna la función sendForm al evento click del botón de votar
   $("#submitButton").on("click", function () {
      if (validateForm()) {
         sendForm();
      }
   });

   // Evento regiones html
   $("#regiones").on("change", function () {
      loadComunas();
      loadCandidatos();
  });
});

// Función que se ejecuta al enviar el formulario
function sendForm() {
   var formData = $("#votingForm").serialize();

   $.ajax({
      type: "POST",
      url: "controllers/submit.php",
      data: formData,
      dataType: 'text', 
      success: function (response) {
         // Imprimir la respuesta en la consola para verificar
         console.log("Respuesta del servidor:", response);
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
   let region = $("#regiones").val();
   let comuna = $("#comunas").val();
   let candidato = $("#candidato").val();
   let checkboxSelected = $("input[name='referencia[]']:checked");

   // Validar Checkbox
   if (checkboxSelected.length < 2) {
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

// Función para cargar las regiones en el menú desplegable
function loadRegions() {
   // Realiza una solicitud AJAX para obtener las regiones desde el servidor (submit.php)
   $.ajax({
       url: 'controllers/getOptions.php',
       type: 'GET',
       dataType: 'json',
       data: { action: 'getRegions' },
       success: function (response) {
         console.log("Respuesta del servidor:", response);
           // Limpia el menú desplegable
           $('#regiones').empty();

           // Agrega las opciones al menú desplegable
           $.each(response.regiones, function (key, value) {
               $('#regiones').append('<option value="' + value.id_region + '">' + value.name + '</option>');
           });

           // Llama a la función para cargar las comunas al inicio
           loadComunas();
           loadCandidatos();
       },
       error: function (error) {
           console.log('Error al cargar las regiones: ' + JSON.stringify(error));
       }
   });
}

// Función para cargar comunas
function loadComunas() {
   // Obtén el ID de la región seleccionada
   var regionId = $('#regiones').val();

   // Realiza una solicitud AJAX para obtener las comunas desde el servidor (submit.php)
   $.ajax({
       url: 'controllers/getOptions.php',
       type: 'GET',
       dataType: 'json',
       data: { action: 'getCommunes', regionId: regionId },
       success: function (response) {
           console.log("Respuesta del servidor:", response);
           // Limpia el menú desplegable de comunas
           $('#comunas').empty();

           // Agrega las opciones al menú desplegable de comunas
           $.each(response.comunas, function (key, value) {
               $('#comunas').append('<option value="' + value.id_city + '">' + value.name + '</option>');
           });

           

       },
       error: function (error) {
           console.log('Error al cargar las comunas: ' + JSON.stringify(error));
       }
   });
}

function loadCandidatos() {
   // Obtén el ID de la región seleccionada
   var regionId = $('#regiones').val();

   // Realiza una solicitud AJAX para obtener los candidatos desde el servidor (submit.php)
   $.ajax({
       url: 'controllers/getCandidates.php',
       type: 'GET',
       dataType: 'json',
       data: { action: 'getCandidates', regionId: regionId },
       success: function (response) {
           // Limpia el menú desplegable de candidatos
           $('#candidatos').empty();

           // Agrega las opciones al menú desplegable de candidatos
           $.each(response.candidatos, function (key, value) {
               $('#candidatos').append('<option value="' + value.id_candidate + '">' + value.name + '</option>');
           });
       },
       error: function (error) {
           console.log('Error al cargar los candidatos: ' + JSON.stringify(error));
       }
   });
}
