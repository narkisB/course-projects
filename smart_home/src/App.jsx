import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import HomePage from './views/HomePage';
import CreateRoom from './views/CreateRoom';
import Room from './views/Room';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function App() {

  const initialRooms = [
    { name: 'bedroom' },
    { name: 'bathroom' },
    { name: 'kitchen' },
  ];

  const initialProducts = [
    'air conditioner',
    'lamp',
    'stereo',
    'boiler'
  ];



  const [rooms, setRooms] = useState(initialRooms);
  const [products, setProducts] = useState(initialProducts);
  const [roomList, setRoomList] = useState([]);
  const [isAddProductClicked, setIsAddProductClicked] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isProductValid, setIsProductValid] = useState(false);

  const navigate = useNavigate();




  const onAddRoom = (roomName, roomColor, selectedRoom) => {
    if (roomName.length >= 1 && roomName.length <= 9 && selectedRoom !== 'defaultOption') {
      const roomListCopy = [...roomList];
      roomListCopy.push({ name: roomName, color: roomColor, type: selectedRoom, numOfProducts: 0 });
      setRoomList(roomListCopy);
    } else {
      alert('roomName must be up to 9 characters');
    }
    navigate('/');
  };


  const getRoomByName = (name) => {
    const roomToReturn = roomList.find((room) => ('room' + room.name) === name);
    return roomToReturn;
  };


  const onAddProduct = () => {
    setIsAddProductClicked(!isAddProductClicked);
  };



  const onAddButton = (productProperties) => {
    if (productProperties.name === '') {
      return;
    } else if (productProperties.name === 'stereo' && productList.find((product) => (product.name === 'stereo' && product.id !== productProperties.id && product.roomName === productProperties.roomName))) {
      alert('you can add only one stereo per room');

    } else if (productProperties.name === 'boiler' && productProperties.roomType !== 'bathroom') {
      alert('boiler can be only added to bathroom');

    } else if (productProperties.name !== '' && roomList.find(room => room.name === productProperties.roomName).numOfProducts >= 5) {
      alert('can not add more than 5 products');

    } else {

      const roomListCopy = [...roomList];
      const roomToCountProduct = roomListCopy.find((room) => room.name === productProperties.roomName);
      roomToCountProduct.numOfProducts += 1;
      setRoomList(roomListCopy);

      const productListCopy = [...productList];
      productListCopy.push(productProperties);
      setProductList(productListCopy);

      setIsProductValid(true);
      setIsAddProductClicked(!isAddProductClicked);

    }
  }


  const updateProductIsOn = (product) => {
    const productListCopy = [...productList];
    const productProperties = productListCopy.find((productProp) => productProp.id === product.id);

    productProperties.isOn = !productProperties.isOn
    setProductList(productListCopy);

  }






  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<HomePage roomList={roomList} />} />
        <Route path='/addroom' element={<CreateRoom rooms={rooms} onAddRoom={onAddRoom} />} />
        <Route path='/:name' element={<Room getRoomByName={getRoomByName} products={products} updateProductIsOn={updateProductIsOn}
          onAddProduct={onAddProduct} isAddProductClicked={isAddProductClicked} onAddButton={onAddButton} productList={productList} isProductValid={isProductValid} />} />


      </Routes>
    </div>
  );
}

export default App;
