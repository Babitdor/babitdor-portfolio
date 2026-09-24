'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { STAGE_IDS, STAGE_LABELS, scrollToSectionId, type StageId } from '@/lib/scroll';

const currentYear = new Date().getFullYear();

const socialLinks = [
  { icon: faGithub, href: 'https://github.com/Babitdor', label: 'GitHub' },
  {
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/',
    label: 'LinkedIn',
  },
];

export default function Footer() {
  return (
    <footer className="tuiFooter">
      <div className="tuiFooter__inner">
        <span>
          <span className="tuiMode">-- INSERT --</span>{' '}
          <span className="tuiFaint">
            babit-os · © {currentYear} Babitdor Kayang Khonglah
          </span>
        </span>

        <span className="tuiFaint" aria-hidden="true">
          press <span className="tuiKey">ctrl/cmd + k</span>
        </span>

        <div className="tuiFooter__links">
          {STAGE_IDS.map((id, index) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToSectionId(id);
              }}
            >
              {index + 1}:{STAGE_LABELS[id as StageId].toLowerCase()}
            </a>
          ))}

          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
