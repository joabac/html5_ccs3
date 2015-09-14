/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    if( sessionStorage.getItem('usuario') == null)
    {
//        if( $('#recordar').is(":checked") === false)    //TODO cerrar sesion
//           localStorage.removeItem('usuario');
        
        window.open('index.html','_self');
    }
//    else
//    {
//        if( localStorage.getItem('usuario') != null && localStorage.getItem('recordar_usuario') == false)
//        {
//            localStorage.removeItem('recordar_usuario');
//            
//        }
//    }