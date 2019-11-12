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
    
    
(function ($) {
    "use strict";

    //Para focus
    $('.input').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        });    
    });
  
  
    //Validar
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
        if($(input).attr('type') == 'username' || $(input).attr('name') == 'username') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)(\]?)$/) == null) {
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

})(jQuery);


