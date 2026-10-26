import Link from 'next/link';
import TuiPane from './TuiPane';
import SectionHead from './SectionHead';
import { projects } from '@/content/projects';

/**
 * The project index. Each row is a real link to a case file, so the visitor can
 * choose by problem and stack instead of opening an accordion to discover what
 * is inside. The long description lives on the record page.
 */
export default function Projects() {
  return (
    <section id="projects" className="tuiSection" aria-labelledby="projects-title">
      <div className="tuiSection__inner tuiSection__inner--wide">
        <SectionHead
          index="04"
          id="projects-title"
          title="Work that runs."
          note="Eight builds, from a master's thesis to open-source tools. Each one opens its own record."
        />

        <TuiPane
          title="~/work/"
          status={`${projects.length} case files`}
          command="ls -la ~/work/"
        >
          <div className="tuiIndex">
            {projects.map((project, index) => (
              <Link className="tuiIndexRow" href={`/work/${project.slug}`} key={project.slug}>
                <span className="tuiIndexRow__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="tuiIndexRow__body">
                  <span className="tuiIndexRow__title">{project.shortTitle}</span>
                  <span className="tuiIndexRow__blurb">{project.blurb}</span>
                </span>
                <span className="tuiIndexRow__meta">
                  <span className="tuiIndexRow__stat">{project.stat ?? 'case file'}</span>
                  <span className="tuiIndexRow__tags">{project.tags.slice(0, 3).join(' · ')}</span>
                </span>
                <span className="tuiIndexRow__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
