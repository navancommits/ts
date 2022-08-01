import type { NextPage } from 'next'
import fetch from 'node-fetch'

type Props = {
    fact: string;
    length: string;
};

export async function getServerSideProps() {
   let res = await fetch(
    "https://catfact.ninja/fact"
   );
   let data = await res.json() as Props;
  
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
