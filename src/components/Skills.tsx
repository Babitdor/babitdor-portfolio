'use client';

import { useMemo, useState } from 'react';
import TuiPane from './TuiPane';
import { publishedModels, skillGroups } from '@/content/profile';

/**
 * Skills, as one compact block per category rather than one row per skill.
 *
 * The previous version was a 4-column table with a row per skill: 40 rows tall,
 * and every row repeated its own category and a constant "in use" status, so
 * most of the height carried no information. Grouping by category and rendering
 * each group's items as chips keeps the same content in roughly a third of the
 * space, and the filter buttons then select a whole group rather than filtering
 * rows out of a long list.
 */
export default function Skills() {
  const [filter, setFilter] = useState('ALL');

  const categories = useMemo(
    () => ['ALL', ...skillGroups.map((group) => group.category)],
    [],
  );

  /**
   * Annotated deliberately: `skillGroups` is `as const`, so without this the
   * union of readonly tuples defeats `reduce`'s overload resolution.
   */
  const visible: ReadonlyArray<{ category: string; items: readonly string[] }> =
    filter === 'ALL' ? skillGroups : skillGroups.filter((g) => g.category === filter);
  const total = visible.reduce((n, group) => n + group.items.length, 0);

  return (
    <section id="skills" className="tuiSection">
      <div className="tuiSection__inner tuiSection__inner--wide">
        <TuiPane title="~/stack/" status={`${total} entries`} command="ls -la ~/stack/">
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

          {/* Empty state. Unreachable today, because `categories` is derived
              from `skillGroups`, so every filter that can be selected matches at
              least one group. It exists for the case this content is edited
              later and the two stop agreeing: without it, that shows a titled
              pane with nothing under it and reads as a rendering fault. */}
          {total === 0 && (
            <div className="tuiLine tuiFaint"># no entries in this category</div>
          )}

          <div className={`tuiSkills${filter === 'ALL' ? '' : ' is-single'}`}>
            {visible.map((group) => (
              <div className="tuiSkillGroup" key={group.category}>
                <div className="tuiSkillGroup__head">
                  <span className="tuiSkillGroup__name">{group.category}</span>
                  <span className="tuiSkillGroup__count">{group.items.length}</span>
                </div>
                <div className="tuiSkillGroup__items">
                  {group.items.map((item) => (
                    <span className="tuiChip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

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
