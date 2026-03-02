# 🛡️ Checklist rápida: detección de minería / malware en Windows

Este es un **resumen en Markdown** con **todos los comandos usados + para qué sirven**, pensado como **checklist forense rápida** para otra PC con Windows 10/11.
Es conciso y operativo.

## 1️⃣ Ver conexiones sospechosas (mining pools comunes)

```bat
netstat -ano | findstr :3333
netstat -ano | findstr :4444
netstat -ano | findstr :5555
netstat -ano | findstr :7777
netstat -ano | findstr :14444
````

**Para qué sirve**

* Detecta conexiones activas a puertos usados por mineros (XMRig, etc.).
* Si aparece una conexión `ESTABLISHED`, el PID es sospechoso.

---

## 2️⃣ Identificar qué proceso usa un PID

```bat
tasklist | findstr <PID>
```

Ejemplo:

```bat
tasklist | findstr 20496
```

**Para qué sirve**

* Traduce el PID a un nombre de proceso real.
* Si el nombre es raro o genérico → sospecha.

---

## 3️⃣ Ver consumo de CPU por proceso (detección indirecta)

```bat
wmic path Win32_PerfFormattedData_PerfProc_Process get Name,PercentProcessorTime
```

**Para qué sirve**

* Detecta procesos que consumen CPU constantemente.
* Un minero suele estar >20–30% sin razón clara.

---

## 4️⃣ Buscar XMRig explícitamente

```bat
tasklist | findstr /i xmrig
```

```bat
where xmrig
```

**Para qué sirve**

* Detecta mineros mal ocultos con nombre real.
* Si no aparece, puede estar renombrado o inyectado.

---

## 5️⃣ Bloquear puertos de minería (mitigación inmediata)

```bat
netsh advfirewall firewall add rule name="BLOCK_MINING" dir=out action=block protocol=TCP remoteport=3333,4444,5555,7777,14444
```

**Para qué sirve**

* Corta comunicación con pools aunque el malware siga activo.
* Útil sin reiniciar.

---

## 6️⃣ Ver procesos lanzados desde rutas sospechosas

```bat
wmic process get Name,ExecutablePath
```

**Para qué sirve**

* Detecta binarios ejecutándose desde:

  * `AppData`
  * `Temp`
  * `ProgramData`
* Malware suele vivir ahí.

---

## 7️⃣ Ver servicios sospechosos (persistencia)

```bat
sc query
```

```bat
sc qc <Servicio>
```

**Para qué sirve**

* Detecta servicios disfrazados de Windows.
* Revisa `BINARY_PATH_NAME`.

---

## 8️⃣ Revisar tareas programadas (persistencia avanzada)

```bat
schtasks /query /fo LIST /v
```

**Para qué sirve**

* Muchos mineros se reactivan vía tareas ocultas.
* Busca rutas raras o nombres tipo `UpdateService`.

---

## 9️⃣ Ver claves de inicio automático (registry)

```bat
reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Run
reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run
```

**Para qué sirve**

* Detecta malware que se inicia con Windows.

---

## 🔟 Verificar si UAC fue desactivado

```bat
reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System /v EnableLUA
```

**Resultado esperado**

* `EnableLUA = 0x1`

⚠️ `0x0` → **UAC deshabilitado (grave)**

---

## 1️⃣1️⃣ Ver estado de Windows Defender (MRT)

```bat
mrt
```

```bat
reg query "HKLM\SOFTWARE\Microsoft\RemovalTools"
```

**Para qué sirve**

* Confirma que MRT no fue deshabilitado.
* Malware avanzado suele apagarlo.

---

## 1️⃣2️⃣ Ver si Windows Recovery fue deshabilitado

```bat
reagentc /info
```

**Resultado esperado**

* `Windows RE status: Enabled`

⚠️ Disabled → señal de ataque serio

---

## 🧠 Indicadores clave de infección

* CPU alta sin apps abiertas
* Conexiones persistentes a IPs externas
* Procesos con nombres tipo:

  * `svchosts.exe`
  * `winupdate.exe`
  * `runtimebroker.exe` (mal escrito)
* Ejecutables fuera de `System32`

---

## 🔒 Acciones finales recomendadas

1. Bloquear puertos (firewall)
2. Eliminar binario sospechoso
3. Borrar tareas programadas
4. Revisar servicios
5. Escanear offline (Windows Defender Offline)

---

**Este checklist permite detectar minería sin reiniciar.**

```

---

Si quieres, en el siguiente mensaje puedo:
- ayudarte a **analizar un proceso específico paso a paso**, o  
- darte una **versión “nivel paranoico”** (inyección en svchost, DLL hijacking, rootkits ligeros).
```
