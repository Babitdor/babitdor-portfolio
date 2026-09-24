'use client';

import { useState } from 'react';
import TuiPane from './TuiPane';
import { projects } from '@/content/projects';

export default function Projects() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="projects" className="tuiSection">
      <div className="tuiSection__inner tuiSection__inner--wide">
        <TuiPane title="~/projects/" status={`${projects.length} entries`} command="ls ~/projects/">
          <div className="tuiProjects">
            {projects.map((project, index) => {
              const isOpen = open === index;
              return (
                <article className="tuiProject" key={project.title}>
                  <button
                    type="button"
                    className="tuiProject__head"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span className="tuiProject__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="tuiProject__title">{project.title}</span>
                    <span className="tuiProject__toggle" aria-hidden="true">
                      {isOpen ? '[-]' : '[+]'}
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="tuiProject__body">
                      <p className="tuiProject__blurb">{project.blurb}</p>
                      <p className="tuiProject__desc">{project.detail}</p>

                      <div className="tuiTagRow">
                        {project.tags.map((tag) => (
                          <span className="tuiChip" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="tuiProject__links">
                        {project.link ? (
                          <a
                            className="tuiBtn tuiBtn--ghost"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            [ source ↗ ]
                          </a>
                        ) : null}
                        {project.stat ? (
                          <span className="tuiProject__stat">{project.stat}</span>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
