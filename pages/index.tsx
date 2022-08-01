import type { NextPage } from 'next'
import fetch from 'node-fetch'

interface Props {
    fact: string;
    length: int;
}

export async function getServerSideProps() {
   const res = await fetch(
    "https://catfact.ninja/fact"
   );
   const data = await res.json();
  
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
