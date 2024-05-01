import React, { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Import Axios
import { cartActions } from './slice/index'; // Import cartActions
import { supabase } from 'app/supabaseClient';
import { Navbar } from 'app/components/Navbar';

interface Props {}

export const Cart = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the useNavigate hook

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const user = supabase.auth.getUser();

    console.log('hue', user);
    console.log('hue');
    if (!user) {
      navigate('/login'); // Redirect to login page
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);

        // Check if the user is logged in or not
        if (event === 'SIGNED_IN') {
          console.log('User has signed in!');
        } else if (event === 'SIGNED_OUT') {
          console.log('User has signed out or session has expired');
          navigate('/login'); // Redirect to login page
        }
      },
    );

    // Cleanup the listener when the component is unmounted
    return () => {
      authListener.subscription.unsubscribe();
      console.log('hue', user);
    };
  }, []);

  const handleAddToCart = async () => {
    console.log('hue');
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('error');
      return;
    }
    const { error } = await supabase
      .from('items')
      .insert([{ name, price: Number(price) }]);

    if (error) {
      console.log('Error adding to cart:', error.message);
    } else {
      dispatch(
        cartActions.addItem({ id: Date.now(), name, price: Number(price) }),
      );
      setName('');
      setPrice('');
      alert('Added succesfully');
    }
  };

  return (
    <Div>
      <Navbar />
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </Div>
  );
});

const Div = styled.div``;
