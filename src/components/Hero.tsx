'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import TuiPane from './TuiPane';
import AsciiDonut from './AsciiDonut';
import { scrollToSectionId } from '@/lib/scroll';
import { identity, focusAreas } from '@/content/profile';

const socials = [
  { icon: faGithub, href: identity.github, label: 'github.com/Babitdor' },
  {
    icon: faLinkedin,
    href: identity.linkedin,
    label: 'linkedin.com/in/babitdor',
  },
  { icon: faEnvelope, href: `mailto:${identity.email}`, label: identity.email },
];

export default function Hero() {
  return (
    <section id="home" className="tuiSection tuiSection--hero">
      <div className="tuiSection__inner tuiHeroGrid">
        <TuiPane title="babit@portfolio: ~" status="bash" command="whoami">
          <div className="tuiHero__badge">
            <span className="tuiDot" aria-hidden="true" />
            AI Engineer @ Siemens Digital Industries Software
          </div>

          <h1 className="tuiHero__name">{identity.name}</h1>

          <p className="tuiHero__role">
            {identity.role} — I build AI agent systems that hold up in production: LLM
            orchestration, RAG architectures and multi-agent workflows.
          </p>

          <div className="tuiOutput">
            <span className="tuiLine">
              <span className="tuiKey">location</span> <span className="tuiFaint">:</span>{' '}
              <span className="tuiValue">{identity.location}</span>
            </span>
            <span className="tuiLine">
              <span className="tuiKey">current</span> <span className="tuiFaint">:</span>{' '}
              <span className="tuiValue">
                M.Sc. AI @ FAU Erlangen-Nürnberg · AI Engineer @ Siemens
              </span>
            </span>
            <span className="tuiLine">
              <span className="tuiKey">focus</span> <span className="tuiFaint">:</span>{' '}
              <span className="tuiValue">{focusAreas.join(' · ')}</span>
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
            tip: press <span className="tuiKey">ctrl/cmd + k</span> for the command palette.
          </p>
        </TuiPane>

        {/* The rendering itself is decorative; the caption is the readable part. */}
        <figure className="tuiHeroArt">
          <AsciiDonut />
          <figcaption className="tuiHeroArt__cap">
            <span className="tuiKey">$</span> ./donut --render=ascii --spin
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
