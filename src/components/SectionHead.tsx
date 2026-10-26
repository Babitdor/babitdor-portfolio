type SectionHeadProps = {
  index: string;
  title: string;
  note?: string;
  id?: string;
};

/**
 * The line that separates one section from the next. The number is real: the
 * page is a sequence of five sections and the top bar uses the same count.
 * The heading is a statement, not a label, so the page has a point of view
 * before the terminal chrome starts.
 */
export default function SectionHead({ index, title, note, id }: SectionHeadProps) {
  return (
    <header className="tuiSectionHead">
      <span className="tuiSectionHead__index" aria-hidden="true">
        {index}
      </span>
      <div className="tuiSectionHead__body">
        <h2 className="tuiSectionHead__title" id={id}>
          {title}
        </h2>
        {note ? <p className="tuiSectionHead__note">{note}</p> : null}
      </div>
    </header>
  );
}
