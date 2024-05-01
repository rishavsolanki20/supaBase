/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { supabase } from 'app/supabaseClient';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
  const [loading, setLoading] = useState(false);
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
    onSubmit: async values => {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: 'http://localhost:3000/',
        },
      });
      if (error) {
        alert(error.message);
      } else {
        alert('Check your email for the login link!');
      }
      setLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <p className="description">Signup</p>
        <form onSubmit={formik.handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              style={styles.input}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              style={styles.input}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" style={styles.button}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  form: {
    width: '30%',
    border: '2px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  field: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
