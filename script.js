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


    return supply;
}

// Math.ceil()

