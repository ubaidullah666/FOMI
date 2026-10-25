'use client';

import { useState } from 'react';
import {
  Archive,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Command,
  Download,
  Folder,
  Grid2X2,
  Image as ImageIcon,
  LayoutGrid,
  Moon,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  SlidersHorizontal,
  Star,
  Sun,
  WandSparkles,
  X,
  Zap
} from 'lucide-react';
import styles from './page.module.css';

const history = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=180&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=180&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=180&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=180&q=80',
  'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=180&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80'
];

const gallery = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=85'
];

const promptText =
  'A professional portrait photograph of a smiling 31-year-old redheaded woman with warm skin, gently lit by soft ambient framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold jewelry. The image has a light, airy mood with subtle warm shadows and a muted gray and beige tonal range, captured in a modern editorial style with natural directional lighting.';

function Logo() {
  return <div className={styles.logo}>F<span>.</span></div>;
}

function NavIcon({ children, active, label, onClick }) {
  return (
    <button className={`${styles.navIcon} ${active ? styles.navActive : ''}`} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function SelectChip({ children, wide }) {
  return (
    <button className={`${styles.selectChip} ${wide ? styles.wideChip : ''}`}>
      {children}<ChevronDown size={13} strokeWidth={2.5} />
    </button>
  );
}

export default function Home() {
  const [mode, setMode] = useState('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [dark, setDark] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [activeNav, setActiveNav] = useState('Home');
  const [navNotice, setNavNotice] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navInfo = {
    Home: ['Creative home', 'Your latest projects and generation activity.'],
    Images: ['Image library', 'Browse, filter, and organize your generated images.'],
    Videos: ['Video studio', 'Turn still ideas into expressive motion studies.'],
    Edit: ['Creative edit', 'Refine, remix, and direct every visual detail.'],
    Projects: ['Your projects', 'Keep briefs, references, and variations together.']
  };

  const selectNav = (label) => {
    setActiveNav(label);
    setNavNotice(true);
    setProfileOpen(false);
  };

  const generate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ prompt, mode }) });
      await new Promise((resolve) => setTimeout(resolve, 900));
      setPrompt('');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className={`${styles.app} ${dark ? styles.dark : ''}`}>
      <header className={styles.topbar}>
        <Logo />
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <NavIcon label="Home" active={activeNav === 'Home'} onClick={() => selectNav('Home')}><Sparkles size={18} /></NavIcon>
          <NavIcon label="Images" active={activeNav === 'Images'} onClick={() => selectNav('Images')}><ImageIcon size={18} /></NavIcon>
          <NavIcon label="Videos" active={activeNav === 'Videos'} onClick={() => selectNav('Videos')}><Play size={18} /></NavIcon>
          <NavIcon label="Edit" active={activeNav === 'Edit'} onClick={() => selectNav('Edit')}><WandSparkles size={18} /></NavIcon>
          <NavIcon label="Projects" active={activeNav === 'Projects'} onClick={() => selectNav('Projects')}><Folder size={18} /></NavIcon>
        </nav>
        {navNotice && <div className={styles.navInfo} key={activeNav}><strong>{navInfo[activeNav][0]}</strong><span>{navInfo[activeNav][1]}</span></div>}
        <div className={styles.topActions}>
          <button className={styles.textAction}><Archive size={14} /> Gallery</button>
          <button className={styles.textAction}><CircleHelp size={14} /> Support</button>
          <button className={styles.iconButton} onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className={`${styles.avatar} ${profileOpen ? styles.avatarOpen : ''}`} onClick={() => setProfileOpen(!profileOpen)} aria-label="Open profile menu" aria-expanded={profileOpen}>AU</button>
          {profileOpen && <div className={styles.profileMenu}>
            <div className={styles.profileHeading}><div className={styles.profileAvatar}>AU</div><div><strong>Alex Ubaid</strong><span>Professional plan</span></div></div>
            <div className={styles.profileDivider} />
            <button><Settings2 size={14} /> Account settings</button>
            <button><Zap size={14} /> 840 credits <span className={styles.menuHint}>Manage</span></button>
            <button><CircleHelp size={14} /> Help center</button>
          </div>}
        </div>
      </header>

      <section className={styles.historyBar}>
        <div className={styles.historyTitle}><span>History</span><small>View all</small></div>
        <div className={styles.historyItems}>
          {history.map((src, index) => <button key={src} className={`${styles.historyItem} ${index === 0 ? styles.historySelected : ''}`} onClick={() => setActiveImage(src)}><img src={src} alt={`Recent creation ${index + 1}`} /></button>)}
        </div>
        <button className={styles.historyArrow} aria-label="Next history items"><ChevronRight size={18} /></button>
      </section>

      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <div className={`${styles.modeSwitch} ${mode === 'video' ? styles.videoMode : ''}`} role="tablist" aria-label="Creation mode">
            <button className={mode === 'image' ? styles.modeActive : ''} onClick={() => setMode('image')} role="tab" aria-selected={mode === 'image'}>Image</button>
            <button className={mode === 'video' ? styles.modeActive : ''} onClick={() => setMode('video')} role="tab" aria-selected={mode === 'video'}>Video</button>
          </div>
          <label className={styles.promptLabel} htmlFor="prompt">Describe your {mode} idea</label>
          <div className={`${styles.promptBox} ${isGenerating ? styles.generating : ''}`}>
            <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={`Describe the ${mode} you want to create...`} rows={6} />
            <div className={styles.promptFooter}>
              <span className={styles.promptHint}><Command size={12} /> Enter to generate</span>
              <button className={styles.generateButton} onClick={generate} disabled={!prompt.trim() || isGenerating}>
                <Sparkles size={15} /> {isGenerating ? 'Creating...' : 'Generate'}
              </button>
            </div>
          </div>
          <div className={styles.chips}>
            <SelectChip># Images <b>4</b></SelectChip><SelectChip>4:5</SelectChip><SelectChip wide>Model: Aurora</SelectChip>
          </div>
          <button className={styles.settingsButton} onClick={() => setShowSettings(!showSettings)}><SlidersHorizontal size={16} /> Advanced <ChevronDown className={showSettings ? styles.rotate : ''} size={15} /></button>
          {showSettings && <div className={styles.advancedPanel}><div><span>Seed</span><span className={styles.muted}>Random</span></div><div><span>Quality</span><span className={styles.muted}>High</span></div><div><span>Guidance</span><span className={styles.muted}>7.5</span></div></div>}
          <button className={styles.settingsButton}><WandSparkles size={16} /> Styles <ChevronDown size={15} /></button>
          <div className={styles.credits}><div><Zap size={14} fill="currentColor" /> <span>840 credits</span></div><button>Upgrade</button></div>
        </aside>

        <section className={styles.canvas}>
          <div className={styles.canvasTop}><div><span className={styles.eyebrow}>Untitled project</span><h1>Portrait explorations</h1></div><div className={styles.canvasTools}><button aria-label="Search"><Search size={17} /></button><button aria-label="Grid view"><LayoutGrid size={17} /></button><button aria-label="More options"><MoreHorizontal size={18} /></button></div></div>
          <div className={styles.projectMeta}><span><Star size={13} fill="currentColor" /> Saved just now</span><span>8 variations</span></div>
          <div className={styles.generationGrid}>
            {gallery.map((src, index) => <button className={styles.artCard} key={src} onClick={() => setActiveImage(src)}><img src={src} alt={`Generated portrait variation ${index + 1}`} loading={index > 3 ? 'lazy' : 'eager'} /><span className={styles.cardOverlay}><Download size={15} /></span></button>)}
          </div>
          <div className={styles.promptCard}><div className={styles.promptCardIcon}><Sparkles size={16} /></div><p>{promptText}</p><button className={styles.modelTag}>Aurora <ChevronDown size={12} /></button></div>
        </section>
      </div>
      {activeImage && <div className={styles.lightbox} role="dialog" aria-label="Preview image" onClick={() => setActiveImage(null)}><button className={styles.closeLightbox} aria-label="Close preview"><X size={20} /></button><img src={activeImage} alt="Expanded generated portrait" onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}
