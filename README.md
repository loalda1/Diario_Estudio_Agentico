# Diario de Estudio · Construye tu constancia 📚🔥

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Sin dependencias](https://img.shields.io/badge/Dependencias-ninguna-2E7D32)
![Interfaz](https://img.shields.io/badge/Interfaz-Español-blue)

**Un diario de estudio local para registrar sesiones, visualizar tu progreso y convertir la constancia en un hábito.**

Diario de Estudio es un proyecto web desarrollado como parte de un itinerario práctico para aprender tecnología agéntica. No es solo una aplicación terminada: es un espacio de experimentación donde se documentan decisiones, especificaciones, pruebas y mejoras incrementales con ayuda de agentes de IA.

La aplicación funciona con **HTML, CSS y JavaScript puros**, sin frameworks, dependencias ni servidor. Puedes abrir `index.html` directamente desde tu ordenador y empezar a estudiar.

## ✨ Características

- 📝 **Registro de sesiones** — Guarda la fecha, el tema estudiado y los minutos dedicados.
- 🔥 **Racha actual** — Cuenta los días consecutivos con al menos una sesión, respetando la fecha local.
- 🏆 **Mejor racha histórica** — Conserva la referencia del periodo más largo de constancia.
- ⏱️ **Resumen semanal** — Suma los minutos estudiados de la semana natural actual.
- 📅 **Resumen mensual** — Cuenta los días únicos de estudio del mes en curso.
- 🟩 **Mapa de estudio** — Visualiza las últimas 12 semanas con cinco niveles de intensidad.
- 📋 **Historial reciente** — Consulta tus sesiones ordenadas de la más reciente a la más antigua.
- 🔒 **Privacidad local** — Los datos se guardan únicamente en `localStorage` del dispositivo.
- 📱 **Diseño responsive** — La interfaz se adapta a escritorio y móvil.
- ♿ **Accesibilidad cuidada** — Incluye etiquetas semánticas, estados accesibles y descripciones del mapa de estudio.

## 🧠 Aprender tecnología agéntica

Este repositorio forma parte de una colección de proyectos para aprender a trabajar con **tecnología agéntica**: sistemas capaces de colaborar en el análisis, la planificación, la implementación, la verificación y la documentación de software.

El objetivo no es delegar todo el desarrollo, sino aprender un flujo de trabajo más disciplinado:

1. **Definir el problema** antes de escribir código.
2. **Convertir las ideas en especificaciones** verificables.
3. **Planificar cambios pequeños** y mantener la lógica comprensible.
4. **Colaborar con agentes** para explorar, implementar y revisar alternativas.
5. **Validar el resultado** con pruebas automatizadas y comprobaciones visuales.
6. **Documentar decisiones y aprendizajes** para que el proyecto siga siendo útil como material de estudio.

La carpeta `specs/` muestra cómo una funcionalidad se transforma en requisitos y un plan técnico. La carpeta `tests/` recoge la lógica que puede verificarse sin navegador. Los archivos `AGENTS.md`, `docs/` y `.agents/` contienen reglas y contexto para mantener un desarrollo coherente.

## 🛠️ Tecnologías

| Tecnología | Uso en el proyecto |
| --- | --- |
| **HTML5** | Estructura semántica, formularios y regiones accesibles. |
| **CSS3** | Identidad visual, tarjetas, mapa de calor y diseño responsive. |
| **JavaScript** | Lógica de la aplicación, renderizado e interacción. |
| **localStorage** | Persistencia local de las sesiones sin backend. |
| **Node.js** | Ejecución de las pruebas integradas con `node --test`. |

## 🏗️ Estructura del proyecto

| Ruta | Descripción |
| --- | --- |
| `index.html` | Estructura principal de la interfaz. |
| `styles.css` | Estilos, identidad visual y adaptación a móvil. |
| `app.js` | Registro, persistencia, estadísticas y renderizado. |
| `heat-map-logic.js` | Lógica independiente para construir el mapa de estudio. |
| `tests/heat-map-logic.test.js` | Pruebas de la lógica del mapa de calor. |
| `docs/constitution.md` | Principios técnicos que gobiernan el proyecto. |
| `specs/` | Especificaciones y planes de las funcionalidades. |
| `.agents/` | Skills y contexto para el trabajo con agentes. |
| `.opencode/` | Comandos y configuración de apoyo al flujo agéntico. |
| `AGENTS.md` | Instrucciones de trabajo del proyecto. |
| `MEMORY.md` | Memoria breve de decisiones y estado del proyecto. |

## 🚀 Inicio rápido

### Requisitos

- Un navegador moderno.
- Node.js 18 o superior únicamente para ejecutar las pruebas.
- No necesitas instalar dependencias ni levantar un servidor.

### Ejecutar la aplicación

1. Clona o descarga este repositorio.
2. Abre `index.html` con doble clic.
3. Registra una sesión indicando fecha, tema y minutos.
4. Consulta la racha, el mapa y el historial.

La aplicación está diseñada para funcionar desde `file://`. No utiliza módulos ES, `fetch` de archivos locales ni servicios externos.

### Ejecutar las pruebas

Desde la raíz del proyecto:

```bash
node --test
```

Las pruebas cubren la construcción del mapa de calor, la agregación de minutos, los niveles de intensidad, el periodo de 12 semanas y el tratamiento de fechas futuras.

## 📖 Reglas de progreso

- Todas las fechas se interpretan en la zona horaria local del usuario.
- Varias sesiones en un mismo día cuentan como un solo día para las rachas.
- La racha actual termina hoy; si hoy no hay sesión pero ayer sí, continúa desde ayer.
- Las fechas futuras se muestran en el mapa, pero no suman estadísticas.
- La semana comienza el lunes y termina el domingo.
- Los datos existentes mantienen el formato `diario-estudio-sesiones` con sesiones `{ date, topic, minutes }`.

## 🔐 Privacidad y datos locales

El diario no tiene backend ni envía información a ningún servicio. Las sesiones se almacenan en el `localStorage` del navegador bajo la clave `diario-estudio-sesiones`.

Si quieres empezar desde cero, abre las herramientas de desarrollo del navegador y elimina esa clave en **Application → Local Storage**. Al borrar los datos del navegador, también se eliminan las sesiones guardadas en ese dispositivo.

## 🧪 Estado del proyecto

La versión actual incluye:

- Registro y listado de sesiones.
- Racha actual y mejor racha histórica.
- Minutos de la semana y días estudiados del mes.
- Mapa de estudio de 12 semanas.
- Especificaciones y pruebas para continuar ampliando el diario.

Las siguientes funcionalidades se desarrollan de forma incremental a partir de sus specs, manteniendo como prioridades la simplicidad, la privacidad local, las fechas correctas y la comprensión del código.

## 🤝 Flujo de aprendizaje y contribución

Este repositorio sirve como laboratorio personal de aprendizaje. Para proponer una mejora:

1. Define el objetivo y sus criterios de aceptación.
2. Documenta la decisión en una spec cuando el cambio lo requiera.
3. Mantén separada la lógica de la interfaz.
4. Añade o actualiza las pruebas correspondientes.
5. Comprueba la aplicación en escritorio y móvil.
6. Actualiza la documentación y la memoria del proyecto.

## 📄 Licencia

Este proyecto no incluye actualmente un archivo `LICENSE` ni declara una licencia de reutilización.

---

**Estudia con intención. Registra el camino. Construye el hábito. 📚**
