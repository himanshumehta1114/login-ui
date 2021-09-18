const BASE_URL = process.env.REACT_APP_API_URL;

const mockResps = {
  "validate-otp": {
    data: {},
    statusCode: "success",
    statusMessage: "API is successful",
  },
  "generate-otp": {
    data: {
      otpReferenceId: "G89PRVZWZ3",
    },
    statusCode: "success",
    statusMessage: "API is successful",
  },
};

const client = async (endpoint, data) => {
  const config = {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockResps[endpoint]);
    }, 3000);
  });

  // return window
  //   .fetch(`${BASE_URL}/${endpoint}`, config)
  //   .then(async (response) => {
  //     console.log(response);
  //     const data = await response.json();
  //     if (response.ok) {
  //       return data;
  //     } else {
  //       return Promise.reject(data);
  //     }
  //   });
};

export default client;
