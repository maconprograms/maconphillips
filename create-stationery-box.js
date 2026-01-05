const crypto = require('crypto');
const https = require('https');

const ADMIN_API_KEY = '695a15c0ef7ae40001236c33:4f5492a212848562610425339f72d60cff56c9109b0242cc31e9274f45f24e2f';
const [id, secret] = ADMIN_API_KEY.split(':');

function createToken() {
    const iat = Math.floor(Date.now() / 1000);
    const header = { alg: 'HS256', typ: 'JWT', kid: id };
    const payload = { iat, exp: iat + 300, aud: '/admin/' };
    const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', Buffer.from(secret, 'hex')).update(`${headerB64}.${payloadB64}`).digest('base64url');
    return `${headerB64}.${payloadB64}.${signature}`;
}

const html = `<p><em>A working list of letters I have not written yet. Some will become posts. Some will not. Putting them here so they stop rattling around.</em></p>

<hr>

<h2>Why I am Here (The Introduction I Keep Avoiding)</h2>
<p>I burned out. That is the honest version.</p>
<ul>
<li>Spent a decade building systems meant to connect millions of people to their government</li>
<li>Whitehouse.gov, We the People, Change.gov, State Department digital</li>
<li>At some point the scale stopped making sense</li>
<li>Moved to Warren. Not as an escape but as a reset</li>
<li>Still care about the same things: how systems work, how people participate, what makes information trustworthy</li>
<li>Just working at a different resolution now</li>
</ul>
<p><strong>What this post needs:</strong> A version that does not sound like a LinkedIn bio or a therapy session. Something that explains the site without explaining myself.</p>

<hr>

<h2>To the LLM Developers, from Here</h2>
<p><em>Series: Notes on the Future</em></p>
<ul>
<li>AI trained on the internet does not know what a Class 4 road is</li>
<li>Does not know that Town Meeting means something specific in March</li>
<li>Cannot tell you which roads close in mud season or why that matters</li>
<li>The local context problem is not about representation - it is about usefulness</li>
<li>If AI is going to help rural communities, it needs to know things that are not on Wikipedia</li>
</ul>
<p><strong>Question to answer:</strong> What would an AI need to know to actually be useful in Warren? Make a list.</p>

<hr>

<h2>The Quiet Tech Manifesto</h2>
<p><em>Series: Notes on the Future</em></p>
<ul>
<li>Technology that stays in the drawer until you need it</li>
<li>The opposite of notifications, engagement metrics, dark patterns</li>
<li>This site is supposed to embody this - no pop-ups, no newsletter nags, no "you might also like"</li>
<li>Brian Eno's idea of ambient music applied to interfaces</li>
<li>What are the design principles? Can I articulate them?</li>
</ul>
<p><strong>Connection:</strong> This is really about the same thing as the Music for Airports post. Maybe they are one piece.</p>

<hr>

<h2>The Road Rule (Act 250 / Act 181)</h2>
<p><em>Series: The Legislative Ledger</em></p>
<ul>
<li>Vermont just changed how development works near roads</li>
<li>The 800-foot rule from existing roads</li>
<li>What this means for Warren specifically - which parcels, which possibilities</li>
<li>The tension between "keep it rural" and "people need places to live"</li>
<li>LURB (Land Use Review Board) decisions coming</li>
</ul>
<p><strong>Research needed:</strong> Pull the actual maps. Talk to the planning commission. Make it concrete.</p>

<hr>

<h2>Why Housing is a Verb</h2>
<p><em>Series: The Legislative Ledger</em></p>
<ul>
<li>Everyone talks about housing policy. Nobody talks about building houses.</li>
<li>CHIP funding (Community Housing and Infrastructure Program) - what it actually does</li>
<li>The gap between "affordable housing" as a category and actual structures with doors</li>
<li>What does it cost to build in Warren? Who is doing it?</li>
</ul>
<p><strong>The angle:</strong> Less policy analysis, more: what would it take to add 10 homes to this town?</p>

<hr>

<h2>The Top 10: Albums for Moods</h2>
<p><em>Series: The Liner Notes</em></p>
<p>Albums I return to, organized by what I reach for them for:</p>
<ul>
<li><strong>For focus:</strong> [need to pick]</li>
<li><strong>For motion (driving, walking):</strong> [need to pick]</li>
<li><strong>For sitting still:</strong> [need to pick]</li>
<li><strong>For being sad without wallowing:</strong> [need to pick]</li>
<li><strong>For energy without aggression:</strong> [need to pick]</li>
</ul>
<p><strong>Format decision:</strong> One big post with all 10? Or a series - one album at a time with the mood as the frame?</p>

<hr>

<h2>Gratitude: The Librarian</h2>
<p><em>Series: The Exemplars</em></p>
<ul>
<li>Not the Warren library specifically (unless...)</li>
<li>The role: human curation in an age of algorithmic feeds</li>
<li>What a librarian does that a search engine cannot</li>
<li>The idea they represent: that some things should be filtered by judgment, not popularity</li>
</ul>
<p><strong>Who specifically?</strong> Need to decide if this is about a real person or the archetype.</p>

<hr>

<h2>Gratitude: Someone Who Just Shows Up</h2>
<p><em>Series: The Exemplars</em></p>
<ul>
<li>The person who is at every volunteer thing</li>
<li>Not for credit, not for networking</li>
<li>The idea: reliability as a form of love</li>
<li>What happens to a community when these people leave or burn out</li>
</ul>
<p><strong>The risk:</strong> This could get saccharine fast. Keep it honest.</p>

<hr>

<h2>Vermont Data Privacy Laws</h2>
<p><em>Series: Notes on the Future / The Legislative Ledger crossover</em></p>
<ul>
<li>Vermont passed Age-Appropriate Design Code</li>
<li>New data privacy rules</li>
<li>What does this mean for small businesses here?</li>
<li>Is Vermont becoming a privacy leader or just copying California?</li>
</ul>
<p><strong>Research needed:</strong> Actually read the bills. Talk to someone who has to comply.</p>

<hr>

<p><em>Last updated: January 2026</em></p>`;

const post = {
    title: 'The Stationery Box: Ideas in Progress',
    status: 'draft',
    tags: [{ name: 'meta' }],
    html: html
};

const token = createToken();
const postData = JSON.stringify({ posts: [post] });

const req = https.request({
    hostname: 'www.maconphillips.com',
    path: '/ghost/api/admin/posts/',
    method: 'POST',
    headers: {
        'Authorization': `Ghost ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (res.statusCode === 201) {
            console.log('✓ Created: The Stationery Box');
        } else {
            console.error('Error:', res.statusCode, data);
        }
    });
});
req.write(postData);
req.end();
