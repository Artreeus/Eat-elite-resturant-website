import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Testimonials from "../Testimonials/Testimonials";
import PricingSection from "./../Pricingsection/Pricingsection";
import Order from "../../Order/Order/Order";
import { ScrollRestoration } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <ScrollRestoration/>
      <Helmet>
        <title>Eat Elite | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <Order defaultIndex={0} />
      <PricingSection />
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
