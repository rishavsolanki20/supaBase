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

  const handleAddToCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    console.log('getUser', user?.id);

    // const user_id = localStorage.getItem('id');
    // console.log('local', user_id);
    const { error } = await supabase
      .from('items')
      .insert([{ user_id, name, price: Number(price) }]);

    if (error) {
      console.log('Error adding to cart:', error.message);
    } else {
      dispatch(cartActions.addItem({ name, price: Number(price) }));
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
