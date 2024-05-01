import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { supabase } from 'app/supabaseClient'; // Import supabase client
import { Navbar } from '../Navbar';

interface Props {}

interface CartItem {
  id: string;
  name: string;
  price: number;
}

export const Viewcart = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // State to store cart items

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    let { data: items, error } = await supabase.from('cart').select('*');

    if (error) {
      console.log('Error fetching cart items: ', error);
    } else {
      setCartItems(items as CartItem[]);
    }
  };

  return (
    <Div>
      <Navbar />
      {t('')}
      {/*  {t(...messages.someThing())}  */}
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </Div>
  );
});

const Div = styled.div``;
