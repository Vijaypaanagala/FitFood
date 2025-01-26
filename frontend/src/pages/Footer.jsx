import React from 'react';
import '../styles/Footer.css'
export default function Footer() {
  return (
    <div className="custom-footer-container my-5">
      <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: '#ECEFF1' }}>
        
        <section className="d-flex justify-content-between p-4 text-white" style={{ backgroundColor: ' #5aa91f' }}>
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="https://facebook.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://google.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://instagram.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Company name</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p>
                  FitFood is a marketplace where users can buy and sell protein-rich, nutritious foods to support a healthy lifestyle. Our platform connects fitness enthusiasts with quality food options for fueling their wellness goals.
                </p>
              </div>
              
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p><a href="#!" className="text-dark">Food</a></p>
                <p><a href="#!" className="text-dark">Nutrition</a></p>
                <p><a href="#!" className="text-dark">Healthy Eat</a></p>
                
              </div>
              
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p><a href="#!" className="text-dark">Your Account</a></p>
                <p><a href="#!" className="text-dark">Become an Affiliate</a></p>
                <p><a href="#!" className="text-dark">Shipping Rates</a></p>
                <p><a href="#!" className="text-dark">Help</a></p>
              </div>
              
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p><i className="fas fa-home mr-3"></i>India</p>
                <p><i className="fas fa-envelope mr-3"></i>paanagalavijaykumar@gmail.com</p>
                <p><i className="fas fa-phone mr-3"></i> +91 8639495124</p>
                <p><i className="fas fa-print mr-3"></i> +91 7729963356 </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2020 Copyright: <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  );
}
