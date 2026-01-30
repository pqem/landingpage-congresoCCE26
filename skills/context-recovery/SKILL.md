---
name: context-recovery
description: Recuperación de contexto después de compactación de memoria del LLM. Lee CONTEXT-RECOVERY.md.
scope: root
metadata.auto_invoke: ["perdió memoria", "compactación", "contexto perdido", "qué estábamos haciendo", "summary unavailable"]
allowed_tools: [read, write]
---

# Context Recovery

## Cuándo usar

- Usuario pregunta "qué estábamos haciendo?"
- Mensaje del sistema "Summary unavailable"
- Contexto claramente perdido

## Workflow

1. **Leer** `CONTEXT-RECOVERY.md` en la raíz del proyecto
2. **Resumir** estado al usuario
3. **Continuar** desde donde quedamos

## Respuesta tipo

```
Detecté compactación de contexto. Recuperando...

📦 Proyecto: [nombre]
✅ Última tarea: [descripción]
🔜 Próximo: [siguiente paso]

¿Continuamos con [próximo] o hay algo más?
```

## Cuándo actualizar CONTEXT-RECOVERY.md

- ✅ Al completar tarea significativa
- ✅ Después de commits importantes
- ✅ Al final de sesión larga
- ❌ NO en cada mensaje
