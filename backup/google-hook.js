const AutoSigninHandaler = (user) => {
  fetch("http://localhost:8080/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      localStorage.setItem("idToken", result.token);
      console.log(result);
    })
    .catch((err) => console.log(err));
};

const ManualSignupHandaler = (email) => {
  fetch("http://localhost:8080/manual-sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

const ManualSigninHandaler = (email) => {
  fetch("http://localhost:8080/manual-sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

export { AutoSigninHandaler, ManualSignupHandaler, ManualSigninHandaler };
