/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var recordar;

$(document).ready(function ()
{
    $('#alerta').hide();
    
    if(localStorage.getItem('recordar_usuario') != null)
    {
        recordar = localStorage.getItem('recordar_usuario');
    }
    else
    {
        recordar = "false";
    }
    
    if( recordar== "true" && sessionStorage.getItem('usuario') != null)
    {
    //        if( $('#recordar').is(":checked") === false)    //TODO cerrar sesion
    //           localStorage.removeItem('usuario');

        window.open('contenido.html','_self');
    }

    if( recordar == "true" )
    {
        $('#recordar').prop('checked',true)
    }
    
    $('.loguin').submit(function (event)
    {    
        event.preventDefault();
        
        $('#alerta').hide();
        
        if($('#usuario').val() == '' || $('#password').val() == '')
        {
            
            alerta('Ambos campos son obligatorios.');
            return;
        }
            
            $.getJSON("js/resultado_usuario.json", function(result){
                
               $(result).each(function (idx,user)
               {
                    if(user.usuario.email === $('#usuario').val() )
                    {
                        if(user.usuario.pass === MD5( $('#password').val() ) )
                        {//usuario logueado
                            sessionStorage.setItem('usuario',JSON.stringify(user.usuario));
                            
                            if( $('#recordar').is(":checked") === true)
                            { 
                                localStorage.setItem('recordar_usuario',true);
                            }
                            else
                            {  
                                localStorage.setItem('recordar_usuario',false);
                            }
                            
                            window.open('contenido.html','_self');
                        }
                        else
                        {
                            alerta('Usuario o contraseña incorrectos');
                        }
                        return false;
                    }
                    else
                    {
                        alerta('Usuario o contraseña incorrectos');
                    }
               })
            });
            
            
            
        });
        
        
        
});


function alerta(mensaje)
{
    $('#alerta').html(mensaje);
    $('#alerta').show();
    
}

