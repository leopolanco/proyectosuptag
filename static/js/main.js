function mostrarlineainv(id) {//Funcion para mostrar las lineas de investigacion pertenecientes a cada pnf

      if (id == "PNF en Instrumentacion y Control") { 
          $("#lineaInvIyC").prop("disabled", false).show();
          $("#lineaInvElectricidad, #lineaInvElectronica").prop("disabled", true).hide();
      } 

        if (id == "PNF en Electricidad") { 
          $("#lineaInvElectricidad").prop("disabled", false).show();
          $("#lineaInvElectronica, #lineaInvIyC").prop("disabled", true).hide();
      }  

       if (id == "PNF en Electronica") {
          $("#lineaInvElectronica").prop("disabled", false).show();
          $("#lineaInvElectricidad, #lineaInvIyC").prop("disabled", true).hide();
      }  
    } 
    
function mostrar(id) {//Funcion para mostrar campos de estudiantes en el formulario

    if (id == "1") { 
        $("#estud2, #estud3, #estud4, #estud5").hide(); 
    }  
    if (id == "2") { 
        $("#estud2").show(); 
        $("#estud3, #estud4, #estud5").hide(); 
    }  
    if (id == "3") { 
        $("#estud2, #estud3").show(); 
        $("#estud4, #estud5").hide(); 
    } 
    if (id == "4") { 
        $("#estud2, #estud3, #estud4").show(); 
        $("#estud5").hide(); 
    } 
    if (id == "5") { 
        $("#estud2, #estud3, #estud4, #estud5").show(); 
    } 
} 

function mostrarnotas(id) {//Funcion para mostrar input de notas, si esta culminado o no culminado
    //No colocamos un id de notas general porque solo se mostrara la primera
    if (id == "CULMINADO") { 
        $("#notas, #notas2, #notas3, #notas4, #notas5").show();
    } else {
        $("#notas, #notas2, #notas3, #notas4, #notas5").hide();
    }
}

function asistbusqueda(id) {//Funcion para asistir la busqueda del header     
        if (id == "PNF") {             
          $("#listabusqpnf").prop("disabled", false).show();
          $("#general, #listabusqestatus, #listabusqcomunidad, #listabusqmunicipio, #listabusqprof, #listabusqestud, #listabusqlapsoacad, #listabustrayecto").prop("disabled", true).hide(); 
      }  

       if (id == "Estatus") { 
        $("#listabusqestatus").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqcomunidad, #listabusqmunicipio, #listabusqprof, #listabusqestud, #listabusqlapsoacad, #listabustrayecto").prop("disabled", true).hide(); 
      }  

      if (id == "Comunidad") {          
        $("#listabusqcomunidad").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqestatus, #listabusqmunicipio, #listabusqprof, #listabusqestud, #listabusqlapsoacad, #listabustrayecto").prop("disabled", true).hide(); 
        
      } 
      
    if (id == "Profesor") {         
        $("#listabusqprof").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqestatus, #listabusqmunicipio, #listabusqcomunidad, #listabusqestud, #listabusqlapsoacad, #listabustrayecto").prop("disabled", true).hide(); 
       
      }
      if (id == "Municipio") { 
        $("#listabusqmunicipio").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqestatus, #listabusqprof, #listabusqcomunidad, #listabusqestud, #listabusqlapsoacad, #listabustrayecto").prop("disabled", true).hide(); 
        
      } 

     if (id == "LapsoAcademico") {        
        $("#listabusqlapsoacad").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqestatus, #listabusqprof, #listabusqcomunidad, #listabusqestud, #listabusqmunicipio, #listabustrayecto").prop("disabled", true).hide(); 
        
     } 
     if (id == "Trayecto") { 
        $("#listabustrayecto").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqestatus, #listabusqprof, #listabusqcomunidad, #listabusqestud, #listabusqmunicipio, #listabusqlapsoacad ").prop("disabled", true).hide(); 
        
     }
     if (id == "Estudiante") { 
        $("#listabusqestud").prop("disabled", false).show();
        $("#general, #listabusqpnf , #listabusqestatus, #listabusqprof, #listabusqcomunidad, #listabustrayecto, #listabusqmunicipio, #listabusqlapsoacad ").prop("disabled", true).hide(); 

     }
     if (id == "general") { 
        $("#general").prop("disabled", false).show();
        $("#listabusqestud, #listabusqpnf , #listabusqestatus, #listabusqprof, #listabusqcomunidad, #listabustrayecto, #listabusqmunicipio, #listabusqlapsoacad ").prop("disabled", true).hide(); 

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