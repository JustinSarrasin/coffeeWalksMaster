import React from "react";

const TitleLogo = () => {
   return (
      <React.Fragment>
         <div className="header__titleLogo clearfix">
            <h1 className="header__title">Coffee Walks</h1>
            <img className="header__logo" src="/assets/coffee-mug.svg" alt=""/>
         </div>
      </React.Fragment>
   )
}

export default TitleLogo;