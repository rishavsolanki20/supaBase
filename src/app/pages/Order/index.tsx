// Order component
import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Navbar } from 'app/components/Navbar';

interface OrderItem {
  order_id: string;
  items: {
    name: string;
    price: number;
  };
}

interface Props {}

export const Order = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get<OrderItem[]>('http://localhost:8800/order')
      .then(response => {
        setOrderItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching order items:', error);
      });
  }, []);

  return (
    <Div>
      <Navbar />
      <h2>{t('Order Items')}</h2>
      <ul>
        {orderItems.map(orderItem => (
          <ul>
            <li>
              <span>{orderItem.items.name}</span> -{' '}
              <span>{orderItem.items.price}</span>
            </li>
          </ul>
        ))}
      </ul>
    </Div>
  );
});

const Div = styled.div``;
