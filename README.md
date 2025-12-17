# Astronomic Catalog

Un sistema completo de gestión y visualización de objetos celestes construido con arquitectura moderna de microservicios utilizando **NestJS**, **Astro**, **Svelte 5**, **MySQL**, **MongoDB** y **Docker**.

---

## Tabla de Contenidos / Table of Contents

- [🇪🇸 Español](#-español)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Arquitectura del Sistema](#arquitectura-del-sistema)
  - [Base de Datos](#base-de-datos)
  - [Flujo de Datos](#flujo-de-datos)
  - [Instalación Completa](#instalación-completa)
  - [Instalación Solo Base de Datos](#instalación-solo-base-de-datos)
- [🇬🇧 English](#-english)
  - [Technologies Used](#technologies-used)
  - [System Architecture](#system-architecture)
  - [Database](#database)
  - [Data Flow](#data-flow)
  - [Complete Installation](#complete-installation)
  - [Database Only Installation](#database-only-installation)

---

<a name="español"></a>
## 🇪🇸 Español

### Tecnologías Utilizadas

#### Backend
- **NestJS 11** - Framework empresarial para Node.js con soporte para TypeScript
- **Fastify** - Adaptador HTTP de alto rendimiento
- **TypeORM** - ORM para MySQL con soporte para migraciones y relaciones complejas
- **Mongoose** - ODM para MongoDB con esquemas tipados
- **Swagger/OpenAPI** - Documentación automática de API
- **class-validator** - Validación de DTOs en tiempo de ejecución

#### Frontend
- **Astro 5** - Framework moderno con renderizado híbrido (SSR/SSG)
- **Svelte 5 (Runes)** - Framework reactivo con nueva sintaxis de Runes
- **Tailwind CSS v4** - Framework de utilidades CSS
- **Cloudinary SDK** - Widget de subida de imágenes

#### Bases de Datos
- **MySQL 8.0** - Base de datos relacional para estructura jerárquica de objetos
- **MongoDB** - Base de datos NoSQL para datos flexibles (nebulosas, observaciones)
- **Cloudinary** - Almacenamiento en la nube para imágenes (CDN)

#### DevOps & Monitoreo
- **Docker & Docker Compose** - Contenedorización y orquestación
- **Prometheus** - Recolección de métricas
- **Grafana** - Visualización de métricas y dashboards
- **MySQL Exporter** - Exportador de métricas de MySQL
- **MongoDB Exporter** - Exportador de métricas de MongoDB

---

### Arquitectura del Sistema

#### Visión General

El proyecto sigue una **arquitectura de microservicios desacoplada** con separación clara de responsabilidades:

```
┌─────────────────┐
│   FRONTEND      │
│  (Astro+Svelte) │
│   Port: 4321    │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│    BACKEND      │
│    (NestJS)     │
│   Port: 3000    │
└────┬───────┬────┘
     │       │
     │       └──────────┐
     ▼                  ▼
┌─────────┐      ┌──────────┐
│  MySQL  │      │ MongoDB  │
│  :3306  │      │  :3307   │
└─────────┘      └──────────┘
     │                  │
     └───────┬──────────┘
             ▼
      ┌──────────────┐
      │  Prometheus  │
      │    :3003     │
      └──────┬───────┘
             ▼
      ┌──────────────┐
      │   Grafana    │
      │    :3002     │
      └──────────────┘
```

#### Componentes Principales

##### 1. **Backend (NestJS)**
- **Ubicación**: `apps/astronomic-catalog-backend/`
- **Patrón**: Arquitectura modular con módulos por entidad
- **Estructura**:
  ```
  src/
  ├── shared/
  │   └── entities/
  │       └── celestial-object.entity.ts   # Entidad padre (herencia)
  ├── blackholes/
  │   ├── blackholes.controller.ts         # Endpoints REST
  │   ├── blackholes.service.ts            # Lógica de negocio
  │   ├── entities/blackhole.entity.ts     # Entidad TypeORM
  │   └── dto/                             # Validación de datos
  ├── galaxies/
  ├── planets/
  ├── stars/
  ├── nebulas/                             # Usa MongoDB
  ├── observations/                        # Usa MongoDB
  └── homepage/
      └── entities/
          └── celestial-object-with-type.view-entity.ts  # Vista SQL
  ```

- **Características Clave**:
  - **Inyección de Dependencias**: Patrón Dependency Injection nativo de NestJS
  - **Transacciones**: Uso de `QueryRunner` para operaciones atómicas en creación de objetos
  - **Validación**: Pipes globales con `class-validator` y `class-transformer`
  - **Documentación**: Swagger automático en `/api`
  - **CORS**: Habilitado para desarrollo local

##### 2. **Frontend (Astro + Svelte)**
- **Ubicación**: `apps/astronomic-catalog-frontend/`
- **Patrón**: Arquitectura de islas (Islands Architecture)
- **Rutas**:
  - `/` - Homepage con vista de todos los objetos celestes
  - `/blackholes` - Lista de agujeros negros
  - `/galaxies` - Catálogo de galaxias
  - `/stellar-systems` - Sistemas estelares
  - `/jerarchy-planet` - Órbitas planetarias
  - `/planets/[id]` - Detalle de planeta (SSR)
  - `/add-object` - Formulario de creación (Svelte interactivo)

- **Características**:
  - **SSR/SSG Híbrido**: Páginas estáticas con islas interactivas
  - **Hidratación Parcial**: Solo los componentes Svelte se hidratan en el cliente
  - **Transiciones**: Navegación fluida con `astro:transitions`
  - **Variables de Entorno**:
    - `PUBLIC_API_URL`: URL pública del backend
    - `INTERNAL_API_URL`: URL interna (Docker) para SSR
    - `PUBLIC_CLOUDINARY_CLOUD_NAME`: Nombre del cloud de Cloudinary
    - `PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Preset de subida sin firma

##### 3. **Bases de Datos - Estrategia Híbrida**

**MySQL** maneja datos estructurados con relaciones complejas, mientras **MongoDB** almacena datos semi-estructurados. **Cloudinary** actúa como el "NoSQL visual" para assets.

---

### Base de Datos

#### Arquitectura Híbrida: MySQL + MongoDB + Cloudinary

##### **MySQL 8.0 - Base Relacional**

###### **Diseño Conceptual**

El sistema implementa una **jerarquía de herencia de tabla única** (Single Table Inheritance) con la tabla `CelestialObject` como padre:

```sql
CelestialObject (id, global_name, description, image_url, created_at, updated_at)
       ↓ [1:1]
    ┌──┴──┬──────┬────────┬────────┬─────────┬────────┬────────┬──────────┐
    │     │      │        │        │         │        │        │          │
 Galaxy Star Planet BlackHole Nebula Asteroid Comet NaturalSat StarCluster
```

**Principio de Diseño**: Cada objeto celeste hereda de `CelestialObject` usando el **mismo ID** (PK compartida), lo que garantiza:
- Unicidad global de nombres (`global_name` UNIQUE)
- Consistencia referencial
- Eliminación en cascada (`ON DELETE CASCADE`)

###### **Estructura de Directorios**

```
databases/mysql/schema/
├── ddl/                                    # Data Definition Language
│   ├── celestial-objects/
│   │   └── celestial-objects.sql           # Tabla padre
│   ├── galaxy/
│   │   ├── galaxy.sql                      # Tabla hija
│   │   ├── galaxy.type.sql                 # Catálogo
│   │   └── galaxy.arm.sql                  # Subestructura
│   ├── star/
│   ├── planet/
│   ├── black-hole/
│   ├── nebula/                             # Usa MongoDB en runtime
│   ├── foreign_keys.sql                    # Todas las FKs al final
│   └── ...
├── dql/                                    # Data Query Language
│   ├── homepage/
│   │   └── main.sql                        # Vista CelestialObjectWithType
│   ├── blackholes/
│   │   └── main.sql                        # Query de ejemplo
│   ├── jerarchy-planet/
│   │   └── all.sql                         # Query de órbitas
│   └── ...
├── triggers/
│   ├── validate-created_at.celestial-object.sql
│   ├── validate-updated_at.natural-satellite.sql
│   ├── validate-eccentricity.celestial-object.sql
│   └── validate-mass_planet.natural-satellite.sql
├── views/
│   └── celestial-object-type.sql           # Vista materializada
├── users/
│   └── users.sql                           # Usuarios: nest_app, grafana_reader
├── seed/
│   └── startup.sql                         # 270 registros de prueba
└── main.sh                                 # Script de inicialización
```

###### **Orden de Carga (main.sh)**

El script `main.sh` ejecuta los archivos SQL en el orden correcto:

1. **Tabla Padre**: `CelestialObject`
2. **Catálogos**: Tipos de galaxias, planetas, estrellas, etc.
3. **Estructuras**: `Galaxy`, `GalaxyArm`, `StellarNeighborhood`, `StarSystem`
4. **Objetos Hijos**: `Star`, `Planet`, `BlackHole`, `Asteroid`, etc.
5. **Foreign Keys**: Todas las restricciones al final
6. **Triggers**: Validaciones automáticas
7. **Usuarios**: `nest_app` (full access), `grafana_reader` (SELECT only)
8. **Seed**: 270 objetos de ejemplo (30 por tipo)
9. **Vistas**: `CelestialObjectWithType`

###### **Relaciones Clave**

```sql
-- Herencia (1:1, PK compartida)
Galaxy.id → CelestialObject.id (ON DELETE CASCADE)

-- Jerarquía Galáctica
Galaxy ←─ GalaxyArm ←─ StellarNeighborhood ←─ StarSystem ←─ Star

-- Órbitas (N:N autoreferencial)
Orbit.celestial_object_id → CelestialObject.id
Orbit.primary_body_id → CelestialObject.id

-- Ejemplo: Tierra orbita al Sol
INSERT INTO Orbit (celestial_object_id, primary_body_id, ...) 
VALUES (63, 31, ...);  -- 63=Tierra, 31=Sol
```

###### **Validaciones y Restricciones**

```sql
-- Check Constraints
CHECK (mass_solar > 0.0000)
CHECK (global_name REGEXP '^[A-Za-z0-9 *.+''/,-]+$')
CHECK (image_url LIKE 'https://res.cloudinary.com/astronomic-catalog-images-assets/%')

-- Triggers
BEFORE INSERT ON CelestialObject:
  - created_at no puede ser futuro

BEFORE UPDATE ON CelestialObject:
  - updated_at no puede ser futuro
  - updated_at >= created_at

BEFORE INSERT ON Orbit:
  - eccentricity y orbital_period nunca son 0 (se setean a 0.0001)
```

###### **Vistas Optimizadas**

La vista `CelestialObjectWithType` usa LEFT JOINs para determinar el tipo de objeto:

```sql
CREATE VIEW CelestialObjectWithType AS
SELECT 
  c.id, c.global_name, c.description, c.image_url,
  CASE
    WHEN p.id IS NOT NULL THEN 'Planet'
    WHEN s.id IS NOT NULL THEN 'Star'
    WHEN g.id IS NOT NULL THEN 'Galaxy'
    WHEN bh.id IS NOT NULL THEN 'Black Hole'
    -- ...
    ELSE 'Unknown'
  END AS object_type
FROM CelestialObject c
LEFT JOIN Planet p ON p.id = c.id
LEFT JOIN Star s ON s.id = c.id
-- ...
```

**Uso en Backend**:
```typescript
@ViewEntity({ name: 'CelestialObjectWithType' })
export class CelestialObjectWithType {
  @ViewColumn() objectType: string;
  // ...
}
```

##### **MongoDB - Base NoSQL**

**Ubicación**: Colecciones: `nebulas`, `observations`

**¿Por qué MongoDB aquí?**
- **Nebulosas**: Propiedades variables según el tipo (emisión, reflexión, planetaria)
- **Observaciones**: Datos científicos heterogéneos, sin esquema fijo

**Esquemas Mongoose**:

```typescript
// src/nebulas/schemas/nebula.schema.ts
@Schema()
export class Nebula {
  @Prop({ required: true, unique: true })
  globalName: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  neighborhoodId: number;  // Referencia a MySQL
}

// src/observations/schemas/observation.schema.ts
@Schema()
export class Observation {
  @Prop({ required: true })
  celestialObjectId: string;  // Puede ser ID de MySQL o MongoDB

  @Prop({ required: true })
  observedAt: Date;

  @Prop({ required: true })
  notes: string;

  @Prop()
  observerName: string;
}

// Índice compuesto único
ObservationSchema.index(
  { celestialObjectId: 1, observedAt: 1 }, 
  { unique: true }
);
```

**Ventajas**:
- Flexibilidad para agregar campos sin migraciones
- Queries rápidas con índices automáticos
- Integración con MySQL mediante IDs numéricos/string

##### **Cloudinary - "NoSQL Visual"**

**Concepto**: Cloudinary funciona como una base de datos NoSQL para assets visuales:

- **Almacenamiento**: Imágenes en la nube con CDN global
- **Transformaciones**: Redimensionamiento, recorte, filtros on-the-fly
- **Validación**: Solo URLs de Cloudinary permitidas en BD

**Flujo de Subida**:

1. **Frontend**: Widget de Cloudinary (`CloudinaryUpload.svelte`)
   ```typescript
   const widget = window.cloudinary.createUploadWidget({
     cloudName: 'astronomic-catalog-images-assets',
     uploadPreset: 'unsigned_preset',  // Sin firma en backend
     sources: ['local', 'url', 'camera'],
   });
   ```

2. **Upload Directo**: Imagen va directo a Cloudinary (sin pasar por backend)

3. **Callback**: Widget retorna URL segura
   ```typescript
   onUpload(result.info.secure_url);
   // https://res.cloudinary.com/.../v12345/image.jpg
   ```

4. **Backend**: Valida URL antes de guardar
   ```typescript
   @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/)
   imageUrl?: string;
   ```

**Ventajas**:
- Sin límite de almacenamiento en servidor
- URLs inmutables (versionadas con `/v12345/`)
- Transformaciones: `?w=300&h=300&c=fill`
- Default image: Si `imageUrl` es NULL, MySQL usa imagen por defecto

---

### Flujo de Datos

#### Consultas (Read Operations)

##### **Homepage - Vista Unificada**

**Query SQL** (`databases/mysql/schema/dql/homepage/main.sql`):
```sql
SELECT * FROM CelestialObjectWithType LIMIT 10;
```

**Backend** (`src/homepage/homepage.service.ts`):
```typescript
@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(CelestialObjectWithType)
    private readonly repository: Repository<CelestialObjectWithType>,
  ) {}

  findAll(): Promise<CelestialObjectWithType[]> {
    return this.repository.find();
  }
}
```

**Frontend** (`src/pages/index.astro`):
```typescript
const API_URL = import.meta.env.INTERNAL_API_URL;
const response = await fetch(`${API_URL}/homepage`);
const celestialObjects = await response.json();
```

**Resultado**: Array de objetos con `objectType` discriminado.

##### **Órbitas Planetarias**

**Query SQL** (`databases/mysql/schema/dql/jerarchy-planet/all.sql`):
```sql
SELECT 
  b.global_name AS StarName,
  c.global_name AS PlanetName,
  a.semi_major_axis AS DistanceAU
FROM Orbit a
JOIN CelestialObject b ON a.primary_body_id = b.id
JOIN CelestialObject c ON a.celestial_object_id = c.id;
```

**Backend** (`src/jerarchy-planet/jerarchy-planet.service.ts`):
```typescript
findAll(): Promise<Orbit[]> {
  return this.orbitRepository.find({
    relations: ['celestialObject', 'primaryBody']
  });
}
```

**Frontend** (`src/pages/jerarchy-planet.astro`):
- Renderiza tabla con relaciones Estrella → Planeta
- Uso de `eager: true` en entidades carga relaciones automáticamente

##### **Nebulosas (MongoDB)**

**Backend** (`src/nebulas/nebulas.service.ts`):
```typescript
async findAll(): Promise<Nebula[]> {
  return this.nebulaModel.find().exec();
}

async findOne(id: string): Promise<Nebula> {
  if (!isValidObjectId(id)) {
    throw new BadRequestException('Invalid ID format');
  }
  return this.nebulaModel.findById(id).exec();
}
```

**Diferencia clave**: Validación de ObjectId de MongoDB vs. IDs numéricos de MySQL.

#### Inserciones (Create Operations)

##### **Creación de Agujero Negro (MySQL)**

**Patrón de Transacción** (`src/blackholes/blackholes.service.ts`):

```typescript
async create(dto: CreateBlackHoleDto): Promise<BlackHole> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // 1. Verificar nombre único
    const existing = await this.dataSource.manager.findOne(CelestialObject, {
      where: { globalName: dto.globalName },
    });
    if (existing) {
      throw new ConflictException('Name already exists');
    }

    // 2. Crear objeto padre
    const celestialObject = new CelestialObject();
    celestialObject.globalName = dto.globalName;
    celestialObject.description = dto.description;
    celestialObject.imageUrl = dto.imageUrl;
    const saved = await queryRunner.manager.save(celestialObject);

    // 3. Crear objeto hijo con mismo ID
    const blackHole = new BlackHole();
    blackHole.id = saved.id;  // PK compartida
    blackHole.massSolar = dto.massSolar;
    blackHole.celestialObject = saved;

    const result = await queryRunner.manager.save(BlackHole, blackHole);

    // 4. Commit si todo OK
    await queryRunner.commitTransaction();
    return result;

  } catch (err) {
    // 5. Rollback en caso de error
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
```

**Flujo de Frontend**:

1. **Formulario** (`src/components/CreateObjectForm.svelte`):
   ```svelte
   <script lang="ts">
     let form = $state({
       globalName: '',
       description: '',
       imageUrl: '',
       massSolar: 0,
     });

     async function handleSubmit(e: Event) {
       const response = await fetch(`${apiUrl}/blackholes`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(form),
       });
       // ...
     }
   </script>
   ```

2. **Upload de Imagen** (`CloudinaryUpload.svelte`):
   - Widget abre modal de Cloudinary
   - Usuario selecciona imagen
   - Callback retorna URL
   - `onUpload(url)` actualiza `form.imageUrl`

3. **Validación Backend** (DTO):
   ```typescript
   export class CreateBlackHoleDto {
     @IsString()
     @IsNotEmpty()
     globalName: string;

     @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/)
     @IsOptional()
     imageUrl?: string;

     @IsNumber()
     @Min(0)
     massSolar: number;
   }
   ```

##### **Creación de Nebulosa (MongoDB)**

```typescript
async create(dto: CreateNebulaDto): Promise<Nebula> {
  // Validación única en Mongo
  const existing = await this.nebulaModel.findOne({ 
    globalName: dto.globalName 
  });
  if (existing) {
    throw new ConflictException('Name already exists');
  }

  const nebula = new this.nebulaModel(dto);
  return nebula.save();
}
```

**Diferencias con MySQL**:
- Sin transacciones explícitas (MongoDB es ACID en documentos individuales)
- Validación de `globalName` manual (no hay UNIQUE constraint global como en MySQL)
- IDs generados automáticamente como ObjectId

---

### Instalación Completa

#### Requisitos Previos
- **Docker** (v20.10+) y **Docker Compose** (v2.0+)
- **Git**
- **pnpm** (opcional, para desarrollo local)

#### Pasos

##### 1. Clonar Repositorio
```bash
git clone https://github.com/tu-usuario/astronomic-catalog.git
cd astronomic-catalog
```

##### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# --- Cloudinary (REQUERIDO) ---
PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_unsigned_preset

# --- URLs de API ---
PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://astronomic_backend:3000

# --- MySQL ---
MYSQL_DATABASE=astronomic-catalog-db
MYSQL_ROOT_PASSWORD=Hola
MYSQL_USER=sergioar
MYSQL_PASSWORD=hola
MYSQL_PORT=3306

# --- MongoDB ---
MONGO_INITDB_ROOT_USERNAME=sergio
MONGO_INITDB_ROOT_PASSWORD=hola
```

**Obtener credenciales de Cloudinary**:
1. Crear cuenta en [Cloudinary](https://cloudinary.com/)
2. Dashboard → Settings → Upload → Add upload preset
3. Configurar como "Unsigned" (sin firma)
4. Copiar `Cloud Name` y `Upload Preset Name`

##### 3. Iniciar Servicios

```bash
cd infrastructure/docker
docker-compose up -d --build
```

**Servicios iniciados**:
- MySQL: `localhost:3306`
- MongoDB: `localhost:3307`
- Backend: `localhost:3000`
- Frontend: `localhost:4321`
- Prometheus: `localhost:3003`
- Grafana: `localhost:3002` (admin/admin)

##### 4. Verificar Inicialización

```bash
# Ver logs de MySQL (carga de esquema)
docker logs astronomic_mysql -f

# Verificar que main.sh completó
# Debe mostrar: "Database ready - Base de datos lista"

# Testear backend
curl http://localhost:3000/api

# Acceder frontend
open http://localhost:4321
```

##### 5. Explorar Aplicación

- **Homepage**: http://localhost:4321
- **API Docs**: http://localhost:3000/api
- **Grafana**: http://localhost:3002 (user: admin, pass: admin)
- **Prometheus**: http://localhost:3003

---

### Instalación Solo Base de Datos

Para usar únicamente MySQL y MongoDB sin Prometheus (con Grafana opcional):

##### 1. Crear `docker-compose.db-only.yml`

```yaml
services:
  astronomic_mysql:
    container_name: astronomic_mysql
    image: mysql:latest
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_DATABASE: astronomic-catalog-db
      MYSQL_ROOT_PASSWORD: Hola
      MYSQL_USER: sergioar
      MYSQL_PASSWORD: hola
    volumes:
      - ./mysql_data:/var/lib/mysql
      - ../../databases/mysql/schema:/docker-entrypoint-initdb.d
      - ./mysql/my.cnf:/etc/mysql/conf.d/my.ini
    networks:
      - astronomic_net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-pHola"]
      timeout: 20s
      retries: 10

  astronomic_mongodb:
    container_name: astronomic_mongodb
    image: mongo:latest
    restart: always
    ports:
      - 3307:27017
    environment:
      MONGO_INITDB_DATABASE: astronomic-catalog-mongo
      MONGO_INITDB_ROOT_USERNAME: sergio
      MONGO_INITDB_ROOT_PASSWORD: hola
    volumes:
      - ./mongo_data:/data/db
    networks:
      - astronomic_net
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5

  # OPCIONAL: Grafana sin Prometheus
  grafana:
    image: grafana/grafana
    container_name: astronomic_grafana
    ports:
      - 3002:3000
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    networks:
      - astronomic_net
    depends_on:
      astronomic_mysql:
        condition: service_healthy

networks:
  astronomic_net:
    driver: bridge
```

##### 2. Iniciar Solo Bases de Datos

```bash
cd infrastructure/docker
docker-compose -f docker-compose.db-only.yml up -d
```

##### 3. Conectar con Clientes

**MySQL**:
```bash
mysql -h 127.0.0.1 -P 3306 -u root -pHola astronomic-catalog-db
```

**MongoDB**:
```bash
mongosh "mongodb://sergio:hola@localhost:3307/astronomic-catalog-mongo?authSource=admin"
```

**Grafana** (opcional):
1. Acceder a http://localhost:3002
2. Add data source → MySQL
3. Configurar:
   - Host: `astronomic_mysql:3306`
   - Database: `astronomic-catalog-db`
   - User: `grafana_reader`
   - Password: `grafana_secure_pass`

##### 4. Queries de Ejemplo

**MySQL - Ver todos los objetos**:
```sql
SELECT * FROM CelestialObjectWithType LIMIT 20;
```

**MySQL - Buscar agujeros negros supermasivos**:
```sql
SELECT 
  c.global_name, 
  b.mass_solar 
FROM BlackHole b
JOIN CelestialObject c ON b.id = c.id
WHERE b.mass_solar > 1000000
ORDER BY b.mass_solar DESC;
```

**MongoDB - Ver nebulosas**:
```javascript
db.nebulas.find().pretty()
```

**MongoDB - Observaciones recientes**:
```javascript
db.observations.find({
  observedAt: { $gte: new Date('2025-01-01') }
}).sort({ observedAt: -1 })
```

##### 5. Restaurar Seed

Si necesitas resetear los datos:

```bash
# Detener contenedores
docker-compose -f docker-compose.db-only.yml down

# Eliminar volúmenes
sudo rm -rf mysql_data mongo_data

# Reiniciar (main.sh se ejecuta automáticamente)
docker-compose -f docker-compose.db-only.yml up -d
```

---

## 🔧 Desarrollo Local (Sin Docker)

Si prefieres ejecutar las aplicaciones localmente:

##### Backend

```bash
cd apps/astronomic-catalog-backend

# Instalar dependencias
pnpm install

# Configurar .env local
cat > .env << EOF
GLOBAL_HOST=localhost
MYSQL_PORT=3306
MYSQL_NEST_USER=nest_app
MYSQL_NEST_PASS=nest_password_123
MYSQL_DATABASE=astronomic-catalog-db
MONGODB_URL=mongodb://sergio:hola@localhost:3307/astronomic-catalog-mongo?authSource=admin
PORT=3000
EOF

# Ejecutar en modo desarrollo
pnpm run start:dev
```

##### Frontend

```bash
cd apps/astronomic-catalog-frontend

# Instalar dependencias
pnpm install

# Configurar .env local
cat > .env << EOF
PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://localhost:3000
PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_preset
EOF

# Ejecutar en modo desarrollo
pnpm run dev
```

---

## Monitoreo y Métricas

### Grafana Dashboards

Una vez Grafana esté corriendo:

1. **Agregar MySQL Data Source**:
   - Configuration → Data Sources → Add MySQL
   - Host: `astronomic_mysql:3306`
   - User: `grafana_reader` / `grafana_secure_pass`

2. **Queries de Ejemplo**:
   - Total de objetos por tipo:
     ```sql
     SELECT object_type, COUNT(*) as count
     FROM CelestialObjectWithType
     GROUP BY object_type
     ```
   
   - Agujeros negros más masivos:
     ```sql
     SELECT c.global_name, b.mass_solar
     FROM BlackHole b
     JOIN CelestialObject c ON b.id = c.id
     ORDER BY b.mass_solar DESC
     LIMIT 10
     ```

3. **Métricas de Prometheus** (si está activo):
   - `mysql_global_status_connections`: Conexiones activas
   - `mongodb_connections`: Conexiones MongoDB
   - Queries por segundo, uso de memoria, etc.

---

## Troubleshooting

### MySQL no inicia
```bash
# Ver logs
docker logs astronomic_mysql

# Problema común: Permisos de volumen
sudo chown -R 999:999 ./mysql_data

# Reintentar
docker-compose restart astronomic_mysql
```

### Backend no conecta a MySQL
```bash
# Verificar que MySQL esté healthy
docker ps

# Probar conexión manual
docker exec -it astronomic_mysql mysql -u nest_app -pnest_password_123 astronomic-catalog-db
```

### Frontend no carga imágenes
- Verificar que las variables `PUBLIC_CLOUDINARY_*` estén configuradas
- Revisar que las URLs en la BD comiencen con `https://res.cloudinary.com/astronomic-catalog-images-assets/`

### MongoDB sin autenticación
```bash
# Verificar usuario en MongoDB
docker exec -it astronomic_mongodb mongosh -u sergio -p hola --authenticationDatabase admin
```

---

## Recursos Adicionales

- **NestJS Docs**: https://docs.nestjs.com
- **Astro Docs**: https://docs.astro.build
- **Svelte 5 Runes**: https://svelte.dev/docs/svelte/runes
- **TypeORM**: https://typeorm.io
- **Mongoose**: https://mongoosejs.com
- **Cloudinary Upload Widget**: https://cloudinary.com/documentation/upload_widget

---

<a name="english"></a>
## 🇬🇧 English

### Technologies Used

#### Backend
- **NestJS 11** - Enterprise Node.js framework with TypeScript support
- **Fastify** - High-performance HTTP adapter
- **TypeORM** - ORM for MySQL with migrations and complex relationships
- **Mongoose** - ODM for MongoDB with typed schemas
- **Swagger/OpenAPI** - Automatic API documentation
- **class-validator** - Runtime DTO validation

#### Frontend
- **Astro 5** - Modern framework with hybrid rendering (SSR/SSG)
- **Svelte 5 (Runes)** - Reactive framework with new Runes syntax
- **Tailwind CSS v4** - CSS utility framework
- **Cloudinary SDK** - Image upload widget

#### Databases
- **MySQL 8.0** - Relational database for hierarchical object structure
- **MongoDB** - NoSQL database for flexible data (nebulas, observations)
- **Cloudinary** - Cloud storage for images (CDN)

#### DevOps & Monitoring
- **Docker & Docker Compose** - Containerization and orchestration
- **Prometheus** - Metrics collection
- **Grafana** - Metrics visualization and dashboards
- **MySQL Exporter** - MySQL metrics exporter
- **MongoDB Exporter** - MongoDB metrics exporter

---

### System Architecture

#### Overview

The project follows a **decoupled microservices architecture** with clear separation of concerns:

```
┌─────────────────┐
│   FRONTEND      │
│  (Astro+Svelte) │
│   Port: 4321    │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│    BACKEND      │
│    (NestJS)     │
│   Port: 3000    │
└────┬───────┬────┘
     │       │
     │       └──────────┐
     ▼                  ▼
┌─────────┐      ┌──────────┐
│  MySQL  │      │ MongoDB  │
│  :3306  │      │  :3307   │
└─────────┘      └──────────┘
     │                  │
     └───────┬──────────┘
             ▼
      ┌──────────────┐
      │  Prometheus  │
      │    :3003     │
      └──────┬───────┘
             ▼
      ┌──────────────┐
      │   Grafana    │
      │    :3002     │
      └──────────────┘
```

#### Main Components

##### 1. **Backend (NestJS)**
- **Location**: `apps/astronomic-catalog-backend/`
- **Pattern**: Modular architecture with entity-based modules
- **Structure**:
  ```
  src/
  ├── shared/
  │   └── entities/
  │       └── celestial-object.entity.ts   # Parent entity (inheritance)
  ├── blackholes/
  │   ├── blackholes.controller.ts         # REST endpoints
  │   ├── blackholes.service.ts            # Business logic
  │   ├── entities/blackhole.entity.ts     # TypeORM entity
  │   └── dto/                             # Data validation
  ├── galaxies/
  ├── planets/
  ├── stars/
  ├── nebulas/                             # Uses MongoDB
  ├── observations/                        # Uses MongoDB
  └── homepage/
      └── entities/
          └── celestial-object-with-type.view-entity.ts  # SQL View
  ```

- **Key Features**:
  - **Dependency Injection**: Native NestJS DI pattern
  - **Transactions**: `QueryRunner` usage for atomic operations
  - **Validation**: Global pipes with `class-validator` and `class-transformer`
  - **Documentation**: Automatic Swagger at `/api`
  - **CORS**: Enabled for local development

##### 2. **Frontend (Astro + Svelte)**
- **Location**: `apps/astronomic-catalog-frontend/`
- **Pattern**: Islands Architecture
- **Routes**:
  - `/` - Homepage with all celestial objects
  - `/blackholes` - Black holes list
  - `/galaxies` - Galaxy catalog
  - `/stellar-systems` - Stellar systems
  - `/jerarchy-planet` - Planetary orbits
  - `/planets/[id]` - Planet detail (SSR)
  - `/add-object` - Creation form (interactive Svelte)

- **Features**:
  - **Hybrid SSR/SSG**: Static pages with interactive islands
  - **Partial Hydration**: Only Svelte components hydrate on client
  - **Transitions**: Smooth navigation with `astro:transitions`
  - **Environment Variables**:
    - `PUBLIC_API_URL`: Public backend URL
    - `INTERNAL_API_URL`: Internal (Docker) URL for SSR
    - `PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
    - `PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Unsigned upload preset

##### 3. **Databases - Hybrid Strategy**

**MySQL** handles structured data with complex relationships, while **MongoDB** stores semi-structured data. **Cloudinary** acts as the "visual NoSQL" for assets.

---

### Database

#### Hybrid Architecture: MySQL + MongoDB + Cloudinary

##### **MySQL 8.0 - Relational Database**

###### **Conceptual Design**

The system implements a **Single Table Inheritance** hierarchy with the `CelestialObject` table as parent:

```sql
CelestialObject (id, global_name, description, image_url, created_at, updated_at)
       ↓ [1:1]
    ┌──┴──┬──────┬────────┬────────┬─────────┬────────┬────────┬──────────┐
    │     │      │        │        │         │        │        │          │
 Galaxy Star Planet BlackHole Nebula Asteroid Comet NaturalSat StarCluster
```

**Design Principle**: Each celestial object inherits from `CelestialObject` using the **same ID** (shared PK), which guarantees:
- Global uniqueness of names (`global_name` UNIQUE)
- Referential consistency
- Cascade deletion (`ON DELETE CASCADE`)

###### **Directory Structure**

```
databases/mysql/schema/
├── ddl/                                    # Data Definition Language
│   ├── celestial-objects/
│   │   └── celestial-objects.sql           # Parent table
│   ├── galaxy/
│   │   ├── galaxy.sql                      # Child table
│   │   ├── galaxy.type.sql                 # Catalog
│   │   └── galaxy.arm.sql                  # Substructure
│   ├── star/
│   ├── planet/
│   ├── black-hole/
│   ├── nebula/                             # Uses MongoDB at runtime
│   ├── foreign_keys.sql                    # All FKs at the end
│   └── ...
├── dql/                                    # Data Query Language
│   ├── homepage/
│   │   └── main.sql                        # CelestialObjectWithType view
│   ├── blackholes/
│   │   └── main.sql                        # Example query
│   ├── jerarchy-planet/
│   │   └── all.sql                         # Orbits query
│   └── ...
├── triggers/
│   ├── validate-created_at.celestial-object.sql
│   ├── validate-updated_at.natural-satellite.sql
│   ├── validate-eccentricity.celestial-object.sql
│   └── validate-mass_planet.natural-satellite.sql
├── views/
│   └── celestial-object-type.sql           # Materialized view
├── users/
│   └── users.sql                           # Users: nest_app, grafana_reader
├── seed/
│   └── startup.sql                         # 270 test records
└── main.sh                                 # Initialization script
```

###### **Loading Order (main.sh)**

The `main.sh` script executes SQL files in the correct order:

1. **Parent Table**: `CelestialObject`
2. **Catalogs**: Galaxy, planet, star types, etc.
3. **Structures**: `Galaxy`, `GalaxyArm`, `StellarNeighborhood`, `StarSystem`
4. **Child Objects**: `Star`, `Planet`, `BlackHole`, `Asteroid`, etc.
5. **Foreign Keys**: All constraints at the end
6. **Triggers**: Automatic validations
7. **Users**: `nest_app` (full access), `grafana_reader` (SELECT only)
8. **Seed**: 270 example objects (30 per type)
9. **Views**: `CelestialObjectWithType`

###### **Key Relationships**

```sql
-- Inheritance (1:1, shared PK)
Galaxy.id → CelestialObject.id (ON DELETE CASCADE)

-- Galactic Hierarchy
Galaxy ←─ GalaxyArm ←─ StellarNeighborhood ←─ StarSystem ←─ Star

-- Orbits (N:N self-referential)
Orbit.celestial_object_id → CelestialObject.id
Orbit.primary_body_id → CelestialObject.id

-- Example: Earth orbits the Sun
INSERT INTO Orbit (celestial_object_id, primary_body_id, ...) 
VALUES (63, 31, ...);  -- 63=Earth, 31=Sun
```

###### **Validations and Constraints**

```sql
-- Check Constraints
CHECK (mass_solar > 0.0000)
CHECK (global_name REGEXP '^[A-Za-z0-9 *.+''/,-]+$')
CHECK (image_url LIKE 'https://res.cloudinary.com/astronomic-catalog-images-assets/%')

-- Triggers
BEFORE INSERT ON CelestialObject:
  - created_at cannot be in the future

BEFORE UPDATE ON CelestialObject:
  - updated_at cannot be in the future
  - updated_at >= created_at

BEFORE INSERT ON Orbit:
  - eccentricity and orbital_period never 0 (set to 0.0001)
```

###### **Optimized Views**

The `CelestialObjectWithType` view uses LEFT JOINs to determine object type:

```sql
CREATE VIEW CelestialObjectWithType AS
SELECT 
  c.id, c.global_name, c.description, c.image_url,
  CASE
    WHEN p.id IS NOT NULL THEN 'Planet'
    WHEN s.id IS NOT NULL THEN 'Star'
    WHEN g.id IS NOT NULL THEN 'Galaxy'
    WHEN bh.id IS NOT NULL THEN 'Black Hole'
    -- ...
    ELSE 'Unknown'
  END AS object_type
FROM CelestialObject c
LEFT JOIN Planet p ON p.id = c.id
LEFT JOIN Star s ON s.id = c.id
-- ...
```

**Backend Usage**:
```typescript
@ViewEntity({ name: 'CelestialObjectWithType' })
export class CelestialObjectWithType {
  @ViewColumn() objectType: string;
  // ...
}
```

##### **MongoDB - NoSQL Database**

**Location**: Collections: `nebulas`, `observations`

**Why MongoDB here?**
- **Nebulas**: Variable properties depending on type (emission, reflection, planetary)
- **Observations**: Heterogeneous scientific data, no fixed schema

**Mongoose Schemas**:

```typescript
// src/nebulas/schemas/nebula.schema.ts
@Schema()
export class Nebula {
  @Prop({ required: true, unique: true })
  globalName: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  neighborhoodId: number;  // Reference to MySQL
}

// src/observations/schemas/observation.schema.ts
@Schema()
export class Observation {
  @Prop({ required: true })
  celestialObjectId: string;  // Can be MySQL or MongoDB ID

  @Prop({ required: true })
  observedAt: Date;

  @Prop({ required: true })
  notes: string;

  @Prop()
  observerName: string;
}

// Unique compound index
ObservationSchema.index(
  { celestialObjectId: 1, observedAt: 1 }, 
  { unique: true }
);
```

**Advantages**:
- Flexibility to add fields without migrations
- Fast queries with automatic indexes
- Integration with MySQL via numeric/string IDs

##### **Cloudinary - "Visual NoSQL"**

**Concept**: Cloudinary functions as a NoSQL database for visual assets:

- **Storage**: Cloud images with global CDN
- **Transformations**: Resizing, cropping, filters on-the-fly
- **Validation**: Only Cloudinary URLs allowed in DB

**Upload Flow**:

1. **Frontend**: Cloudinary widget (`CloudinaryUpload.svelte`)
   ```typescript
   const widget = window.cloudinary.createUploadWidget({
     cloudName: 'astronomic-catalog-images-assets',
     uploadPreset: 'unsigned_preset',  // No backend signature
     sources: ['local', 'url', 'camera'],
   });
   ```

2. **Direct Upload**: Image goes directly to Cloudinary (bypasses backend)

3. **Callback**: Widget returns secure URL
   ```typescript
   onUpload(result.info.secure_url);
   // https://res.cloudinary.com/.../v12345/image.jpg
   ```

4. **Backend**: Validates URL before saving
   ```typescript
   @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/)
   imageUrl?: string;
   ```

**Advantages**:
- No storage limit on server
- Immutable URLs (versioned with `/v12345/`)
- Transformations: `?w=300&h=300&c=fill`
- Default image: If `imageUrl` is NULL, MySQL uses default image

---

### Data Flow

#### Queries (Read Operations)

##### **Homepage - Unified View**

**SQL Query** (`databases/mysql/schema/dql/homepage/main.sql`):
```sql
SELECT * FROM CelestialObjectWithType LIMIT 10;
```

**Backend** (`src/homepage/homepage.service.ts`):
```typescript
@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(CelestialObjectWithType)
    private readonly repository: Repository<CelestialObjectWithType>,
  ) {}

  findAll(): Promise<CelestialObjectWithType[]> {
    return this.repository.find();
  }
}
```

**Frontend** (`src/pages/index.astro`):
```typescript
const API_URL = import.meta.env.INTERNAL_API_URL;
const response = await fetch(`${API_URL}/homepage`);
const celestialObjects = await response.json();
```

**Result**: Array of objects with discriminated `objectType`.

##### **Planetary Orbits**

**SQL Query** (`databases/mysql/schema/dql/jerarchy-planet/all.sql`):
```sql
SELECT 
  b.global_name AS StarName,
  c.global_name AS PlanetName,
  a.semi_major_axis AS DistanceAU
FROM Orbit a
JOIN CelestialObject b ON a.primary_body_id = b.id
JOIN CelestialObject c ON a.celestial_object_id = c.id;
```

**Backend** (`src/jerarchy-planet/jerarchy-planet.service.ts`):
```typescript
findAll(): Promise<Orbit[]> {
  return this.orbitRepository.find({
    relations: ['celestialObject', 'primaryBody']
  });
}
```

**Frontend** (`src/pages/jerarchy-planet.astro`):
- Renders table with Star → Planet relationships
- Use of `eager: true` in entities loads relationships automatically

##### **Nebulas (MongoDB)**

**Backend** (`src/nebulas/nebulas.service.ts`):
```typescript
async findAll(): Promise<Nebula[]> {
  return this.nebulaModel.find().exec();
}

async findOne(id: string): Promise<Nebula> {
  if (!isValidObjectId(id)) {
    throw new BadRequestException('Invalid ID format');
  }
  return this.nebulaModel.findById(id).exec();
}
```

**Key difference**: MongoDB ObjectId validation vs. numeric MySQL IDs.

#### Inserts (Create Operations)

##### **Black Hole Creation (MySQL)**

**Transaction Pattern** (`src/blackholes/blackholes.service.ts`):

```typescript
async create(dto: CreateBlackHoleDto): Promise<BlackHole> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // 1. Check unique name
    const existing = await this.dataSource.manager.findOne(CelestialObject, {
      where: { globalName: dto.globalName },
    });
    if (existing) {
      throw new ConflictException('Name already exists');
    }

    // 2. Create parent object
    const celestialObject = new CelestialObject();
    celestialObject.globalName = dto.globalName;
    celestialObject.description = dto.description;
    celestialObject.imageUrl = dto.imageUrl;
    const saved = await queryRunner.manager.save(celestialObject);

    // 3. Create child object with same ID
    const blackHole = new BlackHole();
    blackHole.id = saved.id;  // Shared PK
    blackHole.massSolar = dto.massSolar;
    blackHole.celestialObject = saved;

    const result = await queryRunner.manager.save(BlackHole, blackHole);

    // 4. Commit if OK
    await queryRunner.commitTransaction();
    return result;

  } catch (err) {
    // 5. Rollback on error
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
```

**Frontend Flow**:

1. **Form** (`src/components/CreateObjectForm.svelte`):
   ```svelte
   <script lang="ts">
     let form = $state({
       globalName: '',
       description: '',
       imageUrl: '',
       massSolar: 0,
     });

     async function handleSubmit(e: Event) {
       const response = await fetch(`${apiUrl}/blackholes`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(form),
       });
       // ...
     }
   </script>
   ```

2. **Image Upload** (`CloudinaryUpload.svelte`):
   - Widget opens Cloudinary modal
   - User selects image
   - Callback returns URL
   - `onUpload(url)` updates `form.imageUrl`

3. **Backend Validation** (DTO):
   ```typescript
   export class CreateBlackHoleDto {
     @IsString()
     @IsNotEmpty()
     globalName: string;

     @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/)
     @IsOptional()
     imageUrl?: string;

     @IsNumber()
     @Min(0)
     massSolar: number;
   }
   ```

##### **Nebula Creation (MongoDB)**

```typescript
async create(dto: CreateNebulaDto): Promise<Nebula> {
  // Unique validation in Mongo
  const existing = await this.nebulaModel.findOne({ 
    globalName: dto.globalName 
  });
  if (existing) {
    throw new ConflictException('Name already exists');
  }

  const nebula = new this.nebulaModel(dto);
  return nebula.save();
}
```

**Differences from MySQL**:
- No explicit transactions (MongoDB is ACID per document)
- Manual `globalName` validation (no global UNIQUE constraint like MySQL)
- IDs auto-generated as ObjectId

---

### Complete Installation

#### Prerequisites
- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
- **Git**
- **pnpm** (optional, for local development)

#### Steps

##### 1. Clone Repository
```bash
git clone https://github.com/your-user/astronomic-catalog.git
cd astronomic-catalog
```

##### 2. Configure Environment Variables

Create `.env` file at project root:

```env
# --- Cloudinary (REQUIRED) ---
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

# --- API URLs ---
PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://astronomic_backend:3000

# --- MySQL ---
MYSQL_DATABASE=astronomic-catalog-db
MYSQL_ROOT_PASSWORD=Hola
MYSQL_USER=sergioar
MYSQL_PASSWORD=hola
MYSQL_PORT=3306

# --- MongoDB ---
MONGO_INITDB_ROOT_USERNAME=sergio
MONGO_INITDB_ROOT_PASSWORD=hola
```

**Get Cloudinary credentials**:
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Dashboard → Settings → Upload → Add upload preset
3. Configure as "Unsigned" (no signature)
4. Copy `Cloud Name` and `Upload Preset Name`

##### 3. Start Services

```bash
cd infrastructure/docker
docker-compose up -d --build
```

**Services started**:
- MySQL: `localhost:3306`
- MongoDB: `localhost:3307`
- Backend: `localhost:3000`
- Frontend: `localhost:4321`
- Prometheus: `localhost:3003`
- Grafana: `localhost:3002` (admin/admin)

##### 4. Verify Initialization

```bash
# View MySQL logs (schema loading)
docker logs astronomic_mysql -f

# Verify main.sh completed
# Should show: "Database ready - Base de datos lista"

# Test backend
curl http://localhost:3000/api

# Access frontend
open http://localhost:4321
```

##### 5. Explore Application

- **Homepage**: http://localhost:4321
- **API Docs**: http://localhost:3000/api
- **Grafana**: http://localhost:3002 (user: admin, pass: admin)
- **Prometheus**: http://localhost:3003

---

### Database Only Installation

To use only MySQL and MongoDB without Prometheus (with optional Grafana):

##### 1. Create `docker-compose.db-only.yml`

```yaml
services:
  astronomic_mysql:
    container_name: astronomic_mysql
    image: mysql:latest
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_DATABASE: astronomic-catalog-db
      MYSQL_ROOT_PASSWORD: Hola
      MYSQL_USER: sergioar
      MYSQL_PASSWORD: hola
    volumes:
      - ./mysql_data:/var/lib/mysql
      - ../../databases/mysql/schema:/docker-entrypoint-initdb.d
      - ./mysql/my.cnf:/etc/mysql/conf.d/my.ini
    networks:
      - astronomic_net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-pHola"]
      timeout: 20s
      retries: 10

  astronomic_mongodb:
    container_name: astronomic_mongodb
    image: mongo:latest
    restart: always
    ports:
      - 3307:27017
    environment:
      MONGO_INITDB_DATABASE: astronomic-catalog-mongo
      MONGO_INITDB_ROOT_USERNAME: sergio
      MONGO_INITDB_ROOT_PASSWORD: hola
    volumes:
      - ./mongo_data:/data/db
    networks:
      - astronomic_net
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5

  # OPTIONAL: Grafana without Prometheus
  grafana:
    image: grafana/grafana
    container_name: astronomic_grafana
    ports:
      - 3002:3000
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    networks:
      - astronomic_net
    depends_on:
      astronomic_mysql:
        condition: service_healthy

networks:
  astronomic_net:
    driver: bridge
```

##### 2. Start Databases Only

```bash
cd infrastructure/docker
docker-compose -f docker-compose.db-only.yml up -d
```

##### 3. Connect with Clients

**MySQL**:
```bash
mysql -h 127.0.0.1 -P 3306 -u root -pHola astronomic-catalog-db
```

**MongoDB**:
```bash
mongosh "mongodb://sergio:hola@localhost:3307/astronomic-catalog-mongo?authSource=admin"
```

**Grafana** (optional):
1. Access http://localhost:3002
2. Add data source → MySQL
3. Configure:
   - Host: `astronomic_mysql:3306`
   - Database: `astronomic-catalog-db`
   - User: `grafana_reader`
   - Password: `grafana_secure_pass`

##### 4. Example Queries

**MySQL - View all objects**:
```sql
SELECT * FROM CelestialObjectWithType LIMIT 20;
```

**MySQL - Find supermassive black holes**:
```sql
SELECT 
  c.global_name, 
  b.mass_solar 
FROM BlackHole b
JOIN CelestialObject c ON b.id = c.id
WHERE b.mass_solar > 1000000
ORDER BY b.mass_solar DESC;
```

**MongoDB - View nebulas**:
```javascript
db.nebulas.find().pretty()
```

**MongoDB - Recent observations**:
```javascript
db.observations.find({
  observedAt: { $gte: new Date('2025-01-01') }
}).sort({ observedAt: -1 })
```

##### 5. Restore Seed

If you need to reset data:

```bash
# Stop containers
docker-compose -f docker-compose.db-only.yml down

# Remove volumes
sudo rm -rf mysql_data mongo_data

# Restart (main.sh runs automatically)
docker-compose -f docker-compose.db-only.yml up -d
```

---

## 🔧 Local Development (Without Docker)

If you prefer to run applications locally:

##### Backend

```bash
cd apps/astronomic-catalog-backend

# Install dependencies
pnpm install

# Configure local .env
cat > .env << EOF
GLOBAL_HOST=localhost
MYSQL_PORT=3306
MYSQL_NEST_USER=nest_app
MYSQL_NEST_PASS=nest_password_123
MYSQL_DATABASE=astronomic-catalog-db
MONGODB_URL=mongodb://sergio:hola@localhost:3307/astronomic-catalog-mongo?authSource=admin
PORT=3000
EOF

# Run in development mode
pnpm run start:dev
```

##### Frontend

```bash
cd apps/astronomic-catalog-frontend

# Install dependencies
pnpm install

# Configure local .env
cat > .env << EOF
PUBLIC_API_URL=http://localhost:3000
INTERNAL_API_URL=http://localhost:3000
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
EOF

# Run in development mode
pnpm run dev
```

---

## Monitoring and Metrics

### Grafana Dashboards

Once Grafana is running:

1. **Add MySQL Data Source**:
   - Configuration → Data Sources → Add MySQL
   - Host: `astronomic_mysql:3306`
   - User: `grafana_reader` / `grafana_secure_pass`

2. **Example Queries**:
   - Total objects by type:
     ```sql
     SELECT object_type, COUNT(*) as count
     FROM CelestialObjectWithType
     GROUP BY object_type
     ```
   
   - Most massive black holes:
     ```sql
     SELECT c.global_name, b.mass_solar
     FROM BlackHole b
     JOIN CelestialObject c ON b.id = c.id
     ORDER BY b.mass_solar DESC
     LIMIT 10
     ```

3. **Prometheus Metrics** (if active):
   - `mysql_global_status_connections`: Active connections
   - `mongodb_connections`: MongoDB connections
   - Queries per second, memory usage, etc.

---

## Troubleshooting

### MySQL doesn't start
```bash
# View logs
docker logs astronomic_mysql

# Common issue: Volume permissions
sudo chown -R 999:999 ./mysql_data

# Retry
docker-compose restart astronomic_mysql
```

### Backend doesn't connect to MySQL
```bash
# Verify MySQL is healthy
docker ps

# Test manual connection
docker exec -it astronomic_mysql mysql -u nest_app -pnest_password_123 astronomic-catalog-db
```

### Frontend doesn't load images
- Verify `PUBLIC_CLOUDINARY_*` variables are configured
- Check that DB URLs start with `https://res.cloudinary.com/astronomic-catalog-images-assets/`

### MongoDB without authentication
```bash
# Verify user in MongoDB
docker exec -it astronomic_mongodb mongosh -u sergio -p hola --authenticationDatabase admin
```

---

## Additional Resources

- **NestJS Docs**: https://docs.nestjs.com
- **Astro Docs**: https://docs.astro.build
- **Svelte 5 Runes**: https://svelte.dev/docs/svelte/runes
- **TypeORM**: https://typeorm.io
- **Mongoose**: https://mongoosejs.com
- **Cloudinary Upload Widget**: https://cloudinary.com/documentation/upload_widget

---

## License

This project is licensed under the MIT License.

## Contributors

- **Sergio AR** - Initial work

## Acknowledgments

- NestJS team for the amazing framework
- Astro and Svelte communities
- Cloudinary for image hosting
- All open-source contributors