'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faCopy,
  faBrain,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import TuiPane from './TuiPane';
import SectionHead from './SectionHead';
import { copyToClipboard } from '@/lib/toast';
import { identity } from '@/content/profile';

const channels = [
  {
    icon: faLinkedin,
    label: 'LINKEDIN',
    value: 'babitdor-kayang-khonglah',
    href: identity.linkedin,
  },
  {
    icon: faSquareGithub,
    label: 'GITHUB',
    value: 'github.com/Babitdor',
    href: identity.github,
  },
  {
    icon: faBrain,
    label: 'HUGGING FACE',
    value: identity.huggingfaceLabel,
    href: identity.huggingface,
  },
  {
    icon: faTerminal,
    label: 'OLLAMA',
    value: identity.ollamaLabel,
    href: identity.ollama,
  },
  {
    icon: faPhone,
    label: 'PHONE',
    value: identity.phone,
    href: `tel:${identity.phone.replace(/[^+\d]/g, '')}`,
  },
];

const year = new Date().getFullYear();

export default function Contact() {
  return (
    <section id="contact" className="tuiSection" aria-labelledby="contact-title">
      <div className="tuiSection__inner">
        <SectionHead
          index="05"
          id="contact-title"
          title="Bring me the hard part."
          note="Open to research collaborations, production agent problems, and conversations about what breaks after the demo."
        />

        <TuiPane title="babit@portfolio" status="open" command="ssh babit@portfolio">
          <p className="tuiContact__intro">
            If you are building an agent that has to survive real users, I want to hear
            about it. Email is the fastest route. Every channel below is live.
          </p>

          <div className="tuiContact__primary">
            <a className="tuiContact__email" href={`mailto:${identity.email}`}>
              <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
              <span>{identity.email}</span>
              <span className="tuiContact__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <button
              type="button"
              className="tuiContact__copy"
              onClick={() => copyToClipboard(identity.email, 'email')}
            >
              <FontAwesomeIcon icon={faCopy} aria-hidden="true" />
              copy
            </button>
          </div>

          <div className="tuiContact__channels">
            {channels.map((channel) => (
              <a
                key={channel.label}
                className="tuiContact__channel"
                href={channel.href}
                target={channel.href.startsWith('tel:') ? undefined : '_blank'}
                rel={channel.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
              >
                <FontAwesomeIcon icon={channel.icon} aria-hidden="true" />
                <span className="tuiContact__channelBody">
                  <span className="tuiContact__label">{channel.label}</span>
                  <span className="tuiContact__value">{channel.value}</span>
                </span>
                <span className="tuiContact__channelArrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>

          <div className="tuiContact__end">
            <span>
              <span className="tuiKey">$</span> exit 0
            </span>
            <span className="tuiFaint">
              babit-os · © {year} Babitdor Kayang Khonglah
            </span>
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
