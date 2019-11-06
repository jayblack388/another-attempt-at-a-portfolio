/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import favicon from "../images/favicon.ico"

function SEO() {
  const {
    github: {
      viewer: { name },
    },
  } = useStaticQuery(
    graphql`
      query {
        github {
          viewer {
            name
          }
        }
      }
    `
  )

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={name}
      link={[
        { rel: "shortcut icon", type: "image/x-icon", href: `${favicon}` },
      ]}
    />
  )
}

export default SEO
