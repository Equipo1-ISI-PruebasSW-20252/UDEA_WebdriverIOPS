# Parabank WebdriverIO Cucumber Javascript

## Cómo ejecutar las pruebas

1. Clonar este repositorio (`git clone https://github.com/daniwira/test-webdriverio.git`)
2. Navegar a la raíz del proyecto e instalar dependencias (`cd webdriverio-parabank && npm i`)
3. Ejecutar todas las pruebas: `npx wdio wdio.conf.js`

## Features Implementadas

### 1. Login
**Historia de Usuario:**  
Como usuario registrado, quiero poder iniciar sesión con mis credenciales para acceder a mi cuenta bancaria.

**Criterios de Aceptación Evaluados:**
- ✅ Validación de usuario y contraseña (credenciales correctas e incorrectas)
- ✅ Redirección al dashboard con credenciales válidas
- ✅ Mensaje de error con credenciales inválidas
- ✅ Botón de login deshabilitado cuando los campos están vacíos
- ✅ Botón de login deshabilitado con solo un campo lleno
- ✅ Botón de login habilitado solo cuando ambos campos tienen valores

**Escenarios de Prueba:** 6 escenarios que cubren todos los casos de uso
