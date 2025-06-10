# sis257_restaurante

Descripción del proyecto:
"Sabores Unicos" es un restuarante innovador que no cuenta con un sistema web para la administracion de pedidos, este restuarente fusionan los sabores de comida rapida, este restuarante cuenta con un ambiente cuidadosamente diseñado para brindar calidez, elegancia y comodidad.

El concepto central del restaurante es elaborar: comida rapida con ingredientes frescos, locales y de temporada, presentados con una estética moderna y un enfoque en el sabor auténtico. Se priorizará la atención al detalle tanto en la preparación de los alimentos como en la atención al cliente.

Objetivos del Proyecto:
Establecer una pagina web para un restaurante que sera reconocido por su calidad y el buen sevicio al cliente.

Promover el uso de productos locales y sostenibles en la elaboración de los platos.

Crear un entorno agradable que combine con el desarrollo de una pagina web, atrayendo a una clientela diversa.

Obtener rentabilidad sostenida a través de una operación eficiente, fidelización de clientes y expansión futura.

Servicios Ofrecidos:

Servicio de pedidos en linea.

Ubicación ideal:
El restuarante esta ubicado en la ciudad de Sucre en la avenida del Maestro frente al la normal S/N

Las entidades:

---

1.USUARIO
id
usuario
clave
email
2.PLATILLOS
id
nombre
idPlatillo
precio
tiempoPreparacion
3.REPARTIDOR
id
nombreRepatidor
carnetIdentidad
fechaNacimiento
fechaIngreso
4.PEDIDOS
id
cantidad
total
fechaPedido
id_repartidor
id_cliente
id_deireccion
5.PAGO
id
sueldo
dia
diaExtra
descuento
total
fechaCancelado
idRepartidor
6.DETALLES
id
direccionEstado
puntuacion
credibilidad
amabilidad
id_cliente
id_pedido
7.DIRECCIONES
id
direccion
piso
indicaciones
estado
fecha_registro
id_cliente
8.CLIENTE
id
nombreCliente
carnetIdentidad
fechaNacimiento
celular
fecha_registro

---
