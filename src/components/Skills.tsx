'use client';

import { useMemo, useState } from 'react';
import TuiPane from './TuiPane';

const skills = [
  { name: 'Python', category: 'LANGUAGE' },
  { name: 'JavaScript', category: 'LANGUAGE' },
  { name: 'TypeScript', category: 'LANGUAGE' },
  { name: 'C++', category: 'LANGUAGE' },
  { name: 'LangGraph', category: 'AI/ML' },
  { name: 'LangChain', category: 'AI/ML' },
  { name: 'CrewAI', category: 'AI/ML' },
  { name: 'RAG', category: 'AI/ML' },
  { name: 'LLM', category: 'AI/ML' },
  { name: 'Docker', category: 'DEVOPS' },
  { name: 'Git', category: 'DEVOPS' },
  { name: 'PostgreSQL', category: 'DATABASE' },
  { name: 'MongoDB', category: 'DATABASE' },
  { name: 'Vector DB', category: 'DATABASE' },
  { name: 'React', category: 'FRONTEND' },
  { name: 'Node.js', category: 'BACKEND' },
];

export default function Skills() {
  const [filter, setFilter] = useState('ALL');

  const categories = useMemo(
    () => ['ALL', ...Array.from(new Set(skills.map((skill) => skill.category)))],
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
                <tr key={skill.name}>
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
        </TuiPane>
      </div>
    </section>
  );
}
