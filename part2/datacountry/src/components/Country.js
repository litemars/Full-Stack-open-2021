import React from 'react'
import Weather from './Weather'

const Country =({country, input, setInput}) =>{
    
    const list=country.filter( con => con.name.toLowerCase().match(input.toLowerCase()))

    if(list.length===1){
        return(
            <div>
                <h1>{list[0].name}</h1>
                <p>Capital {list[0].capital}</p>
                <p>Population {list[0].population}</p>
                <h3>Languages</h3>
                    <ul>
                    {list[0].languages.map(lan =>
                    <li key={lan.iso639_1}>{lan.name}</li>)
                    }
                    </ul>
                <img src={list[0].flag} alt="country flag"  width='150' height='150'/>
            
                <Weather capital={list[0].capital}/>

    
                </div>
            
        )

    }
    if(list.length===0){
        return(
            <>No match</>
        )
            
    }
    if(list.length>10){
        return(
            <>Too many countries</>
        )
    }
    if(list.length<10 || list.length===10 ){
        return(
            
            <div>{list.map(con=>
            <div key={con.alpha2Code}>
            <div key={con.alpha3Code}>{con.name}
            <button onClick={() => setInput(con.name)}>show</button></div>
            </div>
            )}</div>
            
        )
    }
}
export default Country