Entendido. Dado el **historial de 5 años**, descargas de riesgo y **síntomas pasados reales**, lo correcto es **cerrar el incidente como “limpio actualmente”**, pero asumir **posible compromiso histórico** y aplicar **hardening + limpieza preventiva** sin reinstalar.

A continuación dejo **dos entregables**:

1. **Checklist final (MD) – lo que ya hicimos**
2. **Hardening y auditoría segura (MD)** enfocada a **no romper nada**

---

## 📄 1) Resumen del incidente – checklist técnico (MD)

```md
# INCIDENTE DE SEGURIDAD – RESUMEN TÉCNICO (WINDOWS)

## Contexto
- Equipo con ~5 años de uso
- Descargas históricas de software no confiable
- Síntomas pasados: terminales al inicio, picos de CPU/GPU, borrado de perfiles de navegador
- Objetivo: detectar minería, robo de credenciales, botnet, procesos fantasma

---

## Procesos
- tasklist / wmic / PID → correlación correcta
- Verificación de rutas reales de binarios
- Revisión de command-line
- CPU/GPU usage en tiempo real
- Terminación de procesos sospechosos
- Resultado: NO masquerading, NO procesos persistentes

---

## Red
- netstat -ano + PID
- Revisión de puertos de minería comunes (3333, 4444, 5555, etc.)
- Bloqueo preventivo por firewall
- Análisis DNS cache (ipconfig /displaydns)
- Resultado: tráfico HTTPS normal, sin C2 activo

---

## Integridad del sistema
- sfc /scannow → limpio
- No binarios de sistema alterados
- UAC/LUA activos
- MRT presente y funcional

---

## Persistencia
- No servicios maliciosos
- No tareas programadas sospechosas
- No procesos que reaparezcan tras kill

---

## Artefactos
- "Origin hash" → perfil de VS Code
- VirusTotal → limpio

---

## VEREDICTO
- Sistema limpio actualmente
- Riesgo histórico mitigado
- No actividad maliciosa activa
```

---

## 🔒 2) Hardening + auditoría segura (sin romper Windows)

### A. Firewall (correcto en PowerShell, no CMD)

```powershell
# Ejecutar PowerShell como ADMIN
Set-NetFirewallProfile -Profile Domain,Public,Private -DefaultInboundAction Block
Set-NetFirewallProfile -Profile Domain,Public,Private -DefaultOutboundAction Allow
```

---

### B. Desactivar servicios innecesarios (seguros)

**NO tocar**: Defender, RPC, WMI, Windows Update.

```powershell
# Xbox (si no lo usas)
Stop-Service XboxGipSvc -Force
Set-Service XboxGipSvc -StartupType Disabled

# Fax
Stop-Service Fax -Force
Set-Service Fax -StartupType Disabled

# Remote Registry (riesgo real)
Stop-Service RemoteRegistry -Force
Set-Service RemoteRegistry -StartupType Disabled
```

---

### C. Auditoría de persistencia (lo más importante)

```powershell
# Startup (registro)
Get-CimInstance Win32_StartupCommand | Select Name, Command, Location

# Tareas programadas
Get-ScheduledTask | Where {$_.State -ne "Disabled"} | Select TaskName, TaskPath

# Servicios no Microsoft
Get-Service | Where {$_.StartType -eq "Automatic" -and $_.Name -notlike "Microsoft*"}
```

---

### D. Defender en modo estricto

```powershell
Set-MpPreference -DisableRealtimeMonitoring $false
Set-MpPreference -PUAProtection Enabled
Set-MpPreference -SubmitSamplesConsent 2
Set-MpPreference -CloudBlockLevel High
```

---

### E. Limpieza DNS + caché

```powershell
ipconfig /flushdns
```

---

### F. Navegadores (zona históricamente comprometida)

Recomendado:

* Exportar bookmarks
* Eliminar perfiles
* Crear perfiles nuevos
* Cambiar TODAS las contraseñas importantes

---

### G. Verificación periódica (mensual)

```powershell
netstat -ano
tasklist
Get-MpThreatDetection
```

---

## 🧠 Evaluación honesta

Lo que describes **sí corresponde a infecciones pasadas**, pero:

* No hay persistencia activa
* No hay rootkit
* No hay botnet
* No hay minería

El sistema **se estabilizó con el tiempo** (updates + Defender).

---

## Recomendación final

* **Nivel de riesgo actual: bajo**
* **No requiere reinstalación**
* Cambia contraseñas críticas
* Mantén hardening aplicado

Si quieres, el siguiente paso puede ser:

* Checklist de **“PC limpio para desarrollo / gaming”**
* O **baseline de seguridad reusable para futuras PCs**

Tú decides el cierre.
