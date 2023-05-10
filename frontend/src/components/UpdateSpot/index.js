import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateSpot, fetchDetailedSpot } from "../../store/spots";

function SpotUpdateForm() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot[spotId]);

    const dispatch = useDispatch();

    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    // const [errors, setErrors] = useState({});

    const history = useHistory();

    useEffect(() => {
      dispatch(fetchDetailedSpot(spotId)).then(data => {
        setCountry(data.country);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setDescription(data.description);
        setName(data.name);
        setPrice(data.price);
        setPreviewImage(data.previewImage);
      });
    }, [dispatch, spotId]);

  // useEffect(() => {
  //   const errors = {};
  //   if (!country?.length) errors["country"] = "Country is required";
  //   if (!streetAddress?.length) errors["streetAddress"] = "Address is required";
  //   if (!city?.length) errors["city"] = "City is required";
  //   if (!state?.length) errors["state"] = "State is required";
  //   if (!description?.length)
  //     errors["description"] = "Description needs a minimum of 30 characters";
  //   if (!title?.length) errors["title"] = "Name is required";
  //   if (!price?.length) errors["price"] = "Price is required";
  //   if (!previewImage?.length)
  //     errors["previewImage"] = "Preview Image is required";
  //   if (!previewImage?.includes("png" || "jpg" || "jpeg"))
  //     errors["previewImage"] = "Preview Image is required";
  //   setErrors(errors);
  // }, [
  //   country,
  //   streetAddress,
  //   city,
  //   state,
  //   description,
  //   title,
  //   price,
  //   previewImage,
  // ]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let spotInformation = {
      ...spot,
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      previewImage,
    };

    await dispatch(updateSpot(spotInformation));

      history.push(`/spots/current`);
  };

  return (
    <div>
      <h1>Update your Spot</h1>
      <h3> Where's your place located?</h3>
      <p>
        Guest will only get your exact address once they booked a reservation
      </p>
      <form onSubmit={handleSubmit}>
        <p>Country</p>
        <label>
          <input
            type="text"
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <p>Street Address</p>
        <label>
          <textarea
            placeholder='Street Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <p>City</p>
        <label>
          <textarea placeholder='City' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <p>State</p>
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
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>
        <label>
          <textarea placeholder='Name of your spot' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
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
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
};

export default SpotUpdateForm;
