import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
    url: 'https://ghost.maconphillips.com',
    key: '69700446438d260001b66ab1:192d1e118803dbaddeb367ad8e85eb4cd653e87410004d3767c10562e9e13b0d',
    version: 'v5.0'
});

const posts = [
    {
        title: 'Welcome to Warren',
        status: 'published',
        tags: [{ name: '#personal' }],
        html: `
<p>Dear friends,</p>
<p>I'm writing to you from the small town of Warren, Vermont—a place where the Green Mountains rise up like old friends and the Mad River runs cold and clear through the valley below.</p>
<p>This is a space for letters. Not the hurried kind we send through screens, but the slower sort—the kind that deserve a cup of coffee and a comfortable chair.</p>
<p>I hope you'll join me here from time to time.</p>
<p>With warmth,</p>
        `
    },
    {
        title: 'On the Art of Slow Correspondence',
        status: 'published',
        tags: [{ name: '#personal' }],
        html: `
<p>There's something lost in our age of instant communication—the anticipation of a letter, the weight of paper in hand, the distinctive loops of familiar handwriting.</p>
<h2>Why Letters Matter</h2>
<p>A letter is a gift of time. When someone sits down to write, they're saying: <em>you are worth my attention, my thought, my care.</em></p>
<blockquote>The best letters are those written without any hope of an answer, for they are the most honest.</blockquote>
<p>I've been thinking about what it means to correspond—to respond together, to carry meaning back and forth across distance and time.</p>
<h3>A Few Principles</h3>
<ul>
<li>Write as if speaking to a friend by firelight</li>
<li>Don't rush to the point—let the journey matter</li>
<li>Include the small details that make a day unique</li>
<li>End with something true</li>
</ul>
<p>Perhaps that's what I'm attempting here: letters to friends I haven't yet met.</p>
        `
    },
    {
        title: 'A Walk Through the Valley',
        status: 'published',
        tags: [{ name: '#personal' }],
        html: `
<p>This morning I took the long way through the valley, past the old covered bridge and up toward the ridge where you can see three states on a clear day.</p>
<p>The leaves are just beginning to turn—first the sugar maples, always eager to show off, then the birches with their modest gold.</p>
<hr>
<h2>What I Noticed</h2>
<ol>
<li>A red-tailed hawk circling above Lincoln Peak</li>
<li>The smell of woodsmoke from somewhere up the mountain</li>
<li>A family of deer at the edge of the meadow, unafraid</li>
<li>The sound of the river, constant and calming</li>
</ol>
<p>There's a particular kind of peace that comes from walking without destination. The mind wanders as the feet do, and sometimes you arrive somewhere unexpected.</p>
<blockquote>Not all who wander are lost—but some of us are happily so.</blockquote>
<p>I'll write more soon. The afternoon light is calling me back outside.</p>
        `
    },
    {
        title: 'Kitchen Notes: Apple Season',
        status: 'published',
        tags: [{ name: '#personal' }],
        html: `
<p>The orchards are heavy with fruit this year. I spent yesterday afternoon at a small farm up the road, filling crates with Honeycrisps and Northern Spys.</p>
<h2>A Simple Apple Cake</h2>
<p>This recipe has been in my family for generations. It's the kind of thing you make on a Sunday afternoon when the house needs warming.</p>
<h3>Ingredients</h3>
<ul>
<li>4 cups peeled, sliced apples</li>
<li>2 cups flour</li>
<li>2 cups sugar</li>
<li>2 eggs, beaten</li>
<li>1 cup vegetable oil</li>
<li>1 teaspoon cinnamon</li>
<li>1 teaspoon baking soda</li>
<li>1 teaspoon vanilla</li>
<li>Pinch of salt</li>
</ul>
<h3>Method</h3>
<p>Mix the dry ingredients. Add the wet. Fold in the apples. Pour into a greased pan and bake at 350°F for about an hour.</p>
<p>The house will smell like autumn. That's how you know it's working.</p>
<hr>
<p>Sometimes the simplest things are the most worth sharing.</p>
        `
    },
    {
        title: 'Technical Notes: Building This Site',
        status: 'published',
        tags: [{ name: '#personal' }],
        html: `
<p>For those curious about the technical underpinnings of this corner of the internet, here are some notes.</p>
<h2>The Stack</h2>
<p>This site is built with <strong>Astro</strong>, a modern static site generator, pulling content from <strong>Ghost</strong> as a headless CMS.</p>
<pre><code>// Fetching posts from Ghost
const posts = await ghost.getPosts({
    tagFilter: 'tag:hash-personal'
});
</code></pre>
<h3>Why This Approach?</h3>
<ul>
<li><strong>Performance</strong>: Static pages load instantly</li>
<li><strong>Simplicity</strong>: Ghost handles content; Astro handles presentation</li>
<li><strong>Flexibility</strong>: Multiple sites can share the same content backend</li>
</ul>
<p>The design aims to feel like stationery—warm paper tones, elegant typography, and plenty of white space for the words to breathe.</p>
<h2>Typography</h2>
<p>The body text is set in <em>Cormorant</em>, a serif typeface with beautiful italics. The signature uses <em>Tangerine</em>, a script font that mimics handwriting.</p>
<blockquote>Good typography is invisible. Great typography is memorable.</blockquote>
<p>If you'd like to build something similar, the code is open for exploration.</p>
        `
    }
];

async function seedPosts() {
    console.log('Creating placeholder posts...\n');

    for (const post of posts) {
        try {
            const result = await api.posts.add(post, { source: 'html' });
            console.log(`✓ Created: "${result.title}"`);
        } catch (error) {
            console.error(`✗ Failed to create "${post.title}":`, error.message);
        }
    }

    console.log('\nDone! Posts created with #personal tag.');
}

seedPosts();
