import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navbar } from 'app/components/Navbar';
import { addItem } from './slice/index';

interface Props {}
interface NewItem {
  name: string;
  price: number;
}

export const Cart = memo((props: Props) => {
  const dispatch = useDispatch();

  // Define the name and price states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddToCart = () => {
    // Create a new item
    const item: NewItem = {
      name,
      price: Number(price),
    };

    // Dispatch the addItem action with the new item
    dispatch(addItem(item));
    console.log(item);
    alert('added successfully');
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
