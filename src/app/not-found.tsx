import Link from 'next/link';
import TuiPane from '@/components/TuiPane';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="tuiNotFound" aria-labelledby="notfound-title">
      <div className="tuiNotFound__inner">
        <TuiPane title="~/404" status="no such file" command="cat ~/404">
          <p className="tuiNotFound__code" aria-hidden="true">
            404
          </p>
          <h1 className="tuiNotFound__title" id="notfound-title">
            This route never existed.
          </h1>
          <p className="tuiNotFound__copy">
            The file you asked for is not in the index. The work is still where you left
            it, and every case file is one click away.
          </p>
          <div className="tuiNotFound__links">
            <Link className="tuiBtn" href="/">
              return home <span aria-hidden="true">→</span>
            </Link>
            <Link className="tuiBtn tuiBtn--ghost" href="/#projects">
              open case files
            </Link>
          </div>
          <p className="tuiNotFound__hint">
            <span className="tuiKey">$</span> exit 1 · try <span className="tuiValue">cd ~</span>
          </p>
        </TuiPane>
      </div>
    </section>
  );
}
