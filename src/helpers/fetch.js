const baseurl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpint, data, method = "GET") => {
  const url = `${baseurl}/${endpint}`;
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConToken = (endpint, data, method = "GET") => {
  const url = `${baseurl}/${endpint}`;
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchSinToken, fetchConToken };
