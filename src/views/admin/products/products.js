import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductList, deleteProduct } from "../../../redux/actions/products";
import { logOut } from "../../../redux/actions/auth";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "../../../components/admin/allProducts.css";
import "../../../components/admin/navSide.css";
import {Button} from "reactstrap";

const AllProducts = () => {
  const user = useSelector(state => state.auth)
  const productData = useSelector(state => state.products.productData)
  const key = 'title';
  const productsUniqueByKey = [...new Map(productData.map(item => [item[key], item])).values()];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }

  const handleEdit = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
  }
  return (
    <>
      { user.isAuth ? null : <Link to="/login"></Link> }
      <div className="admin-sidenav">
        <Link to ="/admin/dashboard">Dashboard</Link>
        <Link to ="/admin/all-products">Products</Link>
        <Link to ="/admin/inventory">Inventory</Link>
        <Link to ="/admin/all-transactions">Transactions</Link>
        <Link to ="/admin" onClick = {() => logOut()}>Logout</Link>
      </div>
      <div className="admin-main">
      <Link to = "/admin/add-new-product"><Button>Add new product</Button></Link>
      {productsUniqueByKey.length > 0 ? (  
          productsUniqueByKey.map((product) => {
            return (
              <>
                <Link to = {`/admin/product/${product._id}`}>
                  <div className="parent">
                    <div className="child">
                      <img src={product.image}/>
                    </div>
                    <div className="child2">
                      <DeleteIcon style={{float: "right"}} onClick={() => handleDelete(product._id)}/>
                      <Link to = {`/admin/edit-product/${product._id}`}><EditIcon style={{float: "right", color: "black"}} onClick={() => handleEdit(product)}/></Link>
                      <br/>
                      <div>{product.title}</div>
                      <div>Rs. {product.price}</div>
                    </div>
                  </div>
                </Link>
              </>
            )
          })
      ) : (
        <h1> Products not available</h1>
      )}
      </div>
    </>
  );
};

export default AllProducts;