# CountryApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Instalación de Tailwind

Ejecutar comando
```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```
Crear archivo .postcssrc.json en raíz del proyecto y copiar las siguientes líneas

```bash
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Importar en ./src/styles.css 
```bash
@import "tailwindcss";
```

## Instalación daisyUI

Ejecutar el siguiente comando para definir daisyUI como dependencia de desarrollo

```bash
npm i -D daisyui@latest
```
Agregar en src/styles.css

```bash
@plugin "daisyui";
```
