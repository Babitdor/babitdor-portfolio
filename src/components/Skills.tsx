'use client';

import { useMemo, useState } from 'react';
import TuiPane from './TuiPane';
import { publishedModels, skillGroups } from '@/content/profile';

/** Flattened for the table, keeping each item's group for filtering. */
const skills = skillGroups.flatMap((group) =>
  group.items.map((name) => ({ name, category: group.category })),
);

export default function Skills() {
  const [filter, setFilter] = useState('ALL');

  const categories = useMemo(
    () => ['ALL', ...skillGroups.map((group) => group.category)],
    [],
  );

  const visible = filter === 'ALL' ? skills : skills.filter((skill) => skill.category === filter);

  return (
    <section id="skills" className="tuiSection">
      <div className="tuiSection__inner">
        <TuiPane
          title="~/stack/"
          status={`${visible.length} entries`}
          command="ls -la ~/stack/"
        >
          <div className="tuiFilters" role="group" aria-label="Filter skills by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`tuiFilter${filter === category ? ' is-active' : ''}`}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <table className="tuiTable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">category</th>
                <th scope="col">status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((skill, index) => (
                <tr key={`${skill.category}-${skill.name}`}>
                  <td className="tuiTable__num">{String(index + 1).padStart(2, '0')}</td>
                  <td className="tuiValue">{skill.name}</td>
                  <td>
                    <span className="tuiChip">{skill.category}</span>
                  </td>
                  <td>
                    <span className="tuiChip tuiChip--accent">in use</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* The published models are the most concrete thing here: real weights,
              real download counts, checkable on Ollama. */}
          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ ollama list --mine</span>
            <div className="tuiEdu">
              {publishedModels.map((model) => (
                <div className="tuiEdu__row" key={model.name}>
                  <div className="tuiEdu__degree">{model.name}</div>
                  <div className="tuiEdu__meta">
                    {model.pulls} pulls · {model.note} · published on{' '}
                    <span className="tuiValue">Ollama &amp; Hugging Face</span>
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
