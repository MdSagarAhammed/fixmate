export default function PageHead({ title, text, children }) {
  return (<div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>{text && <p className="text-slate-500">{text}</p>}</div>{children}</div>);
}
