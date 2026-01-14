import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: import.meta.env.GHOST_URL,
  key: import.meta.env.GHOST_KEY,
  version: 'v5.0'
});

export async function getPosts() {
  return await api.posts.browse({
    limit: 'all',
    include: ['tags', 'authors']
  });
}

export async function getPost(slug: string) {
  return await api.posts.read({ slug }, { include: ['tags', 'authors'] });
}

export async function getSettings() {
  return await api.settings.browse();
}
