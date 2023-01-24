# CAIKEI BACKEND

Backend para "caikei", una aplicación para optimizar la gestión logística y financiera de pequeñas y medianas editoriales.

## Endpoints

### Usuarios

- Para crear un usuario se envía una petición HTTP al endpoint `localhost:8080/api/users` con la información del nuevo usuario en el body:
```json
{
    "username": "nombre del usuario",
    "password" : "contraseña de usuario",
    "email": "correo electrónico del usuario"
}
```