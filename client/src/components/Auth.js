import React, { useState } from "react";
import logo from "../images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast.error("Invalid Email Format...", {
        style: {
          border: "1px solid #red",
          padding: "16px",
          color: "red",
          background: "black",
          fontWeight: "bold",
        },
        iconTheme: {
          primary: "red",
          secondary: "#FFFAEE",
        },
      });
      return false;
    }
    if (password.length < 8) {
      toast.error("Password Should be Atleast 8 Characters Long", {
        style: {
          border: "1px solid #red",
          padding: "16px",
          color: "red",
          background: "black",
          fontWeight: "bold",
        },
        iconTheme: {
          primary: "red",
          secondary: "#FFFAEE",
        },
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.message == "Login Successful") {
        navigate("/dashboard");
      } else {
        if (data.error === "Not Registered") {
          toast.error("User Not Found !!!", {
            style: {
              border: "1px solid #red",
              padding: "16px",
              color: "red",
              background: "black",
              fontWeight: "bold",
            },
            iconTheme: {
              primary: "red",
              secondary: "#FFFAEE",
            },
          });
        } else if (data.error === "Invalid Password") {
          toast.error("Invalid Password.", {
            style: {
              border: "1px solid #red",
              padding: "16px",
              color: "red",
              background: "black",
              fontWeight: "bold",
            },
            iconTheme: {
              primary: "red",
              secondary: "#FFFAEE",
            },
          });
        } else {
          toast.error("An Error Occured... Try Again!", {
            style: {
              border: "1px solid #red",
              padding: "16px",
              color: "red",
              background: "black",
              fontWeight: "bold",
            },
            iconTheme: {
              primary: "red",
              secondary: "#FFFAEE",
            },
          });
        }
      }
    } catch (error) {
      toast.error("An Error Occured... Try Again!", {
        style: {
          border: "1px solid #red",
          padding: "16px",
          color: "red",
          background: "black",
          fontWeight: "bold",
        },
        iconTheme: {
          primary: "red",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="container overflow-hidden">
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
          <div className="row w-100 h-100">
            <div className="col-lg-7 d-none d-lg-flex align-items-center me-lg-5 auth-left">
              <div
                id="authCarousel"
                className="carousel-fade slide w-100 h-100 position-relative"
                data-bs-ride="carousel"
                data-bs-interval="3000"
              >
                <div className="carousel-indicators d-none">
                  <button
                    type="button"
                    data-bs-target="#authCarousel"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#authCarousel"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#authCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>

                <div className="carousel-inner w-100 h-100 rounded-4 overflow-hidden">
                  <div className="carousel-item active h-100">
                    <div className="position-relative w-100 h-100">
                      <img
                        className="d-block w-100 h-100 object-fit-cover"
                        src="https://images.ctfassets.net/hzjmpv1aaorq/3QxrnjLvVkDtsYQSB1gxNw/09d0bb4fd8b59ec4f3c66ae351bbac42/Untitled_design__13_.jpg?q=70"
                        alt="Welcome slide"
                      />
                      <div
                        className="dark-overlay position-absolute top-0 w-100 h-100"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                      ></div>
                      <div className="carousel-text position-absolute top-50 start-50 translate-middle text-center text-light">
                        <h2>Welcome to Our Platform</h2>
                        <p>Join us and explore amazing features.</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item h-100">
                    <div className="position-relative w-100 h-100">
                      <img
                        className="d-block w-100 h-100 object-fit-cover"
                        src="https://images.ctfassets.net/hzjmpv1aaorq/3QxrnjLvVkDtsYQSB1gxNw/09d0bb4fd8b59ec4f3c66ae351bbac42/Untitled_design__13_.jpg?q=70"
                        alt="Security slide"
                      />
                      <div
                        className="dark-overlay position-absolute top-0 w-100 h-100"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                      ></div>
                      <div className="carousel-text position-absolute top-50 start-50 translate-middle text-center text-light">
                        <h2>Safe & Secure</h2>
                        <p>Your data is protected with top-notch security.</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item h-100">
                    <div className="position-relative w-100 h-100">
                      <img
                        className="d-block w-100 h-100 object-fit-cover"
                        src="https://images.ctfassets.net/hzjmpv1aaorq/3QxrnjLvVkDtsYQSB1gxNw/09d0bb4fd8b59ec4f3c66ae351bbac42/Untitled_design__13_.jpg?q=70"
                        alt="Community slide"
                      />
                      <div
                        className="dark-overlay position-absolute top-0 w-100 h-100"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                      ></div>
                      <div className="carousel-text position-absolute top-50 start-50 translate-middle text-center text-light">
                        <h2>Join Our Community</h2>
                        <p>Connect with people around the globe.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-form col-lg-4 col-md-8 col-12 d-flex flex-column align-items-center justify-content-center">
              <img src={logo} width={90} alt="Logo" />
              <br />
              <h1 className="text-bnbwhite mb-4 fw-bold stylish mt-3">
                Log In
              </h1>
              <form className="w-100" onSubmit={handleSubmit}>
                <div className="mb-3 input-control">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3 input-control">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="w-100 btn-bnb btn-bnb-yellow fw-bold"
                >
                  Login
                </button>
              </form>
              {/* <div className="d-flex align-items-center my-4 w-100">
                <hr className="flex-grow-1 text-bnbwhite" />
                <span className="mx-2 text-secondary">
                  <b>or</b>
                </span>
                <hr className="flex-grow-1 text-bnbwhite" />
              </div>

              <button className="w-100 btn-bnb btn-bnb-original">
                
                <FcGoogle /> &nbsp; <b>Continue with Google</b>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
