import React from "react"
import Head from "../components/head"
import Nav from "../components/nav"
import "../styles/main.scss"

const Search = props => {
  return (
    <div>
      <Head title="Search" />
      <Nav />
      <div className="hero">
        <h1 className="title">Welcome to Search page!</h1>
        <p className="description">
          To get started, edit <code>pages/search.js</code> and save to reload.
        </p>
      </div>
    </div>
  )
}

export default Search
