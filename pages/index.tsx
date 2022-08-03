import type { NextPage } from 'next'
import { getProducts } from './api/getProducts';
import { ApiRole,Configuration,Auth, Products, Tokens, ListPage, RequiredDeep, Product } from 'ordercloud-javascript-sdk';

type Props = {
    productList: Product[];
};

export async function getServerSideProps() {
    const clientID = '4299DFFC-DCA4-4077-BD40-661BB9F96E2F'; //clientID of the application the user is logging in to ([sign up for free](https://portal.ordercloud.io/register)
    const scope:ApiRole[] = ['FullAccess']; //string array of [roles](https://ordercloud.io/knowledge-base/security-profiles) the application has access to
    Configuration.Set({
        baseApiUrl: "https://sandboxapi.ordercloud.io"
    });
    
    const authResponse = await Auth.Anonymous(clientID, scope);
    Tokens.SetAccessToken(authResponse.access_token);    

    return await {
        props: { productList: await getProducts() },
    };
}

const Home: NextPage<Props> = (props) => {
    const prodList = props.productList && (
        <div>
            Products:
            <table>
                <thead></thead>
                <tbody>
                    {props.productList.map((prod, index) => (
                        <tr key={index}>
                            
                            <td>{prod.Name}</td>
                            <td>{prod.Description}</td>
                            <td>{prod.SpecCount}</td>
                            <td>{prod.ShipWidth}</td>
                            <td>{prod.ShipHeight}</td>
                            <td>{prod.ShipLength}</td>
                            <td>{prod.ShipWeight}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return prodList;


   // return (        
   //     <div>
   //         <div>{props.productList[1].Name}</div>
   //         <div>{props.productList[1].Description}</div>
   //         <div>{props.productList[1].SpecCount}</div>
   //         <div>{props.productList[1].ShipWidth}</div>
   //         <div>{props.productList[1].ShipHeight}</div>
   //         <div>{props.productList[1].ShipLength}</div>
   //         <div>{props.productList[1].ShipWeight}</div>
	  //</div>
   // ); 
}

export default Home
