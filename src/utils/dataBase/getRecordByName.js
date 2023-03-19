const getRecordByName = async (name) => {
  const response = await fetch(
    //`http://localhost:3003/get_record_by_name/${name}`
    `https://sea-lion-app-ucrxl.ondigitalocean.app/get_record_by_name/${name}`

  );
  const data = await response.json();
  // if (response.status !== 200) {
  //   throw new Error(data.error);
  // }
  console.log("Response from server: : ", data);
  return data.record;
};

export default getRecordByName;
