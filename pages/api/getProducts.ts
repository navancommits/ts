import {Products , Product} from 'ordercloud-javascript-sdk';


export const getProducts = async () => await (await Products.List()).Items;

