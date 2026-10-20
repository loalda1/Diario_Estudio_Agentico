# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.
## Estado actual
- v1 funcionando: registrar sesiones (fecha, tema, minutos), racha actual y lista de
  sesiones. También muestra la mejor racha histórica y los minutos estudiados esta semana.
- Diseño actualizado hacia una identidad de cuaderno: tinta azul, amarillo marcador y
  tarjetas más planas/editoriales; la estructura y la lógica siguen intactas.
- Añadido `opencode.json` en la raíz con el esquema oficial de configuración de OpenCode.
- Datos en localStorage.
## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic.
- Las reglas de fechas locales se documentan en `.agents/skills/local-dates/SKILL.md` para evitar desplazamientos por UTC.
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- La mejor racha se calcula dinámicamente desde las fechas guardadas; no se almacena aparte.
- Para ambas rachas, las fechas futuras se ignoran y varias sesiones del mismo día cuentan
  como un solo día.
- El total semanal suma todas las sesiones de lunes a domingo y excluye fechas futuras.
- Los días estudiados este mes se calculan con fechas únicas del mes natural actual y excluyen fechas futuras.
## Aprendizajes y errores a evitar
- Las skills del proyecto deben quedar directamente en `.agents/skills`, sin crear otra
  carpeta `.agents/skills` dentro.
## Próximos pasos
- Publicado el repositorio público `https://github.com/loalda1/Diario_Estudio_Agentico` con README profesional centrado en aprendizaje de tecnología agéntica; la captura local queda excluida mediante `.gitignore`.
- Verificación con Chrome DevTools (02/10/2026): se registraron sesiones de prueba del 30/09, 01/10 y 02/10 en contexto aislado; racha actual y mejor racha mostraron 3. Captura móvil guardada como `captura-diario-estudio-375.png`.
- La consola mostró un error de seguridad de Chrome asociado a cargar la URL `file:` desde un origen `file:`; no impidió el funcionamiento ni el guardado local.
- Añadido `docs/constitution.md` con los principios de simplicidad, funcionamiento local, privacidad, fechas, idioma, responsive y verificación del proyecto.
- Revisada la spec `specs/001-heat-map/spec.md`: se fijó el periodo de 12 semanas (semana actual más 11 completas), niveles inclusivos, fechas futuras visibles pero vacías, descripciones accesibles y sin dudas abiertas.
- Generado `specs/001-heat-map/plan.md` sin implementar código: separa lógica pura con `today`, detalla el algoritmo, la interfaz, decisiones y tests `node --test` para RF-1 a RF-6.
- Completada T1 del mapa de calor: añadidos `heat-map-logic.js` y `tests/heat-map-logic.test.js`; `node --test` pasa 7/7. T1 cubre RF-1, RF-2, RF-3, RF-4 y RF-6. T2 no iniciada.
- Implementado el mapa de calor completo: integración en `app.js`, sección y leyenda accesibles en `index.html`, estilos responsive en `styles.css`; T2–T5 completadas. La suite pasa 7/7 y la vista móvil a 375 px muestra 84 celdas sin overflow.
- Verificación requisito por requisito (03/10/2026): RF-1–RF-6 cubiertos; `node --test` pasa 7/7. Chrome confirmó 12 semanas/84 celdas, futuros vacíos, agregación, leyenda y etiquetas accesibles, almacenamiento sin cambios y sin overflow a 375 px ni escritorio.
- Redactada la spec `specs/002-achievements/spec.md` para Achievements: 16 insignias fijas de racha y horas, estados bloqueado/desbloqueado, desbloqueo permanente y cola de celebraciones. Quedan abiertas la celebración del progreso previo y el borrado manual de datos.
