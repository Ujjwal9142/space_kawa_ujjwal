import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Users.css";
import Spinner from "react-spinkit";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getUsers = () => {
    axios
      .get(
        "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20"
      )
      .then((res) => setUsers(res.data.results))
      .catch((err) => console.log(err));
  };

  const handleClick = (id) => {
    setSelectedUserIndex(id);
  };
  return (
    <>
      {loading ? (
        <div className="loading__display">
          <Spinner name="ball-spin-fade-loader" color="blue" fadeIn="none" />
        </div>
      ) : (
        <div className="users">
          <div className="users__header">
            <div className="users__header__left">
              <h2>Space Kawa Challenge</h2>
            </div>
            <div className="users__header__right">
              <p>Product</p>
              <p>Download</p>
              <p>Pricing</p>
            </div>
          </div>
          <div className="selected__user__header">
            <div>
              <img
                src={users[selectedUserIndex]?.picture.large}
                className="selected__user__header__pic"
                alt="Profile Pic"
              />
            </div>
            <div className="selected__user__header__details">
              <h2 className="selected__user__header__name">
                {users[selectedUserIndex]?.name.title +
                  " " +
                  users[selectedUserIndex]?.name.first +
                  " " +
                  users[selectedUserIndex]?.name.last}
              </h2>

              <p>
                {users[selectedUserIndex]?.location.street.number +
                  ", " +
                  users[selectedUserIndex]?.location.street.name +
                  ", " +
                  users[selectedUserIndex]?.location.city +
                  ", " +
                  users[selectedUserIndex]?.location.state +
                  ", " +
                  users[selectedUserIndex]?.location.country +
                  ", " +
                  users[selectedUserIndex]?.location.postcode}
              </p>
              <p>
                {users[selectedUserIndex]?.location.timezone.offset +
                  " - " +
                  users[selectedUserIndex]?.location.timezone.description}
              </p>
              <p className="selected__user__header__gender">
                {users[selectedUserIndex]?.gender}
              </p>
            </div>
          </div>
          <div className="all__users__details">
            {users?.map((user, index) => {
              return (
                <div
                  className={
                    selectedUserIndex === index
                      ? "single__selected"
                      : "single__user__details"
                  }
                  id={index}
                  onClick={() => handleClick(index)}
                >
                  <div className="single__user__details__header">
                    <p className="single__user__details__gender">
                      {user.gender + " . " + user.nat}
                    </p>
                  </div>
                  <div className="single__user__details__middle">
                    <h4 className="single__user__details__name">
                      {user.name.title +
                        " " +
                        user.name.first +
                        " " +
                        user.name.last}
                    </h4>
                  </div>
                  <div className="single__user__details__last">
                    <p className="single__user__details__email">{user.email}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
