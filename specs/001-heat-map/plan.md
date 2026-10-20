# Plan — Mapa de calor de estudio

Este plan concreta la implementación de la spec activa sin cambiar el formato de
las sesiones guardadas. No añade dependencias ni requiere un servidor.

## Archivos y responsabilidades

| Acción | Archivo | Responsabilidad | RF |
|---|---|---|---|
| Crear | `heat-map-logic.js` | Exponer las funciones puras de calendario, validación, agregación y niveles. No accederá al DOM ni al almacenamiento. | RF-1–RF-4, RF-6 |
| Modificar | `app.js` | Leer las sesiones, conservar la lectura tolerante a datos corruptos y pedir a la lógica el modelo del mapa para pintarlo. No calculará fechas ni minutos directamente. | RF-2, RF-3, RF-5, RF-6 |
| Modificar | `index.html` | Añadir la sección del mapa, su leyenda, encabezados de semanas y estructura accesible para las celdas. | RF-1, RF-5 |
| Modificar | `styles.css` | Presentar las 12 agrupaciones, los cinco niveles, las celdas futuras y la adaptación responsive con contraste suficiente. | RF-1, RF-2, RF-4, RF-5 |
| Crear | `tests/heat-map-logic.test.js` | Probar únicamente la lógica pura con `node --test`, sin dependencias externas ni acceso al navegador. | RF-1–RF-4, RF-6 |

El archivo de lógica se cargará como JavaScript clásico antes de `app.js`, para
conservar el funcionamiento abriendo `index.html` con doble clic. Su exportación
para Node será compatible con la carga en navegador; no se usarán módulos ES ni
`fetch`.

## Funciones puras necesarias

Todas las funciones que dependan del día actual recibirán `today` explícitamente.
Trabajarán con componentes locales de fecha y nunca con conversiones UTC ni con
fechas creadas desde una cadena `AAAA-MM-DD`.

- `formatLocalDate(date)`: convierte una fecha local en `AAAA-MM-DD`.
- `isValidDateString(dateString)`: acepta únicamente fechas reales con formato
  `AAAA-MM-DD`.
- `getMondayOfWeek(today)`: obtiene el lunes de la semana local de `today`.
- `getHeatMapStart(today)`: retrocede 11 semanas desde ese lunes.
- `isFutureDate(dateString, today)`: identifica fechas posteriores a `today`.
- `sumValidMinutesByDate(sessions)`: valida registros y suma minutos por fecha sin
  mutar la colección recibida.
- `getIntensityLevel(totalMinutes, hasSessions)`: devuelve `none`, `low`, `medium`,
  `high` o `maximum` según los intervalos fijos de la spec.
- `buildHeatMap(sessions, today)`: devuelve 12 grupos de 7 días con fecha, minutos,
  nivel y estado futuro, listo para presentar.

Las funciones de lógica no leerán `localStorage`, no crearán elementos y no
modificarán sesiones. La interfaz decidirá únicamente cómo mostrar el resultado.

## Algoritmo del mapa en pseudocódigo

```text
construirMapa(sesiones, hoy):
    lunesActual = obtenerLunesLocal(hoy)
    lunesInicial = lunesActual menos 77 días
    minutosPorFecha = mapa vacío

    para cada sesión en sesiones:
        si la fecha no es real AAAA-MM-DD o minutos no es entero positivo:
            continuar
        si la fecha es posterior a hoy:
            continuar
        si la fecha está antes de lunesInicial:
            continuar
        sumar minutosPorFecha[fecha] += minutos

    semanas = lista vacía
    para semana desde 0 hasta 11:
        días = lista vacía
        para posición desde 0 hasta 6:
            fecha = lunesInicial + (semana * 7 + posición) días locales
            esFuturo = fecha posterior a hoy
            total = 0 si esFuturo; si no, minutosPorFecha[fecha] o 0
            nivel = "sin sesiones" si total es 0;
                    "1–30" si total <= 30;
                    "31–60" si total <= 60;
                    "61–120" si total <= 120;
                    ">120" en cualquier otro caso
            añadir fecha, total, nivel y esFuturo a días
        añadir días a semanas

    devolver semanas
```

Este algoritmo cubre RF-1 por el rango fijo de 84 días, RF-2 al excluir futuros,
RF-3 al sumar por fecha, RF-4 al aplicar umbrales fijos y RF-6 al ignorar sin
modificar registros inválidos.

