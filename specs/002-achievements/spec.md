# Achievements — Logros de estudio

## Contexto y objetivo

El Diario de Estudio registra sesiones, minutos y rachas, pero actualmente no ofrece
una recompensa visible por mantener el hábito. Esta funcionalidad añadirá un apartado
de insignias para reconocer el tiempo acumulado y las rachas largas, reforzar la
motivación y hacer visible el progreso conseguido.

## Usuarios

- Estudiantes que necesitan una recompensa breve y visual para mantener la constancia.
- Personas que quieren consultar tanto sus logros conseguidos como sus próximos retos.

## Historias de usuario

- Como estudiante, quiero desbloquear insignias al alcanzar hitos de racha para
  sentir que mi constancia progresa.
- Como estudiante, quiero desbloquear insignias por horas estudiadas para reconocer
  mi esfuerzo acumulado.
- Como estudiante, quiero consultar todas las insignias para saber qué he conseguido
  y qué retos puedo alcanzar después.
- Como estudiante, quiero recibir una celebración visual al conseguir una insignia
  para que el logro resulte especial.

## Requisitos funcionales

### RF-1 — Catálogo inicial de insignias

El sistema deberá ofrecer un catálogo fijo de 16 insignias: 8 de mejor racha
histórica y 8 de tiempo total estudiado. Cada insignia tendrá un nombre único y más
atractivo o épico a medida que aumente el umbral.

**Insignias de racha:**

| Umbral | Nombre |
|---:|---|
| 1 día | Primer paso |
| 3 días | Ritmo naciente |
| 7 días | Semana imparable |
| 14 días | Quincena de acero |
| 30 días | Mes constante |
| 60 días | Doble mes de fuego |
| 100 días | Centinela del hábito |
| 365 días | Leyenda del año |

**Insignias de tiempo total:**

| Umbral | Nombre |
|---:|---|
| 1 hora | Primera hora |
| 5 horas | Motor encendido |
| 10 horas | Mente en marcha |
| 25 horas | Forjador del tiempo |
| 50 horas | Maestro de la constancia |
| 100 horas | Centenario del estudio |
| 250 horas | Guardián del conocimiento |
| 500 horas | Leyenda del saber |

**Criterio de aceptación (EARS):** Cuando una persona consulte el catálogo, el
sistema deberá mostrar exactamente estas 16 insignias, con su nombre, categoría y
umbral correspondiente.

### RF-2 — Apartado de logros

El sistema deberá ofrecer un apartado específico de logros donde se muestren juntas
las insignias desbloqueadas y las todavía pendientes.

**Criterio de aceptación (EARS):** Cuando una persona abra el apartado de logros,
deberá poder distinguir qué insignias ha conseguido y cuáles permanecen pendientes
sin tener que desbloquearlas primero.

### RF-3 — Desbloqueo por progreso

Una insignia de racha se desbloqueará al alcanzar su umbral de mejor racha histórica
de días consecutivos con estudio. Una insignia de tiempo se desbloqueará al alcanzar
su umbral de horas totales estudiadas, sumando los minutos válidos de las sesiones.
Las fechas futuras y los registros no válidos no contribuirán al progreso.

**Criterio de aceptación (EARS):** Cuando el progreso alcance o supere un umbral,
el sistema deberá marcar como desbloqueada la insignia correspondiente y todas las
insignias anteriores de la misma categoría.

### RF-4 — Permanencia y no repetición

Una insignia desbloqueada deberá permanecer desbloqueada aunque el progreso visible
posterior sea menor. Una insignia ya celebrada no deberá volver a entrar en la cola
por el mismo desbloqueo.

**Criterio de aceptación (EARS):** Si una insignia ya está desbloqueada, al volver a
consultar o registrar una sesión el sistema deberá conservarla como desbloqueada y no
crear una celebración duplicada.

### RF-5 — Cola de celebraciones

Cuando una acción desbloquee una o varias insignias, el sistema deberá mostrar una
cola de celebraciones en el orden de los umbrales alcanzados, de menor a mayor.
Cada celebración deberá presentar la insignia en grande durante unos segundos,
mostrar su nombre y poder avanzar al siguiente elemento al hacer clic. Si la persona
no interactúa, cada celebración avanzará automáticamente después de 4 segundos.

**Criterio de aceptación (EARS):** Cuando se desbloqueen varias insignias a la vez,
el sistema deberá mostrar primero una sola celebración y, al hacer clic o al pasar
4 segundos, deberá mostrar la siguiente hasta vaciar la cola.

