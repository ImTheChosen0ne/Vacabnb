import SpotForm from "../SpotForm/index"

function CreateSpotForm() {
  const spot = {
    country: '',
    address: '',
    city: '',
    state: '',
    description: '',
    lat: '',
    lng: '',
    name: '',
    price: '',
    previewImage: '',
  };


  return (
    <div>
      <SpotForm spot={spot} formType="CreateSpot" />
    </div>
  );
};

export default CreateSpotForm;
