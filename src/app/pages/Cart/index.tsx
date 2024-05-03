import React, { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
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

  const handleAddToCart = async () => {
    try {
      // Get user ID and auth token
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const user_id = user?.id;
      const authToken = await supabase.auth.getSession();

      // Make a POST request to your backend
      const response = await fetch(
        'https://vlhilrmgqjuxaibhwave.supabase.co/functions/v1/addItemDashBoard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0dmZzYXBzYXBqamNiaG1semF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDQyNTcsImV4cCI6MjAyOTY4MDI1N30.hNB9uq2ubt2T8ILoyvfhNMgBlhoZDk8R58ewZdffKhA', // replace with your actual API key
            Authorization: `Bearer ${authToken?.data?.session?.access_token}`,
          },
          body: JSON.stringify({
            user_id,
            name,
            price: Number(price),
          }),
        },
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        dispatch(cartActions.addItem({ name, price: Number(price) }));
        setName('');
        setPrice('');
        alert('Added successfully');
      } else {
        console.log('Error adding to cart:', data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error adding to cart:', error.message);
      } else {
        console.log('Error adding to cart:', error);
      }
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
      <button onClick={handleAddToCart}>Add to Cart dash</button>
    </Div>
  );
});

const Div = styled.div``;
