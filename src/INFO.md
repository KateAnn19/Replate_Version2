# form for login 

let initialState = {
  username: "",
  password: "",
  role: "",
};

const { push } = useHistory();
const [loginInform, setLoginInfo] = useState(initialState);
useEffect(() => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header

    pushToProfile();
  }, [role]);

  //401, 400, ""
  
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginInform);
  };

  function pushToProfile() {
    if (role === "business") {
      console.log("inside set timeout");
      push("/business-profile");
    } else if (role === "volunteer") {
      push("/volunteer-profile");
    } else {
      setLoginInfo(initialState);
    }
  }


 <form
        className="login"
        onSubmit={handleSubmit}
        # we will want to push to volunteer page if volunteer and donor page if donor
      >
        <TextField
          type="text"
          name="username"
          value={loginInform.username}
          onChange={handleChange}
          placeholder="username"
        />
        <TextField
          type="password"
          name="password"
          value={loginInform.password}
          onChange={handleChange}
          placeholder="password"
        />
        <label htmlFor="role">
          Please Select
          <select id="role" name="role" onChange={handleChange}>
            <option value=""></option>
            <option value="volunteer">Volunteer</option>
            <option value="business"> Business</option>
          </select>
        </label>
        <button type="submit">Submit Form</button>
      </form> 
# form for login 