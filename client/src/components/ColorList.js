import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({color: '', code: ''})
  console.log(colorToAdd);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    setEditing(false)
    console.log('colorToEdit', colorToEdit)
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    // make a delete request to delete this color
  };

  const handleAddChange = e => {
    e.preventDefault()
    let value = e.target.value
    if (e.target.name === 'code') {
      value = {hex: value}
    }

    setColorToAdd({
      ...colorToAdd,
      [e.target.name]: value
    })
  }

  const handleAddSubmit = e => {
    e.preventDefault()
    console.log(colorToAdd)
    axiosWithAuth()
      .post('/api/colors', colorToAdd)
      .then(res => {
        console.log(res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => {console.log(err)})
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <form onSubmit={handleAddSubmit}>
        <input 
          type='text'
          name='color'
          placeholder='color name'
          value={colorToAdd.color}
          onChange={handleAddChange}
        />
        <input 
          type='text'
          name='code'
          placeholder='hex id'
          value={colorToAdd.code.hex}
          onChange={handleAddChange}
        />
        <button>Add Color</button>
      </form>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
