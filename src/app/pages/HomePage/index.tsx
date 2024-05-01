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
  const [cart, setCart] = React.useState<CartItem[]>([]); // New state for cart

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data: rows, error } = await supabase.from('items').select('*');
    if (!error && rows) {
      setData(rows as CartItem[]);
    } else {
      console.log('Error fetching data: ', error);
    }
  };

  const handleAddToCart = async (item: CartItem) => {
    const { error } = await supabase
      .from('cart')
      .insert([{ id: item.id, name: item.name, price: item.price }]);
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
        {data.map((item, index) => (
          <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
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
