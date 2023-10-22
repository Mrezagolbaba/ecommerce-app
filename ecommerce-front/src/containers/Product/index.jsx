import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../utils/actions";
// import "./styles.css";
import { generatePublicUrl } from "../../urlConfig";

export function Product(props) {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);
  console.log(product);
  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="card-header">
              <div>
                {props.match.params.slug} under {priceRange[key]}
              </div>
              <button>View All</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <div className="product-container">
                  <div className="product-image-container">
                    <img
                      src={generatePublicUrl(product.productPictures[0]?.img)}
                    />
                  </div>
                  <div className="product-info">
                    <div className="product-title">{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>4333</span>
                    </div>
                    <div className="product-price">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
}
