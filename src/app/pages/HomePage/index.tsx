/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from 'app/supabaseClient';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Navbar } from 'app/components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartStart, fetchDataStart } from './slice';
import { RootState } from 'types/RootState';

interface CartItem {
  id: string;
  name: string;
  price: number;
}

export function HomePage() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.homePage?.items);
  const loading = useSelector((state: RootState) => state.homePage?.loading);
  console.log(data);

  React.useEffect(() => {
    dispatch(fetchDataStart());
  }, [dispatch]);

  const handleAddToCart = async (item: CartItem) => {
    dispatch(addToCartStart(item));
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {data?.map(item => (
          <Card key={item.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}
