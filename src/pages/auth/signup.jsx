import React, { useState } from "react";
import { TextInput } from "../../components/inputs/text-input";
import AuthLayout from "../../components/layouts/auth-layout";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { Helpers } from "../../services/helper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/features/user-slice";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [authError, setAuthError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    let emailError = "", passwordError = "", nameError = "";
    if (!Helpers.validateEmail(email)) {
      emailError = 'Invalid Email';
    }
    if (!Helpers.validatePassword(password)) {
      passwordError = 'Password must be at least 8 characters';
    }
    if (!Helpers.validateName(name)) {
      nameError = 'Name must be at least 3 characters';
    }
    if (emailError || passwordError || nameError) {
      setErrors({ email: emailError, password: passwordError, name: nameError });
    } else {
      setLoader(true);
      try {
        const payload = { email, password, name };
        const response = await axios.post("https://dev-mart-server.vercel.app/api/user/signup", payload);
        console.log(response?.data?.data, "Sign Up Response");
        dispatch(addUser(response?.data?.data));
        setErrors({ email: "", password: "", name: "" });
        navigate('/');
      } catch (error) {
        setAuthError(error?.response?.data?.message)
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="auth_heading">Create an Account</h1>
        <p className="auth_title mt-3">Enter your details below</p>
        <form className="mt-4" onSubmit={onSubmitSignUp}>
          <TextInput
            placeholder="Name"
            type="text"
            styles={{ marginBottom: "0" }}
            value={name}
            onChange={setName}
            required
            err_msg={errors.name}
          />
          <TextInput
            placeholder="Email or Phone Number"
            type="text"
            styles={{  marginBottom: "5px", marginTop: "25px" }}
            value={email}
            onChange={setEmail}
            required
            err_msg={errors.email}
          />
          <TextInput
            placeholder="Password"
            type="password"  // Corrected type to 'password' for security
            styles={{  marginBottom: "5px", marginTop: "25px" }}
            value={password}
            onChange={setPassword}
            required
            err_msg={errors.password}
          />
          <div className={styles.button_wrapper}>
            <PrimaryBtn
              loading={loader ? true : false}
              disabled={loader ? true : false}
              type="submit"
            >
              Create Account
            </PrimaryBtn>
            {authError && <div className="text-danger"><small>{authError}</small></div>}
          </div>
        </form>
        <span>
          Already have an account?{" "}
          <Link to="/auth/login" className={styles.login_link}>
            Login
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
