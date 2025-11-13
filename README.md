# Parabank WebdriverIO Cucumber Javascript

## Cómo ejecutar las pruebas

1. Clonar este repositorio (`git clone https://github.com/Equipo1-ISI-PruebasSW-20252/UDEA_WebdriverIOPS.git`)
2. Navegar a la raíz del proyecto e instalar dependencias (`cd UDEA_WebdriverIOPS && npm i`)
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

---

### 2. Check Status (Verificación de Estado de Cuenta)
**Historia de Usuario:**  
Como usuario autenticado, quiero consultar el estado de mis cuentas para conocer mis saldos actuales.

**Criterios de Aceptación Evaluados:**
- ✅ Visualización de todas las cuentas del usuario
- ✅ Mostrar información detallada de cada cuenta (número, balance, disponible)
- ✅ Navegación correcta después del login

**Escenarios de Prueba:** Verificación de acceso y visualización de cuentas

---

### 3. Transfer Funds (Transferencias)
**Historia de Usuario:**  
Como usuario autenticado, quiero transferir fondos entre mis cuentas para administrar mi dinero de forma flexible.

**Criterios de Aceptación Evaluados:**
- ✅ El usuario puede seleccionar cuenta origen y destino
- ✅ Puede ingresar un monto a transferir
- ✅ El sistema valida que el monto no exceda el saldo disponible
- ✅ La transferencia debe reflejarse inmediatamente

**Escenarios de Prueba:** 2 escenarios
- ✅ Transferencia exitosa entre cuentas con saldo suficiente
- ✅ Validación de monto que excede el saldo disponible

**Cuentas de Prueba:**
- Cuenta Origen: `13011` (Saldo: $100)
- Cuenta Destino: `12900`

---

## Configuración de Velocidad de Pruebas

El proyecto está configurado para ejecutar las pruebas con una pausa de **500ms** entre cada comando, lo que permite observar mejor el flujo de las pruebas. 

Para ajustar la velocidad, modifica el valor en `wdio.conf.js` línea 356:

```javascript
afterCommand: async function (commandName, args, result, error) {
  await browser.pause(500); // Cambia 500 por el valor deseado en milisegundos
}
```

**Sugerencias de velocidad:**
- `200-300ms` - Rápido pero visible
- `500-800ms` - Velocidad normal con pausa (actual)
- `1000-2000ms` - Demostración lenta
