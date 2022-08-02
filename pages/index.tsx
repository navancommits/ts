import type { NextPage } from 'next'
import { getProducts } from './api/getProducts';
import { ApiRole,Configuration,Auth, Products, Tokens, ListPage, RequiredDeep, Product } from 'ordercloud-javascript-sdk';

type Props = {
    productList: Product[];
};

export async function getServerSideProps() {
    const clientSecret = '1ljIXWDNaFz2fOkhIoSUadu8cTXzm82kES5imCeRu1wQsrv6eEtQA8SXcTcH'; //username of the user logging in
    const clientID = '8DD363B7-217B-40F8-96F7-EB961136003D'; //clientID of the application the user is logging in to ([sign up for free](https://portal.ordercloud.io/register)
    const scope:ApiRole[] = ['FullAccess']; //string array of [roles](https://ordercloud.io/knowledge-base/security-profiles) the application has access to
    Configuration.Set({
        baseApiUrl: "https://sandboxapi.ordercloud.io",
        clientID: '8DD363B7-217B-40F8-96F7-EB961136003D'
    });

    Auth.ClientCredentials(clientSecret, clientID, scope)
        .then(response => {
            //store token, now any subsequent calls will automatically set this token in the headers for you
            const token = response.access_token;
            Tokens.SetAccessToken(token)
        })
        .catch(err => console.log(err));

    console.log("success");
    //let propList: ListPage<Props>= (await Products.List()).Items as ListPage<Props>;
  
    //return { props: { prodList: propList } };
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
