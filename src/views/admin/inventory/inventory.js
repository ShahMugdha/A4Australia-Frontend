import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { getInventoryList, deleteProductInventory } from "../../../redux/actions/inventory";
import { logOut } from "../../../redux/actions/auth/index.js";
import "../../../components/admin/inventory/inventory.css";
import AccessDenied from "../../../components/error-pages/accessDenied.js"
import "../../../components/admin/navSide.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import jwt_decode from 'jwt-decode';
import {Button} from "reactstrap";

const Inventory = () => {
  const adminToken = localStorage.getItem("token")
  var role
  if(adminToken) {
    role = jwt_decode(adminToken).role
  }
  const productData = useSelector(state => state.products.productData)
  const inventoryData = useSelector(state => state.inventory.inventoryData)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInventoryList())
  }, [dispatch])
  const handleDelete = (productId) => {
    dispatch(deleteProductInventory(productId))
  }
  const handleEdit = (inventoryProduct) => {
    localStorage.setItem("inventoryProduct", JSON.stringify(inventoryProduct));
  }
  return (
    <>
      { adminToken && role === 'ADMIN' ? 
        <>
          <div className="admin-sidenav">
            <Link to ="/admin/dashboard">Dashboard</Link>
            <Link to ="/admin/all-products">Products</Link>
            <Link to ="/admin/inventory">Inventory</Link>
            <Link to ="/admin/all-transactions">Transactions</Link>
            <Link to ="/admin" onClick = {() => logOut()}>Logout</Link>
          </div>
          <div className="admin-main">
          <Link to = "/admin/add-inventory"><Button>Add new inventory</Button></Link>
          {inventoryData.length > 0 ? (  
              inventoryData.map((inventory) => {
                return (
                  <>
                    <div style={{padding: "0.02px"}}>
                    <DeleteIcon style={{float: "right", fontSize: "23px", marginRight: "5%", cursor: "pointer"}} onClick={() => handleDelete(inventory.product._id)}/>
                    <Link to = {`/admin/edit-inventory/${inventory.product._id}`}><EditIcon style={{float: "right", color: "black", fontSize: "23px"}} onClick={() => handleEdit(inventory.product)}/></Link>
                    <table>
                      <thead>
                        <tr>
                          <th>{inventory.product.title}</th>
                          <th colSpan={inventory.stock ? inventory.stock.length : '0'}>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan="2">{inventory.product.description}</td>
                            {inventory.stock ? (
                              inventory.stock.map((stock) => {
                                return (
                                  <>
                                    <th>{stock.size}</th>
                                  </>
                                )
                              })
                            ): ''}
                        </tr>
                        <tr>
                          {inventory.stock ? (
                            inventory.stock.map((stock) => {
                              return (
                                <>
                                  <td>{stock.quantity}</td>
                                </>
                              )
                            })
                          ): '0'}
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </>
                )
              })
          ) : (
            <h1> Inventories not available</h1>
          )}
          </div>
        </> 
      : <AccessDenied/> }
    </>
  );
};

export default Inventory;