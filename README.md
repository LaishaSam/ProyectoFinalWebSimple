# Target Demo – Aplicación Web Simple

Laisha Samanta Ramos Ulloa

Proyecto final: desarrollo de una aplicación web simple integrando HTML, CSS, JavaScript y simulación de API/nube.

## Descripción

La aplicación simula una tienda estilo Target:

- Catálogo de productos desde una API simulada en JS.
- Sistema de registro e inicio de sesión usando `localStorage` para almacenar usuarios.
- Carrito de compras por usuario almacenado también en `localStorage` para simulación de nube.
- Diseño responsivo y accesible pensado para dispositivos móviles y escritorio.

## Tecnologías

- HTML5 semántico.
- CSS3 (layout responsivo con grid, estilos tipo Target).
- JavaScript (DOM, eventos, `localStorage` y simulación de API).

## Funcionalidad

1. El usuario puede registrar una cuenta (correo y contraseña).
2. El usuario inicia sesión y se muestra un mensaje de bienvenida.
3. Se listan productos con nombre, descripción y precio.
4. El usuario autenticado puede agregar productos a su carrito.
5. El carrito se guarda por usuario en `localStorage` y muestra total y cantidades.
6. El usuario puede eliminar productos y vaciar todo el carrito.
7. La sesión del usuario se conserva entre recargas mientras no cierre sesión.

## Estructura de archivos

- `index.html` – estructura principal y secciones (inicio, cuenta, productos, carrito).
- `styles.css` – estilos, colores y diseño.
- `app.js` – lógica de negocio, simulación de API, manejo de carrito y autenticación.
