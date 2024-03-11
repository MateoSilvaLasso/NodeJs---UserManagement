## Configuración del Proyecto

Para configurar el proyecto, el primer paso es clonar el repositorio de GitHub y abrir la carpeta correspondiente al proyecto.

Es necesario tener instalado `nodejs` y su gestor de paquetes `npm` para instalar las dependencias del proyecto. Utiliza el siguiente comando para instalar todas las dependencias:

```bash
npm install
```

Este comando creará una carpeta con todos los módulos necesarios para el proyecto.

Además, debes configurar un archivo `.env` que contenga la información siguiente:

```plaintext
PORT=3000

MONGO_URL=mongodb+srv://juan:12345@cluster0.1y62wkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=lkdnflakñdsjgfadslkfj
```

En este archivo, se especifica el puerto donde se ejecutará el proyecto, la URL de la base de datos MongoDB a utilizar (incluyendo el usuario y la contraseña), y el hash de JWT que se usará para encriptar los tokens.

Para ejecutar el proyecto en modo desarrollador, utiliza el siguiente comando:

```bash
npm run dev
```

Con esto, podrás hacer uso de la API REST y verificar su funcionamiento con herramientas como Postman.

Finalmente, para desplegar el proyecto, ejecuta el comando:

```bash
npm run build
```

Esto generará el código transpirado en la carpeta `/dist`.

## Funcionalidad del proyecto: 

 El proyecto consiste en un API RESTful diseñada para gestionar eventos de manera eficiente, utilizando Node.js y TypeScript. La API ofrece a los usuarios la capacidad de crear, listar, modificar y eliminar eventos con facilidad. Además, los usuarios tienen la opción de registrarse en los eventos que deseen asistir.

La seguridad es una prioridad en nuestra aplicación, por lo que hemos implementado un sistema de autenticación de usuarios y asignación de roles específicos. Esto asegura que solo los usuarios autorizados puedan realizar acciones determinadas, manteniendo así el control y la integridad de la gestión de eventos.

A continuación se listan los endpoints ofrecidos por nuestra API REST: 

### Endpoints No autenticados


Para los siguientes endpoints el usuario NO tiene que estar autenticado para utilizarlas  

| Ruta     | Verbo HTTP | Proposito                                                       |
| -------- | ---------- | --------------------------------------------------------------- |
| `/users` | POST       | Crear los usuarios dentro del sistema                           |
| `/login` | POST       | Logear al usuario en la plataforma. Devuelve un Json Web Token. |

###  Endpoints autenticados

Para los siguientes endpoints el usuario tiene que haberse logueado en la aplicación para que pueda acceder a los servicios.


| Ruta                        | Verbo HTTP | Proposito                                                                               |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `/events`                   | POST       | Crear eventos en el sistema (Solo organizadores)                                        |
| `/events/:idEvent`          | PUT        | Editar los eventos en el sistema (Solo organizadores)                                   |
| `/events/:idEvent`          | DELETE     | Eliminar los eventos en el sistema (Solo organizadores)                                 |
| `/events`                   | GET        | Obtener todos los eventos en el sitema                                                  |
| `/register/events/:eventId` | POST       | El usuario se registra en el evento indicado                                            |
| `/register/events`          | GET        | El usuario obtiene los eventos a los cuales esta registrado                             |
| `/create/events`            | GET        | El usuario obtiene los eventos creados por el                                           |
| `/events/available`         | GET        | Obtiene los eventos disponibles                                                         |
| `/events/available/date`    | GET        | Obtiene los eventos disponibles filtrados por fecha                                     |
| `/events/available/place`   | GET        | Obtiene los eventos disponibles filtrados por lugar                                     |
| `/events/available/type`    | GET        | Obtiene los eventos disponibles filtrados por tipo                                      |
| `/:eventId/attendees`       | GET        | Obtiene los usuarios que van a asistir a un evento (Solo lo pueden hacer organizadores) |

## Conclusiones y reflexion

Durante el desarrollo del proyecto, nos encontramos con algunas dificultades; sin embargo, consideramos que logramos resolverlas satisfactoriamente. Las principales dificultades en el desarrollo del proyecto fueron el uso de **Mongoose** para acceder a una base de datos no relacional y la elección del método que íbamos a utilizar para la autenticación y los roles. Además, enfrentamos problemas al momento de desplegar nuestra aplicación en **Railway**, ya que tuvimos dificultades para conectar la base de datos con la aplicación durante el proceso de despliegue.

A pesar de estos obstáculos,  todo el proyecto se realizó por completo, y no quedó ningún aspecto pendiente.

