import Link from 'next/link';
export default function NotFound() {
  return <main id="main" tabIndex={-1} className="wrap closing"><h1>Page not found</h1><p>The page you requested could not be found.</p><div className="inline-links" style={{justifyContent:'center'}}><Link className="button" href="/">Home</Link><a className="button" href="/contact/">Contact</a></div></main>;
}
