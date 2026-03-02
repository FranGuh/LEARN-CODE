Aquí tienes una **checklist técnica enfocada en robo de credenciales, procesos fantasma y uso como zombie/DDoS**, en **Markdown**, pensada para **análisis sin reiniciar** y con mentalidad **forense** (no solo “virus común”).

---

````md
# 🧠 Checklist forense: PC zombie, robo de credenciales y DDoS (Windows)

## OBJETIVO
Detectar:
- Robo de credenciales (keylogging, LSASS dump, tokens)
- Procesos fantasma (fileless, inyectados)
- Uso como bot/zombie para DDoS
- Persistencia avanzada

---

## 1️⃣ Ver conexiones activas anómalas (no minería)

```bat
netstat -ano
````

🔍 Qué buscar:

* Muchas conexiones `ESTABLISHED` o `SYN_SENT`
* IPs externas desconocidas
* Puertos comunes de C2 / botnets:

  * 80, 443 (abuso)
  * 8080, 8443
  * 9001 (Tor)
  * 53 (DNS tunneling)

---

## 2️⃣ Relacionar conexión ↔ proceso

```bat
tasklist | findstr <PID>
```

⚠️ Sospechoso si:

* El proceso no debería tener red (ej. `conhost.exe`)
* Nombre genérico tipo `service.exe`, `runtime.exe`

---

## 3️⃣ Ver procesos SIN ejecutable (inyección / fileless)

```bat
wmic process get Name,ExecutablePath,ProcessId
```

🚩 Red flags:

* `ExecutablePath` vacío
* Ruta en `AppData`, `Temp`, `ProgramData`
* Ejecutables con nombre de Windows fuera de `System32`

---

## 4️⃣ Detectar procesos hijos de PowerShell / WMI

```bat
wmic process get Name,ParentProcessId,ProcessId
```

🔍 Luego cruza con:

* `powershell.exe`
* `wmiprvse.exe`
* `mshta.exe`
* `rundll32.exe`

⚠️ Muy usado en ataques **fileless**.

---

## 5️⃣ Ver uso sospechoso de PowerShell

```bat
powershell Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" | Select-Object -First 20
```

🚩 Buscar:

* `-EncodedCommand`
* Descargas remotas
* Ejecución sin consola visible

---

## 6️⃣ Revisar tareas programadas (persistencia botnet)

```bat
schtasks /query /fo LIST /v
```

🚩 Sospechoso si:

* Se ejecutan cada minuto
* Rutas raras
* Nombres tipo `Update`, `Telemetry`, `SystemTask`

---

## 7️⃣ Revisar servicios falsos

```bat
sc query
```

```bat
sc qc <Servicio>
```

🚩 Red flags:

* Servicio “de Windows” pero con binario en AppData
* Tipo `AUTO_START`
* Sin descripción clara

---

## 8️⃣ Revisar inicio automático (robo de credenciales)

```bat
reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Run
reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run
```

🚩 Buscar:

* Keyloggers
* Loaders
* Nombres genéricos

---

## 9️⃣ Ver accesos sospechosos a LSASS (credenciales)

```bat
tasklist | findstr lsass
```

```bat
wmic process where "Name='lsass.exe'" get ExecutablePath
```

✔️ Debe estar en:

```
C:\Windows\System32\lsass.exe
```

⚠️ Cualquier copia fuera = **crítico**

---

## 🔟 Ver si se activó Credential Dumping (protecciones)

```bat
reg query HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v RunAsPPL
```

✔️ Esperado:

* `RunAsPPL = 1`

⚠️ `0` → LSASS vulnerable

---

## 1️⃣1️⃣ Ver tráfico DNS sospechoso (C2 encubierto)

```bat
ipconfig /displaydns
```

🚩 Buscar:

* Dominios largos / aleatorios
* Muchos subdominios raros
* Resoluciones constantes

---

## 1️⃣2️⃣ Ver tráfico saliente masivo (DDoS)

```bat
netstat -an | findstr SYN_SENT
```

⚠️ Muchos `SYN_SENT` → posible participación en ataque

---

## 1️⃣3️⃣ Revisar Firewall deshabilitado o modificado

```bat
netsh advfirewall show allprofiles
```

🚩 Si está OFF → mala señal

---

## 1️⃣4️⃣ Ver si UAC fue desactivado

```bat
reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System /v EnableLUA
```

✔️ Esperado:

* `EnableLUA = 1`

---

## 1️⃣5️⃣ Detectar drivers sospechosos (rootkits ligeros)

```bat
driverquery
```

🚩 Buscar:

* Drivers sin firma
* Nombres genéricos
* Fechas recientes

---

## 🧠 Indicadores de PC zombie / botnet

* Red activa aun sin usar la PC
* Conexiones HTTPS constantes sin navegador
* PowerShell/WMI activos en segundo plano
* Tareas programadas invisibles
* Firewall/UAC tocados

---

## 🔒 Acciones inmediatas (sin reiniciar)

1. Cortar red físicamente (Ethernet / WiFi)
2. Exportar evidencias (PID, rutas)
3. Eliminar persistencia (tareas, servicios)
4. Bloquear tráfico saliente por firewall
5. Preparar escaneo offline

---

## ⚠️ NOTA FINAL

Si hay:

* Fileless malware
* Acceso a LSASS
* Drivers raros

➡️ **La única limpieza 100% segura es reinstalación limpia + cambio de contraseñas desde otro dispositivo.**

```

---

Si quieres, el siguiente paso puede ser:
- 🔍 **analizar un proceso específico como si fuera malware real**, o  
- 🧠 **simular mentalidad de atacante**: cómo se escondería y cómo lo cazas.
```
