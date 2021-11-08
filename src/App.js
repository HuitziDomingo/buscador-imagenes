import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import './header.css'
import './content.css'
import './article.css'

const App = () => {

  const [photos, setphotos] = useState([])
  console.log({ photos })

  const open = url => window.open(url)

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            let response = await fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID 0vaAfVDuv3BGYsi6htorOHo9bHSaKbfCdIG7u02-Cmo',
              }
            })
            try {
              let data = await response.json()
              setphotos(data.results)
              console.log(data)
            } catch (error) {
              console.log(error)
            }
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      {/* Cuerpo */}
      <div className="container">
        <div className="center">
          {
            photos.map(x => (
              <article key={x.id} onClick={() => open(x.links.html)} >
                <img src={x.urls.regular} alt={x.urls.regular} />
                <p>{[x.description, x.alt_description].join(' - ')}</p>
              </article>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
