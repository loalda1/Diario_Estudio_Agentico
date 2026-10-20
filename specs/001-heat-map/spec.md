# Mapa de calor de estudio

## Contexto y objetivo

El Diario de Estudio ya registra sesiones y minutos estudiados. Esta funcionalidad
debe convertir ese historial en una vista de 12 semanas que permita reconocer de un
vistazo la constancia, los días sin actividad y la intensidad del estudio.

## Usuarios

- Personas que registran sus sesiones y quieren entender su regularidad.
- Personas principiantes que necesitan una señal visual sencilla de su progreso.

## Historias de usuario

- Como estudiante, quiero ver mis últimas 12 semanas para identificar mi constancia.
- Como estudiante, quiero distinguir la intensidad de cada día para reconocer mis
  jornadas de mayor estudio.
- Como estudiante, quiero que varias sesiones del mismo día se acumulen para que el
  mapa represente todo mi esfuerzo diario.

## Requisitos funcionales

### RF-1 — Periodo visible

El mapa deberá representar la semana actual, de lunes a domingo, y las 11 semanas
completas inmediatamente anteriores. El periodo empieza siempre un lunes y contiene
exactamente 84 días, calculados con la fecha local de la persona.

**Criterio de aceptación (EARS):** Cuando se consulte el mapa, el sistema deberá
mostrar exactamente 12 agrupaciones semanales, con 7 días ordenados de lunes a
domingo en cada una.

### RF-2 — Días futuros

Los días futuros de la semana actual deberán permanecer visibles pero vacíos y
deshabilitados visualmente, y no contribuir a ninguna intensidad.

**Criterio de aceptación (EARS):** Si una fecha posterior al día local actual tiene
sesiones guardadas, el sistema deberá mostrar esa celda sin actividad e ignorar sus
minutos en el cálculo de intensidad.

### RF-3 — Total diario

El mapa deberá sumar los minutos de todas las sesiones de cada fecha y tratar una
fecha con una o más sesiones como un único día representado.

**Criterio de aceptación (EARS):** Cuando existan varias sesiones en una fecha, el
sistema deberá usar su suma de minutos para elegir un único nivel de intensidad.

### RF-4 — Niveles de intensidad

Cada día deberá tener uno de estos niveles: sin sesiones, 1–30 minutos, 31–60
minutos, 61–120 minutos o más de 120 minutos. Los límites son inclusivos: 30, 60 y
120 pertenecen respectivamente a sus intervalos inferiores.

**Criterio de aceptación (EARS):** Si el total diario pertenece a un intervalo,
el sistema deberá aplicar siempre el color correspondiente a ese intervalo fijo,
sin depender del máximo de minutos del periodo.

### RF-5 — Identificación visual

El mapa deberá incluir una leyenda que explique todos los niveles de intensidad y
permitir distinguir los días con sesiones de los días sin sesiones. Cada día deberá
tener una descripción accesible con su fecha y sus minutos totales, sin requerir una
interacción adicional.

**Criterio de aceptación (EARS):** Cuando una persona consulte la leyenda, deberá
comprender qué representa cada nivel sin necesitar información adicional. Cuando una
persona use un lector de pantalla, deberá poder conocer la fecha y los minutos
totales de cada día.

### RF-6 — Datos no válidos

Se considerará inválido un registro cuya fecha no sea una fecha real con formato
AAAA-MM-DD o cuyos minutos no sean un número entero positivo. Los registros inválidos
no deberán alterar el mapa ni impedir que se muestren los registros válidos.

**Criterio de aceptación (EARS):** Si existe un registro no válido, el sistema deberá
ignorar ese registro para el mapa, conservarlo sin modificar y continuar mostrando
los días calculables.

## Requisitos no funcionales

- La vista deberá ser comprensible para alguien que empieza a usar el diario.
- Deberá ser legible y utilizable en móvil y escritorio, sin perder días del periodo.
- Los colores deberán mantener contraste suficiente y la intensidad no será la única
  forma de comunicar información esencial: cada día tendrá también una descripción
  accesible.
- No deberá enviar ni exponer fuera del diario los datos de las sesiones.
- Todos los textos visibles y la documentación de la funcionalidad estarán en español.
- El cálculo deberá respetar la fecha local de la persona y no desplazar días por zona
  horaria. La fecha de referencia deberá poder fijarse para verificar el cálculo.
- Las pruebas de la lógica deberán ejecutarse sin instalar dependencias y no podrá
  darse por terminada la funcionalidad con pruebas fallidas.

## Casos límite

- No hay sesiones en ninguna de las 12 semanas.
- Solo existe una sesión en el periodo.
- Hay varias sesiones el mismo día, incluyendo totales exactamente de 30, 60 y 120
  minutos.
- Todas las sesiones están fuera del periodo visible.
- Hay registros futuros o registros con fecha o minutos inválidos.
- El periodo atraviesa un cambio de mes o de año.
- El historial contiene fechas duplicadas.
- El periodo contiene un 29 de febrero.
- Hay registros válidos e inválidos para la misma fecha.
- La consulta ocurre exactamente al cambiar de domingo a lunes o al cambiar de día.
- La persona usa un lector de pantalla o navega sin ratón.
- El almacenamiento de sesiones está vacío, corrupto o no está disponible.

## Fuera de alcance

- Elegir un número de semanas o un intervalo personalizado.
- Filtrar por tema, editar o eliminar sesiones desde el mapa.
- Comparar el rendimiento con otras personas.
- Añadir objetivos, notificaciones o nuevas métricas.
- Mostrar ventanas emergentes, filtros o acciones adicionales al tocar un día.

## Criterios de finalización

- Los requisitos RF-1 a RF-6 cumplen sus criterios de aceptación.
- Los niveles fijos se representan correctamente en los límites 30, 60 y 120.
- Se comprueban sesiones únicas, múltiples, futuras, inválidas y ausencia de datos.
- La vista funciona en móvil y escritorio y conserva la legibilidad.
- No se modifica ni se pierde el historial existente.
- Las pruebas de la lógica pasan y cubren los límites de intensidad, el periodo, las
  fechas futuras y los registros inválidos.

## Dudas abiertas

- No quedan dudas abiertas para esta versión.
