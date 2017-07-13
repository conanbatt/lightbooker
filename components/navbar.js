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
      .white_text {
        color: white !important;
      }
    `}</style>
    <div className="container">
      <Link prefetch href="/"><a className="navbar-brand">
        LightBooker
      </a></Link>
      <ul className="nav navbar-nav">
        <li><a className="white_text" href="https://github.com/conanbatt/lightbooker" target="_blank">See Code</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
      </ul>
    </div>
  </nav>
)