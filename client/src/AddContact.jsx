import { React, useState, useEffect } from "react";
import axios from "axios";

const AddContact = ({
  handelModal,
  showModal,
  URL,
  reload,
  setReload,
  id,
  setId,
  contacts,
}) => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (id) {
      for (let i = 0; i < contacts.length; i++) {
        if (id === contacts[i]._id) {
          setName(contacts[i].name);
          setGmail(contacts[i].gmail);
          setNumber(contacts[i].number);
          break;
        }
      }
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, gmail, number);
    handelModal();

    if (id) {
      // send data thr api

      const api = await axios.put(
        `${URL}/${id}`,
        { name, gmail, number },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // send data thr api

      const api = await axios.post(
        `${URL}/`,
        { name, gmail, number },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    setReload(!reload);
    setName("")
    setGmail("")
    setNumber("")
    setId("")
  };
  return (
    <>
      <div className="container mt-5" style={{ width: "200px" }}>
        <button className="btn btn-warning" onClick={handelModal}>
          Add Conatct
        </button>

        {/*Modal Code*/}
        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div
                className="modal-content bg-dark p-3"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-header d-flex justify-content-center align-items-center">
                  <h3 className="text-center">
                    {id ? "Edit Contact" : "Add Conatct"}
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handelModal}
                  ></button>
                </div>
                <div className="modal-body ">
                  {/* FORM */}
                  <form onSubmit={submitHandler}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Gmail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-3">
                      <button type="submit" className="btn btn-primary mx-3">
                        Submit
                      </button>
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={handelModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddContact;
