import React from "react";
import img from "../assets/55187.jpg";
import '../styles/CustomerInterface.css'
import list from  '../assets/2070381.jpg'
import Footer from "./Footer";
import { Link } from "react-router-dom";

const CustomerInterface = () => {
  return (
    <>    <div className="customer-container">
      <div className="customer-card">
        {/* First Row: Text Left, Image Right */}
        <div className="row-flex">
          {/* Text Section */}
          <div className="text-section">
            <h1 className="header-text">
              Welcome to FitFoods!
            </h1>
            <p className="body-text">
            Discover delicious and healthy meals tailored just for you. From
  nutritious breakfasts to refreshing juices, we’ve got something
  for everyone. Whether you're looking to lose weight, gain energy, or
  maintain a balanced diet, our meals are designed to help you meet your
  goals without compromising on taste. We offer a variety of options to
  suit all lifestyles, including vegan, gluten-free, and high-protein meals.
            </p>
            {/* <p className="body-text">
              Experience the joy of eating well while nurturing your body and
              mind. Our meals are crafted with fresh ingredients to help you
              live your healthiest life.
            </p> */}
          </div>
          {/* Image Section */}
          <div className="image-section">
            <img
              src={img}
              alt="Healthy Meals"
              className="food-image"
            />
          </div>
        </div>

        {/* Second Row: Image Left, Points Right */}
        <div className="row-flex">
          {/* Image Section */}
          <div className="image-section">
            <img
              src={list}
              alt="Healthy Meals"
              className="food-image"
            />
          </div>
          {/* Offer List */}
          <div className="offer-list">
            <h2 className="offer-header">
              What We Offer:
            </h2>
            <ul className="offer-items">
              <li>Healthy and balanced meals crafted with care.</li>
              <li>A wide range of vegan, vegetarian, and protein-packed dishes.</li>
              <li>Freshly prepared juices and smoothies for a healthy lifestyle.</li>
              <li>Daily meal plans tailored to your specific dietary needs.</li>
              <li>Farm-fresh ingredients delivered to your table.</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <Link to='/items'>
          <button className="cta-button">
            Explore Meals
          </button>
          </Link>
          
        </div>
      </div>
     
    </div>
    <Footer/>
    </>
  
  );
};

export default CustomerInterface;
