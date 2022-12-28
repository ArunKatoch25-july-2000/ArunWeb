import React, { useState, useEffect } from "react";
import profileImage from "../Images/profileImage.jpg";
import bookmark from "../Images/bookmark.png";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [showtab, setTab] = useState(1);
  const handletab = (e) => {
    setTab(e);
  };

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.status === 200) {
        throw new Error(`Something went wrong`);
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <section className="about">
        <form method="GET" className="about_outer_container">
          <div className="image_and_links_container">
            <div className="profile_image">
              <img src={profileImage} alt="profile image" />
            </div>

            <div className="my_links">
              <div className="work_link_heading">
                <span>My Links:</span>
              </div>
              <ul>
                <li>
                  <a
                    href="https://github.com/ArunKatoch25-july-2000"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100005266396367"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/a.r.u.n_katoch/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/arun-katoch-885a1419b/"
                    target="_blank"
                  >
                    Linked In
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="about_me_container">
            <div className="about_upper_portion">
              <div className="my_details">
                <h1>Arun Katoch</h1>
                <h2>Web Developer</h2>
              </div>

              <div className="mark_logo">
                <img src={bookmark} alt="mark" />
              </div>
            </div>

            <ul>
              <li>
                <Link
                  className={
                    showtab === 1 ? "toggle_links links_active" : "toggle_links"
                  }
                  onClick={() => handletab(1)}
                >
                  about
                </Link>
              </li>
              <li>
                <Link
                  className={
                    showtab === 2 ? "toggle_links links_active" : "toggle_links"
                  }
                  onClick={() => handletab(2)}
                >
                  timeline
                </Link>
              </li>
            </ul>

            <div
              className={
                showtab === 1
                  ? "about_me_details_container show"
                  : "about_me_details_container"
              }
            >
              <div className="about_me_details">
                <p>Name</p>
                <span>Arun Katoch</span>
              </div>
              <div className="about_me_details">
                <p>Email</p>
                <span style={{ textTransform: "lowercase" }}>
                  akinfo554@gmail.com
                </span>
              </div>
              <div className="about_me_details">
                <p>Phone</p>
                <span>+91 86xxxxxx09</span>
              </div>
              <div className="about_me_details">
                <p>Profession</p>
                <span>Web Developer</span>
              </div>
              <div className="about_me_details">
                <p>Address</p>
                <span>Kasauli H.P</span>
              </div>
            </div>

            <div
              className={
                showtab === 2
                  ? "about_me_details_container show"
                  : "about_me_details_container"
              }
            >
              <div className="about_me_details">
                <p>Experience</p>
                <span>Fresher</span>
              </div>
              <div className="about_me_details">
                <p>Projects Completed</p>
                <span>25+</span>
              </div>
              <div className="about_me_details">
                <p>Availability</p>
                <span>available</span>
              </div>
              <div className="about_me_details">
                <p>English</p>
                <span>Good</span>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default About;
