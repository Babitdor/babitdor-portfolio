'use client';

import TuiPane from './TuiPane';

const education = [
  {
    degree: 'M.Sc. Artificial Intelligence',
    school: 'Friedrich-Alexander-Universität Erlangen–Nürnberg',
    period: '03/2024 – present',
    place: 'Germany',
  },
  {
    degree: 'B.Tech. Computer Science & Engineering',
    school: 'National Institute of Technology, Meghalaya',
    period: '04/2018 – 04/2022',
    place: 'India',
  },
];

const stats = [
  { number: '5+', label: 'PROJECTS SHIPPED' },
  { number: '3+', label: 'YEARS BUILDING' },
  { number: '10+', label: 'TECHNOLOGIES' },
];

const meter = (filled: number) => '█'.repeat(filled) + '░'.repeat(10 - filled);

export default function About() {
  return (
    <section id="about" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane title="~/about.md" status="read-only" command="cat about.md">
          <div className="tuiOutput" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
            <p className="tuiLine tuiMuted">
              I&apos;m an AI/ML engineer specialising in{' '}
              <span className="tuiStrong">LLM orchestration</span> and{' '}
              <span className="tuiStrong">RAG architectures</span>. Currently pursuing my
              Master&apos;s in Artificial Intelligence at FAU Erlangen-Nürnberg, I build systems
              that put large language models to work on real, structured problems.
            </p>
            <p className="tuiLine tuiMuted">
              My work spans <span className="tuiStrong">multi-agent workflows</span>,{' '}
              <span className="tuiStrong">vector databases</span> and deploying AI services at
              scale — mostly tooling that makes developers faster and takes the tedium out of
              complex pipelines.
            </p>
          </div>

          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ stats --verbose</span>
            <div className="tuiStats">
              {stats.map((stat, index) => (
                <div className="tuiStat" key={stat.label}>
                  <div className="tuiStat__num">{stat.number}</div>
                  <div className="tuiStat__label">{stat.label}</div>
                  <div className="tuiMeter" aria-hidden="true">
                    {meter(4 + index * 3)}
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
        </TuiPane>
      </div>
    </section>
  );
}
