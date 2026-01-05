# Ghost MCP Setup for maconphillips.com

*Managing your Ghost site with Claude Code and AI assistants*

---

## Overview

This document describes how to set up MCP (Model Context Protocol) servers to manage maconphillips.com through Claude Code. The setup supports two distinct personas with different needs.

## The Two Personas

### Writer/Editor Persona
**Goal:** Create, edit, and manage content without touching code

Needs access to:
- Create and edit posts (drafts, ideas, published)
- Manage tags and content organization
- View basic stats (what's being read, member signups)
- Quick idea capture ("add a draft called X with these notes")

### Admin/Developer Persona
**Goal:** Manage the site infrastructure, theme, and backend

Needs access to:
- Everything the Writer has
- Theme code and deployment
- Hosting/server management (Coolify)
- Member management and settings
- Webhooks and integrations
- Detailed analytics

---

## MCP Server Setup

### 1. Ghost MCP (Content Management)

The primary MCP server for Ghost CMS operations.

**Package:** [@fanyangmeng/ghost-mcp](https://github.com/MFYDev/ghost-mcp)

#### Installation

Add to `~/.claude/settings.json` (user-level) or `.mcp.json` (project-level):

```json
{
  "mcpServers": {
    "ghost": {
      "command": "npx",
      "args": ["-y", "@fanyangmeng/ghost-mcp"],
      "env": {
        "GHOST_API_URL": "https://www.maconphillips.com",
        "GHOST_ADMIN_API_KEY": "YOUR_ADMIN_API_KEY",
        "GHOST_API_VERSION": "v5.0"
      }
    }
  }
}
```

#### Getting Your Admin API Key

1. Go to https://www.maconphillips.com/ghost/#/settings/integrations
2. Click "Add custom integration"
3. Name it "Claude Code MCP"
4. Copy the Admin API Key (format: `id:secret`)

#### Available Tools

| Resource | Tools | Writer | Admin |
|----------|-------|--------|-------|
| **Posts** | Browse, Read, Add, Edit, Delete | ✓ | ✓ |
| **Tags** | Browse, Read, Add, Edit, Delete | ✓ | ✓ |
| **Members** | Browse, Read, Add, Edit, Delete | — | ✓ |
| **Users** | Browse, Read, Edit, Delete | — | ✓ |
| **Newsletters** | Browse, Read, Add, Edit, Delete | — | ✓ |
| **Tiers** | Browse, Read, Add, Edit, Delete | — | ✓ |
| **Offers** | Browse, Read, Add, Edit, Delete | — | ✓ |
| **Webhooks** | Browse, Add, Delete | — | ✓ |
| **Roles** | Browse, Read | — | ✓ |
| **Invites** | Browse, Add, Delete | — | ✓ |

> **Note:** The Ghost MCP uses a single API key, so both personas have the same technical access. The distinction is about *intent* and what Claude should help with.

---

### 2. Plausible MCP (Analytics)

Privacy-focused analytics that both personas can query.

**Package:** [plausible-mcp-server](https://github.com/AVIMBU/plausible-mcp-server)

#### Prerequisites

1. Set up Plausible Analytics for maconphillips.com
   - Self-hosted: https://plausible.io/docs/self-hosting
   - Cloud: https://plausible.io (paid, privacy-respecting)

2. Get your Plausible API key from Settings → API Keys

#### Installation

Add to your MCP config:

```json
{
  "mcpServers": {
    "plausible": {
      "command": "npx",
      "args": ["-y", "@avimbu/plausible-mcp-server"],
      "env": {
        "PLAUSIBLE_API_KEY": "YOUR_PLAUSIBLE_API_KEY",
        "PLAUSIBLE_SITE_ID": "maconphillips.com",
        "PLAUSIBLE_API_URL": "https://plausible.io/api"
      }
    }
  }
}
```

#### What You Can Ask

- "How many visitors did I have this week?"
- "What are my top pages this month?"
- "Show me traffic sources for the last 30 days"
- "What's the bounce rate on my latest post?"

---

### 3. Ghost Native Analytics (Alternative)

Ghost Pro and recent self-hosted versions include native, cookie-free analytics.

**What's available in Ghost Admin:**
- Unique visitors per post
- Newsletter open rates
- Member signups attributed to posts
- Paid conversion tracking
- MRR impact per post

**Accessing via API:**
Ghost's native analytics aren't fully exposed via the documented Admin API. To export:
1. Go to Settings → Import/Export in Ghost Admin
2. Click "Export post analytics" for a CSV of your last 1,000 posts

For programmatic access, you may need to inspect Ghost Admin's network requests to find undocumented endpoints.

---

## Persona-Specific Configurations

### Writer Configuration (Minimal)

For a writer who just needs content management, create a simpler config:

```json
{
  "mcpServers": {
    "ghost": {
      "command": "npx",
      "args": ["-y", "@fanyangmeng/ghost-mcp"],
      "env": {
        "GHOST_API_URL": "https://www.maconphillips.com",
        "GHOST_ADMIN_API_KEY": "YOUR_WRITER_API_KEY",
        "GHOST_API_VERSION": "v5.0"
      }
    },
    "plausible": {
      "command": "npx",
      "args": ["-y", "@avimbu/plausible-mcp-server"],
      "env": {
        "PLAUSIBLE_API_KEY": "YOUR_PLAUSIBLE_API_KEY",
        "PLAUSIBLE_SITE_ID": "maconphillips.com"
      }
    }
  }
}
```

**Suggested prompts for writers:**
- "Create a draft idea called 'Why Town Meeting Matters' tagged as 'idea'"
- "Show me all my draft posts"
- "What posts have I published this month?"
- "How is my latest post performing?"

### Admin Configuration (Full Access)

For full site management, include additional servers:

```json
{
  "mcpServers": {
    "ghost": {
      "command": "npx",
      "args": ["-y", "@fanyangmeng/ghost-mcp"],
      "env": {
        "GHOST_API_URL": "https://www.maconphillips.com",
        "GHOST_ADMIN_API_KEY": "YOUR_ADMIN_API_KEY",
        "GHOST_API_VERSION": "v5.0"
      }
    },
    "plausible": {
      "command": "npx",
      "args": ["-y", "@avimbu/plausible-mcp-server"],
      "env": {
        "PLAUSIBLE_API_KEY": "YOUR_PLAUSIBLE_API_KEY",
        "PLAUSIBLE_SITE_ID": "maconphillips.com"
      }
    }
  }
}
```

**Additional admin capabilities:**
- Manage members and subscriptions
- Configure newsletters
- Set up tiers and offers
- Manage webhooks for automation
- User/staff management

---

## Idea Capture Workflow

Using the Ghost MCP, you can quickly capture writing ideas:

### Tagging Convention

| Tag | Meaning |
|-----|---------|
| `idea` | Raw concept, just a headline and bullets |
| `stationery-box` | Collected in the ideas holding post |
| (no tag, draft status) | Actively developing |
| (published) | Live on site |

### Quick Capture Examples

```
"Create a draft post titled 'The Road Rule and Act 250'
 tagged 'idea' with this in the body:
 - Vermont changed development rules near roads
 - 800-foot rule from existing roads
 - What this means for Warren specifically"
```

```
"Add an idea: 'Why I Left DC' - notes: burnout,
 scale stopped making sense, same values different resolution"
```

### The Stationery Box Pattern

Keep a single post that collects all undeveloped ideas:
- Title: "The Stationery Box: Ideas in Progress"
- Tag: `stationery-box` or `meta`
- Status: Draft
- Content: Bulleted list of ideas with notes

Update it as ideas come and go. When you develop an idea into its own post, remove it from the box.

---

## Security Notes

### API Key Safety

- **Never commit API keys to git**
- Store in environment variables or a secrets manager
- Use `.mcp.json` in `.gitignore` if it contains keys
- Consider using different API keys for different purposes

### Creating Limited API Keys

Ghost integrations can have restricted permissions. For a writer-only key:
1. Create a new custom integration
2. Name it descriptively ("Writer Access")
3. Note: Ghost doesn't offer granular API permissions, but you can document intended use

### Recommended Approach

Store credentials in environment variables:

```bash
# In ~/.zshrc or ~/.bashrc
export GHOST_ADMIN_API_KEY="your-key-here"
export PLAUSIBLE_API_KEY="your-key-here"
```

Then reference in config:

```json
{
  "mcpServers": {
    "ghost": {
      "command": "npx",
      "args": ["-y", "@fanyangmeng/ghost-mcp"],
      "env": {
        "GHOST_API_URL": "https://www.maconphillips.com",
        "GHOST_ADMIN_API_KEY": "${GHOST_ADMIN_API_KEY}",
        "GHOST_API_VERSION": "v5.0"
      }
    }
  }
}
```

---

## Hosting & Backend Access

For the Admin persona who needs to manage infrastructure:

### Theme Development

The Crane's theme lives in this repository. Changes deploy automatically via GitHub Actions to Coolify.

```bash
# Theme files
/themes/cranes/        # Theme source
/.github/workflows/    # CI/CD pipeline
```

### Coolify Access

The Ghost instance runs on Coolify at murmuration.starlingstrategy.com.

- **Dashboard:** Access via Coolify web UI
- **SSH:** Available for direct server access
- **Logs:** View container logs through Coolify

### Deployment Pipeline

1. Push theme changes to `main` branch
2. GitHub Actions builds the theme
3. Theme zip is deployed to Ghost via Admin API
4. Ghost automatically activates the new theme

---

## Troubleshooting

### "Ghost MCP not connecting"

1. Verify API key is correct (test in Ghost Admin → Integrations)
2. Check GHOST_API_URL includes `https://`
3. Ensure Ghost API version matches your installation

### "No analytics data"

1. Confirm Plausible is properly installed on the site
2. Check that the site ID matches exactly
3. Verify API key has read permissions

### "Posts not appearing"

1. Check post status (draft vs published)
2. Verify the correct Ghost instance URL
3. Look for API rate limiting

---

## Resources

- [Ghost Admin API Docs](https://ghost.org/docs/admin-api/)
- [Ghost MCP GitHub](https://github.com/MFYDev/ghost-mcp)
- [Plausible MCP GitHub](https://github.com/AVIMBU/plausible-mcp-server)
- [Ghost Native Analytics](https://ghost.org/help/native-analytics/)
- [Ghost Post Analytics](https://ghost.org/help/post-analytics/)

---

*Last updated: January 2026*
