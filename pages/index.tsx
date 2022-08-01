import type { NextPage } from 'next'
import fetch from 'node-fetch'

interface IProps {
	fact: string;
    length: number;
}

type Props = {
    fact: string;
    length: number;
};

export async function getServerSideProps() {
   let res = await fetch(
    "https://catfact.ninja/fact"
   );
   let data = await res.json() as IProps;
  
   return {
     props: {
       fact: data.fact,
       length: data.length
     }
   }
}

const Home: NextPage<Props> = (props) => { 
    return (      
      <div>
		  <div>{props.fact}</div>		  
		  <div>{props.length}</div>
	  </div>
    ); 
}

export default Home
