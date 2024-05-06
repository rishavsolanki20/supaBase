/**
 * Order
 */
import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // Import Axios

interface OrderItem {
  id: string;
  name: string;
  price: number;
}

interface Props {}

export const Order = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get('http://localhost:8800/order')
      .then(response => {
        setOrderItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  return (
    <Div>
      <h2>{t('Order Items')}</h2>
      <ul>
        {orderItems.map(orderItem => (
          <li key={orderItem.id}>
            <span>{orderItem.name}</span> - <span>{orderItem.price}</span>
          </li>
        ))}
      </ul>
    </Div>
  );
});

const Div = styled.div``;
