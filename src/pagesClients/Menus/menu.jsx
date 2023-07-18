import React from 'react'
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API_URL } from '../../../env.json'

function numberWithComas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


const menu = ({menus, masukKeranjang, onClick }) => {
  return (
        <Col md={4} xs={6}>
        <Card className='shadow mb-5' onClick={() => masukKeranjang(menus)}>
        <Card.Img variant="top" src={`${API_URL}/uploads/${menus.files}`} />
      
      <Card.Body>
        <Card.Title>{menus.name_products} - {menus.kode} </Card.Title>
        <p className="dark:text-indigo-200 mb-2">{menus.desc_products}</p>
        <Card.Text>
            <>
         Rp. {numberWithComas(menus.harga)}
            </>
        </Card.Text>
        <Card.Text>
            <p className="dark:text-indigo-200 mb-2"> Stock Tersedia : {menus.stock}</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
        
        </Col>

  )
}

export default menu