# React + TypeScript + Vite

# *Estructura principal*

```bash
src/
├── assets/          # Imágenes, iconos y estilos globales
├── components/      # Componentes reutilizables globales (Botones, Modales)
├── features/        # Módulos o secciones independientes de la aplicación
│   ├── auth/        # Ejemplo: Sección de autenticación
│   │   ├── components/  # Componentes exclusivos de auth (LoginForm)
│   │   ├── hooks/       # Hooks exclusivos de auth (useAuth)
│   │   └── services/    # Llamadas a API de auth (api.js)
│   └── dashboard/   # Ejemplo: Sección principal / panel
│       ├── components/  # WidgetList, StatCard
│       └── index.js     # Exportación pública del módulo
├── layout/          # Estructuras fijas (Navbar, Footer, Sidebar)
├── pages/           # Vistas principales que combinan secciones/features
├── routes/          # Configuración de navegación (AppRouter)
├── utils/           # Funciones auxiliares o formateadores
├── App.jsx          # Componente raíz
└── main.jsx         # Punto de montaje
```