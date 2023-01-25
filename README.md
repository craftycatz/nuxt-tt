# Trainee Tool Nuxt 3 + Prisma + TypeScript + tRPC

## Getting Started

### Prerequisites

- Node.js lts or higher
- npm, yarn or pnpm
- docker and docker-compose

### Installation
For the first time you need to install the dependencies and initialize the database.
this can be done with the following command:

```bash
make init
```

After that you can start the DB and Dev Server with
    
```bash
make up
```

In case you F up the Database you can use

```bash
make reset_db
```
to reset the DB.

## Tech Stack 
- [Nuxt 3](https://v3.nuxtjs.org/) - JS Framework
- [Prisma](https://www.prisma.io/) - ORM
- [TypeScript](https://www.typescriptlang.org/) - Language
- [tRPC](https://trpc.io/) - Data Fetching 
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Zod](https://zod.dev/) - Schema Validation

## Project Structure

Nuxt 3 uses file based routing, therefore the pages are located in the `pages` folder. It is important to understand how this works, so please refer to the [Nuxt 3 Docs](https://nuxt.com/docs/getting-started/routing) for more information.

Components are located inside the `components` folder, in case this grows to large it could make sense to seperate them by domain.

The `assets` directory contains by convention every asset that you want the build tool (Vite or webpack) to process. If you want to learn more about assets in Nuxt 3, please refer to the [Nuxt 3 Docs](https://nuxt.com/docs/getting-started/assets).

The `composables` folder contains composable functions that can be used in multiple components. This is a great way to keep your code DRY. Composable files should always start with the word "use". You can learn more about composables in the [Vue 3](https://duckduckgo.com/?q=vue+3+composables&t=osx).

The `layouts` folder contains the layouts for the pages. The default layout is located in `layouts/default.vue`. The `layouts/error.vue` is used for error pages. You can learn more about layouts in the [Nuxt 3 Docs](https://nuxt.com/docs/migration/pages-and-layouts#layouts).

The `middleware` folder contains the middleware functions. for example `middleware/auth.ts` is used to check if the user is authenticated. You can learn more about middleware in the [Nuxt 3 Docs](https://nuxt.com/docs/migration/plugins-and-middleware#plugins-and-middleware).

The `plugins` folder contains the plugins. For example the `plugins/trpc.ts` file is used to initialize the tRPC client.
You can read more about plugins in the [Nuxt 3 Docs](https://nuxt.com/docs/migration/plugins-and-middleware#plugins-and-middleware).

All of our backend logic is located inside the `server` folder. The `server/api` folder contains the tRPC endpoint.
The `server/database` folder contains the Repositories and the generated Prisma client. The `server/trpc` folder contains the tRPC router and the generated tRPC types.
Business logic should be inside a dedicated service, those 
are located in the `server/services` folder. 
