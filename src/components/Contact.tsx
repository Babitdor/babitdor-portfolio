'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faPaperPlane, faBrain, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import TuiPane from './TuiPane';
import { copyToClipboard } from '@/lib/toast';
import { identity } from '@/content/profile';

const contactMethods = [
  {
    icon: faEnvelope,
    label: 'EMAIL',
    value: identity.email,
    href: `mailto:${identity.email}`,
  },
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

export default function Contact() {
  return (
    <section id="contact" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="babit@portfolio" status="connected" command="ssh babit@portfolio">
          <p className="tuiLine tuiMuted">
            <span className="tuiFaint"># </span>
            Open to research collaborations, interesting agent problems, and good conversations
            about what actually breaks in production. Click any channel to copy it.
          </p>

          <div className="tuiOutput">
            <div className="tuiContact">
              {contactMethods.map((method) => (
                <button
                  type="button"
                  className="tuiContact__row"
                  key={method.label}
                  onClick={() => copyToClipboard(method.value, method.label.toLowerCase())}
                >
                  <FontAwesomeIcon icon={method.icon} className="tuiContact__icon" aria-hidden="true" />
                  <span>
                    <span className="tuiContact__label">{method.label}</span>
                    <span className="tuiContact__value">{method.value}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="tuiHero__actions">
            <a className="tuiBtn" href={`mailto:${identity.email}`}>
              <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
              mail --compose
            </a>
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
