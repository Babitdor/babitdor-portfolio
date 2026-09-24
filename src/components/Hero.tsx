'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import TuiPane from './TuiPane';
import { scrollToSectionId } from '@/lib/scroll';

const socials = [
  { icon: faGithub, href: 'https://github.com/Babitdor', label: 'github.com/Babitdor' },
  {
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/',
    label: 'linkedin.com/in/babitdor',
  },
  { icon: faEnvelope, href: 'mailto:babitdorbryan14@gmail.com', label: 'babitdorbryan14@gmail.com' },
];

export default function Hero() {
  return (
    <section id="home" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="babit@portfolio: ~" status="bash" command="whoami">
          <div className="tuiHero__badge">
            <span className="tuiDot" aria-hidden="true" />
            status: available for work
          </div>

          <h1 className="tuiHero__name">Babitdor Kayang Khonglah</h1>

          <p className="tuiHero__role">
            AI / ML engineer — LLM orchestration, RAG architectures, multi-agent systems.
          </p>

          <div className="tuiOutput">
            <span className="tuiLine">
              <span className="tuiKey">location</span> <span className="tuiFaint">:</span>{' '}
              <span className="tuiValue">Erlangen, Germany</span>
            </span>
            <span className="tuiLine">
              <span className="tuiKey">focus</span> <span className="tuiFaint">:</span>{' '}
              <span className="tuiValue">
                LangGraph · LangChain · RAG · vector databases · Docker
              </span>
            </span>
          </div>

          <div className="tuiHero__actions">
            <button type="button" className="tuiBtn" onClick={() => scrollToSectionId('projects')}>
              ./projects --list
            </button>
            <button
              type="button"
              className="tuiBtn tuiBtn--ghost"
              onClick={() => scrollToSectionId('contact')}
            >
              ./contact
            </button>
          </div>

          <div className="tuiSocials">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={social.icon} aria-hidden="true" /> {social.label}
              </a>
            ))}
          </div>

          <p className="tuiLine tuiFaint" style={{ marginTop: '1.5rem', fontSize: '12px' }}>
            tip: press <span className="tuiKey">ctrl/cmd + k</span> for the command palette — the
            keyboard behind this pane types <span className="tuiStrong">Babit</span> as you scroll.
          </p>
        </TuiPane>
      </div>
    </section>
  );
}
