import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const DataProvider = (props) => {
  const [products, setProds] = useState([
    {
      "_id": "1",
      "title": "Watch Product 01",
      "images": [
          "https://picsum.photos/600/600?random=1",
          "https://picsum.photos/600/600?random=2",
          "https://picsum.photos/600/600?random=3",
          "https://picsum.photos/600/600?random=4"
          ],
      "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      "colors": ["red", "black", "teal"],
      "sizes": ["XL", "L", "M", "XM", "LX"],
      "count": 1,
      "price": 101
    },
    {
      "_id": "2",
      "title": "Watch Product 02",
      "images": [
          "https://picsum.photos/600/600?random=5",
          "https://picsum.photos/600/600?random=6",
          "https://picsum.photos/600/600?random=7",
          "https://picsum.photos/600/600?random=8"
          ],
      "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      "colors": ["red", "black", "teal"],
      "sizes": ["XL", "L", "M", "XM", "LX"],
      "count": 1,
      "price": 102
    },
    {
      "_id": "3",
      "title": "Watch Product 03",
      "images": [
          "https://picsum.photos/600/600?random=9",
          "https://picsum.photos/600/600?random=10",
          "https://picsum.photos/600/600?random=11",
          "https://picsum.photos/600/600?random=12"
          ],
      "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      "colors": ["red", "black", "teal"],
      "sizes": ["XL", "L", "M", "XM", "LX"],
      "count": 1,
      "price": 245
    },
    {
      "_id": "4",
      "title": "Watch Product 04",
      "images": [
          "https://picsum.photos/600/600?random=13",
          "https://picsum.photos/600/600?random=14",
          "https://picsum.photos/600/600?random=15",
          "https://picsum.photos/600/600?random=16"
          ],
      "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      "colors": ["red", "black", "teal"],
      "sizes": ["XL", "L", "M", "XM", "LX"],
      "count": 1,
      "price": 64
    },
    {
      "_id": "5",
      "title": "Watch Product 05",
      "images": [
          "https://picsum.photos/600/600?random=17",
          "https://picsum.photos/600/600?random=18",
          "https://picsum.photos/600/600?random=19",
          "https://picsum.photos/600/600?random=20"
          ],
      "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      "colors": ["red", "black", "teal"],
      "sizes": ["XL", "L", "M", "XM", "LX"],
      "count": 1,
      "price": 27
    },
    {
      "_id": "6",
      "title": "Watch Product 06",
      "images": [
          "https://picsum.photos/600/600?random=21",
          "https://picsum.photos/600/600?random=22",
          "https://picsum.photos/600/600?random=23",
          "https://picsum.photos/600/600?random=24"
          ],
      "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
      "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
      "colors": ["red", "black", "teal"],
      "sizes": ["XL", "L", "M", "XM", "LX"],
      "count": 1,
      "price": 91
    }
  ]);
  const [cart, setCart] = useState([]);
  const addCart = id => {
    const check = cart.every(item => item._id !== id);
    if (check) {
      const data = products.filter(prod => prod._id === id);
      setCart([...cart, ...data]);
    } else {
      alert("The product has been added to cart.");
    }
  }

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    if (dataCart) setCart(dataCart);
  }, []);
  useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(cart));
  }, [cart]);

  const value = {
    products: [products, setProds],
    cart: [cart, setCart],
    addCart: addCart
  }

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
