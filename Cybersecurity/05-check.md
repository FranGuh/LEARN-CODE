Perfecto. Vamos **por fases**, con un enfoque **conservador**: reducir superficie de ataque **sin romper juegos, dev tools ni Windows**.

---

# Fase 1 — Hardening inmediato (seguro, reversible)

## 1️⃣ Firewall: bloquear entrada, limitar salida

Ejecuta **PowerShell como admin**:

```powershell
# Bloquear TODAS las conexiones entrantes no solicitadas
Set-NetFirewallProfile -Profile Domain,Public,Private -DefaultInboundAction Block

# Mantener salida permitida (no romper apps)
Set-NetFirewallProfile -Profile Domain,Public,Private -DefaultOutboundAction Allow
```

👉 Esto **solo** deja pasar tráfico iniciado por ti.

---

## 2️⃣ Cerrar SMB innecesario (vector clásico)

Si **no compartes archivos en red local**:

```powershell
Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart
```

Y opcional (más estricto):

```powershell
Set-SmbServerConfiguration -EnableSMB2Protocol $true -Force
```

---

## 3️⃣ Restringir PowerShell “abusable”

Evita scripts descargados sin romper PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

---

# Fase 2 — Auditoría de servicios (sin tocar nada aún)

## 4️⃣ Listar servicios activos (los que **sí** corren)

```powershell
Get-Service | Where-Object {$_.Status -eq "Running"} | Sort-Object Name
```

📌 **No deshabilites todavía**, solo observa.

---

## 5️⃣ Identificar servicios NO críticos

Estos **suelen ser seguros de desactivar** si no los usas (NO ejecutes aún):

| Servicio         | Función         | Riesgo              |
| ---------------- | --------------- | ------------------- |
| `Fax`            | Fax             | Ninguno             |
| `Print Spooler`  | Impresoras      | ⚠️ vector histórico |
| `RemoteRegistry` | Registro remoto | ⚠️ alto             |
| `Xbox*`          | Xbox services   | Ninguno             |
| `Bluetooth*`     | BT              | Si no usas          |
| `DiagTrack`      | Telemetría      | Bajo                |
| `MapsBroker`     | Mapas           | Ninguno             |

Si quieres, en el siguiente paso los apagamos **uno por uno**.

---

# Fase 3 — Reducir persistencia (clave anti-malware)

## 6️⃣ Revisar auto-arranque (sin borrar)

```powershell
Get-CimInstance Win32_StartupCommand | 
Select Name, Command, Location
```

Busca:

* rutas fuera de `Program Files`
* nombres genéricos (`update.exe`, `service.exe`)
* scripts `.ps1`, `.vbs`

---

## 7️⃣ Tareas programadas sospechosas

```powershell
Get-ScheduledTask | 
Where-Object {$_.State -ne "Disabled"} |
Select TaskName, TaskPath
```

⚠️ Malware suele vivir aquí.

---

# Fase 4 — Endurecer credenciales (muy importante)

## 8️⃣ Desactivar caché de credenciales heredadas

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v DisableDomainCreds /t REG_DWORD /d 1 /f
```

---

## 9️⃣ Proteger LSASS (anti-dump)

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v RunAsPPL /t REG_DWORD /d 1 /f
```

(Reinicio requerido)

---

# Fase 5 — Defender en modo “no perdona”

## 🔒 Activar protecciones fuertes

```powershell
Set-MpPreference -EnableControlledFolderAccess Enabled
Set-MpPreference -PUAProtection Enabled
Set-MpPreference -AttackSurfaceReductionRules_Ids `
D4F940AB-401B-4EfC-AADC-AD5F3C50688A `
-AttackSurfaceReductionRules_Actions Enabled
```

---

# Estado actual (tras estas fases)

✔ Menos puertos expuestos
✔ Menos persistencia posible
✔ Credenciales protegidas
✔ Defender en modo estricto
✔ Nada roto

---

## Siguiente paso (elige)

1️⃣ **Apagar servicios concretos** (te guío uno por uno)
2️⃣ **Hardening extremo** (tipo workstation segura)
3️⃣ **Checklist final para otra PC**
4️⃣ **Modelo “gamer + dev” optimizado**

Dime cuál.
