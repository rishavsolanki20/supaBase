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
  user_id: string; // Add user_id to CartItem interface
}

export const Viewcart = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // State to store cart items

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: items, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        console.log('Error fetching cart items: ', error);
      } else {
        setCartItems(
          items.map(item => ({ ...item, user_id: item.user_id })) as CartItem[],
        ); // Add user_id to each item
      }
    } catch (error) {
      console.error('Error fetching cart items: ', error);
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
