import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import React from "react";
import 'react-responsive-modal/styles.css';



const App = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [basket, setBasket] = useState([])

  const handlefetch = async () => {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=9"
    );
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    handlefetch();
  }, []);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // const addToBasket = () => {
  //   setCat(cat);
  //   onOpenModal();
  // }

  const addItem = () => {
    onOpenModal()
  }

  return (
    <div className="app">
      <Router>
        <nav className="navBar">
          <button className="homeButton">
            <Link to="/">Home</Link>
          </button>
          <button className="aboutButton">
            <Link to="/About">About</Link>
          </button>
        </nav>

        <Switch>
          <Route exact path="/">
            <h1>Imaginary Cats For Sale!</h1>

            <p></p>
            <div className="catContainer">
              {/* data is the array */}
              {data.map((ObjectWithinArray, index) => (
                <>
                  <div key={index} className="individualCat">
                    <img alt="cat" src={ObjectWithinArray.url} />
                    <p>£{ObjectWithinArray.width}</p>
                    <button text="add to basket" onClick={addItem}>
                      Add to Basket
                    </button>
                  </div>
                </>
              ))}

              <Modal
                open={open}
                onClose={onCloseModal}
                center
                classNames={{
                  overlay: "customOverlay",
                  modal: "customModal",
                  overlayAnimationIn: "customEnterOverlayAnimation",
                  overlayAnimationOut: "customLeaveOverlayAnimation",
                  modalAnimationIn: "customEnterModalAnimation",
                  modalAnimationOut: "customLeaveModalAnimation",
                }}
                animationDuration={300}
              >
                <p>
                
                  You have chosen a cool cat! 
                </p>
              </Modal>
            </div>
          </Route>

          <Route exact path="About">
            <h1>About</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
