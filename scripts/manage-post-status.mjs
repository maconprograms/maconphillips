import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
    url: 'https://ghost.maconphillips.com',
    key: '69700446438d260001b66ab1:192d1e118803dbaddeb367ad8e85eb4cd653e87410004d3767c10562e9e13b0d',
    version: 'v5.0'
});

async function managePostStatus() {
    console.log('Managing post statuses...\n');

    // 1. Create "Coming Soon" post
    const comingSoon = await api.posts.add({
        title: 'Coming Soon',
        slug: 'coming-soon',
        status: 'published',
        tags: [{ name: '#personal' }],
        html: '<p>Something is being written here. Check back soon.</p>'
    });
    console.log('✓ Created "Coming Soon" post');

    // 2. Get all posts
    const posts = await api.posts.browse({ limit: 'all', include: 'tags' });

    // 3. Move most posts to draft
    const toDraft = [
        'welcome-to-warren',
        'on-the-art-of-slow-correspondence',
        'a-walk-through-the-valley',
        'kitchen-notes-apple-season'
    ];

    for (const post of posts) {
        if (toDraft.includes(post.slug)) {
            await api.posts.edit({
                id: post.id,
                status: 'draft',
                updated_at: post.updated_at
            });
            console.log(`✓ Moved to draft: "${post.title}"`);
        }
    }

    // 4. Make technical post "unlisted" (remove #personal tag)
    const technicalPost = posts.find(p => p.slug === 'technical-notes-building-this-site');
    if (technicalPost) {
        // Remove #personal tag, keep other tags
        const newTags = (technicalPost.tags || [])
            .filter(t => t.name !== '#personal')
            .map(t => ({ name: t.name }));

        await api.posts.edit({
            id: technicalPost.id,
            tags: newTags.length > 0 ? newTags : [{ name: '#unlisted' }],
            updated_at: technicalPost.updated_at
        });
        console.log('✓ Made unlisted: "Technical Notes: Building This Site"');
    }

    console.log('\nDone!');
}

managePostStatus();
