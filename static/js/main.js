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


