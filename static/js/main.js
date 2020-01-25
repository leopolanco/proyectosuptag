function mostrarlineainv(id) {//Funcion para mostrar las lineas de investigacion pertenecientes a cada pnf

      if (id == "PNF en Instrumentacion y Control") { 
          $("#lineaInvIyC").show();
          $("#lineaInvIyC").prop("disabled", false);
          $("#lineaInvElectricidad").hide();
          $("#lineaInvElectricidad").prop("disabled", true);
          $("#lineaInvElectronica").hide();
          $("#lineaInvElectronica").prop("disabled", true); 
      } 

        if (id == "PNF en Electricidad") { 
          $("#lineaInvElectricidad").show();
          $("#lineaInvElectricidad").prop("disabled", false);
          $("#lineaInvElectronica").hide();
          $("#lineaInvElectronica").prop("disabled", true); 
          $("#lineaInvIyC").hide();
          $("#lineaInvIyC").prop("disabled", true);
      }  

       if (id == "PNF en Electronica") {
          $("#lineaInvElectronica").show();
          $("#lineaInvElectronica").prop("disabled", false); 
          $("#lineaInvElectricidad").hide();
          $("#lineaInvElectricidad").prop("disabled", true);
          $("#lineaInvIyC").hide();
          $("#lineaInvIyC").prop("disabled", true);
      }  
    } 
    
function mostrar(id) {//Funcion para mostrar inputs de estudiantes en el formulario

        if (id == "1") { 
          $("#estud2").hide(); 
          $("#estud3").hide(); 
          $("#estud4").hide(); 
          $("#estud5").hide(); 
      }  

       if (id == "2") { 
          $("#estud2").show(); 
          $("#estud3").hide(); 
          $("#estud4").hide(); 
          $("#estud5").hide(); 
      }  

      if (id == "3") { 
          $("#estud2").show(); 
          $("#estud3").show(); 
          $("#estud4").hide(); 
          $("#estud5").hide(); 
      } 
   
      if (id == "4") { 
          $("#estud2").show(); 
          $("#estud3").show(); 
          $("#estud4").show(); 
          $("#estud5").hide(); 
      } 

      if (id == "5") { 
          $("#estud2").show(); 
          $("#estud3").show(); 
          $("#estud4").show(); 
          $("#estud5").show(); 
     } 
    } 

function mostrarnotas(id) {//Funcion para mostrar input de notas, si esta culminado o no culminado

        if (id == "CULMINADO") { 
          $("#notas").show();
          $("#notas2").show();
          $("#notas3").show();
          $("#notas4").show();
          $("#notas5").show();
      } else {
          $("#notas").hide();
          $("#notas2").hide();
          $("#notas3").hide();
          $("#notas4").hide();
          $("#notas5").hide();
      }
}

function asistbusqueda(id) {//Funcion para asistir la busqueda del header
        
        if (id == "PNF") { 
            
          $("#listabusqpnf").prop("disabled", false);
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
            
          $("#listabusqpnf").show();
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
           
          $("#listabusqpnf").prop("disabled", false);
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
      }  

       if (id == "Estatus") { 
           
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", false);
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
           
           
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").show();
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
          
          
        
      }  

      if (id == "Comunidad") { 
          
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", false);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
          
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").show();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
          
          
       
      } 
      
    if (id == "Profesor") { 
        
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", false);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
        
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").show();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
          
          
      }
      if (id == "Municipio") { 

          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", false);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
          
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").show();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
          
          
      } 

     if (id == "LapsoAcademico") { 
         
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", false);
          $("#listabustrayecto").prop("disabled", true);
         
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").show();
          $("#listabustrayecto").hide();
          
          
     } 
     if (id == "Trayecto") { 
         
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", false);
         
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").show();
          
          
     }
     if (id == "Estudiante") { 
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", true); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", false);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
         
          $("#listabusqpnf").hide(); 
          $("#general").hide(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").show();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
          
          
     }
     if (id == "general") { 
          
          $("#listabusqpnf").prop("disabled", true); 
          $("#general").prop("disabled", false); 
          $("#listabusqestatus").prop("disabled", true); 
          $("#listabusqcomunidad").prop("disabled", true);
          $("#listabusqmunicipio").prop("disabled", true);
          $("#listabusqprof").prop("disabled", true);
          $("#listabusqestud").prop("disabled", true);
          $("#listabusqlapsoacad").prop("disabled", true);
          $("#listabustrayecto").prop("disabled", true);
          $("#listabusqpnf").hide(); 
          $("#general").show(); 
          $("#listabusqestatus").hide(); 
          $("#listabusqcomunidad").hide();
          $("#listabusqmunicipio").hide();
          $("#listabusqprof").hide();
          $("#listabusqestud").hide();
          $("#listabusqlapsoacad").hide();
          $("#listabustrayecto").hide();
     }
}

$('body').keypress(function(enter){
if (enter.keyCode == 13)
{
    $('#busqform').submit();
}
});

$(document).ready(function(){
        $(".fa-search").click(function(){
          $(".busqueda, .input-busqueda, .select-busqueda").toggleClass("active");
        });
      });

(function ($) {
    "use strict";


    var input = $('.validate-input .input');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });
    
    
    
    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery); //Funcion de validacion

(function($) {
	$.fn.shorten = function (settings) {
	
		var config = {
			showChars: 100,
			ellipsesText: "...",
			moreText: "more",
			lessText: "less"
		};

		if (settings) {
			$.extend(config, settings);
		}
		
		$(document).off("click", '.morelink');
		
		$(document).on({click: function () {

				var $this = $(this);
				if ($this.hasClass('less')) {
					$this.removeClass('less');
					$this.html(config.moreText);
				} else {
					$this.addClass('less');
					$this.html(config.lessText);
				}
				$this.parent().prev().toggle();
				$this.prev().toggle();
				return false;
			}
		}, '.morelink');

		return this.each(function () {
			var $this = $(this);
			if($this.hasClass("shortened")) return;
			
			$this.addClass("shortened");
			var content = $this.html();
			if (content.length > config.showChars) {
				var c = content.substr(0, config.showChars);
				var h = content.substr(config.showChars, content.length - config.showChars);
				var html = c + '<span class="moreellipses">' + config.ellipsesText + ' </span><span class="morecontent"><span>' + h + '</span> <a href="#" class="morelink">' + config.moreText + '</a></span>';
				$this.html(html);
				$(".morecontent span").hide();
			}
		});
		
	};

 })(jQuery); 
 


