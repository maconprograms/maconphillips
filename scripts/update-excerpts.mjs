import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
    url: 'https://ghost.maconphillips.com',
    key: '69700446438d260001b66ab1:192d1e118803dbaddeb367ad8e85eb4cd653e87410004d3767c10562e9e13b0d',
    version: 'v5.0'
});

const excerpts = {
    'welcome-to-warren': "A place for letters—not the hurried kind we send through screens, but the slower sort that deserve a cup of coffee and a comfortable chair.",
    'on-the-art-of-slow-correspondence': "There's something lost in our age of instant communication—the anticipation of a letter, the weight of paper in hand, the distinctive loops of familiar handwriting.",
    'a-walk-through-the-valley': "This morning I took the long way through the valley, past the old covered bridge and up toward the ridge where you can see three states on a clear day.",
    'kitchen-notes-apple-season': "The orchards are heavy with fruit this year. A recipe for apple cake that's been in my family for generations.",
    'technical-notes-building-this-site': "For those curious about the technical underpinnings of this corner of the internet—Astro, Ghost, and the philosophy behind the design."
};

async function updateExcerpts() {
    console.log('Fetching posts...\n');

    const posts = await api.posts.browse({ limit: 'all' });

    for (const post of posts) {
        if (excerpts[post.slug]) {
            try {
                await api.posts.edit({
                    id: post.id,
                    custom_excerpt: excerpts[post.slug],
                    updated_at: post.updated_at
                });
                console.log(`✓ Updated excerpt for: "${post.title}"`);
            } catch (error) {
                console.error(`✗ Failed to update "${post.title}":`, error.message);
            }
        }
    }

    console.log('\nDone!');
}

updateExcerpts();
