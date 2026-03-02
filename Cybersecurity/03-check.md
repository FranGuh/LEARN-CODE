# Resumen de Análisis de Seguridad (Windows)

## Objetivo
Verificar si el sistema presenta:
- Minería oculta
- Robo de credenciales
- Procesos fantasma
- Comportamiento tipo botnet / DDoS

---

## 1. Herramientas y comandos usados

### Enumeración de procesos
- `wmic process get Name,ProcessId,ExecutablePath`
  - Ver procesos activos y su ruta real.
- `wmic path Win32_PerfFormattedData_PerfProc_Process`
  - Ver consumo de CPU (descartar minería).

### Red y conexiones
- `netstat -ano`
  - Ver puertos abiertos, estados y PID.
- `tasklist /FI "PID eq <pid>"`
  - Relacionar puertos con procesos reales.

### Servicios y seguridad
- Revisión de servicios críticos (Defender, SecurityHealthService).
- Verificación implícita de UAC / MRT / SmartScreen activos.

---

## 2. Hallazgos clave

### Puertos “sospechosos” aclarados
- **1337 → RzSDKServer.exe**
  - Razer Chroma SDK (legítimo).
- **8080 / 8082 → httpd.exe**
  - Apache de EDB / PostgreSQL PEM (legítimo).
- **5432**
  - PostgreSQL local (loopback).

### Conexiones externas
- IPs asociadas a:
  - Microsoft
  - Apple
  - Steam
  - Cloudflare / Akamai / Google
- No hay IPs de C2 ni destinos anómalos.

### Estados de red
- `SYN_SENT`: vacío  
  → No escaneo, no flood, no DDoS.
- Conexiones locales abundantes  
  → Servicios legítimos (Steam, DBs, SDKs).

### Procesos del sistema
- Procesos sin `ExecutablePath`:
  - Solo procesos núcleo de Windows.
  - No fileless malware.

---

## 3. Verificaciones descartadas

- ❌ Minería (CPU/GPU estable, sin XMRig u otros)
- ❌ Botnet / DDoS
- ❌ Robo de credenciales activo
- ❌ Reemplazo de binarios del sistema
- ❌ Servicios persistentes maliciosos
- ❌ Desactivación de UAC / MRT / Defender

---

## 4. Conclusión

El sistema **no está comprometido**.

El “ruido” observado se debe a:
- Muchos servicios instalados (Razer, Steam, DBs, Apache, Nvidia, etc.)
- Puertos locales legítimos
- Herramientas de desarrollo y gaming activas

No hay evidencia técnica de:
- Zombie
- Backdoor
- Ataques externos en curso

---

## 5. Pasos opcionales para cierre total (99.9%)

- `sfc /scannow` → Integridad del sistema
- Autoruns → revisar persistencia
- Defender Offline Scan → confirmación final

Estado final: **Sistema limpio, solo cargado de servicios.**
