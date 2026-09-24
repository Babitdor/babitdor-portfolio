'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import TuiPane from './TuiPane';
import { copyToClipboard } from '@/lib/toast';

const contactMethods = [
  {
    icon: faEnvelope,
    label: 'EMAIL',
    value: 'babitdorbryan14@gmail.com',
    href: 'mailto:babitdorbryan14@gmail.com',
  },
  {
    icon: faPhone,
    label: 'PHONE',
    value: '+49 176 37280448',
    href: 'tel:+4917637280448',
  },
  {
    icon: faLinkedin,
    label: 'LINKEDIN',
    value: 'babitdor-kayang-khonglah',
    href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/',
  },
  {
    icon: faSquareGithub,
    label: 'GITHUB',
    value: 'github.com/Babitdor',
    href: 'https://github.com/Babitdor',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="babit@portfolio" status="connected" command="ssh babit@portfolio">
          <p className="tuiLine tuiMuted">
            <span className="tuiFaint"># </span>
            Always open to new opportunities, research collaborations, or an interesting AI/ML
            problem. Pick a channel below — click to copy.
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
            <a className="tuiBtn" href="mailto:babitdorbryan14@gmail.com">
              <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
              mail --compose
            </a>
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
