const express = require('express');
const cors = require('cors');
const data = require('./data.json');

const productData = async (req, res) =>{
    await res.json(data)
}

module.exports = {productData}