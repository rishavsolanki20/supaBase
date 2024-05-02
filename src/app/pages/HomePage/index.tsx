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
  const [cart, setCart] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const authToken = await supabase.auth.getSession();
        fetch('http://localhost:8000/', {
          headers: {
            accept: '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0dmZzYXBzYXBqamNiaG1semF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDQyNTcsImV4cCI6MjAyOTY4MDI1N30.hNB9uq2ubt2T8ILoyvfhNMgBlhoZDk8R58ewZdffKhA',
            Authorization: `Bearer ${authToken.data.session?.access_token}`,
            priority: 'u=1, i',
            'sec-ch-ua':
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'x-client-info': 'supabase-js-web/2.43.0',
          },
          referrer: 'http://localhost:3000/',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(data.data);
          })
          .catch(error => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleAddToCart = async (item: CartItem) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const user_id = user?.id;
    const { error } = await supabase.from('cart').insert([
      {
        user_id,
        name: item.name,
        price: item.price,
      },
    ]);
    console.log(error);
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
        {data.map(item => (
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
