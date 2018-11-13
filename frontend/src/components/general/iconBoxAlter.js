import React from 'react';


const BoxSingle = (props) => {
  const style = {
    color: props.color
  }
  return (
    <div className="iconbox-single">
      <div className="box-title">
        <div className="circle-icon-alter" >
          <i className="material-icons" style={style}>{props.icon}</i>
        </div>
        <div>
          <h5>{props.title}</h5>
          <p>{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

const IconBoxesAlter = () => {
  return (
    <div className="iconbox-wrapper alter">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <BoxSingle
            color="#40c741"
            icon="monetization_on"
            title="9, 693"
            subtitle="Earns"
          >
          </BoxSingle>
        </div>

        <div className="col-md-3 col-sm-6">
          <BoxSingle
            color="#fdba2c"
            icon="add_shopping_cart"
            title="1, 250"
            subtitle="Sales"
          >
          </BoxSingle>
        </div>

        <div className="col-md-3 col-sm-6">
          <BoxSingle
            color="#258df2"
            icon="supervisor_account"
            title="2, 324"
            subtitle="Users"
          >
          </BoxSingle>
        </div>
        <div className="col-md-3 col-sm-6">
          <BoxSingle
            color="#fd3353"
            icon="remove_red_eye"
            title="2, 324"
            subtitle="Views"
          >
          </BoxSingle>
        </div>
      </div>
    </div>
  );
}

export default IconBoxesAlter;
