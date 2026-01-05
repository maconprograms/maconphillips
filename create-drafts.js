const crypto = require('crypto');
const https = require('https');

// Ghost Admin API credentials
const API_URL = 'https://www.maconphillips.com';
const ADMIN_API_KEY = '695a15c0ef7ae40001236c33:4f5492a212848562610425339f72d60cff56c9109b0242cc31e9274f45f24e2f';

// Parse the API key
const [id, secret] = ADMIN_API_KEY.split(':');

// Create JWT token
function createToken() {
    const iat = Math.floor(Date.now() / 1000);
    const header = { alg: 'HS256', typ: 'JWT', kid: id };
    const payload = { iat, exp: iat + 300, aud: '/admin/' };

    const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');

    const signature = crypto
        .createHmac('sha256', Buffer.from(secret, 'hex'))
        .update(`${headerB64}.${payloadB64}`)
        .digest('base64url');

    return `${headerB64}.${payloadB64}.${signature}`;
}

// Create a post via Ghost Admin API
async function createPost(post) {
    const token = createToken();

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ posts: [post] });

        const options = {
            hostname: 'www.maconphillips.com',
            path: '/ghost/api/admin/posts/',
            method: 'POST',
            headers: {
                'Authorization': `Ghost ${token}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    const result = JSON.parse(data);
                    resolve(result.posts[0]);
                } else {
                    reject(new Error(`Status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Sample posts data
const posts = [
    // POSTCARDS
    {
        title: "The Mad River at 5 AM",
        status: "draft",
        tags: [{ name: "warren" }, { name: "life" }, { name: "Dispatch from Warren" }],
        html: `<p>There's a frequency to moving water that no speaker can reproduce. I stood on the bank this morning in the half-light, listening to what my grandfather would have simply called "the river." No algorithm selected this moment. No notification interrupted it.</p>
<p>The sound is layered—the main current's steady voice, the tenor of water finding stone, the occasional bass note of something deeper shifting. I spent years in rooms designed to eliminate ambient noise, optimizing signal. Now I wake early to hear what happens when nothing is optimized at all.</p>
<p>The river doesn't know it's supposed to compete for my attention. It just runs.</p>
<p><em>Visual: Pre-dawn shot of the Mad River, mist rising from the water's surface. Long exposure creates a soft, dreamlike quality.</em></p>`
    },
    {
        title: "The Covered Bridge in Mud Season",
        status: "draft",
        tags: [{ name: "warren" }, { name: "life" }, { name: "Dispatch from Warren" }],
        html: `<p>Nobody photographs covered bridges in mud season. The romance requires snow or autumn leaves. But I've come to prefer this version—the one that reveals the steel cables beneath the wooden skin, the concrete abutments that replaced rotting timber in 1973, the sand spread by the road crew last Tuesday.</p>
<p>There's a meeting every spring where someone argues about paint colors and someone else defends the maintenance budget. The bridge exists because generations decided, again and again, that it should. Not because it's beautiful. Because it's theirs.</p>
<p>Infrastructure is just another word for promises we make to strangers we'll never meet.</p>
<p><em>Visual: The Warren Covered Bridge in late March, weathered red boards against gray sky. Muddy ruts, sand spread on approaches. Honest rather than romantic.</em></p>`
    },
    {
        title: "Morning Light at the General Store",
        status: "draft",
        tags: [{ name: "warren" }, { name: "life" }, { name: "Dispatch from Warren" }],
        html: `<p>The Warren Store opens at seven. By seven-fifteen, the same four trucks are in the lot. This is where you learn that the selectboard is considering a noise ordinance, that the Brennans' daughter got into UVM, that someone's been letting their dog run loose on the Plunkton Road again.</p>
<p>No moderator. No terms of service. Just people who'll see each other tomorrow and the day after, which turns out to be the most effective content policy ever designed.</p>
<p>I once helped build platforms meant to connect millions. Here, democracy fits around a coffee station, and the accountability is knowing that your neighbor remembers what you said last March.</p>
<p><em>Visual: Interior of the Warren Store in early morning, warm light streaming through east-facing windows. Steam rising from cups. A bulletin board layered with notices.</em></p>`
    },
    // LETTERS
    {
        title: "What Good Looks Like",
        status: "draft",
        tags: [{ name: "ai" }, { name: "tech" }, { name: "Notes on the Future" }],
        html: `<p>I have spent more hours than I care to admit watching language models hallucinate with confidence. They will tell you that a meeting is scheduled for "next Thursday at 3pm" when no such meeting exists, and they will do so with the same serene certainty as when they correctly summarize a complex policy brief. This is the central problem of our current moment with artificial intelligence: the machine has no inherent concept of "good."</p>
<p>Enter Pydantic AI and the broader movement toward structured outputs—and suddenly we have something resembling craft.</p>
<p>For those unfamiliar, Pydantic is a Python library that enforces data validation through type hints. When applied to AI outputs, it means the model must return information that conforms to a predefined schema. If you ask for a date, you get a properly formatted date or you get an error. If you request a list of three items, you receive exactly three items. The model cannot simply gesture at correctness; it must achieve it.</p>
<p>This may sound like plumbing—the kind of technical detail that matters only to engineers. But I would argue it represents something philosophically significant: the return of the potter's stamp.</p>
<p>In ancient pottery, artisans would mark their work with a personal seal. This was not vanity; it was accountability. The stamp said: I made this, and I stand behind its construction. If the vessel leaks, you know whom to ask. The structured output is the digital equivalent. It declares: this information conforms to an agreed-upon shape, and if it does not, the system itself will refuse to proceed.</p>
<p>What strikes me most about working with validated AI outputs is how it changes the nature of trust. Without validation, every response requires human verification. The machine becomes a research assistant whose work must be checked line by line. With validation, we can begin to build systems where certain categories of error become structurally impossible. Not because the AI has become more intelligent, but because we have become more precise about what we will accept.</p>
<p>This is, I think, the actual path toward "good" AI—not through ever-larger models or more sophisticated training, but through ever-clearer contracts between human intention and machine execution. The schema is a form of communication. It says to the model: here is what I need, in exactly this shape, with exactly these constraints. And the validation layer says: I will verify that you have listened.</p>
<p>There is a deeper lesson here about systems design generally. The best systems are not the ones that try to be infinitely flexible. They are the ones that understand their boundaries and enforce them gracefully. A well-designed form is easier to fill out than a blank page. A well-defined API is easier to integrate than an undocumented one. Constraints, properly applied, are a form of kindness.</p>
<p>We are still in the early days of learning how to work with these new tools. But I am increasingly convinced that the practitioners who will build things that last are not those chasing the most powerful models. They are the ones thinking most carefully about validation—about what "good" actually looks like, and how to encode that definition into the system itself.</p>
<p>The potter's stamp endures because it represents a promise kept.</p>
<p><em>On the importance of predictable machines.</em></p>`
    },
    {
        title: "Music for Airports, 48 Years Later",
        status: "draft",
        tags: [{ name: "music" }, { name: "brian-eno" }, { name: "The Liner Notes" }],
        html: `<p>Brian Eno released "Ambient 1: Music for Airports" in 1978, and in doing so, he solved a problem most people didn't know they had. The album was designed, quite literally, to be ignored—and this was its genius.</p>
<p>Eno wrote in the liner notes that ambient music "must be able to accommodate many levels of listening attention without enforcing one in particular." It should be as ignorable as it is interesting. This was a radical proposition in an era when music demanded your attention through hooks, crescendos, and the implicit contract that you would sit down and listen properly.</p>
<p>Forty-eight years later, I find myself returning to this album with something approaching reverence. Not because it sounds fresh—though it does—but because the world has finally caught up to the problem Eno was solving.</p>
<p>We live now in an environment of infinite demand. Every application wants your attention. Every notification insists on its own urgency. The average person encounters more designed experiences before breakfast than a medieval peasant encountered in a lifetime. Our attention has become the scarcest resource in the economy, and everyone is drilling for it.</p>
<p>In this context, Music for Airports feels less like an aesthetic choice and more like a survival strategy. Here is sound that does not demand. Here is atmosphere that rewards attention but does not require it. You can work through it, think through it, simply exist within it. The music creates space rather than consuming it.</p>
<p>I have been thinking about this concept—intentional space—as I consider what this site should be. The dominant mode of online writing is the hot take: immediate, urgent, designed to provoke engagement metrics. Every platform rewards the content that captures attention most aggressively. The result is an internet that feels like an airport that plays only advertisements.</p>
<p>But what if a website could function more like Eno's album? What if the design philosophy prioritized presence over engagement, residence over clicks? A digital space you might visit not because it demands your attention but because it offers something quieter: room to think.</p>
<p>This is not, I should note, the same as being boring. Music for Airports is endlessly interesting if you choose to listen closely. The piano phrases emerge and recede. The tape loops create patterns that almost repeat but never quite resolve. There is tremendous craft in the construction of something that can be simultaneously foreground and background.</p>
<p>The same principle applies to writing, I think. The goal is not to shout but to resonate. To create something that rewards attention without demanding it. Something you might return to not because it went viral but because it stayed with you.</p>
<p>Eno was solving for the anxiety of travel in 1978. Perhaps we can learn from his methods as we navigate the anxiety of information in 2026. The answer is not silence—it is intentional sound. Not emptiness—but space.</p>
<p>This site aspires to be music for airports: something you might play in the background of your day, and find yourself listening to closely.</p>
<p><em>On the gift of ambient presence.</em></p>`
    },
    {
        title: "The New Energy in the Room",
        status: "draft",
        tags: [{ name: "vermont" }, { name: "politics" }, { name: "The Exemplars" }],
        html: `<p>I want to write about something I have witnessed in Vermont over the past several months, and I want to be careful about how I frame it. This is not an endorsement in the political sense. It is an appreciation of a particular kind of civic energy that I think deserves naming.</p>
<p>The Vermont Democratic Party recently elected new leadership, and what has followed is instructive. Not because of any particular policy position or political strategy, but because of something simpler: visible, tangible community action.</p>
<p>I first noticed it with the food drive. Not a press release about a food drive—an actual, physical collection of food, organized and executed with the kind of efficiency that suggests someone actually cares whether hungry families receive groceries. This is not nothing. In an era when political parties often function primarily as fundraising operations and messaging vehicles, the decision to direct organizational energy toward feeding neighbors represents a choice about what politics is for.</p>
<p>Then there is the radio presence. Not the polished, message-tested media appearance, but the ongoing show—the regular practice of showing up and talking with people about what matters to them. This is old-fashioned in the best sense. It assumes that political leadership means being present, not just visible. That conversation is a practice, not a performance.</p>
<p>I am calling this quality "civic vitality," and I think it matters independent of partisan affiliation. It is the difference between a political leader who functions as a brand and one who functions as a neighbor. Between someone who represents a constituency and someone who is visibly, physically embedded in a community.</p>
<p>We have suffered, I think, from a long period in which politics became increasingly abstract. Candidates existed primarily as television images and social media accounts. Parties functioned as national entities that occasionally acknowledged their local chapters. The actual work of democracy—the showing up, the organizing, the feeding of neighbors—became someone else's job.</p>
<p>What I appreciate about the new energy in Vermont's Democratic leadership is its stubborn locality. Yes, national politics matter. Yes, messaging and strategy are important. But politics divorced from tangible community benefit is ultimately hollow. It becomes a team sport where the only outcome is winning, and winning means nothing beyond itself.</p>
<p>The food drive is the counter-argument. It says: we are here, in this place, doing this work, for these specific people. The radio show says: we will keep showing up, keep talking, keep listening. This is politics as practice rather than performance.</p>
<p>I do not know what the long-term political implications of this approach might be. Perhaps it builds the kind of durable coalition that wins elections. Perhaps it simply represents a different philosophy of what political parties should do with their time and energy. Either way, I find it worth appreciating publicly.</p>
<p>So: thank you. Not for any particular policy position, but for the reminder that civic vitality is possible. That political leadership can mean being a neighbor first and a brand second. That the work of democracy includes, and perhaps begins with, making sure people have enough to eat.</p>
<p>This is what representation looks like when it remembers what it is representing.</p>
<p><em>On the practice of showing up.</em></p>`
    },
    {
        title: "Defining Home: The Vermont Homestead",
        status: "draft",
        tags: [{ name: "vermont" }, { name: "policy" }, { name: "The Legislative Ledger" }],
        html: `<p>When you buy a house in Vermont, you don't automatically live in a "home" as far as the state is concerned. You live in "property." To transform that property into a homestead—and to unlock a different tax rate—you need to declare it. Every single year.</p>
<p>Welcome to Vermont, where "home" is a civic status you must actively claim.</p>
<p>Here's what's happening: Every April, Vermont homeowners file something called a Homestead Declaration. It's Form HS-122, and it does something both bureaucratic and philosophically interesting—it tells the state that this particular piece of property is where you actually live. Your domicile. The place you return to.</p>
<p>Why does this matter for your wallet? Because Vermont taxes homestead and non-homestead properties at different rates for education funding. For fiscal year 2026, the non-homestead rate is $1.703 per $100 of assessed value. Homestead rates vary by town based on local school spending, but the distinction is fundamental: if you don't file the declaration, your property defaults to non-homestead status. You could end up paying significantly more in taxes simply because you didn't fill out a form.</p>
<p>The deadline is April 15th—same as your income taxes—and it must be filed every year, even if nothing about your situation has changed. Miss it, and you can still file through October 15th, but late filers may face penalties and will have already received a tax bill calculated at the higher rate.</p>
<p>But here's where it gets interesting, and why I think this system is worth understanding beyond its practical implications.</p>
<p>The Homestead Declaration ties your property to Vermont's education system. When you declare your homestead, you're not just claiming a tax status—you're entering into the state's social contract around schooling. Your property taxes fund public education, and the homestead system was designed, through the landmark 1997 Brigham decision and subsequent Act 60, to ensure that a child's educational opportunity isn't determined by whether they happen to live in a wealthy town or a poor one.</p>
<p>In most states, property taxes are simply property taxes. In Vermont, homestead property taxes are education property taxes, pooled statewide and redistributed according to a funding formula. Your home becomes part of a collective commitment to Vermont's children.</p>
<p>This creates a peculiar intimacy. Filing Form HS-122 isn't just paperwork—it's an annual renewal of your membership in a community that has decided, constitutionally, that education is a common benefit requiring shared responsibility.</p>
<p>For those who qualify based on household income (currently up to $115,400), the homestead declaration also opens the door to the Property Tax Credit, which can further reduce your burden. Vermont is nearly unique in "income-sensitizing" property taxes this way—around two-thirds of homeowners pay education taxes based on their income rather than purely on their property's assessed value.</p>
<p>So when a new neighbor asks you about the homestead thing, you can tell them: it's a form, yes. File it every April. But it's also a small annual act that says, "I live here. This is my home. I'm part of this."</p>
<p>In Vermont, home is something you choose to declare.</p>
<p><em>Domicile is the first word of belonging.</em></p>`
    },
    {
        title: "The Gravity of the Grand List",
        status: "draft",
        tags: [{ name: "vermont" }, { name: "policy" }, { name: "The Legislative Ledger" }],
        html: `<p>The term itself is old—"Grand List"—dating to 1778, when Vermont's earliest tax assessors were literally charged with "listing" all property in the state. Nearly 250 years later, that list still determines what you owe on your home, and this year, the numbers are causing pain.</p>
<p>Property taxes are the most intimate tax we pay. They attach to shelter itself—to the place where you sleep, where your children grow, where you grow old if you're lucky. You can avoid sales tax by buying less. You can reduce income tax by earning less. But property tax comes due whether or not you have the cash, simply because you exist in a place you own.</p>
<p>In Vermont, this already-personal tax carries an additional weight: it funds public education. The Grand List—that colonial-era compilation of every property's assessed value in every town—forms the basis for calculating what each Vermonter contributes to schools. When your town's listers assess your home at a higher value, you pay more. When your school district increases spending, you pay more. When statewide education costs rise, you pay more.</p>
<p>And this year, Vermonters are paying considerably more.</p>
<p>Projections for the 2026-2027 tax year show an average property tax increase around 12%. About half of that comes from increased school spending; the other half from the absence of roughly $100 million in one-time funds that artificially held rates down last year. The non-homestead rate has jumped to $1.703 per $100 of assessed value, up from $1.391.</p>
<p>But here's what makes Vermont's property tax system genuinely unusual, and worth understanding: it was designed to be progressive.</p>
<p>Following the 1997 Vermont Supreme Court ruling in Brigham v. State—which found that tying educational quality to local property wealth violated the state constitution's "common benefits clause"—the legislature created a statewide education funding system. Act 60 didn't just pool property tax revenue; it income-sensitized the property tax itself. Currently, around 65-70% of Vermont homeowners pay education taxes based on their household income rather than purely on their property's assessed value.</p>
<p>This is remarkable. In most of America, property taxes are flatly regressive—a retired teacher in a modest home she bought in 1975, now assessed at $400,000, pays the same rate as a tech executive who just bought the mansion next door. Vermont said: that's not how we want to do it. Your ability to pay should matter.</p>
<p>The current reform debates threaten this principle. Proposed changes would replace income sensitivity with a homestead exemption—exempting a portion of your home's value from taxation, with income limiting how much discount you receive. Critics argue this would shift burden toward lower and middle-income Vermonters. The design details matter enormously, and they're being negotiated right now in Montpelier.</p>
<p>Meanwhile, Act 73, passed in 2025, sets the stage for more fundamental changes: a uniform statewide education property tax rate beginning in 2028, new regional assessment districts to ensure fair property valuations across towns, and a foundation funding formula that phases in over five years.</p>
<p>The deeper question beneath all these policy mechanics: Does the Vermont Dream remain affordable?</p>
<p>We've built something unusual here—a state that tries to make property ownership compatible with economic diversity, that refuses to let education quality map onto wealth geography. But when property taxes rise 12% in a year, when young families calculate whether they can afford to stay, when elders on fixed incomes face impossible choices—the dream frays.</p>
<p>The Grand List is gravity. It pulls everything toward a reckoning with what we've built and what we can sustain.</p>
<p><em>Every list is a ledger of commitments.</em></p>`
    }
];

// Main function
async function main() {
    console.log('Creating draft posts in Ghost...\n');

    for (const post of posts) {
        try {
            const result = await createPost(post);
            console.log(`✓ Created: "${result.title}"`);
        } catch (err) {
            console.error(`✗ Failed: "${post.title}" - ${err.message}`);
        }
    }

    console.log('\nDone! Check Ghost Admin > Posts > Drafts');
}

main();
