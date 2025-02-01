import React from "react";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import JobListing from "../components/JobListing/JobListing";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <JobListing />
      </Layout>
    </>
  );
};

export default Home;
