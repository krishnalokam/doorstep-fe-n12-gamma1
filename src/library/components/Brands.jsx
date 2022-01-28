import { Checkbox } from "@mui/material";
import CLabel from "./Label";
import Content from "./Content";
import Brand from "./Brand";
import brands from "../../services/brands";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

const Brands = ({ values }) => {
  return (
    // <Content>
    //   <Content>
    //     <p>Brands</p>
    //   </Content>
    //   {brands.map((brand, index) => {
    //     return (
    //       <Brand key={brand.id}>
    //         <p>{brand.name}</p>
    //       </Brand>
    //     );
    //   })}
    // </Content>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{fontWeight:'bold'}}>Brands</Typography>
      </Grid>
      <Grid item>
        <Grid container rowSpacing={1}>
          {brands.map((brand, index) => {
            return (
              <Grid item xs={12}>
                <Brand key={brand.id}>
                  <Typography variant="p">{brand.name}</Typography>
                </Brand>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Brands;
