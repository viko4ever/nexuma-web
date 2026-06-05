# NEXUMA Consulting Group - Refinamiento visual v3

Cambios principales:

- Header integrado: se eliminó el banner rectangular completo y se sustituyó por un logo transparente integrado al navbar.
- Hero refinado: la imagen del mundo ahora está dentro de un contenedor holográfico con máscara, glow, glass layer y scan animado para evitar que se vea como imagen sobrepuesta.
- Servicios: se reemplazaron las siglas genéricas por iconografía SVG semántica:
  - Salesforce: nube / CRM / engrane.
  - Integraciones: nodos conectados.
  - IA: chip / neural core.
  - Automatización: engranes / flujo.
  - Desarrollo: código.
  - Web & Mobile: monitor + smartphone.
- Se mantuvo la paleta oficial NEXUMA: azul corporativo, azul oscuro, negro tecnológico, grises metálicos y blanco.
- Build validado con `npm run build`.

Para probar:

```bash
npm install
npm run dev
```

Para validar producción:

```bash
npm run build
```

Para subir a Vercel por GitHub:

```bash
git add .
git commit -m "Refina diseño tech NEXUMA e integra branding"
git push
```
