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

interface CartItem {
  id: string;
  name: string;
  price: number;
}

export function HomePage() {
  const [data, setData] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authToken = await supabase.auth.getSession();
      const response = await fetch(
        'https://vlhilrmgqjuxaibhwave.supabase.co/functions/v1/hello-world',
        {
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0dmZzYXBzYXBqamNiaG1semF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDQyNTcsImV4cCI6MjAyOTY4MDI1N30.hNB9uq2ubt2T8ILoyvfhNMgBlhoZDk8R58ewZdffKhA',
            Authorization: `Bearer ${authToken.data.session?.access_token}`,
          },
        },
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.items);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (item: CartItem) => {
    try {
      const authToken = await supabase.auth.getSession();
      const response = await fetch(
        'https://vlhilrmgqjuxaibhwave.supabase.co/functions/v1/test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken.data.session?.access_token}`,
          },
          body: JSON.stringify(item),
        },
      );
      if (response.ok) {
        console.log('Item added to cart successfully!');
        console.log(item);
        // Optionally update the cart state here
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
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
