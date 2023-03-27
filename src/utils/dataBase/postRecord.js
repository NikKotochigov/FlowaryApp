const postRecord = async (name, address) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ name, address }),
    headers: {
      "Content-Type": "application/json",
    },
  };
 // const response = await fetch(`http://localhost:3003/`, requestOptions);
 const response = await fetch(`https://sea-lion-app-ucrxl.ondigitalocean.app/`, requestOptions);
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  console.log("Response from server: : ", data);
};
export default postRecord;
