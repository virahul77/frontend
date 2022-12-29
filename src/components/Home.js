import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import NavBar from "./NavBar";
import SingleEvent from "./SingleEvent";

const Home = () => {
  const token = useSelector((state) => state.token);
  const [allEvents, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const fetchAllEvents = async () => {
    if (!token) {
      return navigate("/login");
    }
    const res = await fetch(`${backendUrl}/event/allevents`, {
      method: "get",
      headers: {
        token: token,
      },
    });
    const data = await res.json();

    if (data && data[0] && data[0]["_id"]) setEvents(data);
  };
  console.log(allEvents);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const filteredEvents = allEvents.filter((event) => {
    if (event.eventName.toLowerCase().includes(search.toLowerCase()))
      return true;
    if (event.createdBy.username.toLowerCase().includes(search.toLowerCase()))
      return true;
    return false;
  });
  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h2>All Events</h2>
        <div class="mb-3">
          <label for="basic-url" class="form-label">
            Search by event name or organizer
          </label>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon3">$</span>
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div class="form-text">
            Example search terms - cricket football vollyball
          </div>
        </div>
        <div className="row d-flex justify-content-between">
          {filteredEvents.map((event) => {
            return <SingleEvent key={event._id} event={event} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
