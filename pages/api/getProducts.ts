import {Products } from 'ordercloud-javascript-sdk';

export const getProducts = async () => await (await Products.List({ pageSize: 100 })).Items;

