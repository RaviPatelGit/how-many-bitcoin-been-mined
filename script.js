var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}


var client = new HttpClient();
client.get('https://blockstream.info/api/blocks/tip/height', function(response) {
    let span = document.querySelector('span')
    span.innerText = response;
    console.log(getSupply(response));
});

const getSupply = (num) => {

    let years = Math.floor(num/52500);

    const parent = document.querySelector('.parent');

    let supply = 0
    for (let i = 0; i < Math.floor(years/4); i++) {
        supply += 210000 * (50/Math.pow(2,i));
        let child = document.createElement('p');
        child.innerText = 'New supply during year ' + (2009+(i*4)) + ' to ' + (2009+((i+1)*4)) + ' : ' + 210000 * (50/Math.pow(2,i));
        parent.append(child);
    }

    let lastHalv = (50 / Math.pow(2, Math.floor((years/4)))) *(num - 210000*(Math.floor(years/4)));
    
    supply += lastHalv;
    let child = document.createElement('p');
    child.innerText = 'New supply since last halving: ' + lastHalv;
    parent.append(child); 

    child = document.createElement('p');
    child.innerText = 'Total Supply till now: ' + supply;
    parent.append(child); 


    child = document.createElement('p');
    let s ='Since new supply reduces by 50% every four year, there is upper limit of 21,000,000 Bitcoin on total supply.';
    child.innerText = s;
    parent.append(child); 


    child = document.createElement('p');
    s = 'Percentage of Bitcoin already mined: ' + ((supply*100)/21000000) + '%';
    child.innerText = s;
    parent.append(child); 

    child = document.createElement('p');
    s = 'Percentage of Bitcoin remains to mine: ' + (100-((supply*100)/21000000)) + '%';
    child.innerText = s;
    parent.append(child); 
    
    child = document.createElement('p');
    s = 'Yearly inflation rate today: ' + inflationRate(num) + '%';
    child.innerText = s;
    parent.append(child); 


    return supply;
}

const inflationRate = (num) => {
    let epocs = Math.floor(num/210000)
    let perc = Math.pow(2,epocs);
    let current_epoc = (num-210000*Math.floor(num/210000))/210000;
    perc += current_epoc;
    return (100 / (Math.pow(2, perc)/4)); 
}

// Math.ceil()

