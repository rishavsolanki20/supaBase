import React, { useState } from 'react';
import { useFormik } from 'formik';
import { supabase } from 'app/supabaseClient';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      console.log(data);
      if (error) {
        navigate('/login');
        alert(error.message);
      } else {
        alert('Login Successfully');
        navigate('/');
      }
    },
  });

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
