import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SpotForm.css";

import {
  createSpot,
  addSpotImage,
  updateSpot,
  fetchDetailedSpot,
} from "../../store/spots";

function SpotForm({ spot, formType }) {
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [previewImage, setPreviewImage] = useState(spot?.previewImage);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  const [errors, setErrors] = useState({});
  const { spotId } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailedSpot(spotId)).then((data) => {
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

    useEffect(() => {
      const errors = {}

  // if (previewImage?.length && !previewImage.endsWith('.png' ||'.jpeg' ||'.jpg' )) errors.previewImage = "Preview image URL must end in .png, .jpg, or .jpeg"
  if (previewImage && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) errors.previewImage = "Image URL 1 must end in .png, .jpg, or .jpeg"

  if (img1 && !img1.endsWith('.png') && !img1.endsWith('.jpg') && !img1.endsWith('.jpeg')) errors.image1 = "Image URL 1 must end in .png, .jpg, or .jpeg"
  if (img2 && !img2.endsWith('.png') && !img2.endsWith('.jpg') && !img2.endsWith('.jpeg'))errors.image2 = "Image URL 1 must end in .png, .jpg, or .jpeg"
  if (img3 && !img3.endsWith('.png') && !img3.endsWith('.jpg') && !img3.endsWith('.jpeg')) errors.image3 = "Image URL 1 must end in .png, .jpg, or .jpeg"
  if (img4 && !img4.endsWith('.png') && !img4.endsWith('.jpg') && !img4.endsWith('.jpeg')) errors.image4 = "Image URL 1 must end in .png, .jpg, or .jpeg"
  // if (img1.length && !img1.endsWith('.png' ||'.jpeg' ||'.jpg' )) errors.image1 = "Image URL must end in .png, .jpg, or .jpeg"
  // if (img2.length && !img2.endsWith('.png' ||'.jpeg' ||'.jpg' )) errors.image2 = "Image URL must end in .png, .jpg, or .jpeg"
  // if (img3.length && !img3.endsWith('.png' ||'.jpeg' ||'.jpg' )) errors.image3 = "Image URL must end in .png, .jpg, or .jpeg"
  // if (img4.length && !img4.endsWith('.png' ||'.jpeg' ||'.jpg' )) errors.image4 = "Image URL must end in .png, .jpg, or .jpeg"
      setErrors(errors)

  }, [previewImage, img1, img2, img3, img4])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(!hasSubmitted);
    setErrors({});
    spot = {
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

    if (formType === "UpdateSpot") {
      const editedSpot = await dispatch(updateSpot(spot)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
      if (editedSpot) {
        history.push(`/spots/${editedSpot.id}`);
      }
    } else if (formType === "CreateSpot") {
      const newSpot = await dispatch(createSpot(spot)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
      const missingImg =
        "https://previews.123rf.com/images/alekseyvanin/alekseyvanin1905/alekseyvanin190501937/123511782-photo-camera-line-icon-linear-style-sign-for-mobile-concept-and-web-design-camera-printouts-photo.jpg";
      const images = [
        { url: previewImage, preview: true },
        { url: img1 || missingImg, preview: true },
        { url: img2 || missingImg, preview: true },
        { url: img3 || missingImg, preview: true },
        { url: img4 || missingImg, preview: true },
      ];

      for (let image of images) {
        if (image.url) {
          if(image) {
          await dispatch(addSpotImage(newSpot?.id, image));
          }
        }
      }
      if (newSpot) {
        history.push(`/spots/${newSpot.id}`);
        console.log(history)
      }
    }
  };

  return (
    <div className="form-container">
      <div></div>
      <form onSubmit={handleSubmit} className="spot-form">
        <h1 className="form-title">
          {formType === "CreateSpot" ? "Create a new Spot" : "Update your Spot"}
        </h1>
        <h3> Where's your place located?</h3>
        <p>
          Guest will only get your exact address once they booked a reservation
        </p>
        <div>
          Country <div className="errors">{errors.country}</div>
        </div>
        <label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <div>
          Street Address<div className="errors">{errors.address}</div>
        </div>
        <label>
          <input
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <div className="city-state-labels">
          City <div className="errors">{errors.city}</div>
          State <div className="errors">{errors.state}</div>
        </div>
        <div className="city-state">
        <div>
        </div>
        <label>
          <input
            placeholder="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <div>
        </div>
        <label>
          <input
            placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        </div>
        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <label>
          <textarea
            placeholder="Please write at least 30 characters"
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
          <input
            placeholder="Name of your spot"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="errors">{errors.name}</div>
        <h3>Set a base price for your spot</h3>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <label>
          $
          <input
            type="number"
            placeholder="Price per night(USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <div className="errors">{errors.price}</div>
        {formType === "CreateSpot" ? (
          <div>
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <label>
              <input
                type="text"
                placeholder="Preview Image URL"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
              />
            </label>
            <div className="errors">{errors.previewImage}</div>
            <label>
              <input
                placeholder="Image URL"
                value={img1}
                onChange={(e) => setImg1(e.target.value)}
              />
            </label>
            {<div className="errors">{errors.image1}</div>}
            <label>
              <input
                placeholder="Image URL"
                value={img2}
                onChange={(e) => setImg2(e.target.value)}
              />
            </label>
            {<p className="errors">{errors.image2}</p>}
            <label>
              <input
                placeholder="Image URL"
                value={img3}
                onChange={(e) => setImg3(e.target.value)}
              />
            </label>
            {<div className="errors">{errors.image3}</div>}
            <label>
              <input
                placeholder="Image URL"
                value={img4}
                onChange={(e) => setImg4(e.target.value)}
              />
            </label>
            {<div className="errors">{errors.image4}</div>}
          </div>
        ) : null}
        <button type="submit">
          {formType === "CreateSpot" ? "Create Spot" : "Update Spot"}
        </button>
      </form>
    </div>
  );
}

export default SpotForm;
