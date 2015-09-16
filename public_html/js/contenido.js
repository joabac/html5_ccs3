/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var recordar;
var usuario;
var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

$(document).ready(function ()
{

    //******************* validacion de usuario 
    if(localStorage.getItem('recordar_usuario') != null)
    {
        recordar = localStorage.getItem('recordar_usuario');
    }
    else
    {
        recordar = "false";
    }
    
    //limpi el bit recordar usuario si el deseo era no recordarlo
    if( sessionStorage.getItem('usuario') != null && recordar == "false")
    {
        localStorage.removeItem('recordar_usuario');
    }
    
    usuario = JSON.parse(sessionStorage.getItem('usuario'));
        
    $('#cerrar_sesion').on('click',function ()
    {
        sessionStorage.removeItem('usuario'); 
        localStorage.removeItem('recordar_usuario');
        window.open('index.html','_self');
    });
    
    setWelcome(usuario.user);
    $('.avatar').prop('src','img/avatars/'+usuario.avatar);
    
    
    $('#avatar').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#nombre',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#nombre';
				}
                                
                                $('#perfil_usuario .avatar').prop('src','img/avatars/'+usuario.avatar);
                                
                                $('#perfil_usuario #nombre').val(usuario.nombre);
                                $('#perfil_usuario #apellido').val(usuario.apellido);
                                $('#perfil_usuario #email').val(usuario.email);
                                $('#perfil_usuario #user').val(usuario.user);
			}
		}
    });
    
    $('#clientes').magnificPopup({
		type: 'inline',
		preloader: false,
                
		callbacks: {
			beforeOpen: function() {
                                $('#perfil_usuario #nombre').val(usuario.nombre);
			}
		}
    });
    
    //control de click en el avatar para edicion de perfil
    $('.select_avatar').on('click',function (evt)
    {
        ruta_nuevo_avatar = this.currentSrc.split('/');
        nuevo_avatar = ruta_nuevo_avatar[ruta_nuevo_avatar.length-1];
        $('.avatar').prop('src','img/avatars/'+nuevo_avatar);
        
    });
    
      
    //guardado del perfil del usuario
    $('#perfil_usuario').submit(function (event)
    {
        event.preventDefault();
        validaForm();
        if($('#perfil_usuario').valid())
        {
            var ruta_nuevo_avatar = $('#perfil_usuario .avatar').prop('src').split('/');
            var nuevo_avatar = ruta_nuevo_avatar[ruta_nuevo_avatar.length-1];

            var tmp_nombre = $('#perfil_usuario #nombre').val();
            var tmp_apell = $('#perfil_usuario #apellido').val();
            var tmp_email = $('#perfil_usuario #email').val();
            
            if($('#perfil_usuario #password').val() !== '')
            {
                var tmp_password = MD5( $('#perfil_usuario #password').val());
            }
            else
            {
                var tmp_password = usuario.pass;
            }
            var tmp_user = $('#perfil_usuario #user').val();
            
            sessionStorage.setItem('usuario',JSON.stringify({"nombre":tmp_nombre,
                        "apellido":tmp_apell,
                        "email":tmp_email,
                        "user":tmp_user,
                        "pass": tmp_password,
                        "avatar": nuevo_avatar})
                );
            
            setWelcome(tmp_user);
            
            usuario = JSON.parse(sessionStorage.getItem('usuario'));
            alert('Usuario modificado: ' + sessionStorage.getItem('usuario'));
        } 
    }); //fin edit perfil usuario


    //grafico cargado por JSON
    $.getJSON('js/ventas.json', function (datos) {
        
            $('#graficos').highcharts({
                  
                    
                    title: {
                        text: 'Tendencia de Ventas mes de: '+ meses[ (new Date).getMonth()],
                    },
                     chart: {
                        zoomType: 'x'
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                    },
                    subtitle: {
                        text: 'Tendencia de ventas'
                    },
                    xAxis: {
                         type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Venta en miles de Pesos ($ARG)'
                        }
                    },
                    tooltip: {
                        valueSuffix: 'K$'
                    },
                    plotOptions: {
                       spline: {
                            marker: {
                                enabled: true
                            },
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        lineWidth: 4,
                        marker: {
                            radius: 4
                        },
                        name: 'Ventas del mes',
                        data: datos.ventas
                    }]
                });
            });
        
        
        //Uso de metodos jQuery manipulacion de DOM
        $.getJSON('js/ultimas_ventas.json', function (datos) {    

             $(datos.ultimas_ventas).each(function(idx,fila)
             {
                 //{ "cliente" : "Jose", "producto" : "Placa Video" , "email":"unemail@email.com", "precio":600},
                 $('.ultimas_ventas .cuerpo_tabla').append('<tr><td>'+fila.cliente+'</td><td>'+fila.producto+'</td><td class="corta_palabra">'+fila.email+'</td><td>$'+fila.precio+'</td></tr>');
             });

        });
         
        $.getJSON('js/ultimos_ingresos.json', function (datos) {    

            
             $(datos.ultimos_ingresos).each(function(idx,fila)
             {
                 //{ "cliente" : "Jose", "ip" : "162.10.11.20" , "navegador":"Chrome", "region":"Santa Fe"},
                 $('.ultimos_ingresos .cuerpo_tabla').append('<tr><td>'+fila.cliente+'</td><td class="corta_palabra">'+fila.ip+'</td><td>'+fila.navegador+'</td><td>'+fila.region+'</td></tr>');
             });

        });
         
       
        if($(window).height() > $('.contenido').height())
             $('footer').css('top',($(window).height()-84));
        else
        {   
            $('footer').css('top',$('.contenido').height()+50);
        }
        
        $(window).resize(function ()
        {
            if($(window).height() > $('.contenido').height())
                 $('footer').css('top',($(window).height()-84));
            else
            {
                $('footer').css('top',$('.contenido').height()+50);
            }
        });
        
        $(window).scroll(function ()
        {
            if($(window).height() > $('.contenido').height())
                 $('footer').css('top',($(window).height()-84));
            else
            {
                $('footer').css('top',$('.contenido').height()+50);
            }
        });
        
        
        
        
        
        var template = "<div style='margin-left:15px;'><div> Customer ID <sup>*</sup>:</div><div> {CustomerID} </div>";
			template += "<div> Company Name: </div><div>{CompanyName} </div>";
			template += "<div> Phone: </div><div>{Phone} </div>";
			template += "<div> Postal Code: </div><div>{PostalCode} </div>";
			template += "<div> City:</div><div> {City} </div>";
			template += "<hr style='width:100%;'/>";
			template += "<div> {sData} {cData}  </div></div>";

            $("#jqGrid").jqGrid({
                url: 'data.json',
				// we set the changes to be made at client side using predefined word clientArray
                editurl: 'clientArray',
                datatype: "json",
                colModel: [
                    {
						label: 'Customer ID',
                        name: 'CustomerID',
                        width: 75,
						key: true,
						editable: true,
						editrules : { required: true}
                    },
                    {
						label: 'Company Name',
                        name: 'CompanyName',
                        width: 140,
                        editable: true // must set editable to true if you want to make the field editable
                    },
                    {
						label : 'Phone',
                        name: 'Phone',
                        width: 100,
                        editable: true
                    },
                    {
						label: 'Postal Code',
                        name: 'PostalCode',
                        width: 80,
                        editable: true
                    },
                    {
						label: 'City',
                        name: 'City',
                        width: 140,
                        editable: true
                    }
                ],
				sortname: 'CustomerID',
				sortorder : 'asc',
				loadonce: true,
				viewrecords: true,
                width: 780,
                height: 200,
                rowNum: 10,
                pager: "#jqGridPager"
            });

            $('#jqGrid').navGrid('#jqGridPager',
                // the buttons to appear on the toolbar of the grid
                { edit: true, add: true, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
                // options for the Edit Dialog
                {
                    editCaption: "The Edit Dialog",
					template: template,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Add Dialog
                {
					template: template,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Delete Dailog
                {
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                }
            );

});
 


function setWelcome(user)
{
    $('#welcome_usuario').html('Bienvenido: '+user);
    $('#welcome_usuario_colapsed').html('Bienvenido: '+user);    
}

function validaForm()
{
    return $('#perfil_usuario').validate(
            {
               rules: {
                nombre: 
                {
                    required:true,
                    minlength: 2,
                    maxlength: 20
                },
                apellido:
                {    
                    required:true,
                    minlength: 2,
                    maxlength: 20
                },
                user:
                {
                    required:true,
                    minlength: 2,
                    maxlength: 15
                },
                email: {
                  required: true,
                  email: true
                },
                password:{
                    minlength: 6
                },
                rep_password:{
                    
                    minlength: 6,
                    equalTo: "#password"
                }
              },
              messages: {
                nombre: 
                {
                    required: "Este campo es requerido.",
                    minlength: jQuery.validator.format("Su minima lngitud es de {0} caracteres."),
                    maxlength: jQuery.validator.format("Su maxima lngitud es de {0} caracteres."),
                },
                apellido:
                {    
                    required: "Este campo es requerido.",
                    minlength: jQuery.validator.format("Su minima lngitud es de {0} caracteres."),
                    maxlength: jQuery.validator.format("Su maxima lngitud es de {0} caracteres."),
                },
                user:
                {
                    required: "Este campo es requerido.",
                    minlength: jQuery.validator.format("Su minima lngitud es de {0} caracteres."),
                    maxlength: jQuery.validator.format("Su maxima lngitud es de {0} caracteres."),
                },
                email: {
                  required: "Este campo es requerido.",
                  email: "El email debe estar en un formato valido ej: email@email.com.ar"
                },
                password:{
                  
                    minlength: jQuery.validator.format("Su minima lngitud es de {0} caracteres.")
                    
                },
                rep_password:{
                    
                    required: "Este campo es requerido.",
                    minlength: jQuery.validator.format("Su minima lngitud es de {0} caracteres."),
                    equalTo: "Las contraseñas son diferentes"
                }
              }
    });
}