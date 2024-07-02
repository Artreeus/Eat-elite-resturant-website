import { useState } from "react";
import orderCoverImg from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Order = ({ defaultIndex = 0 }) => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex !== -1 ? initialIndex : defaultIndex);
  const [menu] = useMenu();

  const breakfast = menu.filter((item) => item.category === "Breakfast");
  const lunch = menu.filter((item) => item.category === "Lunch");
  const dinner = menu.filter((item) => item.category === "Dinner");

  return (
    <div>
      <Helmet>
        <title>Eat Elite | Order Food</title>
      </Helmet>
      <SectionTitle 
            subHeading={""}
            heading={"Our Variety Of Foods"}
            ></SectionTitle>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="my-7"> 
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab>All Menu</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={breakfast}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={lunch}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={dinner}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={menu}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
