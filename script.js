/* ==========================================================================
   Tharunika V.S — Creative Pastel Editorial Portfolio Engine
   Interactive logic for 20-week timeline, phase filters, & animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. ProtoSem 20-Week Dynamic Timeline Data
    const protoSemWeeks = [
        {
            week: 0,
            phase: 1,
            slug: 'week0',
            title: 'A Week of Learning, Connecting & Creating',
            subtitle: 'Breaking the Ice, Teamwork & Launch',
            status: 'completed',
            phaseName: 'Phase 01',
            tag: 'Orientation',
            colorClass: 'card-lavender',
            badgeClass: 'tag-lavender',
            summary: 'Stone Paper Scissors, 16 Personalities, Marshmallow Challenge, Forge Launch with RAI CEO, and YEP founder masterclasses.',
            url: 'week-00.html',
            anchor: '#week0'
        },
        {
            week: 1,
            phase: 1,
            slug: 'week1',
            title: 'Learning Journey',
            subtitle: 'Design Thinking, Power BI & Prospect Theory',
            status: 'completed',
            phaseName: 'Phase 01',
            tag: 'Tech & Strategy',
            colorClass: 'card-blue',
            badgeClass: 'tag-blue',
            summary: 'Tech Talks on Instagram & Power BI, Design Thinking with Dr. Meera, SWOT Analysis, Prospect Theory, Antigravity IDE, Base44 & Guest Lectures.',
            url: 'week-01.html',
            anchor: '#week1'
        },
        {
            week: 2,
            phase: 1,
            slug: 'week2',
            title: 'Emotional Branding, Algorithms & Prototyping',
            subtitle: '5S Methodology, UI Design & MIT App Inventor',
            status: 'completed',
            phaseName: 'Phase 01',
            tag: 'Logic & UI/UX',
            colorClass: 'card-mint',
            badgeClass: 'tag-mint',
            summary: 'Tech talks on Emotional Branding, Chatbots, UI Design & Data Analytics, 5S Japanese methodology, problem identification, algorithms & MIT App Inventor.',
            url: 'week-02.html',
            anchor: '#week2'
        },
        {
            week: 3,
            phase: 1,
            slug: 'week3',
            title: 'Computational Hardware & Sensors to Sales',
            subtitle: 'Tinkercad Circuits & Real PCD Model',
            status: 'completed',
            phaseName: 'Phase 01',
            tag: 'Hardware & IoT',
            colorClass: 'card-yellow',
            badgeClass: 'tag-yellow',
            summary: 'Computational hardware, voltage, diodes & transmitters, hands-on Tinkercad circuit simulation, "From Sensors to Sales" tech talk & Real PCD product lifecycle model.',
            url: 'week-03.html',
            anchor: '#week3'
        },
        {
            week: 4,
            phase: 1,
            slug: 'week4',
            title: 'Arduino UNO, IoT Systems & Hardware Protocols',
            subtitle: 'Lucky Dangle, Chrome Extensions, UART/I2C/SPI & Sensors',
            status: 'completed',
            phaseName: 'Phase 01',
            tag: 'Hardware & IoT',
            colorClass: 'card-peach',
            badgeClass: 'tag-peach',
            summary: 'Computational hardware with Arduino UNO, Lucky Dangle & Chrome extensions, sensors & actuators with UART/I2C/SPI protocols, MPU6050 & SG90 servo motor, and IoT connected systems.',
            url: 'week-04.html',
            anchor: '#week4'
        },
        ...Array.from({ length: 16 }, (_, i) => {
            const w = i + 5;
            const phase = Math.ceil(w / 5);
            const colorClasses = ['card-lavender', 'card-pink', 'card-blue', 'card-mint', 'card-yellow', 'card-peach'];
            const badgeClasses = ['tag-lavender', 'tag-pink', 'tag-blue', 'tag-mint', 'tag-yellow', 'tag-peach'];
            const idx = w % colorClasses.length;
            return {
                week: w,
                phase: phase,
                slug: `week-${w.toString().padStart(2, '0')}`,
                title: `WEEK ${w.toString().padStart(2, '0')}`,
                subtitle: 'UPCOMING MILESTONE',
                status: 'placeholder',
                phaseName: `Phase 0${phase}`,
                tag: 'Scheduled',
                colorClass: colorClasses[idx],
                badgeClass: badgeClasses[idx],
                summary: 'Upcoming retail problem space exploration, prototyping, and industry-validated tech solutions.',
                url: `#week-${w.toString().padStart(2, '0')}`,
                anchor: `#week-${w.toString().padStart(2, '0')}`
            };
        })
    ];

    // 2. Render ProtoSem Dynamic Grid
    const timelineContainer = document.getElementById('protosem-timeline');
    const filterBtns = document.querySelectorAll('.phase-pill-btn');

    if (timelineContainer) {
        function renderCards(filterPhase) {
            timelineContainer.innerHTML = '';
            
            const filtered = filterPhase === 'all' 
                ? protoSemWeeks 
                : protoSemWeeks.filter(w => w.phase == filterPhase);

            filtered.forEach((w, index) => {
                const isEven = index % 2 !== 0;
                const colClass = isEven ? 'md:col-start-2' : 'md:col-start-1 md:text-right';
                const isCompleted = w.status === 'completed';
                
                const dotPosition = isEven 
                    ? 'left-[-32px] md:left-[-41px]' 
                    : 'left-[-32px] md:left-auto md:right-[-41px]';

                const clickAction = isCompleted ? `onclick="location.href='${w.anchor}'"` : '';

                const cardHTML = `
                    <div class="week-card ${colClass} relative group ${isCompleted ? 'cursor-pointer' : 'opacity-90'}" ${clickAction}>
                        <div class="timeline-marker ${dotPosition} ${isCompleted ? '!bg-slate-900 !border-white shadow-sm' : '!bg-white'}"></div>
                        
                        <div class="pastel-card ${w.colorClass} p-6 flex flex-col justify-between transition-all duration-300">
                            <div>
                                <div class="flex items-center justify-between ${isEven ? 'flex-row' : 'md:flex-row-reverse flex-row'} mb-3 gap-2 flex-wrap">
                                    <span class="font-display text-3xl font-extrabold ${isCompleted ? 'text-slate-900' : 'text-slate-400'} group-hover:text-slate-900 transition-colors">
                                        ${w.week.toString().padStart(2, '0')}
                                    </span>
                                    <div class="flex items-center gap-2">
                                        ${isCompleted ? `<span class="skill-tag ${w.badgeClass} !py-1 !px-2.5 !text-xs">✦ Completed</span>` : `<span class="skill-tag !bg-white/80 !py-1 !px-2.5 !text-xs !text-slate-500">Upcoming</span>`}
                                        <span class="text-xs font-bold text-slate-500 bg-white/80 border border-slate-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            ${w.phaseName}
                                        </span>
                                    </div>
                                </div>
                                
                                <h4 class="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-violet-950 transition-colors">
                                    ${isCompleted ? 'Week ' + w.week.toString().padStart(2, '0') + ' — ' + w.title : w.title}
                                </h4>
                                
                                <p class="text-xs font-semibold text-slate-500 mb-2">${w.subtitle}</p>
                            </div>

                            ${isCompleted ? `
                                <div>
                                    <p class="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed ${isEven ? '' : 'md:text-right'}">${w.summary}</p>
                                    <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider ${isEven ? '' : 'md:justify-end'} group-hover:text-violet-800 transition-colors">
                                        <span>Explore Week Logs</span>
                                        <svg class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            ` : `
                                <div class="pt-2 border-t border-slate-300/40 mt-2">
                                    <p class="text-xs text-slate-400 font-medium ${isEven ? '' : 'md:text-right'}">Phase ${w.phase} Milestone Scheduled</p>
                                </div>
                            `}
                        </div>
                    </div>
                `;
                timelineContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

        renderCards('all');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                const targetBtn = e.target.closest('.phase-pill-btn');
                if (targetBtn) {
                    targetBtn.classList.add('active');
                    renderCards(targetBtn.dataset.phase);
                }
            });
        });
    }

    // 3. Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section[id], div[id^="week"]');
    const navLinks = document.querySelectorAll('.editorial-nav-link');

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}` || (currentSectionId === 'about' && href === '#about') || (currentSectionId === 'experience' && (href === '#about' || href === '#experience'))) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // 4. Copy Email Helper & Toast Feedback
    window.copyEmailToClipboard = function(email = 'tharunikasundaresan@gmail.com') {
        navigator.clipboard.writeText(email).then(() => {
            showToast('✨ Email copied to clipboard!');
        }).catch(() => {
            showToast('✉️ ' + email);
        });
    };

    function showToast(message) {
        let toast = document.getElementById('editorial-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'editorial-toast';
            toast.className = 'toast-bubble';
            document.body.appendChild(toast);
        }
        toast.innerHTML = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3200);
    }
});
