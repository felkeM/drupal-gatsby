import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allNodeArticle(sort: {order: DESC, fields: created}) {
          edges {
            node {
              id
              title
              body {
                value
              }
              created(formatString: "MMMM Do YYYY")
              relationships {
                field_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 400, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        {data.allNodeArticle.edges.map(edge => (
          <>
            <h3><Link to={ edge.node.id }>{ edge.node.title }</Link></h3>
            <small><em>{ edge.node.created }</em></small>
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem`, width: `100%` }}>
            <Img fluid={ edge.node.relationships.field_image.localFile.childImageSharp.fluid } />  
            </div>
            <div dangerouslySetInnerHTML={{ __html: edge.node.body.value.split(' ').splice(0, 50).join(' ') + '...' }}></div>
          </>
        ))}
      </Layout>
    )}
  />
)

export default IndexPage
