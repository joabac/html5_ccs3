/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var recordar;
var usuario;

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
    
    $('#welcome_usuario').html('Bienvenido: '+usuario.user);
    $('#welcome_usuario_colapsed').html('Bienvenido: '+usuario.user);
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
    
    
    $('.select_avatar').on('click',function (evt)
    {
        ruta_nuevo_avatar = this.currentSrc.split('/');
        nuevo_avatar = ruta_nuevo_avatar[ruta_nuevo_avatar.length-1];
        $('.avatar').prop('src','img/avatars/'+nuevo_avatar);
        
    });
    
      
    
    $('#perfil_usuario').submit(function (event)
    {
        event.preventDefault();
        validaForm()
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
            
            usuario = sessionStorage.getItem('usuario');
            alert('Usuario modificado: ' + usuario);
        }
       
        
        //TODO: validar campos y guardar en local session
//        ruta_nuevo_avatar = $('#perfil_usuario .avatar').prop('src').split('/');
//        nuevo_avatar = ruta_nuevo_avatar[ruta_nuevo_avatar.length-1];
//                  
//        $('#perfil_usuario #nombre').val();
//        $('#perfil_usuario #apellido').val();
//        $('#perfil_usuario #email').val();
//        $('#perfil_usuario #password').val();
//        $('#perfil_usuario #user').val();
        
    });
    
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
});