import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: '', dob: '',
    password: '', confirmPassword: '', pincode: '',
    house: '', area: '', landmark: '', state: '', city: '',
    relative1Name: '', relative1Phone: '', relative2Name: '', relative2Phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { name, email, phone, gender, dob, password, confirmPassword } = form;
    if (!name || !email.includes('@') || !email.endsWith('.com') || !phone || !gender || !dob) {
      alert("Please fill all fields correctly in Step 1.");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (err) {
      alert('Error submitting form.');
      console.error(err);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <div className="signup-card">
          <h2>🚀 Create Account</h2>
          <p className="step-indicator">Step {step} of 3</p>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <input name="name" placeholder="Full Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} required >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password (min 8 chars)" onChange={handleChange} required />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
              </>
            )}

            {step === 2 && (
              <>
                <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
                <input name="house" placeholder="Flat, House no., Building, etc." onChange={handleChange} required />
                <input name="area" placeholder="Area, Street, Sector, Village" onChange={handleChange} required />
                <input name="landmark" placeholder="E.g. near Apollo Hospital" onChange={handleChange} />
                <select name="state" onChange={handleChange} required>
                  <option value="">Choose a state</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
                <select name="city" onChange={handleChange} required>
                  <option value="">Select City</option>
                  {/* Add logic for cities based on state if needed */}
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <input name="relative1Name" placeholder="Relative 1 Name" onChange={handleChange} required />
                <input name="relative1Phone" placeholder="Relative 1 Phone" onChange={handleChange} required />
                <input name="relative2Name" placeholder="Relative 2 Name" onChange={handleChange} required />
                <input name="relative2Phone" placeholder="Relative 2 Phone" onChange={handleChange} required />
              </>
            )}

            <div className="step-buttons">
              {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
              {step < 3 ? (
                <button type="button" onClick={() => {
                  if (step === 1 && !validateStep1()) return;
                  setStep(step + 1);
                }}>Next</button>
              ) : (
                <button type="submit">Submit</button>
              )}
            </div>
          </form>
          <p className="login-link">Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
      <div className="signup-right">
        <img
          src="/images/2.png"
          alt="Signup visual"
        />
      </div>
    </div>
  );
};

export default Signup;
