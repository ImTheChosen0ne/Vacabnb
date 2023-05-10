import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createSpot } from "../../store/spots";

function SpotForm() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const spotInformation = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      previewImage,
    };

    return dispatch(createSpot(spotInformation)).then(history.push('/spots/current')).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });

  };



  return (
    <div>
      <h1>Create a new Spot</h1>
      <h3> Where's your place located?</h3>
      <p>
        Guest will only get your exact address once they booked a reservation
      </p>
      <form onSubmit={handleSubmit}>
        <p>Country</p>
      <div className="errors">{errors.country}</div>
        <label>
          <input
            type="text"
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <p>Street Address</p>
        <div className="errors">{errors.address}</div>
        <label>
          <textarea
            placeholder='Street Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <p>City</p>
      <div className="errors">{errors.city}</div>

        <label>
          <textarea placeholder='City' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <p>State</p>
      <div className="errors">{errors.state}</div>

        <label>
          <textarea placeholder='State' type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </label>
        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <label>
          <textarea
          placeholder='Please write at least 30 characters'
          type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      <div className="errors">{errors.description}</div>
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>
        <label>
          <textarea placeholder='Name of your spot' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      <div className="errors">{errors.name}</div>
        <h3>Set a base price for your spot</h3>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <label>
          $
          <textarea
            type="number"
            placeholder='Price per night(USD)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <div className="errors">{errors.price}</div>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <label>
          <textarea
            type="text"
            placeholder='Preview Image URL'
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        <div className="errors">{errors.url}</div>

        {/* <label>
          <textarea
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        <label>
          <textarea
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        <label>
          <textarea
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        <label>
          <textarea
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label> */}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default SpotForm;
