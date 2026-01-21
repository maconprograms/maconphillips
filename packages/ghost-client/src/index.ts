import GhostContentAPI from '@tryghost/content-api';

export interface GhostClientConfig {
  url: string;
  key: string;
  version?: string;
}

export interface SiteConfig {
  /** Tag filter for this site (e.g., 'hash-personal' for #personal tag) */
  tagFilter?: string;
}

export function createGhostClient(config: GhostClientConfig) {
  const api = new GhostContentAPI({
    url: config.url,
    key: config.key,
    version: config.version || 'v5.0'
  });

  return {
    async getPosts(siteConfig?: SiteConfig) {
      const options: Record<string, any> = {
        limit: 'all',
        include: ['tags', 'authors']
      };

      if (siteConfig?.tagFilter) {
        // Support multiple tags with comma separation
        // e.g., 'tag:hash-personal,tag:hash-public' for posts with #personal OR #public
        options.filter = siteConfig.tagFilter;
      }

      return await api.posts.browse(options);
    },

    async getPost(slug: string) {
      return await api.posts.read({ slug }, { include: ['tags', 'authors'] });
    },

    async getSettings() {
      return await api.settings.browse();
    }
  };
}

// Re-export types that consumers might need
export type GhostClient = ReturnType<typeof createGhostClient>;
