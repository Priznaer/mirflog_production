import "./page404.css";


export default function Page404() {
    return (
    <div id="page-404" className="page">
        <div className="main-container">
            <main className="main-content">
                <h1>404</h1>
                <div className="text">
                    <h2>Page Not Found</h2>
                    <p> Sorry, The Page You Are Searching For Does Not Exist </p>
                </div>
                <div className="cta-container">
                    <div className="cta-container">
                        <a href="/" className="cta hyperlink"> Homepage </a>
                        <a href="/services" className="cta hyperlink"> Services </a>
                    </div>
                </div>
            </main>
        </div>
    </div>
  )
}