## Cómo se pinta en la interfaz

1. La página incluirá un título en español, una explicación breve y una leyenda con
   “Sin sesiones”, “1–30 min”, “31–60 min”, “61–120 min” y “Más de 120 min”. (RF-5)
2. Cada semana se mostrará como una agrupación de siete celdas en orden lunes–domingo,
   con una etiqueta de semana o rango de fechas comprensible. (RF-1)
3. Cada celda recibirá el estilo del nivel devuelto por la lógica, además de una
   descripción accesible en español con fecha y minutos totales. El nivel no se
   comunicará solo mediante color. (RF-4, RF-5)
4. Las celdas futuras conservarán su lugar, no mostrarán actividad, se distinguirán
   visualmente y estarán marcadas como no disponibles. (RF-2)
5. La distribución se adaptará a móvil y escritorio sin eliminar ni ocultar días;
   no habrá ventanas emergentes ni acciones al tocar una celda. (RF-5)

## Decisiones técnicas justificadas

- **Umbrales fijos:** se eligen los cinco niveles definidos en la spec para que una
  misma cantidad de minutos tenga siempre el mismo significado. Se descarta una
  escala relativa al máximo del periodo porque cambiaría la interpretación al
  cambiar el historial. (RF-4)
- **Semana actual más 11 anteriores:** se calcula un periodo estable de 84 días,
  incluyendo la semana actual parcial. Se descarta mostrar 12 semanas completas
  anteriores porque ocultaría la actividad reciente. (RF-1)
- **Agregación por fecha:** todas las sesiones válidas del día se suman antes de
  pintar una única celda. Se descarta una celda por sesión porque no representaría
  intensidad diaria. (RF-3)
- **Lógica pura separada:** las fechas, validaciones y sumas vivirán fuera del DOM y
  del almacenamiento y recibirán `today`. Se descarta calcular durante el renderizado
  porque dificultaría las pruebas y contradiría la constitución. (RF-1–RF-4, RF-6)
- **JavaScript clásico:** se mantendrá la carga directa desde `file://`. Se descartan
  módulos ES, bundlers y peticiones a archivos locales porque impedirían el uso con
  doble clic. (Constitución, RF-1–RF-6)
- **Ignorar sin borrar:** los registros inválidos no entrarán en el mapa, pero la
  lectura no los eliminará ni reescribirá. Se descarta sanitizar destruyendo datos
  para respetar la protección del historial. (RF-6)
- **CSS y marcado accesible:** se usará una cuadrícula semántica sencilla con texto
  accesible. Se descartan canvas y una imagen única porque dificultarían la lectura,
  la adaptación móvil y las pruebas de cada día. (RF-1, RF-4, RF-5)

## Estrategia de tests con `node --test`

Los tests importarán solo las funciones puras. Cada caso construirá un `today` fijo,
para que no dependa del reloj de la máquina. No se instalarán paquetes.

- **RF-1:** verificar 12 grupos, 7 días por grupo, 84 fechas, lunes como inicio,
  domingo como final, cambio de mes/año y 29 de febrero.
- **RF-2:** verificar que hoy aparece, los días posteriores quedan futuros y sus
  sesiones no producen minutos ni intensidad.
- **RF-3:** verificar una sesión, varias sesiones en una fecha, duplicados y suma
  diaria con registros válidos e inválidos mezclados.
- **RF-4:** verificar 0, 1, 30, 31, 60, 61, 120 y 121 minutos, además de periodos
  con distintos máximos.
- **RF-5:** verificar que cada salida contiene fecha, total, nivel y estado futuro
  necesarios para la descripción accesible y la leyenda.
- **RF-6:** verificar fechas imposibles, formatos incorrectos, cero, negativos,
  decimales y valores no numéricos; confirmar que las sesiones de entrada no cambian.
- **Protección de datos:** verificar que la lógica no muta la entrada. La lectura de
  almacenamiento corrupto y la comprobación visual responsive se verificarán
  manualmente en Chrome DevTools, sin modificar ni borrar sesiones del usuario.

La implementación no se considerará terminada si cualquier test falla. La matriz de
arriba y esta estrategia cubren todos los requisitos RF-1 a RF-6.
