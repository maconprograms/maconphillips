# maconphillips.com

Personal website for Macon Phillips, powered by [Ghost CMS](https://ghost.org/).

## Deployment

This site is deployed on the Murmuration PaaS (Coolify) at `sl8.tail7a94dc.ts.net`.

### Infrastructure

- **Ghost 5.x** - Node.js CMS
- **MySQL 8.0** - Database
- **Cloudflare Tunnel** - SSL/routing via `tank` tunnel
- **Coolify** - Container orchestration

### URLs

- **Public**: https://maconphillips.com
- **Admin**: https://maconphillips.com/ghost
- **www redirect**: https://www.maconphillips.com → https://maconphillips.com

## Local Development

```bash
# Copy environment template
cp .env.example .env

# Generate passwords
openssl rand -hex 32  # Use for MYSQL_ROOT_PASSWORD
openssl rand -hex 32  # Use for MYSQL_PASSWORD

# Edit .env with your values
vim .env

# Start containers
docker compose up -d

# View logs
docker compose logs -f ghost
```

## Email Setup (Mailgun)

1. Sign up at [mailgun.com](https://mailgun.com)
2. Add sending domain `mg.maconphillips.com`
3. Configure DNS records (SPF, DKIM)
4. Get SMTP credentials and add to `.env`

## Backup

```bash
# Backup Ghost content
docker cp ghost-maconphillips:/var/lib/ghost/content ./backup-content

# Backup MySQL
docker exec ghost-mysql mysqldump -u root -p ghost > backup.sql
```

## Theme

Currently using **Casper** (Ghost default theme). Custom themes can be uploaded via the Ghost admin panel.
