import React from "react";
import img from "../assets/cli.jpg";
import '../styles/CustomerInterface.css'
import list from  '../assets/2070381.jpg'
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ClientInterface = () => {
  return (
    <>    <div className="customer-container">
      <div className="customer-card">
        {/* First Row: Text Left, Image Right */}
        <div className="row-flex">
          {/* Text Section */}
          <div className="text-section">
            <h1 className="header-text">
            Share Your Delicious Food on FitFoods!
            </h1>
            <p className="body-text">
            Welcome to Healthy Eats, the platform where you can showcase your culinary talents and share your healthy food creations with a community of health-conscious food lovers. Whether you’re passionate about cooking nutritious breakfasts, wholesome snacks, or creative vegan dishes, this is the place to inspire others with your meals. By adding your food creations, you have the chance to reach a wider audience, earn money, and get recognized for your unique, healthy recipes. Join our community and start posting your delicious dishes today!
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
            Why Add Your Food to FitFoods?
            </h2>
            <ul className="offer-items">
              <li>Showcase your creativity with unique, healthy food creations.</li>
              <li>Earn money by sharing your meals and recipes.</li>
              <li>Inspire others to try delicious and nutritious meals.</li>
              <li>Build your reputation as a skilled home chef.</li>
              <li>Connect with other food lovers and health-conscious individuals.</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <Link to='/foods/add'>
          <button className="cta-button">
            Add Meals
          </button>
          </Link>
          
        </div>
      </div>
     
    </div>
    <Footer/>
    </>
  
  );
};

export default ClientInterface;
