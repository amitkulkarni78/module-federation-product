import {
    Box,
    Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { PureComponent } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

type Props = {
  product: Product;
};

function Product(props: Props) {
  const { product } = props;

  return (
    <div>
      <Card sx={{ maxWidth: 200}}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Box><p>{product.title}</p></Box>}
          subheader={<Box sx={{display: 'flex', justifyContent: 'space-between'}}><p>{product.category}</p><p>{product.price}</p></Box>}
        />
        {
          product.image ? 
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt="Paella dish"
        /> 
        :  
        <Skeleton variant="rectangular" width={210} height={118} />
        }
        <CardContent>
            {product.description}
        </CardContent>
        <CardActionArea>
            <CardActions>
                <Button> Add to cart </Button>
            </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Product;
