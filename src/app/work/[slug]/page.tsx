import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TuiPane from '@/components/TuiPane';
import { getProject, projects } from '@/content/projects';
import { identity } from '@/content/profile';
import { site, siteUrl } from '@/lib/site';

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.blurb,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      url: `/work/${project.slug}`,
      title: `${project.title} · ${site.shortName}`,
      description: project.blurb,
      images: [site.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} · ${site.shortName}`,
      description: project.blurb,
      images: [site.ogImage],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const caseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.detail,
    url: new URL(`/work/${project.slug}`, siteUrl).href,
    author: {
      '@type': 'Person',
      name: identity.name,
      url: siteUrl.href,
    },
    keywords: project.tags.join(', '),
    ...(project.link ? { sameAs: project.link } : {}),
  };

  return (
    <>
      <article className="tuiRecord" aria-labelledby="record-title">
        <div className="tuiRecord__inner">
          <Link className="tuiRecord__back" href="/#projects">
            <span aria-hidden="true">←</span> all case files
          </Link>

          <header className="tuiRecord__head">
            <p className="tuiRecord__context">
              <span className="tuiKey">$</span> cat ~/work/{project.slug}
            </p>
            <h1 className="tuiRecord__title" id="record-title">
              {project.title}
            </h1>
            <p className="tuiRecord__blurb">{project.blurb}</p>
            <ul className="tuiRecord__tags" aria-label="Stack">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </header>

          <div className="tuiRecord__grid">
            <div className="tuiRecord__main">
              <TuiPane
                title={`~/work/${project.slug}.md`}
                status={project.caseStudy.context}
                command="read --case"
              >
                <div className="tuiRecord__blocks">
                  <section className="tuiRecordBlock">
                    <h2 className="tuiRecordBlock__label">
                      <span className="tuiFaint">01</span> the problem
                    </h2>
                    <p>{project.caseStudy.problem}</p>
                  </section>

                  <section className="tuiRecordBlock">
                    <h2 className="tuiRecordBlock__label">
                      <span className="tuiFaint">02</span> the approach
                    </h2>
                    <p>{project.caseStudy.approach}</p>
                  </section>

                  <section className="tuiRecordBlock">
                    <h2 className="tuiRecordBlock__label">
                      <span className="tuiFaint">03</span> the result
                    </h2>
                    <p>{project.caseStudy.result}</p>
                  </section>
                </div>
              </TuiPane>

              <section className="tuiTraceBlock" aria-labelledby="trace-title">
                <div className="tuiTraceBlock__head">
                  <h2 className="tuiTraceBlock__title" id="trace-title">
                    execution trace
                  </h2>
                  <span className="tuiTraceBlock__note">input to artifact</span>
                </div>
                <ol className="tuiTrace">
                  {project.caseStudy.trace.map((step, stepIndex) => (
                    <li className="tuiTrace__step" key={step.label}>
                      <span className="tuiTrace__index" aria-hidden="true">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="tuiTrace__label">{step.label}</span>
                      <span className="tuiTrace__detail">{step.detail}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="tuiRecord__aside" aria-label="Case file facts">
              <section className="tuiRecordSide" aria-labelledby="metrics-title">
                <h2 className="tuiRecordSide__title" id="metrics-title">
                  <span className="tuiFaint">$</span> jq .metrics
                </h2>
                <dl className="tuiMetrics">
                  {project.caseStudy.metrics.map((metric) => (
                    <div className="tuiMetric" key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="tuiRecordSide" aria-labelledby="facts-title">
                <h2 className="tuiRecordSide__title" id="facts-title">
                  <span className="tuiFaint">$</span> status --source
                </h2>
                <dl className="tuiFacts">
                  <div>
                    <dt>context</dt>
                    <dd>{project.caseStudy.context}</dd>
                  </div>
                  <div>
                    <dt>index</dt>
                    <dd>
                      {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </dd>
                  </div>
                  <div>
                    <dt>repo</dt>
                    <dd>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          github.com/Babitdor <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="tuiFaint">not public</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </section>

              <Link className="tuiRecordCta" href="/#contact">
                <span className="tuiRecordCta__label">discuss this work</span>
                <span className="tuiRecordCta__value">start a conversation</span>
                <span className="tuiRecordCta__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </aside>
          </div>

          <nav className="tuiNext" aria-label="Case files">
            <Link className="tuiNext__link" href={`/work/${next.slug}`}>
              <span className="tuiNext__label">next case file</span>
              <span className="tuiNext__title">{next.shortTitle}</span>
              <span className="tuiNext__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </nav>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }}
      />
    </>
  );
}
