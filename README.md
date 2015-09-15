# html5_ccs3

## Trabajo Práctico Globalizador HTML5 y CSS

Se requiere el desarrollo de las maquetas de una aplicación web basada en HTML5 y CSS3 para las siguientes interfaces:

* Pantalla de Ingreso: El ingreso se realiza por email y contraseña. Opcionalmente el usuario puede decidir “Recordar su contraseña” para no tener que autenticar cada vez que ingresa. En caso de haber olvidado su contraseña, existirá un link que habilitará un formulario para introducir el Email y solicitar una nueva contraseña.
  * El resultado del login se leerá de un archivo json
  * Se utilizará el localStorage para guardar la contraseña y el sessionStorage para almacenar los datos de sesión del usuario.

* El usuario que ingresa a la aplicación podrá acceder a su perfil, en donde podrá actualizar sus datos de usuario.

* Home de la Aplicación: La home de la aplicación será un dashboard que mostrará la siguiente información:
  * Ultimas 5 ventas
  * Últimos 5 ingresos al sistema
  * Gráfico de tendencia de ventas del mes

* ABM de Clientes: Se requiere desarrollar las interfaces para la gestión de clientes teniendo en cuenta que:
  * Un cliente es asignado a un vendedor.
  * Se carga la información de contacto del cliente: teléfonos e emails.
  * Se cargará toda la información de ubicación geográfica del cliente (País, Provincial, Localidad, y opcionalmente, mediante Google Maps podrá ubicarse la empresa)
  * De acuerdo al volumen de venta un cliente será identificado como:
    * Oro
    * Plata
    * Bronce

### Consideraciones

* El TP define lineamientos generales. Los detalles de implementación quedan en poder del alumno. El mismo tendrá total libertad de decidir qué y cómo implementar cada cosa, así como también, si algo no está definido, definir de qué modo lo llevará a cabo.

* La interfaz deberá ser responsiva para resolución de Escritorio y Tablet.

* Deberá implementar al menos una librería de gráficos dinámicos javascript.

* Deberá utilizarse el framework Bootstrap personalizado en cuanto a colores, tipografías y componentes mediante LESS.
* Los input de texto deberán ser validados en cuanto a su formato con HTML5

* Deberá implementar al menos una vez jQuery Validation Plugin (http://jqueryvalidation.org/)

* Deberá implementar el plugin jqgrid para mostrar resultados en forma de grilla.

* Deberá utilizar AJAX.

* Se valorará la originalidad y prolijidad en el resultado final de las pantallas.
