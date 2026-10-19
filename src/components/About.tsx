'use client';

import { useState } from 'react';
import Image from 'next/image';
import TuiPane from './TuiPane';
import { certifications, education, experience, stats } from '@/content/profile';

const meter = (filled: number) => '█'.repeat(filled) + '░'.repeat(10 - filled);

/**
 * About, with a photo portrait beside the prose.
 *
 * The portrait is a real photograph (`Me.jpg`, the subject's own picture),
 * downscaled and compressed to `public/portrait.jpg` for the web. It is a
 * meaningful image, not decoration, so it carries a real `alt` and is not
 * `aria-hidden`; the caption below it is the terminal-flavoured label.
 *
 * It is wrapped in `.tuiPortrait__frame`, which draws the terminal-style
 * border and hosts a shimmer skeleton (`.tuiPortrait__shimmer`) that shows
 * until the image fires `onLoad`. The skeleton occupies the image's box, so
 * the pane does not reflow when the photo arrives.
 *
 * Sizing: `width`/`height` are the asset's true pixel size, so the aspect ratio
 * is fixed and the image cannot shift layout. `.tuiAbout__portrait` sets the
 * displayed width, so no `sizes` attribute is needed.
 */
export default function About() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="about" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="~/about.md" status="read-only" command="cat about.md">
          <div className="tuiAbout">
            <figure className="tuiPortrait">
              <div className="tuiPortrait__frame">
                {!imgLoaded && <div className="tuiPortrait__shimmer" aria-hidden="true" />}
                <Image
                  className="tuiAbout__portrait"
                  src="/portrait.jpg"
                  alt="Portrait of Babitdor Kayang Khonglah"
                  width={900}
                  height={966}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
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
