'use client';

import TuiPane from './TuiPane';
import { certifications, education, experience, stats } from '@/content/profile';

const meter = (filled: number) => '█'.repeat(filled) + '░'.repeat(10 - filled);

export default function About() {
  return (
    <section id="about" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="~/about.md" status="read-only" command="cat about.md">
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
