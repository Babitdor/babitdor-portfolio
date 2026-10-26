'use client';

import { useMemo, useState } from 'react';
import TuiPane from './TuiPane';
import SectionHead from './SectionHead';
import { publishedModels, skillGroups } from '@/content/profile';

/**
 * Skills as one compact block per category rather than one row per skill.
 * The filter selects a group, so the section stays short enough to scan.
 */
export default function Skills() {
  const [filter, setFilter] = useState('ALL');

  const categories = useMemo(
    () => ['ALL', ...skillGroups.map((group) => group.category)],
    [],
  );

  const visible: ReadonlyArray<{ category: string; items: readonly string[] }> =
    filter === 'ALL' ? skillGroups : skillGroups.filter((group) => group.category === filter);
  const total = visible.reduce((n, group) => n + group.items.length, 0);

  return (
    <section id="skills" className="tuiSection" aria-labelledby="skills-title">
      <div className="tuiSection__inner tuiSection__inner--wide">
        <SectionHead
          index="03"
          id="skills-title"
          title="The stack, not the logo wall."
          note="Grouped by the job it does. The filters are real, not a scrolling marquee."
        />

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

          {total === 0 && <div className="tuiLine tuiFaint"># no entries in this category</div>}

          <div className={`tuiSkills${filter === 'ALL' ? '' : ' is-single'}`}>
            {visible.map((group) => (
              <div className="tuiSkillGroup" key={group.category}>
                <div className="tuiSkillGroup__head">
                  <h3 className="tuiSkillGroup__name">{group.category}</h3>
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

          <div className="tuiOutput">
            <span className="tuiLine tuiFaint">$ ollama list --mine</span>
            <div className="tuiManifest">
              {publishedModels.map((model) => (
                <div className="tuiManifest__row" key={model.name}>
                  <span className="tuiManifest__name">{model.name}</span>
                  <span className="tuiManifest__meta">{model.pulls} pulls</span>
                  <span className="tuiManifest__meta">{model.note}</span>
                </div>
              ))}
            </div>
            <p className="tuiLine tuiFaint tuiSmall">
              published on Ollama and Hugging Face · checkable at ollama.com/Babitdor
            </p>
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
