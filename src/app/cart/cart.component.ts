import { Component, OnInit } from '@angular/core';
import { CartDTO } from '../CartEntity/CartEntity';
import { Message } from '../CartEntity/Message';
import { EcartService } from './ecart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDTOArray : CartDTO[];
  cartDTO : CartDTO;
  columndefs : any[] = ['name','imgUrl','seller','quantity','discount','delivery','price','quantityNumber','remove'];
  message : Message;
  p : number = 0;

  constructor(private  eCartService : EcartService) { 
    this.cartDTOArray = [];
    this.message = new Message();
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart()
  {
    this.eCartService.callCart().subscribe(
      data =>{ this.cartDTOArray = data, 
      this.setPrice()});
  }

  setPrice()
  {
    this.p = 0;
    for(let i=0; i < this.cartDTOArray.length;i++)
    {
      this.p += ((this.cartDTOArray[i].price - (this.cartDTOArray[i].price * this.cartDTOArray[i].discount)/100)*this.cartDTOArray[i].quantityNumber); 
    }
    if(this.p <= 1000)
    {
      for(let i=0; i < this.cartDTOArray.length;i++)
      {
        this.p += this.cartDTOArray[i].delivery;
      }   
    } 
  }

  modifyProductQuantity(cartDTO : CartDTO, value:number) 
  {
    if(cartDTO.quantityNumber==3 && value==1)
    {
      alert("MAX IS 4");
    }
    if(cartDTO.quantityNumber==1 && value==-1)
    {
      this.removeProduct(cartDTO);
    }
    else{
        this.eCartService.modifyProductQuantity(cartDTO.id, value).subscribe(
          data =>{ this.message = data,  
          this.getCart();},
          err => console.log('HTTP Error', err));
      }
  }

  removeProduct(cartDTO : CartDTO)
  {
    this.eCartService.deleteProduct(cartDTO.id).subscribe(
      data =>{ 
      this.getCart(); },
      err => console.log('HTTP Error', err)
    );
  }
}