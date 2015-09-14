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
    $('.avatar').prop('src','img/avatars/'+usuario.avatar+'.png');
    
    
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
                                
                                $('#perfil_usuario .avatar').prop('src','img/avatars/'+usuario.avatar+'.png');
                                
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
        
        //TODO: validar campos y guardar en local session
//        ruta_nuevo_avatar = $('#perfil_usuario .avatar').prop('src').split('/');
//        nuevo_avatar = ruta_nuevo_avatar[ruta_nuevo_avatar.length-1];
//                  
//        $('#perfil_usuario #nombre').val();
//        $('#perfil_usuario #apellido').val();
//        $('#perfil_usuario #email').val();
//        $('#perfil_usuario #password').val();
//        $('#perfil_usuario #user').val();
        
    })
    
    
});