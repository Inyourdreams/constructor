import React from 'react';

import GoBack from '@assets/images/Constructor/arrowLeft.svg';
import EditIcon from '@assets/images/blocks/Exercise/edit.svg';

const Navbar = ({ title, middleText, value, onChangeText, goBack }) => (
  <nav id="navbar">
    {
      middleText ? (
        <div className="lesson-container">
          <div className="left-side">
            {
              goBack ? (
                <div
                  className="navbar-goback-container"
                  onClick={goBack}
                >
                  <img src={GoBack} alt="go-back" />
                </div>
              ) : null
            }
            <div id="navbar-title">
            <span>
              {title}
            </span>
            </div>
          </div>
          <div className="middle-side">
            <input
              type="text"
              value={value}
              onChange={onChangeText}
            />
            <img src={EditIcon} alt=""/>
          </div>
        </div>
      ) : (
        <>
          {
            goBack ? (
              <div
                className="navbar-goback-container"
                onClick={goBack}
              >
                <img src={GoBack} alt="go-back" />
              </div>
            ) : null
          }
          <div id="navbar-title">
          <span>
            {title}
          </span>
          </div>
        </>
      )
    }
  </nav>
);

export default Navbar;
