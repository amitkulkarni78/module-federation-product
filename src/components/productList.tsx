import { Grid } from "@mui/material";
import Product from "./product";

function ProductList(props:any) {
    const { products } = props;

    return (
        <Grid  container spacing={2}>
        
        {
          products.map((u: any) => {
            return <Grid>
                <Product product={u}/>
            </Grid>
          })
        }
      </Grid>
    )
}

export default ProductList;