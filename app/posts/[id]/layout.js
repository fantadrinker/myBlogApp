//import 'highlight.js/styles/github.css'
import './dracula.css'

export default function PostLayout({ children }) {
    return (
      <section id="post">
        {children}
      </section>
    )

}