### RF-6 — Estado pendiente

Las insignias no desbloqueadas deberán permanecer visibles en escala de grises y
mostrar su nombre y umbral, sin revelar información que impida reconocerlas como
retos pendientes.

**Criterio de aceptación (EARS):** Mientras una insignia no alcance su umbral, el
sistema deberá mostrarla en estado gris y, cuando lo alcance, deberá cambiarla al
estado visual desbloqueado.

### RF-7 — Identidad visual

Las insignias, el apartado y las celebraciones deberán conservar la estética del
Diario de Estudio: colores, tipografía, formas y tono visual coherentes con el resto
de la interfaz. La celebración deberá destacar sin resultar ajena ni excesiva.

**Criterio de aceptación (EARS):** Cuando una persona consulte el apartado o reciba
una celebración, deberá reconocerla como parte del Diario de Estudio y no como una
interfaz independiente.

### RF-8 — Evolución del catálogo

El catálogo deberá poder ampliarse en el futuro con nuevas insignias sin ocultar,
reiniciar ni invalidar las insignias ya desbloqueadas.

**Criterio de aceptación (EARS):** Cuando se añada una insignia futura al catálogo,
el sistema deberá conservar el estado de las insignias existentes y mostrar la nueva
como pendiente hasta alcanzar su umbral.

## Requisitos no funcionales

- La información deberá ser comprensible para una persona que empieza a usar el
  diario.
- La vista de logros y la celebración deberán ser utilizables en móvil y escritorio.
- La diferencia entre insignias desbloqueadas y pendientes no dependerá únicamente
  del color; el estado deberá comunicarse también mediante texto o una marca clara.
- La celebración no deberá impedir permanentemente el acceso al resto del diario.
- Los datos de progreso y desbloqueo deberán mantenerse sin perder sesiones existentes.
- Las fechas y rachas deberán respetar la fecha local de la persona.
- Todos los nombres, mensajes y textos visibles estarán en español, aunque el nombre
  interno de la funcionalidad sea “Achievements”.

## Casos límite

- No hay sesiones y todas las insignias están pendientes.
- Una sesión alcanza exactamente cada umbral.
- Una sesión hace que se superen varios umbrales de tiempo a la vez.
- Una sesión aumenta simultáneamente una racha y el tiempo total.
- Varias sesiones del mismo día contribuyen al tiempo, pero el día cuenta una sola
  vez para la racha.
- Se registra una fecha futura o existe un registro inválido.
- La racha se rompe después de haber desbloqueado una insignia.
- Se alcanza un umbral que ya estaba desbloqueado.
- Se recarga la página durante una celebración o con celebraciones pendientes.
- La cola contiene insignias de ambas categorías.
- Se borran o quedan inaccesibles los datos persistidos del dispositivo.
- Se amplía el catálogo con nuevas insignias.

## Fuera de alcance

- Crear insignias personalizadas o permitir que la persona configure umbrales.
- Compartir insignias en redes sociales o compararlas con otras personas.
- Clasificaciones, puntos, niveles de usuario o recompensas económicas.
- Animaciones o sonidos complejos más allá de la celebración visual breve.
- Editar o eliminar sesiones desde el apartado de logros.
- Cambiar el catálogo inicial de 16 insignias en esta versión.

## Criterios de finalización

- RF-1 a RF-8 cumplen sus criterios de aceptación.
- Las 16 insignias aparecen en el apartado, incluidas las pendientes en gris.
- Los umbrales de racha y tiempo se comprueban en sus límites exactos.
- El desbloqueo permanente funciona y no repite celebraciones ya mostradas.
- Una cola con varias insignias avanza por clic y automáticamente tras 4 segundos.
- La vista y la celebración son legibles en móvil y escritorio y conservan la estética.
- Las sesiones existentes no se modifican ni se pierden.
- Los casos de datos futuros, inválidos, ausencia de sesiones y catálogo ampliado están
  cubiertos.
- No quedan tests de lógica fallidos ni dudas bloqueantes.

## Dudas abiertas

- **[NECESITA ACLARACIÓN]** Si la persona ya tiene progreso suficiente al instalar o
  activar esta funcionalidad por primera vez, ¿deben celebrarse inmediatamente todas
  las insignias históricas alcanzadas o solo mostrarse como desbloqueadas?
- **[NECESITA ACLARACIÓN]** Si la persona borra manualmente todos los datos del
  dispositivo, ¿la permanencia de las insignias se considera perdida junto con esos
  datos o debe existir una recuperación independiente?
