# Envia Challenge

Aplicación reto para envía

Hosteada en: [Firebase Hosting](https://envia-challenge.firebaseapp.com/)

## Características

- Responsiva
- Cumple con los requerimientos
- Cumple con los requerimientos opcionales
- GitHub Action construye el proyecto y lo hostea con cada push a **main**
  - Cache Node.js modules
  - Instala dependencias
  - Corre el production build de React
  - Hostea en [Firebase Hosting](https://envia-challenge.firebaseapp.com/) al final

## Correr

- Instalar Node.js y NPM. Seguir esto [link](https://nodejs.org/en/)
- Clonar el repositorio (e.g. con git cli `git clone https://github.com/alfredoqt/eva-center-challenge.git`)
- Correr `npm i` para instalar las dependencias
- Empieza el React app con `npm start`. La app va a correr en localhost en el puerto 3000

## Caveats

- El backend no maneja bien el CORS, entonces puede que el **GET** request al API de orders no funcione en algunas ocasiones
