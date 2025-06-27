import React, { useState } from "react";
import Searchbar from "./Searchbar";
import axios from 'axios';
import './Stylesheet.css'

const CreateProductForm =() => {
    const[form, setForm] = useState({
        name:'',
        category: '',
        price: '',
        quantity: '',
        size: '',
        description: '',
        brand: '',
        image: null
    })

    const handleChange = (e) => {
        const{name,value,files} = e.target;
        setForm({...form, [name]: files ? files[0] : value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        for(let key in form) formData.append(key, form[key]);
        await axios.post('http://127.0.0.1:5555/products', formData);
    };

    return(
       <div className="create-container">
        <Searchbar/>
        <div>
            <form onSubmit={handleSubmit} className="form"> 
                  <label htmlFor="name">name:</label>
                  <input name="name" id="name" onChange={handleChange} placeholder="Name" />

                  <label htmlFor="category">category:</label>
                  <input name="category" id="category" onChange={handleChange} placeholder="Category" />

                  <label htmlFor="price">price:</label>
                  <input name="price" id="price" onChange={handleChange} placeholder="Price" type="number" />

                  <label htmlFor="quantity">quantity:</label>
                  <input name="quantity" id="quantity" onChange={handleChange} placeholder="Quantity" type="number" />

                  <label htmlFor="size">size:</label>
                  <input name="size" id="size" onChange={handleChange} placeholder="Size" />

                  <label htmlFor="description">description:</label>
                  <input name="description" id="description" onChange={handleChange} placeholder="Description" />

                  <label htmlFor="brand">brand:</label>
                  <input name="brand" id="brand" onChange={handleChange} placeholder="Brand" />

                  <label htmlFor="image">image:</label>
                  <input type="file" id="image" name="image" onChange={handleChange} />
                  <button type="submit" className="btn">Submit</button>
            </form>
        </div>
      </div>  
    );
}

export default CreateProductForm