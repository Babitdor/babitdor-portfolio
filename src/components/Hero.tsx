'use client';

import TuiPane from './TuiPane';
import AsciiDonut from './AsciiDonut';
import { scrollToSectionId } from '@/lib/scroll';
import { identity, focusAreas, positioning } from '@/content/profile';

export default function Hero() {
  return (
    <section id="home" className="tuiSection tuiSection--hero" aria-labelledby="hero-title">
      <div className="tuiSection__inner tuiHeroGrid">
        <TuiPane
          title="babit@portfolio: ~"
          status="production"
          command="whoami"
          className="tuiHeroPane"
        >
          <p className="tuiHero__eyebrow">
            <span className="tuiDot" aria-hidden="true" />
            AI engineer at Siemens · {identity.location}
          </p>

          <h1 className="tuiHero__name" id="hero-title">
            <span className="tuiHero__firstName">Babitdor</span>
            <span className="tuiHero__lastName">Kayang Khonglah</span>
          </h1>

          <p className="tuiHero__role">{positioning.line}</p>

          <dl className="tuiHero__readout">
            <div>
              <dt>now</dt>
              <dd>AI engineer @ Siemens · M.Sc. AI @ FAU</dd>
            </div>
            <div>
              <dt>focus</dt>
              <dd>{focusAreas.join(' · ')}</dd>
            </div>
            <div>
              <dt>open</dt>
              <dd>research collaborations · hard agent problems</dd>
            </div>
          </dl>

          <div className="tuiHero__actions">
            <a
              href="#projects"
              className="tuiBtn"
              onClick={(event) => {
                event.preventDefault();
                scrollToSectionId('projects');
              }}
            >
              view selected work
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="tuiBtn tuiBtn--ghost"
              onClick={(event) => {
                event.preventDefault();
                scrollToSectionId('contact');
              }}
            >
              start a conversation
            </a>
          </div>
        </TuiPane>

        <figure className="tuiHeroArt">
          <div className="tuiHeroArt__stage">
            <AsciiDonut />
          </div>
          <figcaption className="tuiHeroArt__cap">
            <span>
              <span className="tuiKey">$</span> ./torus --ascii --idle
            </span>
            <span className="tuiHeroArt__hint">drag to spin</span>
          </figcaption>
        </figure>
      </div>

      <a
        href="#about"
        className="tuiHero__scroll"
        onClick={(event) => {
          event.preventDefault();
          scrollToSectionId('about');
        }}
      >
        <span aria-hidden="true">↓</span> scroll --continue
      </a>
    </section>
  );
}
