import './App.css';
import useCart from './config/zustand/cart';
import { Button, Container, Table } from 'reactstrap';

function App() {
  const cart = useCart(state => state);

  const addProduct = () => {
    const id = (Math.random() * 1000).toFixed(0)
    cart.addProduct({ id, name: `Product ${id}` });
  }

  return (
    <div className="App">
      <Container className='mt-5'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button onClick={addProduct}>Add Random Product</Button>
          <Button onClick={() => cart.clear()}>Clear Cart</Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.products?.map((item, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <div style={{ width: 220, margin: "auto" }}>
                    <div style={{ display: 'flex', justifyContent: "space-around" }}>
                      <Button color="primary" onClick={() => {
                        cart.addProduct(item)
                      }}>+</Button>
                      <Button color="primary" onClick={() => {
                        cart.modifyQuantity(item, item.quantity - 1)
                      }}>-</Button>
                      <Button color="danger" onClick={() => cart.removeProduct(item)}>Remove</Button>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {cart.products?.length === 0 && <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>No products in cart</td>
            </tr>}
          </tbody>
        </Table>
      </Container>

    </div>
  );
}

export default App;
