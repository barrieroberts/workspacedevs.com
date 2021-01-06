import React, { useState, useEffect } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "../components/image";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              facebook
              github
              image
              intro
              linkedin
              location
              name
              slug
              title
              twitter
              website
            }
            id
          }
        }
      }
    }
  `);

  // https://www.erichowey.dev/writing/load-more-button-and-infinite-scroll-in-gatsby/

  const allPeople = data.allMdx.edges;
  const [list, setList] = useState([...allPeople.slice(0, 10)]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(allPeople.length > 10);
  const handleLoadMore = () => {
    setLoadMore(true);
  };
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < allPeople.length;
      const nextResults = isMore
        ? allPeople.slice(currentLength, currentLength + 10)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]); //eslint-disable-line
  useEffect(() => {
    const isMore = list.length < allPeople.length;
    setHasMore(isMore);
  }, [list]); //eslint-disable-line

  return (
    <Layout>
      <Header />
      <div>
        <h1 style={{ borderBottom: 0 }}>Google Workspace Developers</h1>
        <div class="cards">
          {list.map(({ node }) => (
            <div class="card" key={node.id}>
              <div style={{ textAlign: "right" }}>
                <Link to={node.frontmatter.slug}>
                  <img
                    src={node.frontmatter.image}
                    alt={node.frontmatter.name}
                    class="avatar"
                  />
                </Link>
                <div class="name">
                  <Link to={node.frontmatter.slug}>
                    {node.frontmatter.name}
                  </Link>
                </div>
                <div class="location">{node.frontmatter.location}</div>
                <div class="intro">{node.frontmatter.intro}</div>
              </div>
              <br />
              <div>
                {node.frontmatter.linkedin && (
                  <div class="box">
                    <Link to={node.frontmatter.linkedin}>
                      <Image src="linkedin.png" alt="linkedin" />
                    </Link>
                  </div>
                )}
                {node.frontmatter.github && (
                  <div class="box">
                    <Link to={node.frontmatter.github}>
                      <Image src="github.png" alt="github" />
                    </Link>
                  </div>
                )}
                {node.frontmatter.twitter && (
                  <div class="box">
                    <Link to={node.frontmatter.twitter}>
                      <Image src="twitter.png" alt="twitter" />
                    </Link>
                  </div>
                )}
                {node.frontmatter.website && (
                  <div class="box">
                    <Link to={node.frontmatter.website}>
                      <Image src="website.png" alt="website" />
                    </Link>
                  </div>
                )}
                {node.frontmatter.facebook && (
                  <div class="box">
                    <Link to={node.frontmatter.facebook}>
                      <Image src="facebook.png" alt="facebook" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          {hasMore ? (
            <button onClick={handleLoadMore} style={{ marginTop: `1.5rem` }}>
              Load More
            </button>
          ) : (
            <p style={{ marginTop: `1.5rem` }}>Those are all!</p>
          )}
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </Layout>
  );
};

export default IndexPage;
