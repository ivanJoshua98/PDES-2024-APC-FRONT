# PDES-2024-APC-FRONT
Aplicación Asesor Personal de Compras - PRÁCTICAS DE DESARROLLO DE SOFTWARE 2er Cuatrimestre – 2024 - Frontend

Esta aplicación se puede ejecutar en un ambiente ya configurado con Docker compose. Para más detalles: https://github.com/ivanJoshua98/PDES-2024-APC

## Stack tecnológico
- Node.js
- React
- Javascript
- Cypress

## Instalación

```
git clone https://github.com/ivanJoshua98/PDES-2024-APC-FRONT.git
```

## Frontend
```
cd frontend-apc
```

## Setup

La aplicación se ejecutará por defecto en el puerto 5000. 

Aviso para usuarios con Windows. Si iniciamos la aplicación en Windows debemos modificar el script de ejecución en el archivo 'package.json':
```
  "scripts": {
    "start": "react-scripts start",
```
Esto iniciará la aplicación en el puerto 3000. Si deseamos modificar el puerto de ejecución, simplemente debemos crear un archivo .env con el siguiente contenido:
```
port=5000
```
## Ejecución de la aplicación React

```
npm install
npm start
```

## Tests Frontend

Los test estan realizados con [Cypress](https://www.cypress.io/)

### Ejecución de los test por consola

Por cuestiones de eficiencia, los test no generan videos y borran los archivos generados anteriormente por otros test en cada ejecución
```
npx cypress run
```

### Ejecución de los test con visualización

Solo hay configurados test e2e
```
npx cypress open
```

## Perfiles de usuario
- Existen perfiles de usuarios compradores y usuarios administradores
- Ambos pueden realizar compras, agregar favoritos y ver sus movimientos
- Existen paginas a las cuales solo usuarios administradores pueden acceder, si un usuario sin rol de administrador intenta acceder forzadamente, será redirigido
