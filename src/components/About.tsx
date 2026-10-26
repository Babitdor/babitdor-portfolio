import Image from 'next/image';
import TuiPane from './TuiPane';
import SectionHead from './SectionHead';
import { certifications, education, experience, stats } from '@/content/profile';

/**
 * About, with the portrait beside the short version of the story.
 *
 * The photograph is the subject's own picture. It is a meaningful image, so it
 * carries a real `alt`; the caption is the terminal-flavoured label. The asset
 * has its true aspect ratio on the element, so the pane cannot reflow when the
 * pixels arrive. There is no custom loader: a shimmer over a below-the-fold
 * image is decoration, and the browser's own placeholder is honest.
 */
export default function About() {
  return (
    <section id="about" className="tuiSection" aria-labelledby="about-title">
      <div className="tuiSection__inner">
        <SectionHead
          index="02"
          id="about-title"
          title="The system around the model."
          note="Fewer silent failures, shorter feedback loops, and systems a team can operate."
        />

        <TuiPane title="~/about.md" status="read only" command="cat about.md">
          <div className="tuiAbout">
            <figure className="tuiPortrait">
              <Image
                className="tuiAbout__portrait"
                src="/portrait.jpg"
                alt="Babitdor Kayang Khonglah at his desk"
                width={900}
                height={966}
                sizes="(max-width: 860px) 82vw, 360px"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="tuiPortrait__cap">
                <span className="tuiKey">$</span> whoami --portrait
              </figcaption>
            </figure>

            <div className="tuiAbout__prose">
              <p className="tuiAbout__lead">
                The demo is the easy part. My work sits between a research prototype and a
                system a team can operate: retrieval that returns the right passage, agents
                that fail visibly instead of quietly, and validation that is more than a
                regex.
              </p>
              <p>
                I am an AI engineer at <span className="tuiStrong">Siemens Digital Industries Software</span>{' '}
                and an M.Sc. AI candidate at <span className="tuiStrong">FAU Erlangen-Nürnberg</span>.
                My research affiliation at <span className="tuiStrong">Institute FAPS</span> applies
                fine-tuned LLMs and multi-agent workflows to{' '}
                <span className="tuiStrong">Model-Based Systems Engineering</span>.
              </p>
              <p>
                Most of the job is not the model. It is the harness around it: tool
                boundaries, retrieval, validation, observability, and the decisions that keep
                an agent honest when the happy path stops working.
              </p>

              <div className="tuiOutput">
                <span className="tuiLine tuiFaint">$ stats --verbose</span>
                <div className="tuiStats">
                  {stats.map((stat) => (
                    <div className="tuiStat" key={stat.label}>
                      <div className="tuiStat__num">{stat.value}</div>
                      <div className="tuiStat__label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tuiAbout__ledger">
            <section className="tuiLedger" aria-labelledby="experience-title">
              <h3 className="tuiLedger__title" id="experience-title">
                <span className="tuiFaint">$</span> experience --list
              </h3>
              <div className="tuiEdu">
                {experience.map((item) => (
                  <div className="tuiEdu__row" key={item.org}>
                    <div className="tuiEdu__degree">
                      {item.role} · {item.org}
                    </div>
                    <div className="tuiEdu__meta">
                      {item.detail} ({item.place}, {item.period})
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="tuiLedger" aria-labelledby="education-title">
              <h3 className="tuiLedger__title" id="education-title">
                <span className="tuiFaint">$</span> edu --list
              </h3>
              <div className="tuiEdu">
                {education.map((item) => (
                  <div className="tuiEdu__row" key={item.degree}>
                    <div className="tuiEdu__degree">{item.degree}</div>
                    <div className="tuiEdu__meta">
                      {item.school} · {item.period} · {item.place}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ certs --verify</span>
            <div className="tuiEdu tuiEdu--two">
              {certifications.map((cert) => (
                <div className="tuiEdu__row" key={cert.id}>
                  <div className="tuiEdu__degree">
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      {cert.name}
                    </a>
                  </div>
                  <div className="tuiEdu__meta">
                    {cert.issuer} · {cert.issued} · id <span className="tuiValue">{cert.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
