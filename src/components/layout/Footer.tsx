import React from 'react';
import { StyledFooter } from '../../styles';

/**
 * React component for the Footer Section.
 */
export const Footer = () => {
  return (
    <div className="endpage">
      <StyledFooter className="footer">
        <div className="left">
          <div className="title">SUDOKU</div>
          <div className="information margin-up">1 Street Name, City, Country, Postcode</div>
        </div>
        <div className="right">
          <div className="text">Terms and Conditions</div>
          <div className="text margin-up">About</div>
          <div className="text margin-up">Privacy Policy</div>
          <div className="text margin-up">Contact</div>
          <div className="text margin-up">Cooking Policy</div>
        </div>
      </StyledFooter>
      <StyledFooter className="copyright">Copyright © 2021.  All rights reserved.</StyledFooter>
    </div>
  )
}
