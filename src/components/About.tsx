'use client';

import TuiPane from './TuiPane';
import { certifications, education, experience, stats } from '@/content/profile';
import { PORTRAIT_COLS, portraitArt } from '@/content/portrait';

const meter = (filled: number) => '█'.repeat(filled) + '░'.repeat(10 - filled);

/**
 * About, with an ASCII portrait beside the prose.
 *
 * The portrait is a static string, not a live effect: it is generated once by
 * `scripts/generate-portrait.mjs` and committed, so it costs one text run rather
 * than a JPEG decode plus image processing on the main thread.
 *
 * It is `aria-hidden`. A 136x76 character grid is 10,000 characters of noise to a
 * screen reader, and the portrait carries no information the prose does not
 * already state, so the caption is the readable part.
 *
 * Sizing note: the grid is designed square (136x76 cells at ~0.6em advance, with
 * `line-height` 1.073, maps to a square). The CSS derives the font size from the
 * container width so the art always fits exactly, rather than picking a size and
 * hoping. See `.tuiPortrait` in globals.css.
 */
export default function About() {
  return (
    <section id="about" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="~/about.md" status="read-only" command="cat about.md">
          <div className="tuiAbout">
            <figure className="tuiPortrait">
              <pre
                className="tuiPortrait__art"
                aria-hidden="true"
                style={{ '--portrait-cols': PORTRAIT_COLS } as React.CSSProperties}
              >
                {portraitArt}
              </pre>
              <figcaption className="tuiPortrait__cap">
                <span className="tuiKey">$</span> whoami --portrait
              </figcaption>
            </figure>

            <div className="tuiAbout__prose">
              <div className="tuiOutput" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
                <p className="tuiLine tuiMuted">
                  I&apos;m an AI engineer working on{' '}
                  <span className="tuiStrong">production agent systems</span>. By day I build AI
                  agents at <span className="tuiStrong">Siemens Digital Industries Software</span>,
                  where the interesting part is everything the demo never shows you: latency, token
                  budgets, failing retries, and retrieval that quietly returns the wrong thing.
                </p>
                <p className="tuiLine tuiMuted">
                  Alongside that I&apos;m finishing an{' '}
                  <span className="tuiStrong">M.Sc. in Artificial Intelligence</span> at FAU
                  Erlangen-Nürnberg, with a research affiliation at{' '}
                  <span className="tuiStrong">Institute FAPS</span>. My focus is{' '}
                  <span className="tuiStrong">Model-Based Systems Engineering</span> — using
                  fine-tuned LLMs and multi-agent workflows to generate and validate SysML v2 models
                  — plus the harnesses and tooling that make agents usable in practice.
                </p>
              </div>

              <div className="tuiOutput">
                <span className="tuiLine tuiFaint">$ stats --verbose</span>
                <div className="tuiStats">
                  {stats.map((stat, index) => (
                    <div className="tuiStat" key={stat.label}>
                      <div className="tuiStat__num">{stat.value}</div>
                      <div className="tuiStat__label">{stat.label}</div>
                      <div className="tuiMeter" aria-hidden="true">
                        {meter(4 + index * 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ experience --list</span>
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
          </div>

          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ edu --list</span>
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
          </div>

          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ certs --verify</span>
            <div className="tuiEdu">
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
