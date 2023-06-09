import React from "react";
import NavbarOwner from "./NavbarOwner";
import Loadings from "./Loadings";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function OwnerDashBoard() {
  const navigate = useNavigate();
  let [CarsDetails, setCarsDetails] = useState([]);

  const getUser = async () => {
    const response = await fetch("http://localhost:9090/getdata", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setCarsDetails(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const toComponentB = (id) => {
    const list = CarsDetails;
    const employee = list.filter((incar) => incar._id == id);
    navigate("/SingleOwner", { state: employee[0] });
  };

  let Loading = <Loadings />;
  let MainCon = (
    <div>
      <NavbarOwner />
      <div className="AvailableCars">
        {CarsDetails.map((car) => {
          return (
            <>
              <div className="carInfo">
                <img className="image" src={car.car_image} />
                <div className="carPricing">
                  <article>
                    <h6>
                      <b>{car.car_name}</b>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          toComponentB(car._id);
                        }}
                      >
                        View Details
                      </button>
                    </h6>
                  </article>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
  return CarsDetails.length != 0 ? MainCon : Loading;
}
