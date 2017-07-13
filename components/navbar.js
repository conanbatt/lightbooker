import Link from 'next/link';

export default ()=> (
  <nav className="navbar navbar-default navbar-static-top bg-brand-dark-green">
    <style jsx>{`
      .bg-brand-dark-green {
          background: #009547;
          color: white;
      }
      .navbar-brand {
        color: white;
      }
    `}</style>
    <div className="container">
      <Link prefetch href="/"><a className="navbar-brand">
        LightBooker
      </a></Link>
      <ul className="nav navbar-nav">
      </ul>
      <ul className="nav navbar-nav navbar-right">
      </ul>
    </div>
  </nav>
)