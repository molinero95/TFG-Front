# Requisitos de instalacion

Las librerias necesarias se listan a continuación: 

## NodeJs

    https://nodejs.org/en/

## Typescript

    npm install -g typescript

## Electron

    npm install electron -g

## Webpack

	npm install webpack-cli -g -dev --save

## Los typings para VS Code:
    
    npm install @types/react
    npm isntall @types/react-dom
    npm install @types/react-router-dom

## Los siguientes paquetes deberían instalarse con npm install, si no:

## React

    npm install -g react

## React-DOM

    npm install -g react-dom

## React-router-DOM

    npm install -g react-router-dom


# Inicializacion

A continuación el listado de comandos para compilar/ejecutar el programa:

## Construir y ejecutar

    1º Consola: npm run build
    2º Consola: npm start
    3ª En la ventana abierta por electron: f5 y se aplican cambios

## Ejecutar

    Abrir el html en el navegador

## Ejecutar con electron

    electron .

#Cosas que faltan:

    - Me falta por portear la parte de selección de imágenes. Lo haré esta tarde, no he tenido tiempo con la commit conf
    - El home, la prediccion y el test. Aunque sea ir haciendo los componentes que lleva su tiempo.
    - He hecho pull request del proyecto de back. Igual cambiamos a tensorflow js y hacemos un express js
    - Poner bonita la selección de modelo. ItemSelector (es reutilizable)
    - Control de errores en la creación de modelo
    - Validacion de nombre del modelo, todo junto y sin mayus ni simbolos raros