# @learnpayload/payload-cli

⚠️ **EXPERIMENTAL**: This tool is currently in experimental stage. Use at your own risk in production environments.

This CLI tool is maintained by [LearnPayload](https://youtube.com/@learnpayload), where we create educational content about Payload CMS development. Watch our channel for tutorials on using this CLI tool, database migrations, and other Payload CMS development best practices.

## Requirements

- [Bun Runtime](https://bun.sh) - This tool is specifically built to run with Bun
- Payload CMS project

## Installation

Install globally via npm:

```bash
npm install -g @learnpayload/payload-cli
```

## Overview

This CLI tool provides database management commands for Payload CMS projects, similar to tools like Laravel's Artisan. It helps manage database migrations, seeding, and other database-related tasks.

## Available Commands

- `payload migrate` - Run pending migrations
- `payload migrate:create` - Create a new migration file
- `payload migrate:down` - Rollback the last batch of migrations
- `payload migrate:refresh` - Rollback and re-run all migrations
- `payload migrate:reset` - Rollback all migrations
- `payload migrate:status` - Check migration status
- `payload migrate:fresh` - Drop all entities and re-run migrations
- `payload db:seed` - Run database seeders

## Usage

After installation, you can run commands from any Payload project directory:

```bash
# Check migration status
payload migrate:status

# Create a new migration
payload migrate:create

# Run pending migrations
payload migrate
```

## Database Seeding

The `db:seed` command runs your database seeder file. Create a seeder file at:

```
src/db/seed.ts
```

Example seeder file:

```typescript
export const handler = async () => {
  // Your seeding logic here
  await createUsers();
  await createInitialContent();
};
```

Run the seeder with:

```bash
payload db:seed
```

## Project Structure

The tool expects your Payload configuration to be located at:

```
src/payload.config.ts
```

Migration and seeder files should be placed in the appropriate directories within your project (documentation coming soon).

## Roadmap

Taking inspiration from Laravel's Artisan CLI, we plan to expand this tool's capabilities:

### Command Generation

- [ ] `make:command` - Generate custom CLI commands
- [ ] Command scaffolding with built-in argument and option parsing
- [ ] Custom command namespacing support

### Payload Component Generation

- [ ] `make:collection` - Generate collection configurations
- [ ] `make:global` - Generate global configurations
- [ ] `make:component` - Scaffold custom React components with Payload integration
- [ ] Built-in component templates and best practices

### Plugin Development

- [ ] `make:plugin` - Generate plugin boilerplate
- [ ] Plugin development tools and utilities
- [ ] Plugin testing helpers

### Future Enhancements

- [ ] Interactive command generation wizard
- [ ] Custom component template support
- [ ] Plugin marketplace integration
- [ ] Development environment tooling

## Resources & Support

- 📺 Watch tutorials on how to use this CLI tool on our [YouTube channel](https://youtube.com/@learnpayload)
- 📚 [Official Payload Documentation](https://payloadcms.com/docs)
- 💬 [Payload Discord Community](https://discord.com/invite/payload)
- 🤝 [Payload Community Forum](https://community.payloadcms.com/)

For issues specific to this CLI tool, please use the [GitHub issue tracker](link-to-your-repo).

## Contributing

This is an experimental project in active development. Issues, feature requests, and pull requests are welcome, but please note the experimental nature of the tool.

## License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
